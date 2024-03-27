<script lang="ts">
	import videojs from 'video.js';
	import 'video.js/dist/video-js.min.css';
	import { onDestroy, onMount } from 'svelte';
	import type Player from 'video.js/dist/types/player';

	interface Video {
		src: string;
		type: string;
	}

	export let data: Video[];

	let player: Player;

	onMount(() => {
		player = videojs('player', { fluid: true, sources: data });
	});

	onDestroy(() => {
		if (player) player.dispose();
	});
</script>

<video class="video-js" controls id="player" preload="auto">
	<track kind="captions" />
</video>
