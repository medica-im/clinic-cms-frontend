import logging
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from . import models
from . import serializers
from facility.utils import get_organization
from rest_framework_simplejwt.authentication import JWTAuthentication

logger = logging.getLogger(__name__)




class WorkforceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.NetworkNode.objects.all()
    serializer_class = serializers.WorkforceSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        organization = get_organization(self.request)
        logger.debug(f'{organization=}')
        user=models.NodeSet.objects.get(name="user")
        organization_edge_qs_child_ids= (
            models.NetworkEdge.objects
            .filter(organizations=organization)
            .values_list("child_id", flat=True)
        )
        return models.NetworkNode.objects.filter(
            node_set=user,
            id__in=organization_edge_qs_child_ids
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        #self.request.user = JWTAuthentication().authenticate(self.request)[0]
        context['request'] = self.request
        logger.debug(f'{self.request=}')
        return context