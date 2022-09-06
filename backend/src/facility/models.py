from datetime import timedelta
from django.db import models
from django.contrib.sites.models import Site
from addressbook.models import Contact
import logging
from django.conf import settings
#import reversion
from django.core.exceptions import ValidationError

from django.utils.translation import gettext_lazy as _

logger = logging.getLogger(__name__)


class OrganizationManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class Organization(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True
    )
    formatted_name = models.CharField(
        max_length=255,
        unique=True
    )
    website_title = models.CharField(
        max_length=255
    )
    active = models.BooleanField(default=False)
    contact = models.OneToOneField(
        'addressbook.Contact',
        on_delete=models.CASCADE,
        related_name='organisation',
        null=True,
        blank=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    site = models.OneToOneField(
        Site,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="organization",
    )
    language = models.CharField(
        max_length=3,
        blank=True,
        help_text="ISO language code",
    )
    category = models.ForeignKey(
        'facility.Category',
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="organization",
    )
    node = models.ForeignKey(
        "workforce.NetworkNode",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    objects = OrganizationManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Organizations"


    def natural_key(self):
        return (self.name,)


class CategoryManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class Category(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True
    )
    formatted_name = models.CharField(
        max_length=255,
        unique=True
    )
    definition = models.TextField()

    objects = CategoryManager()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

    def natural_key(self):
        return (self.name,)


class FacilityManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)
 
    
class Facility(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True
    )
    active = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    contact = models.OneToOneField(
        'addressbook.Contact',
        on_delete=models.CASCADE,
        related_name='facility',
        null=True,
        blank=True,
    )
    node = models.ForeignKey(
        "workforce.NetworkNode",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    organization = models.ForeignKey(
        'facility.Organization',
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="facility",
    )

    objects = FacilityManager()

    def __str__(self):
        return self.name


    class Meta:
        verbose_name_plural = "Facilities"


    def natural_key(self):
        return (self.name,)