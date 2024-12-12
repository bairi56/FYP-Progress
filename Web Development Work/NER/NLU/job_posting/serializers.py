from rest_framework import serializers
from .models import JobPostingTable 
from .models import ApplicationTable

class JobPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPostingTable
        fields = '__all__'


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationTable
        fields = ['id', 'full_name', 'email', 'qualification', 'resume']