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


export interface Occupations extends Array<Occupation>{}

export interface Worker {
    id?: bigint;
	node_set?: NodeSet;
    facility?: string;
    occupations: Occupation[];
    formatted_name?: string;
    slug?: string;
    profile_picture_url?: string;
    grammatical_gender: GrammaticalGender;
}

export interface NodeSet {
    id?: bigint;
    name?: string;
}

export interface Workforce extends Array<Worker>{}