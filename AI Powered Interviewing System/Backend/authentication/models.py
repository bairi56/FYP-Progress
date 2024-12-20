from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # One-to-One relationship with User model
    is_recruiter = models.BooleanField(default=False)  # Custom field to mark if the user is a recruiter

    def __str__(self):
        return f"{self.user.username}'s Profile ({'Recruiter' if self.is_recruiter else 'Candidate'})"

class CandidateTable(models.Model):
    candidate = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={"userprofile__is_recruiter": False},  # Exclude recruiters
    )  # Link only to users who are not recruiters
    candidate_name = models.CharField(max_length=255)
    candidate_email = models.EmailField()
    candidate_cv = models.FileField(upload_to="candidates/cv/")

    def __str__(self):
        return self.candidate_name


class RecruiterTable(models.Model):
    recruiter = models.OneToOneField(User, on_delete=models.CASCADE, related_name="recruiter_profile")
    recruiter_organization = models.CharField(max_length=255)
    recruiter_name = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if not self.recruiter.userprofile.is_recruiter:  # Check the UserProfile is marked as recruiter

            raise ValueError(f"User {self.user.username} is not marked as a recruiter.")
        super().save(*args, **kwargs)  # Call the original save method

    def __str__(self):
        return f"Recruiter: {self.recruiter_name} ({self.recruiter_organization})"
