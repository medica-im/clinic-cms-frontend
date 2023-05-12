from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import GrammaticalGender
from django.core.exceptions import ValidationError
from django.db.models import UniqueConstraint
from workforce.models import NodeSet
from workforce.models.limit_choices import limit_to_users
from django.contrib.postgres.fields import ArrayField
from django.utils.translation import get_language

import langcodes
from langcodes import Language

import logging

logger = logging.getLogger(__name__)


class PaymentMethod(models.Model):
    name = models.CharField(
        max_length=255,  
        null=True,
        blank=True,
    )
    label = models.CharField(
        max_length=255,  
        null=True,
        blank=True,
    )
    definition = models.TextField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'PaymentMethod {self.name}'

    class Meta:
        constraints = [
            UniqueConstraint(
                name='unique_payment_name',
                fields=['name'],
            )
        ]
        verbose_name_plural = _("Payment methods")


class Payment(models.Model):
    method = models.ManyToManyField(
        "workforce.PaymentMethod",
    )
    node = models.ForeignKey(
        "workforce.NetworkNode",
        on_delete=models.CASCADE,
        limit_choices_to = limit_to_users,
    )
    organization = models.ForeignKey(
        "facility.Organization",
        models.PROTECT,
    )
    
    def __str__(self):
        return f'Payment {self.node} {self.organization}'

    class Meta:
        constraints = [
            UniqueConstraint(
                name='unique_payment_node_organization',
                fields=['node', 'organization'],
            )
        ]


class ThirdPartyPayer(models.Model):
    name = models.CharField(
        max_length=255,  
        null=True,
        blank=True,
    )
    label = models.CharField(
        max_length=255,  
        null=True,
        blank=True,
    )
    definition = models.TextField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'ThirdPartyPayer {self.name}'

    class Meta:
        constraints = [
            UniqueConstraint(
                name='unique_third_party_payer_name',
                fields=['name'],
            )
        ]
        verbose_name_plural = _("Third-party payers")


class ThirdPartyPayment(models.Model):
    node = models.ForeignKey(
        "workforce.NetworkNode",
        on_delete=models.CASCADE,
        limit_choices_to = limit_to_users,
    )
    organization = models.ForeignKey(
        "facility.Organization",
        models.PROTECT,
    )
    payer = models.ForeignKey(
        ThirdPartyPayer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    available = models.BooleanField(null=True)

    def __str__(self):
        return (
            f'ThirdPartyPayer {self.node} {self.organization} {self.payer} '
            f'{self.available}'
        )

    class Meta:
        constraints = [
            UniqueConstraint(
                name='unique_third_party_payment_node_organization_payer',
                fields=['node', 'organization', 'payer'],
            )
        ]
        verbose_name_plural = _("Third-party payments")
    
    
class SpokenLanguage(models.Model):
    tags = ArrayField(
            models.CharField(max_length=255, blank=True),
            help_text=_("Enter a language code or a natural language name.")
    )
    node = models.OneToOneField(
        "workforce.NetworkNode",
        on_delete=models.CASCADE,
        limit_choices_to = limit_to_users,
    )

    def display_name(self)->[str]:
        try:
            return [
                Language.make(language=t).display_name(get_language())
                for t in self.tags
            ]
        except:
            return

    def __str__(self):
        return (
            f'Spoken language{(lambda: "", lambda: "s")[len(self.tags) > 1]()} '
            f'{self.tags} {self.node}'
        )

    def save(self, *args, **kwargs):
        #remove duplicates
        self.tags = list(dict.fromkeys(self.tags))
        ok_tags = []
        for tag in self.tags:
            try:
                ok_tag = Language.get(tag).language
                ok_tags.append(ok_tag)
            except:
                ok_tag = langcodes.find(tag).language
                ok_tags.append(ok_tag)
        self.tags=ok_tags           
        super().save(*args, **kwargs)
    