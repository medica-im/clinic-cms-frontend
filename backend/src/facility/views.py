import logging
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView
from facility.models import Organization, Category
from addressbook.models import Contact
from facility.serializers import (
    OrganizationSerializer,
    CategorySerializer,
    ContactSerializer,
)
from django.contrib.sites.shortcuts import get_current_site
from backend.i18n import activate_locale

logger=logging.getLogger(__name__)


class OrganizationView(RetrieveAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    
    def get_object(self):
        language = self.kwargs.get('language', None)
        logger.debug(f'kwargs {language=}')
        activate_locale(language,self.request)
        try:
            return Organization.objects.get(site=get_current_site(self.request))
        except Organization.DoesNotExist:
            return


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

        