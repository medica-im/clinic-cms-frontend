import logging
from django.contrib.sites.shortcuts import get_current_site
from facility.models import Organization
from django.utils.translation import activate

logger = logging.getLogger(__name__)

def get_organization(request):
    site = get_current_site(request)
    try:
        org = Organization.objects.get(site=site)
        return org
    except Organization.DoesNotExist:
        return