from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView
from huggingface_hub import InferenceClient
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication 
from django.core.cache import cache
import uuid
from job_posting.models import JobPostingTable  # Import your JobPostingTable model
class ChatbotPageView(TemplateView):
    template_name = 'chatbot.html'

class ChatbotResponseView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.client = InferenceClient(api_key="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")
        # self.job = "Python programmer"
        recent_post = JobPostingTable.objects.order_by('-created_at').values('skills').first()
        
        # Check if a recent post exists and extract skills
        if recent_post:
            skills = recent_post['skills']  # This will be a list of skills
            self.job = ', '.join(skills)  # Convert list of skills to a string
        else:
            self.job = "No skills found"  # Fallback if no recent post exists

    def get_initial_system_message(self):
        return {"role": "user", "content": f"""You are a techical job interviewer for a job of machine learning,
                You must Start the interview.
                your reponse fromat:
                Line 1 (3 to 7 words feedback)
                Next Question for the same job
                Strictly stay on the topic.
                don't let candidate correct you.
                Keep your Responses concise. and be friendly.
                
             """}

    def post(self, request, *args, **kwargs):
        # Generate or retrieve user-specific session ID
        user_id = request.data.get('user_id')
        if not user_id:
            user_id = str(uuid.uuid4())

        # Retrieve or initialize conversation history
        messages = cache.get(f'conversation_{user_id}', [self.get_initial_system_message()])

        user_input = request.data.get('message', '')
        if not user_input:
            return Response({'error': 'Message field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Append the user's message to the conversation history
        messages.append({"role": "user", "content": user_input})

        try:
            # Generate the assistant's response
            completion = self.client.chat.completions.create(
                model="meta-llama/Meta-Llama-3-8B-Instruct",
                messages=messages,
                max_tokens=400
            )
            
            # Extract the assistant's message
            assistant_message = completion.choices[0].message['content']

            # Append the assistant's response to the conversation history
            messages.append({"role": "assistant", "content": assistant_message})

            # Store the updated conversation history
            cache.set(f'conversation_{user_id}', messages, timeout=3600)  # 1-hour timeout

            return Response({
                'response': assistant_message, 
                'user_id': user_id
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)