from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from facility.models import Facility, Category
from addressbook.models import Contact
from facility.serializers import (
    FacilitySerializer,
    CategorySerializer,
    ContactSerializer,
)
from django.contrib.sites.shortcuts import get_current_site


class FacilityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        return Facility.objects.filter(site=get_current_site(self.request))


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

        