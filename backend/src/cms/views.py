from django.shortcuts import render
from .models import PageCategory
from wagtail.api.v2.views import BaseAPIViewSet

class PageCategoryViewSet(BaseAPIViewSet):
    model = PageCategory
    body_fields = BaseAPIViewSet.body_fields + [
        'id',
        'name',
    ]
