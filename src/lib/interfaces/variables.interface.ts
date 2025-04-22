import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Variables {
	//readonly DEV: boolean
	readonly BASE_API_URI: string;
	readonly BASE_CMS_API_URI: string;
	readonly BASE_URI: string;
	readonly GHOST_API_KEY: string;
	readonly DEFAULT_LANGUAGE: string;
	readonly TIMELINE: boolean;
	readonly BLOG_URI: string;
	readonly NOINDEX: boolean;
	readonly ORGANIZATION_CATEGORY: string;
	readonly INPUT_GEOCODER: boolean;
	readonly INPUT_SITUATION: boolean;
	readonly INPUT_COMMUNE: boolean;
	readonly INPUT_CATEGORY: boolean;
	readonly INPUT_FACILITY: boolean;
	readonly INPUT_SEARCH: boolean;
}

export type ProgramsNavLinks =
	Required<Record<"soins" | "education-therapeutique" | "prevention", Nav>>;

interface Link {
	href: string,
	label: string,
	keywords: string,
	icon: object|null,
	category: string,
	active?: boolean,
	preload?: string
};

interface Nav {
	id: string,
	title: {
		en: string,
	    fr: string
	},
	menu: string,
	href: string,
	icon: IconDefinition,
	list: Link[]
};