from facility.models import Facility, Category
from addressbook.models import Contact
from rest_framework import serializers

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['formatted_name', 'url', 'address_set']
        depth = 1


class FacilitySerializer(serializers.ModelSerializer):
    contact = ContactSerializer(many=False, read_only=True)

    class Meta:
        model = Facility
        fields = [
            'name',
            'formatted_name',
            'website_title',
            'category',
            'contact'
        ]
        depth = 3

        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'formatted_name', 'definition']


