<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import useAssets from '$lib/composables/useAssets.js';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { variables } from '$lib/utils/constants';
	export let data;

	function getLabels(worker) {
        let labels = [];
		for (let occupation of worker.occupations) {
			labels.push(occupation.label)
		}
		return [labels.slice(0, -1).join(', '), labels.slice(-1)[0]].join(labels.length < 2 ? '' : ` ${$LL.AND()} `);
	}
</script>

<div class="flex justify-center place-content-center content-center">
	{#if browser}
		<Carousel autoplay autoplayDuration={5000} duration={1000} dots={false}>
			{#each data as worker}
				<a href="/{worker.slug}">
					<figure class="content-center flex-shrink-0 mx-auto ">
						<img
							class="object-scale-up flex-shrink-0 mx-auto w-80 px-4"
							src="{variables.BASE_URI}{worker.profile_picture_url.lt}"
							alt={worker.formatted_name}
						/>
						<figcaption class="text-center">{worker.formatted_name}, {getLabels(worker)}</figcaption>
					</figure>
				</a>
			{/each}
		</Carousel>
	{:else}
	{@const worker = data[0]}
		<a href="/{worker.slug}">
			<figure class="content-center flex-shrink-0 mx-auto w-64 md:w-80">
				<img
					class="object-scale-up w-64 md:w-80 mx-auto"
					src="{variables.BASE_URI}{worker.profile_picture_url.lt}"
					alt={worker.formated_name}
				/>
				<figcaption class="text-center">{worker.formatted_name}, {getLabels(worker)}</figcaption>
			</figure>
		</a>
	{/if}
	</div>
