from django.urls import include, path
from rest_framework import routers
from facility import views

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
app_name = 'facility'

urlpatterns = [
    path(
        '',
        views.OrganizationView.as_view(),
    ),
    path(
        'api-auth/',
        include('rest_framework.urls', namespace='rest_framework')
    )
]