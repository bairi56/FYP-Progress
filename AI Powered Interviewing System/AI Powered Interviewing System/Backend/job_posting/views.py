from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JobPostingTable
from .serializers import JobPostingSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import ApplicationTable
from .serializers import JobApplicationSerializer
class JobPostingView(APIView):
    def post(self, request):
        serializer = JobPostingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import generics
from .models import JobPostingTable
from .serializers import JobPostingSerializer

class JobPostListView(generics.ListCreateAPIView):
    queryset = JobPostingTable.objects.all()
    serializer_class = JobPostingSerializer
    def get(self, request):
        jobposts = JobPostingTable.objects.all()  # Query all job posts
        serializer = JobPostingSerializer(jobposts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
class JobPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobPostingTable.objects.all()
    serializer_class = JobPostingSerializer


class JobApplicationView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Application submitted successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)