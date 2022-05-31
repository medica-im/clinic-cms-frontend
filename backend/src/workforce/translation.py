from modeltranslation.translator import translator, TranslationOptions

from workforce.models import HealthPersonnel, NetworkNode

class HealthPersonnelTranslationOptions(TranslationOptions):
    fields = ('label', 'description')


class NetworkNodeTranslationOptions(TranslationOptions):
    fields = ('label',)


translator.register(HealthPersonnel, HealthPersonnelTranslationOptions)
translator.register(NetworkNode, NetworkNodeTranslationOptions)