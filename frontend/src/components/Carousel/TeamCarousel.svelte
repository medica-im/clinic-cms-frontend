<script lang="ts">
	import useAssets from '$lib/composables/useAssets.js';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { teamCarouselStore } from '$lib/store/workforceStore';
</script>

<div class="max-h-fit p-0">
	{#if browser}
	{#await teamCarouselStore.load()}
	{:then}
		<Carousel autoplay autoplayDuration={7000} duration={2000} dots={false}>
			{#each $teamCarouselStore as worker}
			<a href="/{worker.slug}">
			<figure>
				<img
					class="object-contain h-96 w-96"
					src={`https://dev.msp-vedene.fr${worker.profile_picture_url.lt}`}
					alt={worker.formatted_name}
				/>
				<figcaption class="text-center">{worker.formatted_name}</figcaption>
		</figure>
		</a>
				{/each}
		</Carousel>
		{/await}
	{:else}
		<img
			class="object-scale-down h-96 w-96"
			src={`https://dev.msp-vedene.fr${$teamCarouselStore[0].profile_picture_url.lt}`}
			alt={$teamCarouselStore[0].formated_name}
		/>
	{/if}
</div>
