# for django
from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from ner_app.utils.entity import NERModel
from transformers import RobertaTokenizerFast,DistilBertTokenizerFast

# for robert
from .utils.entity import NERModel  # Import the IntentModel class

# for distilbert
from .utils.intent import IntentModel  # Import the IntentModel class


# tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base")
tokenizer = RobertaTokenizerFast.from_pretrained("roberta-base")
tokenizer.save_pretrained("D:/NER/NLU/ner_app/final_tokenizer")  # Ensure this path is correct

# Initialize paths
model_path = 'final_new_model_state.pth'
tokenizer_path = "roberta-base"
label_encoder_path = 'label_encoder.pkl'


# Create an instance of NERModel
ner_model_instance = NERModel(model_path, tokenizer_path, label_encoder_path)
model, tokenizer, label_encoder = ner_model_instance.model, ner_model_instance.tokenizer, ner_model_instance.label_encoder
# print("model ner",model)
class PredictEntityAPIView(APIView):
    def post(self, request):
        text = request.data.get('text', '')
        print('textt',text)
        if not text:
            return Response({"error": "No text provided for prediction"}, status=400)
        
        # Use the NER model to perform prediction
        prediction_result = ner_model_instance.predict_entities(text) 
        print(prediction_result,'prediction')
        return Response({"predictions": prediction_result})




# Initialize the IntentModel when the server starts
intent_model = IntentModel(model_path='distilbert_model.pkl', tokenizer_path='distilbert_tokenizer.pkl')
# intent_model._use_sdpa = False
# print("intent",intent_model)
# intent classification
class PredictIntentAPIView(APIView):
    def post(self, request):
        text = request.data.get('text', '')
        if not text:
            return Response({"error": "No text provided for prediction"}, status=400)
        
        # Use the IntentModel to perform prediction
        prediction_result = intent_model.predict_intent([text])
        return Response({"predictions": prediction_result})
