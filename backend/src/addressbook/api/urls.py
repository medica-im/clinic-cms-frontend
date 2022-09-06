from django.urls import path
from addressbook.api import views

app_name = 'addressbook'

urlpatterns = [
    path(
        'profile/',
        views.ProfileList.as_view()
    ),
    path(
        'profile/<int:pk>',
        views.ProfileDetail.as_view()
    ),
]