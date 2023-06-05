from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from workforce.models import NetworkNode, NodeSet
from facility.models import Organization, Facility
from django.db import DatabaseError, IntegrityError
from django.contrib.sites.models import Site
from directory.models import Slug
from addressbook.models import Contact
from accounts.models import GrammaticalGender
from access.models import Role

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

def add_roles(edge, role):
    role_keys = [
        'superuser',
        'administrator',
        'staff',
        'registered',
        'anonymous',
    ]
    role_dict = {}
    for k in role_keys:
        try:
            role_dict[k]= Role.objects.get(name=k)
        except Role.DoesNotExist as e:
            raise CommandError(f'Role {k} does not exist. {e}')
            return
    idx = role_keys.index(role)

    while idx>=0:
        for obj in edge.networkedge_organizations.all():
            obj.roles.add(role_dict[role_keys[idx]])
        idx-=1
    log = [
        f'Roles {obj.roles.all()} added to {obj}'
        for obj in edge.networkedge_organizations.all()
    ]
    return log


class Command(BaseCommand):
    help = 'Create a passwordless account using email'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str)
        parser.add_argument('--occupation', type=str, nargs='*')
        parser.add_argument('--organization', type=str)
        parser.add_argument('--facility', type=str)
        parser.add_argument('--site', type=str)
        parser.add_argument('--slug', type=str)
        parser.add_argument('--formatted_name', type=str)
        parser.add_argument(
            '--gender',
            type=str,
            choices=['F', 'M', 'N'],
            help="grammatical gender (F, M or N)"
        )
        parser.add_argument(
            '--role',
            type=str,
            choices=['superuser', 'administrator', 'staff', 'registered', 'anonymous'],
            help=(
            "minimal access role allowed ('superuser', 'administrator',"
            "'staff', 'registered', 'anonymous')"
            )
        )


    def handle(self, *args, **options):
        email: str = options['email']
        if not email:
            raise CommandError('You must provide an email.')
            return
        if not validateEmail(email):
            raise CommandError('Email "%s" is not valid' % email)
            return
        grammatical_gender: str = options['gender']
        if not grammatical_gender:
            grammatical_gender = "N"
        try:
            gg_instance = GrammaticalGender.objects.get(code=grammatical_gender)
        except GrammaticalGender.DoesNotExist as e:
            raise CommandError(
                'GrammaticalGender does not exist. %s' % e
            )
            return
        User = get_user_model()
        try:
            user, created = User.objects.get_or_create(
                email=email
            )
            user.grammatical_gender=gg_instance
            user.save()
            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        'Passwordless Django user %s successfully created' % user
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        'Passwordless Django user %s already exists' % user
                    )
                )
        except Exception as e:
            raise CommandError('User creation failed. %s' % e)
            return

        # create Slug
        site=options['site']
        slug=options['slug']
        if site and slug:
            try:
                site = Site.objects.get(domain=options['site'])
            except Site.DoesNotExist as e:
                raise CommandError(
                    f'Site with domain {site} does not exist.'
                )
                return
            try:
                Slug.objects.get_or_create(
                    slug=slug,
                    site=site,
                    user=user
                )
            except Exception as e:
                raise CommandError(
                    f'Error during creation of Slug object: $s' % e
                )
                return

        # create Contact
        formatted_name = options['formatted_name']
        if formatted_name:
            person_type=Contact.PersonType.NATURAL
            try:
                Contact.objects.get_or_create(
                    person_type=person_type,
                    user=user,
                    formatted_name=formatted_name,
                )
            except Exception as e:
                raise CommandError(
                    f'Error during creation of Contact object: $s' % e
                )
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
            organization = Organization.objects.get(name=options['organization'])
        except Organization.DoesNotExist:
            organization = None
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
                        edge.organizations.add(organization)
                        if options['role']:
                            log = add_roles(edge, options['role'])
                            self.stdout.write(
                                self.style.WARNING(
                                    f'{log}'
                                )
                            )
                        edge.facilities.add(facility)
        except TypeError:
            return
        parents_qs = user_node.parents.all()
        node_parents: str = ""
        for parent in parents_qs:
            node_parents+=(
                f'{parent.name} '
                f'({parent.descendants_edges().first().organizations.all()}) \n'
            )
        self.stdout.write(
            self.style.SUCCESS(
                f'{parents_qs.count()} node parents successfully created: \n'
                f'{node_parents}'
            )
        )