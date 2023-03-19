<script lang="ts">
	export let count: number;
	export let path: string;
	export let alt: string;
	import useAssets from '$lib/composables/useAssets.js';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';

	const arrayCount = Array(count);
	console.log(arrayCount);

	function getImgSrc(idx: number) {
		let newPath = path.replace(/-(\d+)\./, `-${idx}.`);
		console.log(newPath);
		const typeRegex = /.(\w+$)/;
		const fileType = path.match(typeRegex)[1];
		console.log(fileType);
		const img = useAssets(newPath);
		return img;
	}
</script>

{#if browser}
	<div class="max-h-fit p-4 borderrounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
		<Carousel autoplay autoplayDuration={7000} duration={1000}>
			{#each arrayCount as _, idx (idx)}<img
					class="object-scale-down h-96 w-96"
					src={getImgSrc(idx)}
					alt="{alt}"
				/>{/each}
		</Carousel>
	</div>
{/if}
