from django.utils.text import slugify

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from workforce.models import NetworkEdge, NodeSet
from facility.models import Facility
from directory.models import Slug
from django.db import DatabaseError, IntegrityError

import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Create directory slugs from formatted names found in AddressBook'

    def add_arguments(self, parser):
        parser.add_argument('facility', type=str)        

    def handle(self, *args, **options):
        facility_name: str = options['facility']
        try:
            facility = Facility.objects.get(name=facility_name)
        except Facility.DoesNotExist as e:
            self.stdout.write(
                self.style.ERROR(
                    f'There is no facility named "{facility_name}" '
                    f'in the database\n{e}\n'
                )
            )
            return
        try:
            user = NodeSet.objects.get(name="user")
        except NodeSet.DoesNotExist as e:
            self.stdout.write(
                self.style.ERROR(
                    f'There is no NodeSet named "user" '
                    f'in the database\n{e}\n'
                )
            )
            return
        edges_qs = NetworkEdge.objects.filter(
            facilities=facility,
            child__node_set=user
        )
        logger.debug(f'{edges_qs.count()=}')
        logger.debug(edges_qs.values_list("child__user", flat=True))
        unique_users: int = len(set(edges_qs.values_list("child", flat=True)))
        self.stdout.write(
            self.style.WARNING(
                f'Number of edges: {edges_qs.count()}\n'
                f'Number of unique users: {unique_users}\n'
            )
        )
        for edge in edges_qs:
            logger.debug(f'{edge.child.user}')
            user = edge.child.user
            site = facility.site
            try:
                slug = Slug.objects.get(
                    user=user,
                    site=site,
                )
                logger.debug(f'{slug=}')
                self.stdout.write(
                    self.style.ERROR(
                        f'There is already a slug ({slug}) for {user} '
                        f'on site {site}\n'
                    )
                )
                continue
            except Slug.DoesNotExist:
                try:
                    formatted_name = user.contact.formatted_name
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(
                        f'There is no Contact record for {user}\n{e}\n'
                        )
                    )
                slug_str = slugify(formatted_name)
                try:
                    slug = Slug.objects.create(
                        user=user,
                        site=site,
                        slug=slug_str
                    )
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'New slug created for {user}: {slug.slug}\n'
                        )
                    )
                except DatabaseError as e:
                    self.stdout.write(
                        self.style.ERROR(
                            f'Database error while creating slug with {user=},'
                            f' {site=} and {slug_str=}\n{e}\n'
                        )
                    )
                    continue     