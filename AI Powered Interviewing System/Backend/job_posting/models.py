from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from authentication.models import UserProfile,RecruiterTable,CandidateTable
class JobPostingTable(models.Model):
    recruiter = models.ForeignKey(RecruiterTable, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    skills = models.JSONField()  # For storing selected skills
    experience_level = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)  # Tracks post creation time
    location = models.CharField(max_length=200)
    STATUS_CHOICES = [
        ("Applied", "Applied"),
        ("Not Applied", "Not Applied"),
        ("Interview Done", "Interview Done"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Not Applied")
    is_private = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
    def is_recruiter(self):
        return self.user.userprofile.is_recruiter

class ApplicationTable(models.Model):
    candidate = models.ForeignKey(CandidateTable,on_delete=models.CASCADE,related_name="applications",)  # Link to CandidateTable
    job = models.ForeignKey(JobPostingTable, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=110)
    email = models.EmailField()
    marks=models.IntegerField()
    qualification = models.CharField(max_length=45)
    resume = models.FileField(upload_to="resumes/")
    applied_at = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return self.full_name
