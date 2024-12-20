# ner_app/utils/intent_model.py
import pickle
import torch
from transformers import DistilBertForSequenceClassification, DistilBertTokenizer
import os

# Define the intent labels
INTENT_LABELS = [
    'Affirm', 'Deny', 'Greeting', 'Inform Salary', 
    'Inform_Name', 'Organization_inquiry', 'Uncertain', 
    'education', 'experience', 'inform_address', 'skills'
]


class IntentModel:
    def __init__(self, model_path='distilbert_model.pkl', tokenizer_path='distilbert_tokenizer.pkl'):
        # Load model and tokenizer
        self.model = self.load_model(model_path)
        self.tokenizer = self.load_tokenizer(tokenizer_path)
    
    def load_model(self, model_path):
        with open(model_path, 'rb') as model_file:
            model = pickle.load(model_file)
        return model
    
    def load_tokenizer(self, tokenizer_path):
        with open(tokenizer_path, 'rb') as tokenizer_file:
            tokenizer = pickle.load(tokenizer_file)
        return tokenizer

    def predict_intent(self, text_samples):
        # Tokenize the input texts
        inputs = self.tokenizer(text_samples, padding=True, truncation=True, return_tensors="pt")

        # Perform inference (get model predictions)
        with torch.no_grad():
            outputs = self.model(**inputs)

        # Get predicted labels (the label with the highest score for each input)
        predictions = torch.argmax(outputs.logits, dim=-1)

        # Prepare results
        results = []
        for i, prediction in enumerate(predictions):
            pred_index = prediction.item()  # Get the integer value from the tensor
            results.append((text_samples[i], INTENT_LABELS[pred_index]))
        return results
