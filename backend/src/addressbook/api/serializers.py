from addressbook.models import Profile, App, AppLink, AppStore

from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id', 'contact', 'roles', 'organization', 'text', 'changed_by',
            'created', 'updated',
        ]
        extra_kwargs = {'changed_by': {'required': False}}


class AppStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppStore
        fields = [
            'name', 'image',
        ]


class AppLinkSerializer(serializers.ModelSerializer):
    store = AppStoreSerializer(read_only=True, many=False)

    class Meta:
        model = AppLink
        fields = [
            'url', 'store',
        ]


class AppSerializer(serializers.ModelSerializer):
    links = AppLinkSerializer(read_only=True, many=True)

    class Meta:
        model = App
        fields = [
            'name', 'label', 'links',
        ]