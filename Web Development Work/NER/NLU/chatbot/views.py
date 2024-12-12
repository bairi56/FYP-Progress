from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView
from huggingface_hub import InferenceClient

# Initialize the inference client
client = InferenceClient(api_key="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")
job = "Python programmer"

# Conversation history
messages = [
    {
        "role": "user",
        "content": f"""
        You should act as my {job} job interviewer, where you will ask me theoretical questions.
        I will answer your questions. You will evaluate my answer 0 to 10 and give feedback in 3 to 5 words.
        Ask exactly 5 questions. Don't respond to irrelevance (Must stay on the context).
        Be friendly to some extent. Use the candidate name often. Don't include headings in responses; respond naturally.
        """
    }
]

class ChatbotPageView(TemplateView):
    template_name = 'chatbot.html'

class ChatbotResponseView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message', '')  # Get the user input

        if not user_input:
            return Response({'error': 'Message field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Append the user's message to the conversation history
        messages.append({"role": "user", "content": user_input})

        try:
            # Generate the assistant's response
            completion = client.chat.completions.create(
                model="meta-llama/Meta-Llama-3-8B-Instruct",
                messages=messages,
                max_tokens=400
            )
            
            # Extract the assistant's message
            assistant_message = completion.choices[0].message['content']

            # Append the assistant's response to the conversation history
            messages.append({"role": "assistant", "content": assistant_message})

            return Response({'response': assistant_message}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
