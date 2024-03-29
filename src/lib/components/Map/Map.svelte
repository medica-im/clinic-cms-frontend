<script lang="ts">
	import '$lib/assets/leaflet/leaflet.css';
    //import 'leaflet/dist/leaflet.css';
	import { DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL } from './common.js';
	import { browser } from '$app/environment';
	import { Marker, LeafletMap, TileLayer } from 'svelte-leafletjs?client';
	import type { MapOptions } from 'leaflet';
	import type { MapData } from '$lib/interfaces/mapData.interface';
    //import {onMount} from "svelte";
	export let data: MapData;

    let leafletMap;

	const mapOptions: MapOptions = {
		center: data.latLng,
		zoom: data.zoom
	};

    /*onMount(() => {
        leafletMap.getMap().fitBounds([[45.040073, 38.984425], [45.021316, 39.076927]]);
    });*/
</script>

{#if browser}
	<LeafletMap bind:this={leafletMap} options={mapOptions}>
		<TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS} />
		<Marker latLng={data.latLng} />
	</LeafletMap>
{/if}