from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JobPostingTable
from .serializers import JobPostingSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import ApplicationTable
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics,permissions
from .models import JobPostingTable
from .serializers import JobPostingSerializer,ApplicationSerializer,DetailedApplicationSerializer
from authentication.models import RecruiterTable
from django.core.exceptions import PermissionDenied

class JobPostingView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = JobPostingSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobPostListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobPostingSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        # If user is a recruiter, show only their job posts
        if hasattr(user, 'recruiter_profile'):
            recruiter = user.recruiter_profile
            return JobPostingTable.objects.filter(recruiter=recruiter)
        
        # If user is a candidate, show all job posts
        return JobPostingTable.objects.all()

class JobPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = JobPostingTable.objects.all()
    serializer_class = JobPostingSerializer

    def perform_destroy(self, instance):
        # Ensure only the job's recruiter can delete
        user = self.request.user
        recruiter = RecruiterTable.objects.filter(recruiter_id=user).first()
        
        if instance.recruiter != recruiter:
            raise PermissionDenied("You are not authorized to delete this job posting.")
        
        instance.delete()

class JobPostDetailPublic(generics.ListAPIView):
    queryset = JobPostingTable.objects.filter(is_private=False)  # Filter to exclude private jobs
    serializer_class = JobPostingSerializer
    permission_classes = [AllowAny]  # This allows unauthenticated access

    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Custom permissions can also be added

class JobPostingWithApplicantsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # If user is a recruiter, show only their job posts
        if hasattr(user, 'recruiter_profile'):
            recruiter = user.recruiter_profile
            job_posts = JobPostingTable.objects.filter(recruiter=recruiter)[:2]

            result = []
            for job in job_posts:
                # Get the applicants for each job posting
                applicants = ApplicationTable.objects.filter(job=job)  # Limit to 2 applicants
                result.append({
                    'job_title': job.title,
                    'skills': job.skills,
                    'posted_at': job.created_at,
                    'applicants': [
                        {'candidate_name': app.candidate.candidate_name} for app in applicants
                    ]
                })
            
            return Response(result)
        
        return Response({"detail": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

from django.views.generic.list import ListView
from django.http import JsonResponse
from .models import ApplicationTable, JobPostingTable
from django.contrib.auth.mixins import LoginRequiredMixin

class ApplicantsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        try:
            job = JobPostingTable.objects.get(id=job_id, recruiter=request.user.recruiter_profile)
            applicants = ApplicationTable.objects.filter(job=job)
            serializer = ApplicationSerializer(applicants, many=True)
            return Response(serializer.data)
        except JobPostingTable.DoesNotExist:
            return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
class ApplicantDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, applicant_id):
        try:
            # Ensure the applicant belongs to a job posted by the current recruiter
            applicant = ApplicationTable.objects.get(
                id=applicant_id, 
                job__recruiter=request.user.recruiter_profile
            )
            
            # Serialize with more detailed information
            serializer = DetailedApplicationSerializer(applicant)
            return Response(serializer.data)
        except ApplicationTable.DoesNotExist:
            return Response({"detail": "Applicant not found"}, status=status.HTTP_404_NOT_FOUND)
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import ApplicationTable, JobPostingTable, CandidateTable
from .serializers import ApplicationTableSerializer

class JobApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            job_id = request.data.get("job_id")
            job = JobPostingTable.objects.get(id=job_id)
            candidate = CandidateTable.objects.get(candidate=request.user)
            
            application = ApplicationTable.objects.create(
                candidate=candidate,
                job=job,
                full_name=request.data.get("full_name"),
                email=request.data.get("email"),
                marks=request.data.get("marks", 0),
                qualification=request.data.get("qualification"),
                resume=request.FILES.get("resume"),
            )
            application.save()

            return Response({"message": "Application submitted successfully."}, status=status.HTTP_201_CREATED)

        except JobPostingTable.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
        except CandidateTable.DoesNotExist:
            return Response({"error": "Candidate not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
