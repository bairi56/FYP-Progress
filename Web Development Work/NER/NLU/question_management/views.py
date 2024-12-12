from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuestionGeneratorSerializer
from .question_gen.LLMs import get_related_questions, load_model_and_tokenizer

# Load the model and tokenizer at startup
model, tokenizer = load_model_and_tokenizer(model_dir=r"D:\NER\NLU\question_management\question_gen\question_gen_model")
print("Model is loaded sucessfully",model)

class QuestionGenerationView(APIView):
    def post(self, request):
        serializer = QuestionGeneratorSerializer(data=request.data)
        if serializer.is_valid():
            job = serializer.validated_data['job']
            experience = serializer.validated_data['experience']
            
            # Generate questions
            try:
                questions = get_related_questions(job, experience, model, tokenizer)
                return Response({'questions': questions}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
