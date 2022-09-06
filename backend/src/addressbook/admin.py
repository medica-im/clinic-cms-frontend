from django.contrib import admin
from django import forms
from taggit_labels.widgets import LabelWidget
from taggit.forms import TagField
from addressbook.models import *
from facility.models import Organization, Facility
from django.utils.translation import gettext_lazy as _
from django.utils.safestring import mark_safe
from simple_history.admin import SimpleHistoryAdmin
from django.db.models import F
from django.contrib.postgres.search import SearchVector, SearchQuery
from constance import config


class ContactOrganizationFilter(admin.SimpleListFilter):
    title = 'Organization'
    parameter_name = 'organization'

    def lookups(self, request, model_admin):
        lookups = list(
            Organization.objects.values_list('id', 'formatted_name')
        )
        lookups.append((0, _('None')))
        return lookups
        
    def queryset(self, request, queryset):
        if not self.value():
            return queryset
        if self.value() == '0':
            org = None
        else:
            org = Organization.objects.get(id=int(self.value()))
        return queryset.filter(organisation=org)
    
    
class ContactFacilityFilter(admin.SimpleListFilter):
    title = 'Facility'
    parameter_name = 'facility'

    def lookups(self, request, model_admin):
        lookups = list(
            Facility.objects.values_list('id', 'contact__formatted_name')
        )
        lookups.append((0, _('None')))
        return lookups
        
    def queryset(self, request, queryset):
        if not self.value():
            return queryset
        if self.value() == '0':
            facility = None
        else:
            facility = Facility.objects.get(id=int(self.value()))
        return queryset.filter(facility=facility)


class SocialInline(admin.TabularInline):
    model = SocialNetwork
    extra = 0

class WebsiteInline(admin.TabularInline):
    model = Website
    extra = 0

class PhoneInline(admin.TabularInline):
    model = PhoneNumber
    extra = 0

class EmailInline(admin.TabularInline):
    model = Email
    extra = 0

class AddressInline(admin.StackedInline):
    model = Address
    extra = 0
    
class AppointmentInline(admin.TabularInline):
    model = Appointment
    extra = 0



#class ContactForm(forms.ModelForm):
#    tags = TagField(required=False, widget=LabelWidget)

class ContactAdmin(admin.ModelAdmin):
    #form = ContactForm
    list_display = (
        'profile_image_tag',
        'formatted_name',
        'type_tag',
        'user',
        'last_name',
        'first_name',
        #'middle_name',
        'title',
        'organization',
        'phone_tag',
        'email_tag',
    )
    search_fields = ['formatted_name']
    readonly_fields = ('profile_image_tag',)
    autocomplete_fields = ['user']
    inlines = [
        AddressInline,
        EmailInline,
        PhoneInline,
        SocialInline,
        WebsiteInline,
        AppointmentInline,
    ]
    list_filter = [
        ContactOrganizationFilter,
        ContactFacilityFilter,
    ]

    @admin.display(description='Phones')
    def phone_tag(self, obj):
        return [phone.phone for phone in obj.phonenumbers.all()]

    @admin.display(description='Emails')
    def email_tag(self, obj):
        return [email.email for email in obj.emails.all()]

    @admin.display(description='Profile img')
    def profile_image_tag(self, obj):
        if obj.profile_image:
            return mark_safe('<img src="/media/%s" alt="profile picture" width="42" height="42">' % (obj.profile_image))

    @admin.display(description='Type')
    def type_tag(self, obj):
        if obj.user:
            return _("Django User")
        elif obj.organization:
            return _("Organization")
        elif obj.facility:
            return _("Facility")

    def get_search_results(self, request, queryset, search_term):
        queryset, may_have_duplicates = super().get_search_results(
            request, queryset, search_term,
        )
        _config = config.ADMIN_SEARCH_CONFIG
        queryset |= self.model.objects.annotate(
            search=SearchVector('formatted_name', config=_config) \
            + SearchVector('last_name', config=_config) \
            + SearchVector('first_name', config=_config) \
            + SearchVector('middle_name', config=_config),
            ).filter(search=SearchQuery(search_term, config=_config))
        return queryset, True


@admin.register(App)
class AppAdmin(admin.ModelAdmin):
    pass


@admin.register(AppLink)
class AppLinkAdmin(admin.ModelAdmin):
    pass


@admin.register(AppStore)
class AppStoreAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    autocomplete_fields = ['contact']
    
    
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    autocomplete_fields = ['contact']


admin.site.register(Contact, ContactAdmin)

admin.site.register(ContactGroup, admin.ModelAdmin)
admin.site.register(PhoneNumber, admin.ModelAdmin)
admin.site.register(Website, admin.ModelAdmin)
admin.site.register(SocialNetwork, admin.ModelAdmin)
admin.site.register(Email, admin.ModelAdmin)
admin.site.register(Profile, SimpleHistoryAdmin)