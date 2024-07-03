<script lang="ts">
	import '$lib/assets/leaflet/leaflet.css';
	import { DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL } from './common.js';
	import { browser } from '$app/environment';
	import { Marker, LeafletMap, TileLayer, Tooltip } from 'svelte-leafletjs?client';
	import type { MapOptions } from 'leaflet';
	import type { MapData } from '$lib/interfaces/mapData.interface.ts';
	import { onMount } from 'svelte';
	export let data: MapData[];

	let leafletMap;

	const getPoints = () => {
		return data.map((x) => x.latLng);
	};

	const getMapOptions = ():MapOptions|null => {
        if (data.length == 1) {
			return {
				center: data[0].latLng,
				zoom: data[0].zoom
			}
		} else {
			return {
				zoom: 0
			}
		}
	};

	onMount(() => {
		if ( data.length>1 ) {
		    leafletMap.getMap().fitBounds(getPoints());
		}
	});
</script>

{#if browser}
	<LeafletMap bind:this={leafletMap} options={getMapOptions()}>
		<TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS} />
		{#each data as point}
			<Marker latLng={point.latLng}>
				{#if point.tooltip}
					<Tooltip
						options={{
							permanent: point?.tooltip?.permanent||false,
							direction: point?.tooltip?.direction||'auto',
							opacity: point?.tooltip?.opacity||0.9,
						}}>{point?.tooltip?.text}</Tooltip
					>
				{/if}
			</Marker>
		{/each}
	</LeafletMap>
{/if}
