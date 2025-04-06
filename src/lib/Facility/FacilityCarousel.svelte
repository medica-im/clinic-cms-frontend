<script lang="ts">
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import type { Facility } from '$lib/interfaces/facility.interface';

	export let data;

	function compareFn(a:Facility, b:Facility) {
		return b.effectors.length - a.effectors.length
	}
</script>

<div class="flex justify-center shrink place-content-center content-center mx-auto w-80 lg:w-96">
	{#if browser}
		<Carousel autoplay autoplayDuration={5000} duration={1000} dots={false}>
			{#each data.sort(compareFn) as facility}
				<div class="mx-auto">
					<figure class="mx-auto w-64 lg:w-80">
						<a href="/sites/{facility.slug}" class="flex m-2">
							<img
								class="h-auto w-fit"
								src="{facility.avatar.raw}"
								alt={facility.name}
							/>
						</a>

						<figcaption class="text-center w-64 lg:w-80">
							<a
								href="/sites/{facility.slug}"
								class="anchor flex shrink"
								><div class="mx-auto text-primary">
									{facility.name}
								</div></a
							>
						</figcaption>
					</figure>
				</div>
			{/each}
		</Carousel>
	{:else}
		{@const facility = data.sort(compareFn)[0]}
		<figure class="content-center shrink mx-auto w-64 lg:w-80">
			<a href="/sites/{facility.slug}" class="flex m-2">
				<img class="h-auto w-fit" src="{facility.avatar.raw}" alt={facility.name} />
			</a>
			<figcaption class="text-center w-64 lg:w-80">
				<a href="/sites/{facility.slug}" class="anchor"
					><div class="mx-auto text-primary underline">
						{facility.name}
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
