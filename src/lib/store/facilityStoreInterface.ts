export interface Category {
	id?: bigint;
	name?: string;
	formatted_name?: string;
	definition?: string;
}

export interface Address {
    id?: bigint;
	street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    type?: string;
    public_visible?: boolean;
    contact_visible?: boolean;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    contact?: bigint;
}

export interface Addresses extends Array<Address>{}

export interface Contact {
	id?: bigint;
    formatted_name?: string;
	url?: string;
	addresses?: Addresses[];
}

export interface Facility {
	id?: bigint;
	name?: string;
	language?: string;
	formatted_name?: string;
	website_title?: string;
	category?: Category[];
	contact?: Contact[];
}