from django.contrib import admin

from .models import Organization, Category, Facility
from modeltranslation.admin import TranslationAdmin

@admin.register(Organization)
class OrganizationAdmin(TranslationAdmin):
    list_display = (
        'name',
        'company_name',
        'formatted_name',
        'formatted_name_definite_article',
        'website_title',
        'active',
        'created',
        'updated',
        'site',
        'language',
        'category',
        'city',
    )
    list_filter = (
        'active',
        'category',
        'language',
        'city',
    )
    search_fields = ['name', 'formatted_name', 'city', 'company_name']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'formatted_name',
        'definition',
        'slug',
    )
    search_fields = ['name', 'formatted_name',]


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'contact',
        'active',
        'created',
        'updated',
        'node',
    )
    list_filter = (
        'active',
        'organization',
    )
    search_fields = ['name', 'contact__formatted_name',]