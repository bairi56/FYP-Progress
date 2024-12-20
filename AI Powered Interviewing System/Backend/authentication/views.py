from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

User = get_user_model()
from django.contrib.auth.models import User

from django.contrib.auth import logout

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile

class JoinAsRecruiterView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            # Get or create user profile
            user_profile, created = UserProfile.objects.get_or_create(user=request.user)
            
            # Check if user is already a recruiter
            if user_profile.is_recruiter:
                return Response({
                    "message": "You are already a recruiter",
                    "status": "success"
                })
            
            # Request status (pending admin approval)
            return Response({
                "message": "Recruiter access request submitted. Waiting for admin approval.",
                "status": "pending"
            })
        except Exception as e:
            return Response({
                "error": str(e),
                "status": "error"
            }, status=400)

class CheckRecruiterStatusView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            return Response({
                "is_recruiter": user_profile.is_recruiter
            })
        except UserProfile.DoesNotExist:
            return Response({
                "is_recruiter": False
            })
class RegisterView(APIView):
    # Allow any user (including unauthenticated) to access this view
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        confirmPassword = request.data.get('confirmPassword')

        # Check if passwords match
        if password != confirmPassword:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)