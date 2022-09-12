from addressbook.models import Contact, Address
from rest_framework import serializers


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id',
            'street',
            'city',
            'zip',
            'state',
            'country',
            'latitude',
            'longitude',
            'zoom',
        ]
        depth = 2


class ContactSerializer(serializers.ModelSerializer):
    #addresses = AddressSerializer(many=True, read_only=True)
    
    class Meta:
        model = Contact
        fields = [
            'id',
            'formatted_name',
            'url',
            'addresses',
            'phonenumbers',
        ]
        depth = 3