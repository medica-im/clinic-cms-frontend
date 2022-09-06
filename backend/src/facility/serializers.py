from facility.models import Organization, Category
from addressbook.models import Contact
from rest_framework import serializers

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'formatted_name', 'url', 'addresses', 'phonenumbers',]
        depth = 1


class OrganizationSerializer(serializers.ModelSerializer):
    contact = ContactSerializer(many=False, read_only=True)

    class Meta:
        model = Organization
        fields = [
            'id',
            'name',
            'language',
            'formatted_name',
            'website_title',
            'category',
            'contact'
        ]
        depth = 3

        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'formatted_name', 'definition']