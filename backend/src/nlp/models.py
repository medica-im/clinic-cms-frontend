from django.db import models
from django_postgresql_dag.models import node_factory, edge_factory
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from accounts.models import GrammaticalGender
import logging

logger = logging.getLogger(__name__)

class City(models.Model):


    class GrammaticalNumber(models.TextChoices):
        SINGULAR = 'S', _('Singular')
        PLURAL = 'P', _('Plural')


    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    to_label = models.CharField(max_length=255)
    from_label = models.CharField(max_length=255)
    gender = models.ForeignKey(
        'accounts.GrammaticalGender',
        on_delete=models.PROTECT
    )
    grammatical_number = models.CharField(
        max_length=1,
        choices=GrammaticalNumber.choices,
        blank=True,
    )

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "cities"
        
    def natural_key(self):
        return (self.name,)
