from modeltranslation.translator import translator, TranslationOptions

from workforce.models import (
    HealthPersonnel,
    NetworkNode,
    WorkforceSlug,
    PaymentMethod,
    ThirdPartyPayer
)

class HealthPersonnelTranslationOptions(TranslationOptions):
    fields = ('label', 'description')


class NetworkNodeTranslationOptions(TranslationOptions):
    fields = ('label',)


class WorkforceSlugTranslationOptions(TranslationOptions):
    fields = ('slug',)
    empty_values = {'slug': None}


class PaymentMethodTranslationOptions(TranslationOptions):
    fields = ('label', 'definition')


class ThirdPartyPayerTranslationOptions(TranslationOptions):
    fields = ('label', 'definition')


translator.register(HealthPersonnel, HealthPersonnelTranslationOptions)
translator.register(NetworkNode, NetworkNodeTranslationOptions)
translator.register(WorkforceSlug, WorkforceSlugTranslationOptions)
translator.register(PaymentMethod, PaymentMethodTranslationOptions)
translator.register(ThirdPartyPayer, ThirdPartyPayerTranslationOptions)