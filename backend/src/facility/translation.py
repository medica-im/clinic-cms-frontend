from modeltranslation.translator import translator, TranslationOptions

from facility.models import Organization

class OrganizationTranslationOptions(TranslationOptions):
    fields = (
        'formatted_name',
        'formatted_name_definite_article',
        'website_title',
    )

translator.register(Organization, OrganizationTranslationOptions)
