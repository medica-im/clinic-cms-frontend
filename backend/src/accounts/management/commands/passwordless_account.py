from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)

def validateEmail( email ):
    from django.core.validators import validate_email
    from django.core.exceptions import ValidationError
    try:
        validate_email( email )
        return True
    except ValidationError:
        return False


class Command(BaseCommand):
    help = 'Create a passwordless account using email'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str)

    def handle(self, *args, **options):
        email: str = options['email']
        if not email:
            raise CommandError('You must provide an email.')
            return
        if not validateEmail(email):
            raise CommandError('Email "%s" is not valid' % email)
            return
        User = get_user_model()
        try:
            user = User.objects.create(email=email)
            self.stdout.write(
                self.style.SUCCESS(
                    'Passwordless user %s successfully created' % user
                )
            )
        except Exception as e:
            raise CommandError('User creation failed. %s' % e)