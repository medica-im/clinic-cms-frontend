import uuid
from typing import Any, Optional

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.translation import gettext_lazy as _
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    """UserManager class."""

    def create_user(self, username: str, email: str, password: Optional[str] = None) -> 'User':
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username: str, email: str, password: str) -> 'User':  # type: ignore
        """Create and return a `User` with superuser (admin) permissions."""
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(
        db_index=True,
        max_length=255,
        unique=True,
        null=True,
        blank=True,
    )
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bio = models.TextField(null=True, blank=True)
    full_name = models.CharField(max_length=20000, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    grammatical_gender = models.ForeignKey(
        'accounts.GrammaticalGender',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    node = models.OneToOneField(
        "workforce.NetworkNode",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self) -> str:
        """Return a string representation of this `User`."""
        #string = self.email if self.email != '' else self.get_full_name()
        try:
            formatted_name = self.contact.formatted_name
        except:
            formatted_name = ""
        return f'{formatted_name} {self.username or ""} {self.email or ""}'

    @property
    def tokens(self) -> dict[str, str]:
        """Allow us to get a user's token by calling `user.token`."""
        refresh = RefreshToken.for_user(self)
        return {'refresh': str(refresh), 'access': str(refresh.access_token)}

    def get_full_name(self) -> Optional[str]:
        """Return the full name of the user."""
        return self.full_name

    def get_short_name(self) -> str:
        """Return user username."""
        return self.username


class GrammaticalGender(models.Model):
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    code = models.CharField(max_length=1)

    def __str__(self) -> str:
        return self.label