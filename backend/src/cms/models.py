from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
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
from wagtail.admin.edit_handlers import (
    FieldPanel,
    MultiFieldPanel,
    InlinePanel,
)
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.core.fields import StreamField
from wagtail.core.models import Page, Orderable
from wagtail.images.api.fields import ImageRenditionField
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.snippets.models import register_snippet

from cms import blocks


class HomePage(Page):
    body = RichTextField(blank=True)
    site = models.ForeignKey(
        Site,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel('site'),
        FieldPanel('body'),
    ]

    api_fields = [
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
