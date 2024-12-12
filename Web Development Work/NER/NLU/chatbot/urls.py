from django.urls import path
from .views import ChatbotPageView, ChatbotResponseView

urlpatterns = [
    path('chatbot/', ChatbotPageView.as_view(), name='chatbot_page'),
    path('response/', ChatbotResponseView.as_view(), name='chatbot_response'),
]
