

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
	node_set?: NodeSet;
    facility?: string;
    occupations: Array<Occupation>;
    title?: string;
    formatted_name?: string;
    slug?: string;
    profile_picture_url?: ProfilePictureUrl;
    grammatical_gender: GrammaticalGender;
    websites: Websites;
    phone_numbers: PhoneNumbers;
    account_email: string;
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

interface PhoneNumbers {
    mobile: Array<string>;
    mobile_work: Array<string>;
    work: Array<string>;
    fax: Array<string>;
}



export interface NodeSet {
    id?: bigint;
    name?: string;
}

export interface Workforce extends Array<Worker>{}