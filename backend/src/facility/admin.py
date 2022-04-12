from django.contrib import admin

from .models import Facility, Category

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'formatted_name',
        'website_title',
        'active',
        'created',
        'updated',
        'site',
        'language',
        'category',
    )
    list_filter = (
        'active',
        'category',
        'language',
    )
    search_fields = ['name', 'formatted_name',]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'formatted_name',
        'definition',
    )
    search_fields = ['name', 'formatted_name',]