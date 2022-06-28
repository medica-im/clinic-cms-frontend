import logging
from django.contrib.sites.shortcuts import get_current_site
from facility.models import Facility
from django.utils.translation import activate

logger = logging.getLogger(__name__)

def get_facility(request):
    site = get_current_site(request)
    logger.debug(f'{site=}')
    try:
        facility = Facility.objects.get(site=site)
        activate(facility.language)
        logger.debug(f'{facility=}')
        return facility
    except Facility.DoesNotExist:
        return