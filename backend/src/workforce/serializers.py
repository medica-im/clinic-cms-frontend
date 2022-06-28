import logging
from . import models
from directory.models import Slug
from rest_framework import serializers
from facility.utils import get_facility
from workforce.utils import occupation
from django.contrib.sites.shortcuts import get_current_site
from access.utils import get_role, authorize

logger = logging.getLogger(__name__)


class WorkforceSerializer(serializers.ModelSerializer):

    facility = serializers.SerializerMethodField()
    occupations = serializers.SerializerMethodField()
    formatted_name = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    profile_picture_url = serializers.SerializerMethodField()
    account_email = serializers.SerializerMethodField()


    class Meta:
        model = models.NetworkNode
        fields = (
            'id',
            'node_set',
            'facility',
            'occupations',
            'formatted_name',
            'slug',
            'profile_picture_url',
            'account_email',
        )
        depth=1

    def get_facility(self, obj):
        facility = get_facility(self.context["request"])
        return facility.name

    def get_occupations(self, obj):
        facility = get_facility(self.context["request"])
        return occupation(obj, facility)

    def get_formatted_name(self, obj):
        try:
            return obj.user.contact.formatted_name
        except:
            return

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
            return obj.user.contact.profile_image["avatar"].url
        except:
            return

    def get_account_email(self, obj):
        request = self.context["request"]
        logger.debug(f'{request}')
        logger.debug(f'{request.__dict__}')
        user = request.user
        logger.debug(f'{user=}')
        role = get_role(user, request)
        logger.debug(f'{role=}')
        if authorize("account_email", role, 1):
            return obj.user.email