<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { DEFAULT_TILE_LAYER_OPTIONS, DEFAULT_TILE_URL } from './common.js';
	import { browser } from '$app/environment';
	import { Marker, LeafletMap, TileLayer } from 'svelte-leafletjs?client';
	import type { MapOptions } from 'leaflet';
	import type { MapData } from '$lib/interfaces/mapData.interface';

	export let data: MapData;

	const mapOptions: MapOptions = {
		center: data.latLng,
		zoom: data.zoom
	};
</script>

{#if browser}
	<LeafletMap options={mapOptions}>
		<TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS} />
		<Marker latLng={data.latLng} />
	</LeafletMap>
{/if}