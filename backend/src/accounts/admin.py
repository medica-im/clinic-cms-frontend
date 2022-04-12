from django.contrib import admin
from django import forms
from django.contrib.auth import authenticate, get_user_model, password_validation
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
    

from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            'email',
            'username',
        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = (
            'email',
            'username',
        )


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = (
        'email',
        'username',
        'is_staff',
        'is_active',
    )
    list_filter = (
        'email',
        'username',
        'is_staff',
        'is_active',
    )
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'email',
                    'username',
                    'password',
                    'bio',
                    'full_name',
                    'birth_date',
                )
            },
        ),
        (
            'Permissions',
            {
                'fields': (
                    'is_staff',
                    'is_active',
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {'classes': ('wide',), 'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')},
        ),
    )
    search_fields = (
        'email',
        'username',
    )
    ordering = (
        'email',
        'username',
    )


admin.site.unregister(OutstandingToken)

@admin.register(OutstandingToken)
class OutstandingTokenAdmin(OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want


