from django.urls import path
from django.views.generic import TemplateView
from contact.views import NoSmokingView
from contact.forms import NoSmokingForm

app_name = 'contact'

urlpatterns = [
    path(
        'nosmoking/',
        NoSmokingView.as_view(),
        name='nosmoking_contact_form'
    ),
    path(
        'nosmoking/sent/',
        TemplateView.as_view(
            template_name='contact/django_contact_form/nosmoking/contact_form_sent.html'
        ),
        name='nosmoking-contact-form-sent'
    ),
]