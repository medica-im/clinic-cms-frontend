from django.shortcuts import render
import logging
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView
from facility.models import Organization, Category
from opengraph.models import TwitterCard
from opengraph.serializers import (
    TwitterCardSerializer,
)
from django.contrib.sites.shortcuts import get_current_site
from backend.i18n import activate_locale

logger=logging.getLogger(__name__)


class OpenGraphView(RetrieveAPIView):
    queryset = TwitterCard.objects.all()
    serializer_class = TwitterCardSerializer
    
    def get_object(self):
        try:
            return TwitterCard.objects.get(site=get_current_site(self.request))
        except Organization.DoesNotExist:
            return
