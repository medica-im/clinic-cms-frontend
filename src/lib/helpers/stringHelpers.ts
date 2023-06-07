import type { Worker } from "$lib/interfaces/workforce.interface";
import { variables } from '$lib/utils/constants';

const lang = variables.DEFAULT_LANGUAGE;


export const capitalizeFirstLetter = ([ first, ...rest ], l=lang) =>
first.toLocaleUpperCase(l) + rest.join('')

export const lowercaseFirstLetter = ([ first, ...rest ], l=lang) =>
first.toLocaleLowerCase(l) + rest.join('')

export const workerTitleFormattedName = (w: Worker) =>
`${w.title}${w.title ? " " : ""}${w.formatted_name}`

export const removeSpaces = (s: string) => s.replace(/\s+/g, '-').normalize("NFD").replace(/\p{Diacritic}/gu, "");