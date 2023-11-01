// Replaces the locale slug in a URL.
//
// If the `full` argument is set to `true`, the full URL is returned as a string.
// e.g. https://mywebsite.com/en/blog/article-1 => https://mywebsite.com/de/blog/article-1
//
// Otherwise (default) the URL relative to the base is returned.
// e.g. https://mywebsite.com/en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
	const [, , ...rest] = url.pathname.split('/')
	const new_pathname = `/${[locale, ...rest].join('/')}`
	if (!full) {
		return `${new_pathname}${url.search}`
	}
	const newUrl = new URL(url.toString())
	newUrl.pathname = new_pathname
	return newUrl.toString()
}

export const isObjectEmpty = (obj) => {
	for (var i in obj) return false;
	return true;
}

export const replacer = (key, value) => {
	if(value instanceof Map) {
	  return {
		dataType: 'Map',
		value: Array.from(value.entries()), // or with spread: value: [...value]
	  };
	} else {
	  return value;
	}
  }

export const reviver = (key, value) => {
	if(typeof value === 'object' && value !== null) {
	  if (value.dataType === 'Map') {
		return new Map(value.value);
	  }
	}
	return value;
  }