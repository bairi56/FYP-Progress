# ner_app/urls.py
from django.urls import path
from .views import PredictEntityAPIView,PredictIntentAPIView

urlpatterns = [
    # URL pattern for the PredictAPIView class-based view
    # path('api/predict/', PredictEntityAPIView.as_view(), name='predict_api'),
    # path('api/predict-intent/', PredictIntentAPIView.as_view(), name='predict_intent_api'),

]
