from modeltranslation.translator import translator, TranslationOptions

from workforce.models import HealthPersonnel

class HealthPersonnelTranslationOptions(TranslationOptions):
    fields = ('label', 'description')

#class CategoryMetadataTranslationOptions(TranslationOptions):
#    fields = ('label', 'description') 
    
translator.register(HealthPersonnel, HealthPersonnelTranslationOptions)
#translator.register(CategoryMetadata, CategoryMetadataTranslationOptions)