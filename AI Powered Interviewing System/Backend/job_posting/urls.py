from django.urls import path
from .views import JobPostingView,JobPostDetailView,JobPostListView,JobApplicationView,JobPostDetailPublic,JobPostingWithApplicantsView,ApplicantsView,ApplicantDetailView

urlpatterns = [
    path('jobposts/', JobPostListView.as_view(), name='job_post_list'),  # Correct URL pattern for the list view
    path('job_posting/', JobPostingView.as_view(), name='job_posting'),  # For post requests
    path('jobposts/<int:pk>/', JobPostDetailView.as_view(), name='jobpost-detail'),
    path('apply/', JobApplicationView.as_view(), name='apply'),
    path('publicposts/', JobPostDetailPublic.as_view(), name='jobpostspublic'),
    path('with_applicants/', JobPostingWithApplicantsView.as_view(), name='job_posts_with_applicants'),
    path('job/<int:job_id>/applicants/', ApplicantsView.as_view(), name='job_applicants'),
    path('applicant/<int:applicant_id>/', ApplicantDetailView.as_view(), name='applicant_details'),

]

