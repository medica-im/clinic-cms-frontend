from django.contrib.sites.shortcuts import get_current_site
from facility.models import Facility

def get_facility(request):
    site = get_current_site(request)
    try:
        return Facility.objects.get(site=site)
    except Facility.DoesNotExist:
        return