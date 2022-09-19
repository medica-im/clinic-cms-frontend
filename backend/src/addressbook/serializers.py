from addressbook.models import Contact, Address, SocialNetwork
from rest_framework import serializers, fields

"""
class ChoiceField(serializers.ChoiceField):

    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]

    def to_internal_value(self, data):
        # To support inserts with the value
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)
"""

class SocialNetworkSerializer(serializers.ModelSerializer):
    #type = fields.ChoiceField(choices=SocialNetwork.SocialNetworkType.labels)
    type = serializers.CharField(source='get_type_display')


    class Meta:
        model = SocialNetwork
        fields = ['type', 'handle', 'url']


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
    socialnetworks = SocialNetworkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Contact
        fields = [
            'id',
            'formatted_name',
            'url',
            'addresses',
            'phonenumbers',
            'socialnetworks',
        ]
        depth = 3