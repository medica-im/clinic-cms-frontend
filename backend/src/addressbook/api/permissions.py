from rest_framework import permissions
from access.utils import authorize_api


class ProfilePermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # All permissions for the owner of the profile.
        if obj.contact.user == request.user:
            return True
        endpoint = "profile"
        return authorize_api(endpoint, request)

    def has_permission(self, request, view):
        endpoint = "profile"
        return authorize_api(endpoint, request)

class ObjectPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.contact.user == request.user:
            return True