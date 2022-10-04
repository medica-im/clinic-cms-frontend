import logging
from . import models
from directory.models import Slug
from rest_framework import serializers
from facility.utils import get_organization
from workforce.utils import occupation
from django.contrib.sites.shortcuts import get_current_site
from access.utils import get_role, authorize
from access.models import Endpoint, AccessControl
from addressbook.models import PhoneNumber, Profile, Appointment
from addressbook.api.serializers import AppSerializer
from accounts.serializers import GrammaticalGenderSerializer

logger = logging.getLogger(__name__)


class WorkforceSerializer(serializers.ModelSerializer):

    organization = serializers.SerializerMethodField()
    occupations = serializers.SerializerMethodField()
    formatted_name = serializers.SerializerMethodField()
    grammatical_gender = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    profile_picture_url = serializers.SerializerMethodField()
    account_email = serializers.SerializerMethodField()
    phone_numbers = serializers.SerializerMethodField()
    websites = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    appointments = serializers.SerializerMethodField()


    class Meta:
        model = models.NetworkNode
        fields = (
            'id',
            'node_set',
            'organization',
            'occupations',
            'formatted_name',
            'grammatical_gender',
            'slug',
            'profile_picture_url',
            'account_email',
            'phone_numbers',
            'websites',
            'profile',
            'appointments',
        )
        depth=1

    def get_organization(self, obj):
        organization = get_organization(self.context["request"])
        return organization.name

    def get_occupations(self, obj):
        organization = get_organization(self.context["request"])
        return occupation(obj, organization)

    def get_formatted_name(self, obj):
        try:
            return obj.user.contact.formatted_name
        except:
            return

    def get_grammatical_gender(self, obj):
        serializer = GrammaticalGenderSerializer(obj.user.grammatical_gender)
        return serializer.data

    def get_slug(self, obj):
        site = get_current_site(self.context["request"])
        try:
            return Slug.objects.get(
                user=obj.user,
                site=site,
            ).slug
        except Slug.DoesNotExist:
            return

    def get_profile_picture_url(self, obj):
        try:
            fb = obj.user.contact.profile_image["avatar_facebook"].url
            logger.debug(f'{fb=}')
        except:
            fb = None
        try:
            lt = obj.user.contact.profile_image["avatar_linkedin_twitter"].url
            logger.debug(f'{lt=}')
        except:
            lt = None
        return {
            "fb": fb,
            "lt": lt
        }

    def get_account_email(self, obj):
        request = self.context["request"]
        logger.debug(f'{request}')
        logger.debug(f'{request.__dict__}')
        role = get_role(request)
        logger.debug(f'{role=}')
        if authorize("account_email", role, 1):
            return obj.user.email
        
    def get_phone_numbers(self, obj):
        role = get_role(self.context["request"])
        logger.debug(f'{role=}')
        phones = {}
        if authorize("phone_mobile", role, 1):
            phones["mobile"]=obj.user.contact.phonenumbers.filter(type="M").values_list("phone", flat=True)
        if authorize("phone_mobile_work", role, 1):
            phones["mobile_work"]=obj.user.contact.phonenumbers.filter(type="MW").values_list("phone", flat=True)
        if authorize("phone_work", role, 1):
            phones["work"]=obj.user.contact.phonenumbers.filter(type="W").values_list("phone", flat=True)
        if authorize("phone_fax", role, 1):
            phones["fax"]=obj.user.contact.phonenumbers.filter(type="F").values_list("phone", flat=True)
        return phones

    def get_websites(self, obj):
        role = get_role(self.context["request"])
        logger.debug(f'{role=}')
        organization = get_organization(self.context["request"])
        websites = []
        for website in obj.user.contact.websites.all():
            if organization not in website.organization.all():
                continue
            w = {
                "type": website.type,
                "url": website.website,
            }
            if website.roles.all():
                if role in website.roles.all():
                    websites.append(w)
                continue
            if authorize("website", role, 1):
                websites.append(w)
        return websites

    def get_profile(self, obj):
        role = get_role(self.context["request"])
        logger.debug(f'{role=}')
        organization = get_organization(self.context["request"])
        endpoint, _ = Endpoint.objects.get_or_create(name="profile")
        try:
            permissions = (
                AccessControl.objects.get(endpoint=endpoint,role=role)
                .permissions
            )
        except AccessControl.DoesNotExist:
            permissions = 0
        # if the resource belongs to the user, return highest permission
        if self.context["request"].user == obj.user:
            permissions = 15
        try:
            return (
                {
                    "text": obj.user.contact.profiles \
                    .get(roles=role,organization=organization).text,
                    "permissions": permissions
                }
            )
        except Profile.DoesNotExist as e:
            logger.debug(f'{e}')
            return (
                {
                    "text": None,
                    "permissions": permissions
                }
            )

    def create_appointment(self, pk):
        appointment = Appointment.objects.get(id=pk)
        if appointment.url:
            a = {
                "type": "url",
                "url": appointment.url
            }
        elif appointment.phone:
            a = {
                "type": "phone",
                "phone": appointment.phone
            }    
        else:
            serializer = AppSerializer(appointment.app)
            a = {
                "type": "app",
                "app": serializer.data
            }
        return a

    def get_appointments(self, obj):
        role = get_role(self.context["request"])
        logger.debug(f'{role=}')
        organization = get_organization(self.context["request"])
        appointments = []
        for appointment in obj.user.contact.appointments.all():
            if organization not in appointment.organization.all():
                continue

            if appointment.roles.all():
                if role in appointment.roles.all():
                    a = self.create_appointment(pk=appointment.id)
                    appointments.append(a)
                continue
            if authorize("appointment", role, 1):
                a = create_appointment(self, id=appointment.id)
                appointments.append(a)
        return appointments