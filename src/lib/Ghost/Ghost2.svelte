<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { variables } from '$lib/utils/constants';
	import { locale } from '$i18n/i18n-svelte';
	import { ghost } from "$lib/store/ghostStore";
	import { language } from '$lib/store/languageStore';
	import LL from '$i18n/i18n-svelte';
	import RoundCard from '$lib/components/RoundCard/RoundCard.svelte';

	function formatDate(datetime: string, locale) {
		const event = new Date(datetime);
		return event.toLocaleDateString(locale);
	}
</script>

<div class="!bg-transparent space-y-4 md:space-y-10">
<div class="text-center">
<h2 class="h2">Blog</h2>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 p-4">
	{#each $ghost.posts ?? [] as post}
		<RoundCard
		url={post.url}
		img={post.feature_image}
		alt={post.feature_image_alt}
		title={post.title}
		date={formatDate(post.published_at, $language)}
		excerpt={post.custom_excerpt}
		/>
	{/each}
</div>
</div>
