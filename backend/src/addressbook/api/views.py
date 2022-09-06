from addressbook.models import Profile, App
from addressbook.api.serializers import ProfileSerializer, AppSerializer
from facility.utils import get_organization
from addressbook.api.permissions import ProfilePermissions
from rest_framework import generics, status, viewsets
from rest_framework.response import Response


class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [ProfilePermissions]

    def perform_create(self, serializer):
        changed_by = self.request.user
        organization = get_organization(self.request)
        serializer.save(changed_by=changed_by)
        profile_id = serializer.data.get('id')
        profile_obj = Profile.objects.get(id = profile_id)
        profile_obj.organization.add(organization)


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [ProfilePermissions]

    def perform_update(self, serializer):
        changed_by = self.request.user
        organization = get_organization(self.request)
        serializer.save(changed_by=changed_by)
        profile_id = serializer.data.get('id')
        profile_obj = Profile.objects.get(id = profile_id)
        profile_obj.organization.add(organization)


class AppViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing accounts.
    """
    queryset = App.objects.all()
    serializer_class = AppSerializer