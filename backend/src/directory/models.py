from django.db import models
from django.contrib.sites.models import Site
from django.conf import settings
from the_big_username_blacklist import validate
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_slug(value):
    if not validate(value):
        raise ValidationError(
            _('%(value)s is not allowed'),
            params={'value': value},
        )


class Slug(models.Model):
    slug = models.SlugField(
        db_index=True,
        validators=[validate_slug]    
    )
    site = models.ForeignKey(
        Site,
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return "Slug %s %s %s" % (self.id, self.slug, self.site.domain)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['slug', 'site'],
                name='unique_directory_slug_per_site'
            ),
            models.UniqueConstraint(
                fields=['slug', 'site', 'user'],
                name='unique_directory_slug_per_site_per_user'
            )
        ]


class RejectSlug(models.Model):
    """ slugs that must not be allowed
    In addition to the_big_username_blacklist, we must reject these slugs
    which are used for routes in the SvelteKit frontend
    """
    slug = models.SlugField(
        db_index=True,
        unique=True,    
    )

    def __str__(self):
        return "RejectSlug %s %s" % (self.id, self.slug)