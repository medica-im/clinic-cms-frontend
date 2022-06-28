export interface Occupation {
    name?: string;
    label?: string;
    public_facing?: boolean;
    specialty?: Occupation
}

export interface OccupationName {string}

export interface Occupations extends Array<Occupation>{}

export interface Worker {
    id?: bigint;
	node_set?: NodeSet;
    facility?: string;
    occupations?: Occupations[];
    formatted_name?: string;
    slug?: string;
    profile_picture_url?: string;
}

export interface NodeSet {
    id?: bigint;
    name?: string;
}

export interface Workforce extends Array<Worker>{}