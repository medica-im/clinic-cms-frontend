import logging
from workforce import models
from directory.models import Slug
from rest_framework import serializers
from facility.utils import get_organization
from workforce.utils import occupation
from django.contrib.sites.shortcuts import get_current_site
from access.utils import get_role, get_roles, authorize
from access.models import Endpoint, AccessControl
from addressbook.models import (
    PhoneNumber,
    Profile,
    Appointment,
    SocialNetwork
)
from addressbook.api.serializers import (
    AppSerializer,
    SocialNetworkSerializer,
    PhoneNumberSerializer,
)
from accounts.serializers import GrammaticalGenderSerializer

logger = logging.getLogger(__name__)

class WorkforceOccupationSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()


    class Meta:
        model = models.NetworkNode
        fields = (
            'name',
            'slug',
        )
        depth=1
        
    def get_name(self, obj):
        return obj.name
    
    def get_slug(self, obj):
        try:
            logger.debug(f"{obj.slug}")
            return obj.slug.slug
        except models.WorkforceSlug.DoesNotExist:
                return


class RPPSSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.RPPS
        fields = (
            'identifier',
        )
        depth=1


class ConventionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Convention
        fields = (
            'name',
            'label',
            'definition',
        )


class PaymentMethodSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.PaymentMethod
        fields = (
            'name',
            'label',
            'definition',
        )


class ThirdPartyPayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ThirdPartyPayer
        fields = (
            'name',
            'label',
            'definition',
        )


class WorkforceUserSerializer(serializers.ModelSerializer):

    organization = serializers.SerializerMethodField()
    occupations = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    formatted_name = serializers.SerializerMethodField()
    grammatical_gender = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    profile_picture_url = serializers.SerializerMethodField()
    account_email = serializers.SerializerMethodField()
    emails =serializers.SerializerMethodField()
    phone_numbers = serializers.SerializerMethodField()
    websites = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    appointments = serializers.SerializerMethodField()
    socialnetworks = serializers.SerializerMethodField()
    rpps = serializers.CharField(
        source='rpps.identifier'
    )
    carte_vitale = serializers.SerializerMethodField()
    conventionnement = serializers.SerializerMethodField()
    payment = serializers.SerializerMethodField()
    third_party_payer = serializers.SerializerMethodField()
    languages = serializers.ListField(
        child=serializers.CharField(),
        source='spokenlanguage.display_name'
    )


    class Meta:
        model = models.NetworkNode
        fields = (
            'id',
            'rpps',
            'node_set',
            'organization',
            'occupations',
            'title',
            'formatted_name',
            'grammatical_gender',
            'slug',
            'profile_picture_url',
            'account_email',
            'emails',
            'phone_numbers',
            'websites',
            'profile',
            'appointments',
            'socialnetworks',
            'carte_vitale',
            'conventionnement',
            'payment',
            'third_party_payer',
            'languages',
        )
        depth=2

    def get_organization(self, obj):
        organization = get_organization(self.context["request"])
        return organization.name

    def get_occupations(self, obj):
        organization = get_organization(self.context["request"])
        return occupation(obj, organization)

    def get_title(self, obj):
        try:
            return obj.user.contact.title
        except:
            return

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
        role = get_role(request)
        if authorize("account_email", role, 1):
            return obj.user.email

    def get_phone_numbers(self, obj):
        role = get_role(self.context["request"])
        phones = obj.user.contact.phonenumbers.filter(roles__in=[role]).distinct()
        return PhoneNumberSerializer(phones, many=True).data

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
                "website": website.website,
            }
            if website.roles.all():
                if role in website.roles.all():
                    websites.append(w)
                continue
            if authorize("website", role, 1):
                websites.append(w)
        return websites

    def get_emails(self, obj):
        role = get_role(self.context["request"])
        organization = get_organization(self.context["request"])
        emails = []
        for email in obj.user.contact.emails.all():
            if organization not in email.organization.all():
                continue
            _dict = {
                "type": email.type,
                "display": email.get_type_display(),
                "email": email.email,
            }
            logger.debug(_dict);
            if email.roles.all():
                if role in email.roles.all():
                    emails.append(_dict)
                continue
            if authorize(f"email_{email.type}", role, 1):
                emails.append(_dict)
        return emails

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
                a = self.create_appointment(self, id=appointment.id)
                appointments.append(a)
        return appointments

    def get_socialnetworks(self, obj):
        roles = get_roles(self.context["request"])
        queryset = SocialNetwork.objects.filter(
            contact=obj.user.contact,
            roles__in=roles
        ).distinct()
        return SocialNetworkSerializer(queryset, many=True).data
 
    def get_carte_vitale(self,obj):
        organization = get_organization(self.context["request"])
        try:
            logger.debug(obj.carte_vitale.all())
        except:
            pass
        try:
            return (obj.carte_vitale.filter(organization=organization)[0]
                    .is_accepted)
        except:
            return
        
    def get_conventionnement(self,obj):
        organization = get_organization(self.context["request"])
        try:
            convention = (
                obj.conventionnement_set
                .filter(organization=organization)[0]
                .convention
            )
        except:
            return
        serializer = ConventionSerializer(convention)
        return serializer.data
    
    def get_payment(self,obj):
        organization = get_organization(self.context["request"])
        try:
            logger.debug(obj.payment_set.all())
        except:
            pass
        try:
            payment = (
                obj.payment_set
                .filter(organization=organization)[0]
                .method.all()
            )
            logger.debug(payment)
        except:
            return
        serializer = PaymentMethodSerializer(payment, many=True)
        return serializer.data


    def get_third_party_payer(self,obj):
        organization = get_organization(self.context["request"])
        try:
            logger.debug(obj.thirdpartypayment_set.all())
        except:
            pass
        try:
            third_party_payments = (obj.thirdpartypayment_set
                .filter(organization=organization, available=True)
            )
            logger.debug(f'third_party_payments=')
        except:
            return
        third_party_payers = [tpp.payer for tpp in third_party_payments]
        serializer = ThirdPartyPayerSerializer(third_party_payers, many=True)
        return serializer.data