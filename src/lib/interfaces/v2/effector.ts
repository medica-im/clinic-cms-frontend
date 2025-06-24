export interface EffectorType {
    uid: string,
    name_fr: string,
    label_fr: string,
    synonyms_fr: string[]|null,
    definition_fr: string|null,
    slug_fr: string
}

export interface Effector {
    uid: string,
    name_fr: string,
    label_fr: string,
    slug_fr: string
    updatedAt: number
    createdAt: number
    gender: string
}