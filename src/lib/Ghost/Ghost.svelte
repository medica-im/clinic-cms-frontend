<script lang="ts">
	import RoundCard from '$lib/RoundCard/RoundCard.svelte';
	import { variables } from '$lib/utils/constants';
	export let data;

	// e.g. "30 sept. 2026". Explicit locale and time zone: the defaults follow
	// the server or browser, which gave "9/30/2026" and could disagree on the
	// day around midnight (a hydration mismatch too).
	function formatDate(datetime: string) {
		return new Date(datetime).toLocaleDateString(variables.DEFAULT_LANGUAGE, {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			timeZone: variables.TIMEZONE
		});
	}
</script>

{#if data && Array.isArray(data?.posts) && data?.posts?.length}
	<div class="!bg-transparent space-y-4 md:space-y-10">
		<div class="text-center">
			<h2 class="h2">Blog</h2>
		</div>
		<div class="flex flex-wrap justify-center gap-6 md:gap-10">
			{#each data.posts as post}
				<RoundCard
					url={post.url}
					img={post.feature_image}
					alt={post.feature_image_alt}
					title={post.title}
					date={formatDate(post.published_at)}
					excerpt={post.custom_excerpt}
				/>
			{/each}
		</div>
	</div>
{/if}
