interface GrammaticalGender {
    name: string;
    lable: string;
    code: string;
}

export interface Occupation {
    name: string;
    label?: string;
    public_facing?: boolean;
    gender?: string | null;
    specialty?: Occupation;
    facilities: Array<Facility>;

}

interface Facility {
    facility__name: string;
    facility__contact__formatted_name: string;
}

export interface Count {
    total?: number;
    F?: number;
    M?: number;
    N?: number;
}

export interface OccupationCardinal {
    name?: string;
    count?: Count;
    label?: string;
}

export interface OccupationCardinalObject {
    [index: string]: OccupationCardinal;
  };

export interface Worker {
    id?: bigint;
    user_id: string;
	node_set?: NodeSet;
    facility?: string;
    occupations: Array<Occupation>;
    title?: string;
    formatted_name?: string;
    slug?: string;
    profile_picture_url?: ProfilePictureUrl;
    grammatical_gender: GrammaticalGender;
    websites: Websites;
    phone_numbers: PhoneNumber[];
    account_email: string;
    contact_id: number;
    profile: Profile;
    appointments: any[];
}

interface Profile {
    id: number;
    contact: number;
    text: string;
    roles: number[];
}

interface ProfilePictureUrl {
    fb: string;
    lt: string;
}

interface Websites extends Array<Website>{}

interface Website {
    type: string;
    website: string
}

interface PhoneNumber {
    id: number;
    phone: string;
    type: string;
    type_display: string;
}

export interface NodeSet {
    id?: bigint;
    name?: string;
}

export interface Workforce extends Array<Worker>{}