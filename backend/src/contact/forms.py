from django_contact_form.forms import ContactForm
from django import forms
from django.utils.translation import gettext_lazy as _
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class NoSmokingForm(ContactForm):
    name = forms.CharField(max_length=100, label=_("Your name"))
    phone = forms.CharField(max_length=15, label=_("Your phone number"))
    email = forms.EmailField(
        max_length=200,
        label=_("Your email address"),
        required = False,
    )
    body = forms.CharField(
        widget=forms.Textarea,
        label=_("Your message"),
        required = False,
    )
    subject_template_name = (
        "contact/django_contact_form/nosmoking/contact_form_subject.txt"
    )
    template_name = "contact/django_contact_form/nosmoking/contact_form.txt"
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id-nosmoking'
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'post'
        #self.helper.form_action = 'submit'

        self.helper.add_input(Submit('submit', _('Submit')))