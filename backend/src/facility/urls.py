from django.urls import include, path
from rest_framework import routers
from facility import views

router = routers.DefaultRouter()
#router.register(r'categories', views.CategoryViewSet)
#router.register(r'', views.FacilityView, basename="facility")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
app_name = 'facility'

urlpatterns = [
    path(
        '',
        views.FacilityView.as_view(),
    ),
    path(
        'api-auth/',
        include('rest_framework.urls', namespace='rest_framework')
    )
]