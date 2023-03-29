from django.db import models

from rest_framework import serializers

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField

from django import forms
from django.core.cache import cache
from django.core.cache.utils import make_template_fragment_key
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db import models
from django.shortcuts import render
from django.contrib.sites.models import Site

from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager
from rest_framework.fields import Field
from taggit.models import TaggedItemBase
from wagtail.api import APIField

from wagtail.admin.panels import FieldPanel
"""
from wagtail.admin.edit_handlers import (
    FieldPanel,
    MultiFieldPanel,
    InlinePanel,
)
"""
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.core.fields import StreamField
from wagtail.core.models import Page, Orderable
from wagtail.images.api.fields import ImageRenditionField
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.snippets.models import register_snippet
from django.utils.translation import gettext_lazy as _
from cms import blocks


class HomePage(Page):
    body = RichTextField(blank=True)
    site = models.ForeignKey(
        Site,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    categories = models.ForeignKey(
        'cms.PageCategory',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="homepages",
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('site'),
            FieldPanel('categories'),
        ], heading="Page information"),
        FieldPanel('body'),
    ]

    api_fields = [
        APIField(
            'categories',
            #serializer=serializers.StringRelatedField(many=False)
        ),
        APIField('body'),
    ]


class Timeline(Page):
    """Timeline page."""
    site = models.ForeignKey(
        Site,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    categories = models.ForeignKey(
        'cms.PageCategory',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="timelines",
    )

    template = "cms/home_page.html"
    subpage_types = []
    parent_page_types = ['cms.HomePage']
    #tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    #categories = ParentalManyToManyField("blog.BlogCategory", blank=True)

    content = StreamField(
        blocks.SlideBlock(),
        use_json_field=True,
        blank=True,
        min_num=2,
        block_counts= {
            'title': {
                'min_num': 1,
                'max_num': 1,
            },
            'events': {
                'min_num': 1,
            },
        }
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('site'),
            FieldPanel('categories'),
        ], heading="Page information"),
        FieldPanel('site'),
        FieldPanel("title"),
        #FieldPanel("tags"),
        #MultiFieldPanel(
        #    [
        #        InlinePanel("blog_authors", label="Author", min_num=1, #max_num=4)
        #    ],
        #    heading="Author(s)"
        #),
        #MultiFieldPanel(
        #    [
        #        FieldPanel("categories", widget=forms.CheckboxSelectMultiple)
        #    ],
        #    heading="Categories"
        #),
        FieldPanel("content"),
    ]

    api_fields = [
        APIField(
            'categories',
            #serializer=serializers.StringRelatedField(many=False)
        ),
        APIField("content"),
    ]

    #def save(self, *args, **kwargs):
    #    """Create a template fragment key.
    #    Then delete the key."""
    #    key = make_template_fragment_key(
    #        "blog_post_preview",
    #        [self.id]
    #    )
    #    cache.delete(key)
    #    return super().save(*args, **kwargs)


class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = (
            "id",
            "content",
        )


@register_snippet
class PageCategory(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
    )

    icon = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('name'),
        FieldPanel('icon'),
    ]

    api_fields = [
        APIField("timelines", serializer=TimelineSerializer(many=True)),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('page categories')