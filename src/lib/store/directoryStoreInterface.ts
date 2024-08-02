import type { SocialNetwork } from '$lib/interfaces/socialnetwork.interface.ts';
import type { Website } from '$lib/interfaces/website.interface.js';
import type { Email } from '$lib/interfaces/email.interface.js';
import type { Phone } from '$lib/interfaces/phone.interface.js';

export interface Situation {
    value: string;
    label: string;
}

export interface Address {
    building: string|null,
    city: string,
    country: string,
    facility_uid: string,
    geographical_complement: string|null
    id: number,
    latitude: string|null,
    longitude: string|null,
    state: string|null,
    street: string|null
    zip: string|null,
    zoom: number|null,
    tooltip_direction: string|null;
    tooltip_permanent?: boolean|null;
    tooltip_text?: string|null;
}

export interface Avatar {
        fb: string|null,
        lt: string|null,
        raw: string|null
}

export interface Facility {
    address: Address,
    commune: string,
    name: string,
    organizations: any[],
    resource_uri: string|null,
    slug: string,
    uid: string,
    socialnetworks: SocialNetwork[]|null,
    websites: Website[]|null,
    avatar: Avatar,
    emails: Email[],
    phones: Phone[],
}

export interface Commune {
    name: string,
    slug: string,
    uid: string,
    wikidata: string
}

export interface Type {
          definition: string|null,
          label: string|null,
          name: string,
          slug: string,
          synonyms: string[]|null,
          uid: string
}

export interface Entry {
    address: Address,
    avatar: Avatar|null,
    commune: Commune,
    effector_uid: string,
    gender: string|null,
    label: string,
    name: string,
    phones: Phone[],
    resource_uri: string,
    slug: string,
    types: Type[],
    uid: string,
    updatedAt: number
}

export interface AddressFeature {
    type: string,
    geometry:{
        type: string,
        coordinates:[number,number]
    },
    properties:{
        label: string,
        score: number,
        housenumber: string,
        id: string,
        name: string,
        postcode: string,
        citycode: string,
        x: number,
        y: number,
        city: string,
        context: string,
        type: string,
        importance: number,
        street: string
    }
}
