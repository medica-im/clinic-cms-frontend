from django.contrib import admin

from access.models import AccessControl, Endpoint, Role

@admin.register(Endpoint)
class EndpointAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',    
    ]
    search_fields = ["name"]
    
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',    
    ]

@admin.register(AccessControl)
class AccessControlAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'endpoint',
        'role',
        'permissions',
    ]
    autocomplete_fields = [
        'endpoint'
    ]