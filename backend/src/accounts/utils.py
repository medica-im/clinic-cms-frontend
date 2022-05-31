from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email
from re import sub
import logging
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.authentication import JWTAuthentication

logger = logging.getLogger(__name__)

def validate_email(value: str) -> tuple[bool, str]:
    """Validate a single email."""
    message_invalid = 'Enter a valid email address.'

    if not value:
        return False, message_invalid
    # Check the regex, using the validate_email from django.
    try:
        django_validate_email(value)
    except ValidationError:
        return False, message_invalid
    return True, ''


class WJTMiddleware(object):

    def process_view(self, request, view_func, view_args, view_kwargs):
        jwtauth = JWTAuthentication()
        user, token = jwtauth.authenticate(request)
        logger.debug(f'{request.user=}')
        if user:
            request.user = user
        """
        header_token = request.META.get('HTTP_AUTHORIZATION', None)
        if header_token is not None:
          try:
            token = sub('Bearer ', '', request.META.get('HTTP_AUTHORIZATION', None))
            token_obj = Token.objects.get(key = token)
            request.user = token_obj.user
          except Token.DoesNotExist:
            pass
        """
        #This is now the correct user
        logger.debug(f'{request.user=}')