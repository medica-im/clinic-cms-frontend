<script lang="ts">
	import { twitterCardStore } from '$lib/store/openGraphStore';
	import type { TwitterCard } from '$lib/interfaces/openGraph.interface';
	import { page } from '$app/stores';

	export let twitter: TwitterCard;
	const {
		title = null,
		image_url = null,
		image_alt = null,
		description = null,
		username = null
	} = twitter;
</script>

{#if title && description}
	<meta name="twitter:card" content="summary" />
	<meta property="og:type" content="website" />
{/if}
{#if title}
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
{/if}
{#if image_url}
	<meta property="og:image" content={image_url} />
	<meta name="twitter:image" content={image_url} />
	{#if image_alt}
		<meta name="twitter:image:alt" content={image_alt} />
	{/if}
{/if}
{#if description}
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />
{/if}
{#if username}
	<meta name="twitter:site" content={username} />
{/if}
