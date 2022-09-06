#from django.conf.urls.defaults import *
from django.conf.urls import *
from django.urls import include, path
from addressbook import views
from addressbook.api import views as api_views

app_name = 'addressbook'

urlpatterns = [
    path(
        '',
        views.index,
        name='index'
    ),
    path(
        'group/add/',
        views.add_group,
        name='add_group'
    ),
    path(
        'contact/add/',
        views.add_contact,
        name='add_contact'
    ),
    path(
        'contact/<pk>/edit/',
        views.edit_contact,
        name='edit_contact'
    ),
    path(
        'contact/<pk>/view/',
        views.single_contact,
        name='single_contact'
    ),
    path(
        'group/<name>/view/',
        views.single_group,
        name='single_group'
    ),
    path(
        'tag/<name>/view/',
        views.single_tag,
        name='single_tag'
    ),
    path(
        'contact/download/',
        views.download_vcard,
        name='download_vcard'
    ),
]