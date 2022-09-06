from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from access.models import AccessControl, Endpoint, Role

@admin.register(Endpoint)
class EndpointAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',    
    ]
    search_fields = ["name"]
    
@admin.register(Role)
class RoleAdmin(TranslationAdmin):
    list_display = [
        'id',
        'name',
        'label',
        'description', 
    ]

@admin.register(AccessControl)
class AccessControlAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'endpoint',
        'role',
        'permissions',
    ]
    list_filter = (
        'endpoint',
    )
    autocomplete_fields = [
        'endpoint'
    ]