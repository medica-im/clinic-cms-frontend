<script lang="ts">
	import { page } from '$app/state';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import type { Entry } from '$lib/store/directoryStoreInterface.js';
	export let data: Entry[];

	function getLabels(entry: Entry) {
		return entry.effector_type.label
		/*let labels = [];
		for (let occupation of entry.types) {
			labels.push(occupation.label);
		}
		return [labels.slice(0, -1).join(', '), labels.slice(-1)[0]].join(
			labels.length < 2 ? '' : ` et `
		);*/
	}
	function getLink(entry: Entry, pathname: string) {
		return `/${entry.facility.slug}/${entry.effector_type.slug}/${entry.slug
	}?origin=${encodeURIComponent(pathname)}`
	}
</script>

<div class="flex justify-center shrink place-content-center content-center mx-auto w-80">
	{#if browser}
		<Carousel autoplay autoplayDuration={5000} duration={1000} dots={false}>
			{#each data as entry}
				<div class="mx-auto">
					<figure class="content-center mx-auto w-64">
						<a href={getLink(entry, page.url.pathname)} class="flex m-2">
							<img
								class="h-auto w-fit"
								src="{entry.avatar.lt}"
								alt={entry.name}
							/>
						</a>

						<figcaption class="text-center w-64">
							<a
								href={getLink(entry, page.url.pathname)}
								class="anchor flex shrink"
								><div class="mx-auto text-primary">
									{entry.name}, {getLabels(entry)}
								</div></a
							>
						</figcaption>
					</figure>
				</div>
			{/each}
		</Carousel>
	{:else}
		{@const entry = data[0]}
		<figure class="content-center shrink mx-auto w-64">
			<a href={getLink(entry, page.url.pathname)} class="flex m-2">
				<img class="h-auto w-fit" src="{entry.avatar.lt}" alt={entry.name} />
			</a>
			<figcaption class="text-center w-64">
				<a href={getLink(entry, page.url.pathname)} class="anchor"
					><div class="mx-auto text-primary underline">
						{entry.name}, {getLabels(entry)}
					</div></a
				>
			</figcaption>
		</figure>
	{/if}
</div>

<style lang="postcss">
	.anchor {
		@apply underline underline-offset-4;
	}
</style>
