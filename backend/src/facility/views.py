from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView
from facility.models import Facility, Category
from addressbook.models import Contact
from facility.serializers import (
    FacilitySerializer,
    CategorySerializer,
    ContactSerializer,
)
from django.contrib.sites.shortcuts import get_current_site


class FacilityView(RetrieveAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    
    def get_object(self):
        #qs = super().get_queryset()
        try:
            return Facility.objects.get(site=get_current_site(self.request))
        except Facility.DoesNotExist:
            return


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

        