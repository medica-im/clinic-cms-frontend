import type { Worker } from "$lib/interfaces/workforce.interface";
import { variables } from '$lib/utils/constants';

const lang = variables.DEFAULT_LANGUAGE;


export const capitalizeFirstLetter = ([first='', ...rest]: string, l=lang) =>
first.toLocaleUpperCase(l) + rest.join('')

export const lowercaseFirstLetter = ([first='', ...rest], l=lang) =>
first.toLocaleLowerCase(l) + rest.join('')

export const workerTitleFormattedName = (w) =>
`${w.title}${w.title ? " " : ""}${w.name}`

export const removeSpaces = (s: string) => s.replace(/\s+/g, '-').normalize("NFD").replace(/\p{Diacritic}/gu, "");

export const normalize = (x: string) => x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");