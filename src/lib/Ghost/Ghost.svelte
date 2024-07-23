<script lang="ts">
	import { language } from '$lib/store/languageStore';
	import RoundCard from '$lib/components/RoundCard/RoundCard.svelte';
	export let data;
	
	// TODO: deal with data.meta and pagination if more than a few articles
	const posts = data.posts;

	function formatDate(datetime: string, locale: string) {
		const event = new Date(datetime);
		return event.toLocaleDateString(locale);
	}

	function colsCount() {
		let count = posts.length;
		if ( count < 2 ) return 1
		else if ( count = 2 ) return 2
		else return 3 
	}
</script>
<!--{JSON.stringify(data)}<br-->
{#if Array.isArray(posts) && posts.length}
<div class="!bg-transparent space-y-4 md:space-y-10">
<div class="text-center">
<h2 class="h2">Blog</h2>
</div>
<div class="grid grid-cols-1 lg:grid-cols-{colsCount()} gap-4 md:gap-10 p-4 place-items-top">
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
{/if}