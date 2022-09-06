from django.conf import settings
from django.core.files.storage import get_storage_class
from django.db import models
from django.db.models import Q
from django.utils.functional import LazyObject
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.functions import Length
from django.db.models import CharField

from easy_thumbnails.fields import (
    ThumbnailerImageField,
    ThumbnailerField,
)
from easy_thumbnails.widgets import ImageClearableFileInput
from django_countries.fields import CountryField
from taggit.managers import TaggableManager
from django.contrib.auth import get_user_model
from access.models import Role
from simple_history.models import HistoricalRecords

CharField.register_lookup(Length)

User = get_user_model()


class AvatarStorage(LazyObject):
    def _setup(self):
        AVATAR_FILE_STORAGE = getattr(
            settings,
            'AVATAR_FILE_STORAGE',
            settings.DEFAULT_FILE_STORAGE
        )
        self._wrapped = get_storage_class(AVATAR_FILE_STORAGE)()

avatar_storage = AvatarStorage()

social_net_prefixes = dict(
    Skype='skype:',
    Twitter='https://twitter.com/',
    LinkedIn='https://linkedin.com/',
    Facebook='https://www.facebook.com/',
    Pinterest='https://www.pinterest.com/',
)


class ContactGroup(models.Model):
    #user = models.ForeignKey(settings.AUTH_USER_MODEL)
    name = models.CharField(max_length=255, verbose_name='Group Name', unique=True)

    class Meta:
        ordering = ['name']
        #unique_together = ('user', 'name')

    def __str__(self):
        return self.name


class Contact(models.Model):
    formfield_overrides = {
        ThumbnailerField: {'widget': ImageClearableFileInput},
    }
    
    class PersonType(models.TextChoices):
        NATURAL = 'Natural', _('Natural person')
        LEGAL = 'Legal', _('Legal person')

    person_type = models.CharField(
        max_length=255,
        choices=PersonType.choices,
        default=PersonType.NATURAL,
    )
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    groups = models.ManyToManyField(ContactGroup)
    formatted_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    middle_name = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    organization = models.CharField(max_length=255, blank=True)
    url = models.URLField(blank=True)
    blurb = models.TextField(null=True, blank=True)
    profile_image = ThumbnailerImageField(
        upload_to="profile_images/",
        blank=True,
        null=True
    )
    qr_image = models.ImageField(upload_to="qr_images/", blank=True, null=True)
    twitter_handle = models.CharField(max_length=15, blank=True, null=True)
    worked_with = models.ManyToManyField('self', blank=True)
    tags = TaggableManager(blank=True,)

    class Meta:
        ordering = ['formatted_name', 'last_name', 'first_name']

    def __init__(self, *args, **kwargs):
        super(Contact, self).__init__(*args, **kwargs)
        self.profile_image.storage = avatar_storage
        self.profile_image.thumbnail_storage = avatar_storage

    def __str__(self):
        if self.formatted_name:
            return "%s %s" % (self.id, self.formatted_name)
        else:
            return "%s %s %s" % (self.id, self.first_name, self.last_name)


class Address(models.Model):

    class AddressType(models.TextChoices):
        HOME = 'Home', _('Home')
        WORK = 'Work', _('Work')

    contact = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="addresses",
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        help_text="Roles allowed so see the related object",
    )
    street = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = CountryField()
    zip = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=255, choices=AddressType.choices)
    public_visible = models.BooleanField(default=False)
    contact_visible = models.BooleanField(default=False)
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=7,
        null=True,
        blank=True,
    )
    longitude = models.DecimalField(
        max_digits=10,
        decimal_places=7,
        null=True,
        blank=True,
    )
    zoom = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(21)
        ]
    )

    def __str__(self):
        return '%s %s: %s %s, %s, %s' % (
            self.contact.first_name,
            self.contact.last_name,
            self.street,
            self.city,
            self.state,
            self.country
        )

    
    class Meta:
        verbose_name_plural = "Addresses"


class PhoneNumber(models.Model):
    
    class TelephoneType(models.TextChoices):
        MOBILE = 'M', _('Mobile')
        MOBILE_WORK = 'MW', _('Mobile Work')
        WORK = 'W', _('Work')
        FAX = 'F', _('Fax')
        SKYPE = 'S', _('Skype')
        ANSWERING_SERVICE = 'AS', _('Answering service')

    contact = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="phonenumbers"
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        help_text="Roles allowed so see the related object",
    )
    organization = models.ManyToManyField(
        "facility.Organization",
        blank=True
    )
    phone = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=TelephoneType.choices)
    public_visible = models.BooleanField(default=False)
    contact_visible = models.BooleanField(default=False)

    def __str__(self):
        return "%s %s: %s" % (
            self.contact.first_name,
            self.contact.last_name,
            self.phone
        )


class Email(models.Model):
    
    class EmailType(models.TextChoices):
        PERSONAL = 'P', _('Personal')
        WORK = 'W', _('Work')

    contact = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="emails",
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        help_text="Roles allowed so see the related object",
    )
    organization = models.ManyToManyField(
        "facility.Organization",
        blank=True
    )
    email = models.EmailField()
    type = models.CharField(max_length=255, choices=EmailType.choices)
    public_visible = models.BooleanField(default=False)
    contact_visible = models.BooleanField(default=False)

    def __str__(self):
        return "%s %s: %s" % (
            self.contact.first_name,
            self.contact.last_name,
            self.email
        )


class Website(models.Model):
    
    class WebsiteType(models.TextChoices):
        WORK = 'W', _('Work')
        PERSONAL = 'PE', _('Personal')
        PORTFOLIO = 'PO', _('Portfolio')
        BLOG = 'Blog', _('Blog')

    contact = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="websites",
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        help_text="Roles allowed so see the related object",
    )
    organization = models.ManyToManyField(
        "facility.Organization",
        blank=True
    )
    website = models.URLField(blank=True)
    type = models.CharField(max_length=255, choices=WebsiteType.choices)
    public_visible = models.BooleanField(default=False)
    contact_visible = models.BooleanField(default=False)

    def __str__(self):
        return "%s %s: %s" % (self.contact.first_name, self.type, self.website)


class SocialNetwork(models.Model):

    class SocialNetworkType(models.TextChoices):
        SKYPE = 'S', 'Skype'
        TWITTER = 'T', 'Twitter'
        LINKEDIN = 'LI', 'LinkedIn'
        FACEBOOK = 'F', 'Facebook'
        PINTEREST = 'P', 'Pinterest'
        INSTAGRAM = 'I', 'Instagram'
        YOUTUBE = 'YT', 'YouTube'
        TIKTOK = 'TT', 'TikTok'
        SNAPCHAT = 'SC', 'Snapchat'

    contact = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="socialnetworks",
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        help_text="Roles allowed so see the related object",
    )
    organization = models.ManyToManyField(
        "facility.Organization",
        blank=True
    )
    handle = models.CharField(max_length=255, blank=True)
    url = models.URLField(blank=True)
    type = models.CharField(max_length=255, choices=SocialNetworkType.choices)
    public_visible = models.BooleanField(default=False)
    contact_visible = models.BooleanField(default=False)

    @property
    def url(self):
        prefixes = social_net_prefixes
        prefix = getattr(settings, '%s_PREFIX' % self.type.upper(), prefixes[self.type])
        return '%s%s' % (prefix, self.handle)

    def __str__(self):
        return "%s %s: %s" % (self.contact.first_name, self.type, self.handle)


class Profile(models.Model):
    contact = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="profiles",
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        help_text="Roles allowed so see the related object",
    )
    organization = models.ManyToManyField(
        "facility.Organization",
        blank=True
    )
    text = models.TextField(
        blank=True    
    )
    changed_by = models.ForeignKey(
      settings.AUTH_USER_MODEL,
      on_delete=models.PROTECT
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value


    class Meta:
        models.UniqueConstraint(
            fields=['contact', 'organization'],
            name='unique_profile'
        )


class Appointment(models.Model):
    contact = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="appointments"
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        help_text="Roles allowed so see the related object",
    )
    organization = models.ManyToManyField(
        "facility.Organization",
        blank=True
    )
    url = models.URLField(blank=True)
    phone = models.CharField(max_length=255, blank=True)
    app = models.ForeignKey(
        'addressbook.App',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )


    class Meta:
        constraints = [
            models.CheckConstraint(
                check=(
                    Q(url__length__gt=0,phone__length__lte=0,app__isnull=True)
                    |
                    Q(url__length__lte=0,phone__length__gt=0,app__isnull=True)
                    |
                    Q(url__length__lte=0,phone__length__lte=0,app__isnull=False)
                ),
                name='one_and_only_one_field_not_null_among_url_phone_app'
            )
        ]

    def __str__(self):
        return "%s: %s" % (
            self.contact.formatted_name,
            self.phone or self.url or self.app.name
        )


class App(models.Model):
    name = models.CharField(
        max_length=255,
        blank=True,
        unique=True
    )
    label = models.CharField(
        max_length=255,
        blank=True
    )
    links = models.ManyToManyField(
        'addressbook.AppLink',
    )

    def __str__(self):
        return self.name


class AppLink(models.Model):
    url = models.URLField(blank=True)
    store = models.ForeignKey(
        'addressbook.AppStore',
        on_delete=models.CASCADE,
        related_name="links"
    )

    def __str__(self):
        return "%s %s" % (
            self.url,
            self.store.name,
        )


class AppStore(models.Model):
    name = models.CharField(max_length=255, unique=True)
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name