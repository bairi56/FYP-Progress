from django.db import models
from django.contrib.auth.models import User

class JobPostingTable(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    skills = models.JSONField()  # For storing selected skills
    experience_level = models.CharField(max_length=50)
    
    # location = models.CharField(max_length=200)
    # posted_date = models.DateTimeField(default=timezone.now)  # Use timezone.now()
    # job_type = models.CharField(max_length=50, choices=[('Full-Time', 'Full-Time'), ('Part-Time', 'Part-Time')])

    def __str__(self):
        return self.title

class ApplicationTable(models.Model):
    full_name = models.CharField(max_length=110)
    email = models.EmailField()
    qualification = models.CharField(max_length=45)
    resume = models.FileField(upload_to="resumes/")
    applied_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.full_name
