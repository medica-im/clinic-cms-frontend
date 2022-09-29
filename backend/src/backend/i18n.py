import logging
from django.contrib.sites.shortcuts import get_current_site
from facility.models import Organization
from django.utils.translation import activate, get_language
from django.conf import settings

logger = logging.getLogger(__name__)

def activate_locale(locale, request):
    logger.debug(f'current_language: {get_language()}')
    available_languages = [t[0] for t in settings.LANGUAGES]
    logger.debug(f'{available_languages=}')
    if locale and locale in available_languages:
        activate(locale)
        logger.debug(f'current_language: {get_language()}')
    else:
        site = get_current_site(request)
        try:
            org = Organization.objects.get(site=site)
            activate(org.language)
            logger.debug(f'current_language: {get_language()}')
        except Organization.DoesNotExist:
            return