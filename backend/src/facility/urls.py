from django.urls import include, path
from rest_framework import routers
from facility import views

router = routers.DefaultRouter()
router.register(r'facility', views.FacilityViewSet)
router.register(r'category', views.CategoryViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
app_name = 'facility'

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path(
        'api-auth/',
        include('rest_framework.urls', namespace='rest_framework')
    )
]