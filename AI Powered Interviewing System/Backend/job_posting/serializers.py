from rest_framework import serializers
from .models import JobPostingTable 
from .models import ApplicationTable
from authentication.models import CandidateTable
# class JobPostingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = JobPostingTable
#         fields = '__all__'
from rest_framework import serializers
from .models import JobPostingTable, RecruiterTable

class JobPostingSerializer(serializers.ModelSerializer):
    recruiter = serializers.PrimaryKeyRelatedField(queryset=RecruiterTable.objects.all(), required=False)  
    
    class Meta:
        model = JobPostingTable
        fields = ['id', 'recruiter', 'title', 'description', 'skills', 'experience_level', 'location', 'status', 'created_at','is_private']
        read_only_fields = ['recruiter']

    def update(self, instance, validated_data):
        # Ensure only the job's recruiter can update
        user = self.context['request'].user
        recruiter = RecruiterTable.objects.filter(recruiter_id=user).first()
        
        if instance.recruiter != recruiter:
            raise serializers.ValidationError("You are not authorized to modify this job posting.")
        
        return super().update(instance, validated_data)




from rest_framework import serializers
from .models import ApplicationTable

class ApplicationTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationTable
        fields = '__all__'

class JobPostingWithApplicantsSerializer(serializers.ModelSerializer):
    applicants = serializers.SerializerMethodField()

    class Meta:
        model = JobPostingTable
        fields = ['job_title', 'skills', 'posted_at', 'applicants']

    def get_applicants(self, obj):
        applicants = ApplicationTable.objects.filter(job=obj)[:2]
        return [{'candidate_name': app.candidate.candidate_name} for app in applicants]
    
from rest_framework import serializers
from .models import ApplicationTable

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationTable
        fields = ['id', 'full_name', 'email', 'qualification', 'marks', 'resume', 'applied_at']

class DetailedApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    status = serializers.CharField(source='application_status', read_only=True)

    class Meta:
        model = ApplicationTable
        fields = [
            'id', 
            'full_name', 
            'email', 
            'qualification', 
            'marks', 
            'resume', 
            'applied_at',
            'job_title',
            'status'
        ]