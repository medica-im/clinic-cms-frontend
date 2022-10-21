from django.contrib import admin
from opengraph.models import TwitterCard

@admin.register(TwitterCard)
class TwitterCardAdmin(admin.ModelAdmin):
    list_display = (
        'site',
        'title',
        'description',
        'username',
        'image',
    )