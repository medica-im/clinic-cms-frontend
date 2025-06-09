<script lang="ts">
	import { MapLibre, MapEvents, DefaultMarker, type LngLatLike } from 'svelte-maplibre';
	import type { MapMouseEvent } from 'maplibre-gl';

    let { lngLat = $bindable(), zoom = $bindable() }: { lngLat: LngLatLike  | undefined, zoom: number } = $props();

	let markers: { lngLat: LngLatLike }[] = $state([]);
	//let lngLat: LngLatLike | undefined = $state();

	function recordLngLat(e: MapMouseEvent) {
		lngLat = e.lngLat;
	}

	function addMarker(e: MapMouseEvent) {
		markers = [...markers, { lngLat: e.lngLat }];
	}
</script>
{JSON.stringify(lngLat)}
{#key lngLat}
<MapLibre
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class="relative aspect-[9/16] max-h-[70vh] w-full sm:aspect-video sm:max-h-full"
	standardControls
    center={lngLat}
    zoom={zoom}
>
	<!-- MapEvents gives you access to map events even from other components inside the map, where you might not have access to the top-level `MapLibre` component. In this case it would also work to just use on:click on the MapLibre component itself. -->
	<MapEvents onclick={recordLngLat} />
	{#if lngLat}
		<DefaultMarker {lngLat} />
    {/if}
</MapLibre>
{/key}
