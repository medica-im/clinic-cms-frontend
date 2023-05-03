import type { Worker } from "$lib/interfaces/workforce.interface";
import { language } from "$lib/store/languageStore";

export const capitalizeFirstLetter = ([ first, ...rest ], locale=language) =>
first.toLocaleUpperCase(locale) + rest.join('')

export const lowercaseFirstLetter = ([ first, ...rest ], locale=language) =>
first.toLocaleLowerCase(locale) + rest.join('')

export const workerTitleFormattedName = (w: Worker) =>
`${w.title}${w.title ? " " : ""}${w.formatted_name}`

export const removeSpaces = (s: string) => s.replace(/\s+/g, '-').normalize("NFD").replace(/\p{Diacritic}/gu, "");