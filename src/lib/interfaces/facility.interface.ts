import type { SocialNetwork } from '$lib/interfaces/socialnetwork.interface.js';
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
    label: string,
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

