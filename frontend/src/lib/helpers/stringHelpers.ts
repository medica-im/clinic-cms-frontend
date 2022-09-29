export const capitalizeFirstLetter = ([ first, ...rest ], locale=navigator.language) =>
first.toLocaleUpperCase(locale) + rest.join('')