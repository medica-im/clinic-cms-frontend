from django.urls import include, path, re_path
from rest_framework import routers
from workforce.views import WorkforceViewSet, WorkforceLabel

router = routers.DefaultRouter()
router.register(r'', WorkforceViewSet)

app_name = 'workforce'

urlpatterns = [
    path('dictionary/', WorkforceLabel.as_view()),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]