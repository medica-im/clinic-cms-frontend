import { variables } from '$lib/utils/constants';

/**
 * robots.txt, generated rather than shipped as a static file (ported from skcms).
 *
 * dev.msp-vedene.fr is publicly resolvable, so crawlers reach it like any other
 * site. The layout's `<meta name="robots" content="noindex">` keeps fetched pages
 * out of search results but does not stop the crawl itself.
 *
 * A route, not `static/robots.txt`: static/ is copied verbatim into every build,
 * so a `Disallow: /` there would deindex production on the next deploy. Reading
 * VITE_NOINDEX, the same flag as the meta tag, keeps the two in step.
 */
export function GET() {
	const body = variables.NOINDEX
		? // Dev: stay out entirely.
			'User-agent: *\nDisallow: /\n'
		: // Production: an empty Disallow is the explicit "crawl everything".
			'User-agent: *\nDisallow:\n';

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=300'
		}
	});
}

// Nothing here depends on the request, so it can be prerendered in a build.
export const prerender = true;
