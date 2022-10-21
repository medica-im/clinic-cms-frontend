from opengraph.models import TwitterCard
from rest_framework import serializers
import logging

logger=logging.getLogger(__name__)


class TwitterCardSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = TwitterCard
        fields = [
            'title',
            'username',
            'twitter_description',
            'description',
            'image_url',
            'image_alt',
        ]

    def get_image_url(self, obj):
        logger.debug(f'{obj.site=}')
        return (
            'https://%s%s' % (
                obj.site.domain,
                obj.image.url
            )
        )