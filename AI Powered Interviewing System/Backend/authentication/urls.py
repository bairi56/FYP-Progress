# In urls.py for authentication app
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, 
    LogoutView, 
    JoinAsRecruiterView,
    CheckRecruiterStatusView
)
from django.urls import path
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('join-as-recruiter/', JoinAsRecruiterView.as_view(), name='join_as_recruiter'),
    path('check-recruiter-status/', CheckRecruiterStatusView.as_view(), name='check_recruiter_status')
]