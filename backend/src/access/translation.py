from modeltranslation.translator import translator, TranslationOptions

from access.models import Role

class RoleTranslationOptions(TranslationOptions):
    fields = ('label', 'description')


translator.register(Role, RoleTranslationOptions)