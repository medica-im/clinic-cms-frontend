<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { variables } from '$lib/utils/constants';
	import { locale } from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import LL from '$i18n/i18n-svelte';
	import RoundCard from '$lib/components/RoundCard/RoundCard.svelte';
	export let data;
	const { posts } = data;

	function formatDate(datetime: string, locale) {
		const event = new Date(datetime);
		return event.toLocaleDateString(locale);
	}
</script>

<div class="card variant-glass-surface p-4">
<div class="card-header">
<h3>Blog</h3>
</div>
<div class="p-4">
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 items-start">
	{#each posts as post}
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
</div>
