import logging
from rest_framework.generics import RetrieveAPIView
from opengraph.models import TwitterCard
from opengraph.serializers import (
    TwitterCardSerializer,
)
from rest_framework.exceptions import NotFound


logger=logging.getLogger(__name__)


class OpenGraphView(RetrieveAPIView):
    queryset = TwitterCard.objects.all()
    serializer_class = TwitterCardSerializer

    def get_object(self):
        try:
            return TwitterCard.objects.get(site=self.request.site)
        except TwitterCard.DoesNotExist:
            raise NotFound(detail="TwitterCard not found.", code="not_found")