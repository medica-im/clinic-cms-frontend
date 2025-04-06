<script lang="ts">
   	import { bbox } from '@turf/bbox';
	import { lineString } from '@turf/helpers';

	import { GeoJSON, LineLayer, getMapContext, SymbolLayer } from 'svelte-maplibre';
    let { coordinates, padding } = $props();

    let line = lineString(coordinates);
	let bounds = bbox(line) as [number, number, number, number];
    const { map, loaded } = $derived(getMapContext());

    $effect(() => {
		// test if bounding box is correct (array of numbers), because bbox can return [Infinity, Infinity, -Infinity, -Infinity]
		if (bounds && bounds.every((coord) => Number.isFinite(coord))) {
			map?.fitBounds(bounds, { padding: padding });
		}
	});

</script>