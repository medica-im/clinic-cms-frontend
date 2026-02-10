import type { Worker } from "$lib/interfaces/workforce.interface";
import { variables } from '$lib/utils/constants';

const lang = variables.DEFAULT_LANGUAGE;


export const capitalizeFirstLetter = (s: string, l=lang) =>
s.charAt(0).toLocaleUpperCase(l) + s.slice(1)

export const lowercaseFirstLetter = (s: string, l=lang) =>
s.charAt(0).toLocaleLowerCase(l) + s.slice(1)

export const workerTitleFormattedName = (w: Worker) =>
`${w.title}${w.title ? " " : ""}${w.formatted_name}`

export const removeSpaces = (s: string) => s.replace(/\s+/g, '-').normalize("NFD").replace(/\p{Diacritic}/gu, "");