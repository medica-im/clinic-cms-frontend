import type { Worker } from "$lib/interfaces/workforce.interface";

export const capitalizeFirstLetter = ([ first, ...rest ], locale=navigator.language) =>
first.toLocaleUpperCase(locale) + rest.join('')

export const workerTitleFormattedName = (w: Worker) =>
`${w.title}${w.title ? " " : ""}${w.formatted_name}`