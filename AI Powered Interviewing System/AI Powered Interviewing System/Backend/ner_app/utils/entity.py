from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
import torch
import pickle
from transformers import RobertaForTokenClassification, RobertaTokenizerFast


class NERModel:
    def __init__(self, model_path, tokenizer_path, label_encoder_path):
        # Call the method with 'self'
        self.model, self.tokenizer, self.label_encoder = self.load_model_and_tokenizer(model_path, tokenizer_path, label_encoder_path)
    
    def load_model_and_tokenizer(self, model_path, tokenizer_path, label_encoder_path):
        num_labels = 17  # Ensure this matches training configuration
        model = RobertaForTokenClassification.from_pretrained('roberta-base', num_labels=num_labels)
        model.load_state_dict(torch.load(model_path, map_location='cpu', weights_only=True))
        
        # Load the tokenizer
        tokenizer = RobertaTokenizerFast.from_pretrained(tokenizer_path, add_prefix_space=True)
        
        # Load the label encoder
        with open(label_encoder_path, 'rb') as f:
            label_encoder = pickle.load(f)

        return model, tokenizer, label_encoder


    def predict_entities(self, text, max_len=128):
        self.model.eval()
        
        words = text.split()
        inputs = self.tokenizer(words, is_split_into_words=True, return_tensors="pt", max_length=max_len, padding="max_length", truncation=True)

        with torch.no_grad():
            outputs = self.model(**inputs)

        predictions = torch.argmax(outputs.logits, dim=2)
        predicted_labels = [self.label_encoder.inverse_transform([p.item()])[0] for p in predictions[0] if p.item() != -100]

        aligned_labels = []
        word_ids = inputs.word_ids()
        current_word = None
        for word_id, predicted_label in zip(word_ids, predicted_labels):
            if word_id != current_word:
                aligned_labels.append(predicted_label)
                current_word = word_id

        return list(zip(words, aligned_labels[:len(words)]))
