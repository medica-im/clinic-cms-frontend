import type { SocialNetwork } from '$lib/interfaces/socialnetwork.interface.ts';
import type { Website } from '$lib/interfaces/website.interface.js';
import type { Email } from '$lib/interfaces/email.interface.js';
import type { Phone } from '$lib/interfaces/phone.interface.js';
import type { Writable } from '@square/svelte-store';

export interface Situation {
    value: string;
    label: string;
}

export interface Address {
    building: string | null,
    city: string,
    country: string,
    facility_uid: string,
    geographical_complement: string | null
    id: number,
    latitude: string | null,
    longitude: string | null,
    state: string | null,
    street: string | null
    zip: string | null,
    zoom: number | null,
    tooltip_direction: string | null;
    tooltip_permanent?: boolean | null;
    tooltip_text?: string | null;
}

export interface Avatar {
    fb: string | null,
    lt: string | null,
    raw: string | null
}

export interface Facility {
    address: Address,
    commune: string,
    name: string,
    organizations: any[],
    resource_uri: string | null,
    slug: string,
    uid: string,
    socialnetworks: SocialNetwork[] | null,
    websites: Website[] | null,
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
    definition: string | null,
    label: string | null,
    name: string,
    slug: string,
    synonyms: string[] | null,
    uid: string
}

export interface Entry {
    address: Address,
    avatar: Avatar | null,
    commune: Commune,
    effector_uid: string,
    facility: Facility,
    gender: string | null,
    label: string,
    name: string,
    organizations: string[],
    phones: Phone[],
    resource_uri: string,
    slug: string,
    types: Type[],
    uid: string,
    updatedAt: number
}

export type AddressFeature = {
    type: string,
    geometry: {
        type: string,
        coordinates: [number, number]
    },
    properties: {
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
} | {}

export interface Contact {
    resource_uri: string,
    timestamp: number,
    uid: string
}

export interface Situation {
    entries: string[],
    name: string,
    uid: string
}

export type CurrentOrg = boolean | null

export type CurrentOrgStore = Writable<boolean | null>

export type LimitCategoriesStore = Writable<string[]>

export interface DistanceEffectors {
    [index: string]: number;
}

export type CategorizedEntries = Map<string, Entry[]>;

interface CommuneValue {
    label: string,
    value: string,

}

export type CommunesValue = CommuneValue[];

export type CommunesValueStore = Writable<CommunesValue>;
