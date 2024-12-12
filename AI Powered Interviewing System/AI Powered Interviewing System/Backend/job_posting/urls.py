from django.urls import path
from .views import JobPostingView,JobPostDetailView,JobPostListView,JobApplicationView
urlpatterns = [
    path('jobposts/', JobPostListView.as_view(), name='job_post_list'),  # Correct URL pattern for the list view
    path('job_posting/', JobPostingView.as_view(), name='job_posting'),  # For post requests
    path('jobposts/<int:pk>/', JobPostDetailView.as_view(), name='jobpost-detail'),
    path('apply/', JobApplicationView.as_view(), name='apply'),

]

