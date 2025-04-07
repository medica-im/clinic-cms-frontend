<script lang="ts">
	import type { OpenGraph } from '$lib/interfaces/openGraph.interface.ts';

	export let defaultOpenGraph: OpenGraph;
	export let modOpenGraph: OpenGraph | null = null;
	export let url: string = '';
	const getOpenGraph = (og: OpenGraph, mod: OpenGraph) => {
		for (const [key, value] of Object.entries(mod)) {
			if (value) {
				og[key as keyof OpenGraph]=value;
			}
        }
		return og;
	};
	const openGraph = modOpenGraph ? getOpenGraph(defaultOpenGraph, modOpenGraph) : defaultOpenGraph;
	const {
		title = null,
		image_url = null,
		image_alt = null,
		description = null,
		twitter_description = null,
		username = null
	} = openGraph;
</script>

<meta name="twitter:card" content="summary" />
<meta property="og:type" content="website" />
{#if title}
	<meta property="og:title" content={title} />
{/if}
{#if image_url}
	<meta property="og:image" content={image_url} />
	{#if image_alt}
		<meta property="og:image:alt" content={image_alt} />
	{/if}
{/if}
{#if description}
	<meta property="og:description" content={description} />
{/if}
{#if username}
	<meta name="twitter:site" content={username} />
{/if}
{#if url}
	<meta property="og:url" content={url} />
{/if}