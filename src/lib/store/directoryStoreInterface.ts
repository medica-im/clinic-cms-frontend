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
}

export interface Facility {
    address: Address,
    commune: string,
    name: string,
    organizations: any[],
    resource_uri: string|null,
    slug: string,
    uid: string,
}

