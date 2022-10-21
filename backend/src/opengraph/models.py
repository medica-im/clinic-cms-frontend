from django.db import models
from django.contrib.sites.models import Site
from django.core.exceptions import ValidationError
from  django.core.validators import MaxLengthValidator
from django.utils.translation import gettext_lazy as _

def validate_twitter_username(value):
    if value[0] != '@':
        raise ValidationError(
            _("%(value)s does not start with '@'"),
            params={'value': value},
        )


class TwitterCard(models.Model):
    title = models.CharField(
        max_length=70
    )
    twitter_description = models.TextField(
        max_length=200,
        validators=[MaxLengthValidator(200, message="200 characters max!")],
        blank=True,
    )
    description = models.TextField(
        max_length=160,
        validators=[MaxLengthValidator(160, message="160 characters max!")],
        blank=True,
    )
    username = models.CharField(
        max_length=16,
        validators=[validate_twitter_username],
        help_text="twitter:site @username the card should be attributed to."    
    )
    image_alt = models.TextField(
        max_length=420,
        blank=True,
        validators=[MaxLengthValidator(420, message="420 characters max!")],
    )
    image = models.ImageField(
        upload_to="opengraph/",
        blank=True,
        null=True,
        help_text="1.91:1 1200px X 628px max 5MB"
    )
    site = models.OneToOneField(
        Site,
        on_delete=models.CASCADE,
        verbose_name="site",
    )

    def __str__(self):
        return "%s %s" % (self.site, self.title)