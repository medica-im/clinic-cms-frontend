from rest_framework import exceptions, serializers
from access.models import Role

class RoleSerializer(serializers.ModelSerializer):
    """Serialize Role."""


    class Meta:
        model = Role
        fields = [
            'name',
            'label',
            'description',
        ]