<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import EntryUl from '$lib/components/Entry/EntryUl.svelte';
	import Fa from 'svelte-fa';
	import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

	interface Workshop {
		n: number;
		video?: string;
		img?: string;
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

	function hoverImg(e: PointerEvent) {
		if (e.pointerType === 'touch') return;
		if (data.imgHover) {
			const img = (e.currentTarget as HTMLElement).querySelector('img');
			if (img) img.src = data.imgHover;
		}
	}

	function defaultImg(e: PointerEvent) {
		if (e.pointerType === 'touch') return;
		const img = (e.currentTarget as HTMLElement).querySelector('img');
		if (img && data.img) img.src = data.img;
	}

	function cycleImg(e: MouseEvent) {
		const img = (e.currentTarget as HTMLElement).querySelector('img');
		if (img && data.imgHover && data.img) {
			img.src = img.src.includes(data.imgHover) ? data.img : data.imgHover;
		}
	}

	// Flip image on scroll into view (mobile only)
	let cardEl: HTMLElement;
	let observer: IntersectionObserver | undefined;
	let flipTimeout: ReturnType<typeof setTimeout>;
	let flipped = false;

	onMount(() => {
		if (!data.imgHover || !cardEl) return;
		const isTouchDevice = window.matchMedia('(hover: none)').matches;
		if (!isTouchDevice) return;

		observer = new IntersectionObserver(
			(entries) => {
				if (flipped) return;
				for (const entry of entries) {
					const img = entry.target.querySelector('header img') as HTMLImageElement;
					if (!img) continue;
					if (entry.isIntersecting) {
						flipTimeout = setTimeout(() => {
							img.src = data.imgHover!;
							flipped = true;
							observer?.disconnect();
						}, 600);
					} else {
						clearTimeout(flipTimeout);
					}
				}
			},
			{ threshold: 0.5 }
		);
		observer.observe(cardEl);
	});

	onDestroy(() => {
		observer?.disconnect();
	});
</script>

<div bind:this={cardEl} class="card variant-soft card-hover overflow-hidden w-80 h-min">
	<header>
		{#if data.img}
		<button onclick={cycleImg}
				onpointerenter={hoverImg}
				onpointerleave={defaultImg} >
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
