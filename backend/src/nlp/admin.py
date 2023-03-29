import logging
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from facility.models import Organization, Facility
from .models import (
    City
)
from modeltranslation.admin import TranslationAdmin
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils.translation import get_language
from accounts.models import GrammaticalGender

logger = logging.getLogger(__name__)

@admin.register(City)
class CityAdmin(TranslationAdmin):
    list_display = (
        'name',
        'label',
        'from_label',
        'to_label',
        'gender',
        'grammatical_number',
    )