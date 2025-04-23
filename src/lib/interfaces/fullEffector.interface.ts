export interface Convention {
    definition: string | null,
    label: string,
    name: string,
    slug: string,
    synonyms: string[] | null,
    uid: string
}

export interface PaymentMethod {
    definition_en: string | null,
    definition_fr: string | null,
    label_en: string | null,
    label_fr: string | null,
    name: string,
    uid: string
    }

export interface ThirdPartyPayer {
    definition_en: string | null,
    definition_fr: string | null,
    label_en: string | null,
    label_fr: string | null,
    name: string,
    uid: string
}

export interface SpokenLanguage {
    language: string
}