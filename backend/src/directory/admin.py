import logging
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from facility.models import Facility
from .models import (
    Slug,
    RejectSlug
)
from modeltranslation.admin import TranslationAdmin
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils.translation import get_language
from accounts.models import GrammaticalGender

logger = logging.getLogger(__name__)

@admin.register(Slug)
class SlugAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'slug',
        'site',
        'user',    
    )
    list_filter = (
        'site',
    )
    autocomplete_fields = [
        'user',
        'site',
    ]


@admin.register(RejectSlug)
class RejectSlugAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'slug',    
    )
    search_fields = ['slug']
