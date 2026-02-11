<script lang="ts">
	import EntryUl from '$lib/components/Entry/EntryUl.svelte';
	import Fa from 'svelte-fa';
	import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

	interface Workshop {
		n: number;
		video?: string;
		img: string;
		imgHover?: string;
		figcaption?: string;
		alt: string;
		title: string;
		duration: string;
		summary: string;
		team: any[];
	}
	let { data }: { data: Workshop } = $props();

	function videoPlay(e: Event) {
		if (data.video) {
			const video = e.target as HTMLVideoElement;
			if (video.paused) video.play();
		}
	}

	let tapped = false;

	function hoverImg(e: MouseEvent) {
		if (tapped) return;
		if (data.imgHover) {
			const img = (e.target as HTMLElement).querySelector?.('img') ?? e.target as HTMLImageElement;
			if (img) img.src = data.imgHover;
		}
	}

	function defaultImg(e: MouseEvent) {
		if (tapped) return;
		const img = (e.target as HTMLElement).querySelector?.('img') ?? e.target as HTMLImageElement;
		if (img) img.src = data.img;
	}

	function cycleImg(e: MouseEvent) {
		tapped = true;
		const img = (e.currentTarget as HTMLElement).querySelector('img');
		if (img && data.imgHover) {
			img.src = img.src.includes(data.imgHover) ? data.img : data.imgHover;
		}
	}
</script>

<div class="card variant-soft card-hover overflow-hidden w-80 h-min">
	<header>
		{#if data.img}
		<button onclick={cycleImg}
				onmouseenter={hoverImg}
				onmouseleave={defaultImg} >
			<img
				src={data.img}
				class="w-full"
				alt={data.alt}
			/>
		</button>
		{:else}
		<button onclick={videoPlay} onfocus={videoPlay} onmouseover={videoPlay}>
			<figure>
				<figcaption>
					{data.figcaption}
				</figcaption>
				<video autoplay muted>
					<source src={data.video} />
				</video>
			</figure>
			</button>
		{/if}
	</header>
	<div class="p-4 space-y-4">
		<div class="flex-auto flex justify-between items-center">
			<h6 class="h6 flex items-center gap-1" data-toc-ignore>
				<span>Atelier n°</span><span class="badge-icon variant-ringed-success">{data.n}</span>
			</h6>
			<h6 class="h6 flex items-center gap-1"><Fa icon={faStopwatch} /> {data.duration}</h6>
		</div>
		<h3 class="h3" data-toc-ignore>{data.title}</h3>
		<article>
			<p>
				<!-- cspell:disable -->
				{data.summary}
				<!-- cspell:enable -->
			</p>
		</article>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<EntryUl data={data.team} />
	</footer>
</div>
