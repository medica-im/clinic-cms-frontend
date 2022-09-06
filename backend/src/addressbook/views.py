import hashlib

from django.contrib.auth.decorators import user_passes_test
from django.urls import reverse
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template.context import RequestContext

from taggit.models import Tag

from addressbook.forms import *
from addressbook.models import *
from addressbook.helper import VCard


def superuser_check(user):
    return user.is_superuser == True

@user_passes_test(superuser_check)
def add_group(request):

    if request.method == "GET":
        form = ContactGroupForm()
    else:
        group = ContactGroup()
        form = ContactGroupForm(request.POST, instance=group)
        if form.is_valid():
            form.save()
            # request.user.message_set.create(message = 'Successfully saved group.')
            return HttpResponseRedirect(reverse('addressbook:index'))
    return render(
        request,
        'addressbook/add_group.html',
        context = {'form': form}
    )

@user_passes_test(superuser_check)
def add_contact(request):
    if request.method == 'POST':  # If the form has been submitted...
        contact_form = ContactForm(request.POST, user=request.user)  # A form bound to the POST data
        # Create a formset from the submitted data
        email_formset = EmailFormSet(request.POST, prefix="email")
        phone_formset = PhoneFormSet(request.POST, prefix="phone")
        address_formset = AddressFormSet(request.POST, prefix="address")
        website_formset = WebsiteFormSet(request.POST, prefix="website")
        if (
            contact_form.is_valid()
            and email_formset.is_valid()
            and phone_formset.is_valid()
            and address_formset.is_valid()
            and website_formset.is_valid()
            ):
            contact = contact_form.save()
            for form in email_formset.forms:
                email = form.save(commit=False)
                email.contact = contact
                email.save()
            for form in phone_formset.forms:
                phone = form.save(commit=False)
                phone.contact = contact
                phone.save()
            for form in address_formset.forms:
                address = form.save(commit=False)
                address.contact = contact
                address.save()
            for website in website_formset.forms:
                website = form.save(commit=False)
                website.contact = contact
                website.save()
            # request.user.message_set.create(message = 'Successfully saved contact.')
            return HttpResponseRedirect(reverse('addressbook:index'))  # Redirect to a 'success' page
    else:
        groups = ContactGroup.objects.all()
        if not groups:
            return HttpResponseRedirect(reverse('addressbook:add_group'))
        contact_form = ContactForm(user=request.user)
        email_formset = EmailFormSet(prefix="email")
        phone_formset = PhoneFormSet(prefix="phone")
        address_formset = AddressFormSet(prefix="address")
        website_formset = WebsiteFormSet(prefix="website")
    return render(
        request,
        'addressbook/add_contact.html',
        context = {
            'phone_formset': phone_formset,
            'contact_form': contact_form,
            'email_formset': email_formset,
            'address_formset': address_formset,
            'website_formset': website_formset,
        }
    )

@user_passes_test(superuser_check)
def edit_contact(request, pk):
    contact = Contact.objects.get(pk=pk)
    #if contact.group.user != request.user:
    #    return HttpResponse(contact.group.user.username + request.user.username)
        #raise Http404
    if request.method == "POST":
        contact_form = ContactForm(request.POST, instance=contact, user=request.user)
        phone_formset = PhoneEditFormSet(request.POST, instance=contact, prefix="phone")
        address_formset = AddressEditFormSet(request.POST, instance=contact, prefix="address")
        email_formset = EmailEditFormSet(request.POST, instance=contact, prefix="email")
        website_formset = WebsiteEditFormSet(request.POST, instance=contact, prefix="website")
        if (
            contact_form.is_valid() and
            phone_formset.is_valid() and
            address_formset.is_valid() and
            email_formset.is_valid() and 
            website_formset.is_valid()
        ):
            contact_form.save()
            email_formset.save()
            address_formset.save()
            phone_formset.save()
            website_formset.save()
            return HttpResponseRedirect(reverse('addressbook:index'))
    else:
        contact_form = ContactForm(instance=contact, user=request.user)
        phone_formset = PhoneEditFormSet(instance=contact, prefix="phone")
        address_formset = AddressEditFormSet(instance=contact, prefix="address")
        email_formset = EmailEditFormSet(instance=contact, prefix="email")
        website_formset = WebsiteEditFormSet(instance=contact, prefix="website")
    return render(
        request,
        'addressbook/edit_contact.html',
        context = {
            'email_formset': email_formset,
            'phone_formset': phone_formset,
            'address_formset': address_formset,
            'website_formset': website_formset,
            'contact_form': contact_form,
            'contact': contact,
        }
    )

@user_passes_test(superuser_check)
def index(request):
    groups = ContactGroup.objects.all()
    tags = Tag.objects.all()
    contacts = Contact.objects.all()
    # FIXME: tup?
    tup = [
        (group.name, Contact.objects.filter(groups=group).order_by('first_name', 'last_name')) for group in groups
    ]
    return render(
        request,
        'addressbook/index.html',
        context = {
            'tup': tup,
            'contacts': contacts,
            'groups': groups,
            'tags': tags,
        }
    )

def get_hash(string):
    string = string.lower().strip().encode('utf-8')
    md5 = hashlib.md5()
    md5.update(string)
    return md5.hexdigest()

@user_passes_test(superuser_check)
def single_contact(request, pk):
    groups = ContactGroup.objects.all()
    tags = Tag.objects.all()
    contact = Contact.objects.get(pk=pk)
    #if contact.group.user != request.user:
    #    raise Http404

    if request.method == "GET":
        emails = Email.objects.filter(contact=contact)
        email_hash = ''
        if emails:
            email = emails[0]
            email_hash = get_hash(email.email)

        # FIXME is email required?
        addresses = Address.objects.filter(contact=contact)
        #if addresses:
        #    address = addresses[0]
        phones = PhoneNumber.objects.filter(contact=contact)
        websites = Website.objects.filter(contact=contact)
        return render(
            request,
            'addressbook/single_contact.html',
            context = {
                'contact': contact,
                'emails': emails,
                'hash': email_hash,
                'addresses': addresses,
                'phones': phones,
                'websites': websites,
                'vcard_str': None,
                #'vcard_str': str(VCard(contact)),
                'groups': groups,
                'tags': tags,
            }
        )

    elif request.method == "POST":
        #FIXME: allow delete?
	#contact.delete()
        return HttpResponseRedirect(reverse('addressbook:index'))
    else:
        raise Http404

@user_passes_test(superuser_check)
def single_group(request, name):
    groups = ContactGroup.objects.filter(name=name)
    tags = Tag.objects.all()
    contacts = Contact.objects.filter(groups__name=name)
    tup = [
        (group.name, Contact.objects.filter(groups=group).order_by('first_name', 'last_name')) for group in groups
    ]
    return render(
        request,
        'addressbook/index.html',
        context = {
            'tup': tup,
            'contacts': contacts,
            'groups': ContactGroup.objects.all(),
            'tags': tags,
        }
    )

@user_passes_test(superuser_check)
def single_tag(request, name):
    #FIXME: no groups! tags!
    groups = ContactGroup.objects.all()
    tags = Tag.objects.filter(name=name)
    contacts = Contact.objects.filter(tags__name=name)
    tup = [
        (tag.name, Contact.objects.filter(tags=tag).order_by('first_name', 'last_name')) for tag in tags
    ]
    return render(
        request,
        'addressbook/index.html',
        context = {
            'tup': tup,
            'contacts': contacts,
            'groups': ContactGroup.objects.all(),
            'tags': Tag.objects.all(),
        }
    )

@user_passes_test(superuser_check)
def download_vcard(request, vcard=VCard):
    """
    View function for returning single vcard
    """
    pk = request.GET.get('id')
    contact = Contact.objects.get(pk=pk)
    output = vcard(contact).output_string()
    filename = "contact_%s%s.vcf" % (contact.first_name, contact.last_name)
    response = HttpResponse(output, content_type="text/x-vCard")
    response['Content-Disposition'] = 'attachment; filename=%s' % filename
    return response