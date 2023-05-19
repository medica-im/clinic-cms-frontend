<script lang="ts">
	import useAssets from '$lib/composables/useAssets.js';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { variables } from '$lib/utils/constants';
	export let data;
</script>

<div class="max-h-fit p-0">
	<!--
	{#await teamCarouselStore.load()}
		<figure>
			<img
				class="object-scale-down h-96 w-96"
				src="{variables.BASE_URI}{$teamCarouselStore[0].profile_picture_url.lt}"
				alt={$teamCarouselStore[0].formated_name}
			/>
			<figcaption class="text-center">{$teamCarouselStore[0].formatted_name}</figcaption>
		</figure>
	{:then}
	-->
	{#if browser}
		<Carousel autoplay autoplayDuration={7000} duration={2000} dots={false}>
			{#each data as worker}
				<a href="/{worker.slug}">
					<figure>
						<img
							class="object-contain h-96 w-96"
							src="{variables.BASE_URI}{worker.profile_picture_url.lt}"
							alt={worker.formatted_name}
						/>
						<figcaption class="text-center">{worker.formatted_name}</figcaption>
					</figure>
				</a>
			{/each}
		</Carousel>
	{:else}
	{@const worker = data[0]}
		<a href="/{worker.slug}">
			<figure>
				<img
					class="object-scale-down h-96 w-96"
					src="{variables.BASE_URI}{worker.profile_picture_url.lt}"
					alt={worker.formated_name}
				/>
				<figcaption class="text-center">{worker.formatted_name}</figcaption>
			</figure>
		</a>
	{/if}
</div>
