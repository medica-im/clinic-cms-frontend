from modeltranslation.translator import translator, TranslationOptions

from .models import GrammaticalGender


class GrammaticalGenderTranslationOptions(TranslationOptions):
    fields = ('label',)


translator.register(GrammaticalGender, GrammaticalGenderTranslationOptions)