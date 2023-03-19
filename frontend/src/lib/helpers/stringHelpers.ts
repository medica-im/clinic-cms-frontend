import type { Worker } from "$lib/interfaces/workforce.interface";
import { language } from "$lib/store/languageStore";

export const capitalizeFirstLetter = ([ first, ...rest ], locale=language) =>
first.toLocaleUpperCase(locale) + rest.join('')

export const workerTitleFormattedName = (w: Worker) =>
`${w.title}${w.title ? " " : ""}${w.formatted_name}`