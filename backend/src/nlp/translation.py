from modeltranslation.translator import translator, TranslationOptions

from nlp.models import City

class CityTranslationOptions(TranslationOptions):
    fields = ('label', 'to_label', 'from_label')


translator.register(City, CityTranslationOptions)