from django.db import models


class WorkforceBase(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True
    )
    label = models.CharField(
        max_length=36,
        unique=True,
    )
    description = models.CharField(
        max_length=72,
        blank=True,
        null=True
    )


    class Meta:
        abstract = True


class CategoryManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class HealthPersonnel(WorkforceBase):
    mesh = models.ForeignKey(
        'mesh.Mesh',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="Category as a MeSH heading",
        related_name="category"
    ) 