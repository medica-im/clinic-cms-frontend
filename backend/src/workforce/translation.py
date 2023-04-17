from modeltranslation.translator import translator, TranslationOptions

from workforce.models import HealthPersonnel, NetworkNode, WorkforceSlug

class HealthPersonnelTranslationOptions(TranslationOptions):
    fields = ('label', 'description')


class NetworkNodeTranslationOptions(TranslationOptions):
    fields = ('label',)


class WorkforceSlugTranslationOptions(TranslationOptions):
    fields = ('slug',)
    empty_values = {'slug': None}

translator.register(HealthPersonnel, HealthPersonnelTranslationOptions)
translator.register(NetworkNode, NetworkNodeTranslationOptions)
translator.register(WorkforceSlug, WorkforceSlugTranslationOptions)