from django.db import models
from django.core.validators import MaxValueValidator

class Endpoint(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return "%s %s" % (self.id, self.name)


class Role(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return "%s %s" % (self.id, self.name)


class AccessControl(models.Model):
    endpoint = models.ForeignKey(
        "access.Endpoint",
        on_delete=models.CASCADE,
    )
    role = models.ForeignKey(
        "access.Role",
        on_delete=models.CASCADE,
    )
    permissions = models.PositiveSmallIntegerField(
        validators=[MaxValueValidator(15)]
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['endpoint', 'role'],
                name='unique_accesscontrol_endpoint_role'
            )
        ]

    def __str__(self):
        return (
            "%s %s %s %s" %
            (self.id, self.endpoint.name, self.role.name, self.permissions)
        )

    def check_permission(self, permissions: int):
        if not 0 <= permissions < 16:
            return False
        return (permissions & self.permissions) > 0