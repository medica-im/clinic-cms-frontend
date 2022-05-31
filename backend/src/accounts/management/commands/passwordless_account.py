from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from workforce.models import NetworkNode, NodeSet
from facility.models import Facility
from django.db import DatabaseError, IntegrityError

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
        parser.add_argument('--occupation', type=str, nargs='*')
        parser.add_argument('--facility', type=str)        

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
            user, created = User.objects.get_or_create(email=email)
            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        'Passwordless Django user %s successfully created' % user
                    )
                )
        except Exception as e:
            raise CommandError('User creation failed. %s' % e)
            return
        try:
            user_node_set = NodeSet.objects.get(name='user')
        except NodeSet.DoesNotExist:
            raise CommandError("NodeSet object named 'user' does no exist.")
            return
        try:
            user_node, created = NetworkNode.objects.get_or_create(
                name=email,
                node_set=user_node_set
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f'User node {user_node} successfully created'
                    )
                )
        except DatabaseError as e:
            raise CommandError(f"{e}")
            return
        user.node = user_node
        user.save()
        try:
            facility = Facility.objects.get(name=options['facility'])
        except Facility.DoesNotExist:
            facility = None
        occupations = options['occupation']
        try:
            for occupation in occupations:
                occupation_node = NetworkNode.objects.get(name=occupation)
                try:
                    user_node.add_parent(occupation_node)
                except IntegrityError as e:
                    self.stdout.write(
                        self.style.WARNING(
                        f'Edge between {user_node} and {occupation_node}'
                        f'already exists: \n{e}'
                    )
                )
                edges = user_node.ancestors_edges()
                for edge in edges:
                    if edge.child_id == user_node.id:
                        edge.facilities.add(facility)
        except TypeError:
            return
        parents_qs = user_node.parents.all()
        node_parents: str = ""
        for parent in parents_qs:
            node_parents+=(
                f'{parent.name} '
                f'({parent.descendants_edges().first().facilities.all()}) \n'
            )
        self.stdout.write(
            self.style.SUCCESS(
                f'{parents_qs.count()} node parents successfully created: \n'
                f'{node_parents}'
            )
        )