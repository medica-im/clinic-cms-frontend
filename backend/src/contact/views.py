import logging
from django.shortcuts import render
from contact.forms import NoSmokingForm
from django_contact_form.views import ContactFormView
from django.urls import reverse
from constance import config
from facility.utils import get_organization
from django.utils.translation import activate


logger=logging.getLogger(__name__)

class NoSmokingView(ContactFormView):
    #form_class = NoSmokingForm
    recipient_list=(
        config.CONTACT_NOSMOKING_RECIPIENT_LIST.replace(" ", "").split(",")
    )
    logger.debug(f'{recipient_list=}')
    template_name="contact/django_contact_form/nosmoking/contact_form.html"
    
    def get_form_class(self):
        org = get_organization(self.request)
        try:
            activate(org.language)
        except:
            pass
        return NoSmokingForm
    
    def get_success_url(self):
        return reverse(
            "contact:nosmoking-contact-form-sent",
            current_app=self.request.resolver_match.namespace
        )