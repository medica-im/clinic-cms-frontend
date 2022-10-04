import logging
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from . import models
from . import serializers
from facility.utils import get_organization
from rest_framework_simplejwt.authentication import JWTAuthentication
from backend.i18n import activate_locale
from access.utils import get_role
from accounts.models import GrammaticalGender

logger = logging.getLogger(__name__)


class WorkforceLabel(APIView):
    """
    Return a dictionary of all labels.
    """
    def get(self, request, format=None):
        """
        Return a dictionary of all labels.
        """
        lang = self.request.query_params.get('lang')
        activate_locale(lang,self.request)
        organization = get_organization(self.request)
        language = lang or organization.language
        user=models.NodeSet.objects.get(name="user")
        role=get_role(self.request)
        organization_node_ids= (
            models.NetworkEdge.objects
            .filter(
                organizations=organization,
                networkedge_organizations__roles=role
            )
            .values_list("parent_id", flat=True)
        )
        org_node_qs = models.NetworkNode.objects.filter(
            id__in=organization_node_ids,
        )
        logger.debug(f'{org_node_qs=}')
        node_has_label=models.Label.objects.values_list("node__id", flat=True)
        logger.debug(f'{node_has_label=}')
        node_set = set()
        for node in org_node_qs:
            node_set.update(node.self_and_ancestors())
        logger.debug(f'{node_set=}')
        node_label_set = set()
        for node in node_set:
            if node.id in node_has_label:
                node_label_set.add(node)
        logger.debug(f'{node_label_set=}')
        dictionary = {}
        for node in node_label_set:
            dictionary[node.name] = {
                "S": {
                    "F": None,
                    "M": None,
                },
                "P": {
                    "F": None,
                    "M": None,
                }
            }
            try:
                 F = GrammaticalGender.objects.get(name="feminine")
                 M = GrammaticalGender.objects.get(name="masculine")
            except GrammaticalGender.DoesNotExist as e:
                logger.error(f"Missing GrammaticalGender object: {e}")
            for N in ["S", "P"]:
                for G in [F, M]:
                    logger.debug(f'{node.name=} {N=} {G.code=} {language=}')
                    try:
                        l = models.Label.objects.get(
                            node=node,
                            gender=G,
                            grammatical_number=N,
                            language=language
                        )
                        logger.debug(l)
                        dictionary[node.name][N][G.code]=l.label
                    except models.Label.DoesNotExist:
                        continue
        return Response(dictionary)


class WorkforceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.NetworkNode.objects.all()
    serializer_class = serializers.WorkforceSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        #language = self.kwargs.get('language', None)
        language = self.request.query_params.get('lang')
        logger.debug(f'kwargs {language=}')
        activate_locale(language,self.request)
        organization = get_organization(self.request)
        logger.debug(f'{organization=}')
        user=models.NodeSet.objects.get(name="user")
        role=get_role(self.request)
        organization_edge_qs_child_ids= (
            models.NetworkEdge.objects
            .filter(
                organizations=organization,
                networkedge_organizations__roles=role
            )
            .values_list("child_id", flat=True)
        )
        return models.NetworkNode.objects.filter(
            node_set=user,
            id__in=organization_edge_qs_child_ids
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        logger.debug(f'{self.request=}')
        return context