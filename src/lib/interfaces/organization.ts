import type { Address } from "./facility.interface.ts"
import type { Phone } from "./phone.interface.ts"
import type { Website } from '$lib/interfaces/website.interface.ts';
import type { Email } from '$lib/interfaces/email.interface.ts';
import type { SocialNetwork } from '$lib/interfaces/socialnetwork.interface.ts';

export type Organization = {
    id: number
    uid: string
    name: string
    company_name: string
    language: string
    formatted_name: string
    formatted_name_definite_article: string
    website_title: string
    website_description: string
    category: {
        id: number,
        name: string,
        formatted_name: string,
        definition: string,
        slug: string
    }
    contact: {
        address: Address & {
            public_holidays_zone: string
        }
        phonenumbers: Phone[],
        websites: Website[],
        socialnetworks: SocialNetwork[],
        emails: Email[]
    }
    registration: boolean,
    google_site_verification: string,
    city: {
        id: number,
        name: string,
        label: string,
        label_fr: string,
        label_en: string|null,
        to_label: string,
        to_label_fr: string,
        to_label_en: string|null,
        from_label: string,
        from_label_fr: string,
        from_label_en: string|null,
        grammatical_number: string,
        gender: {
            id: number,
            name: string,
            label: string,
            label_fr: string,
            label_en: string,
            code: string
        }
    }
    legal_entity: {
        id: number,
        name: string,
        type: string,
        get_type_display: string,
        RNA: string|null,
        SIREN: string,
        SIRET: string,
        RCS: string|null,
        SHARE_CAPITAL: string|null,
        VAT: string|null
    }

}