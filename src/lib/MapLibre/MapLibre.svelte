<script lang="ts">
	import { browser } from '$app/environment'; 
	import Fa from 'svelte-fa';
	import { faLocationDot, faArrowsToCircle } from '@fortawesome/free-solid-svg-icons';
	import { bbox } from '@turf/bbox';
	import { lineString } from '@turf/helpers';
	import { MapLibre, type Map } from 'svelte-maplibre';
	import type { MapData } from '$lib/interfaces/mapData.interface.js';
	import Bound from './Bound.svelte';
	import {
		Control,
		ControlGroup,
		ControlButton,
		DefaultMarker,
		Marker,
		Popup
	} from 'svelte-maplibre';
	import * as openStreetMap from '$lib/MapLibre/style/openStreetMap.json';

	let {data: points} : {data: MapData[]} = $props();

  const padding = {top: 60, bottom: 45, left: 115, right: 70};
	let bounds: [number, number, number, number] | undefined = $state();
	const coordinates = points.map((e) => [e.latLng[1], e.latLng[0]]);
	if (points.length>1) {
	var line = lineString(coordinates);
	bounds = bbox(line) as [number, number, number, number];
}
function getCenter() {
	let latLng = points[0].latLng;
	const lngLat = latLng.slice().reverse() as [number, number];
	return lngLat;
}
</script>
{#if browser}
<MapLibre
	class="h-full"
	center={getCenter()}
	zoom={points[0].zoom}
	standardControls
	style={openStreetMap}
	attributionControl={false}
	{bounds}
>
{#snippet children({ map })}
    {#if points.length>1}
    <Bound coordinates={coordinates} {padding}/>
	{/if}
	<Control class="flex flex-col gap-y-2">
		<ControlGroup>
			{#if points.length>1}

			<ControlButton onclick={() => map.fitBounds(bounds, { padding: padding })}><div class="variant-filled"><Fa size="lg" icon={faArrowsToCircle}/></div>
			</ControlButton>
			{:else}
			<ControlButton
			onclick={() => {
			  map.flyTo({
				center: getCenter(),
				zoom: points[0].zoom,
			  });
			}}
		  >
		  <div class="variant-filled">
		  <Fa size="lg" icon={faArrowsToCircle}/>
		  </div>
		  </ControlButton>
			{/if}
		</ControlGroup>

	</Control>
	{#each points as { latLng, tooltip }}
		<DefaultMarker lngLat={latLng.slice().reverse() as [number, number]}/>
		<Marker lngLat={latLng.slice().reverse() as [number, number]}>
				<!--div class="relative inline-block">
					<span class="chip variant-filled absolute -top-8 -right-5 z-10">
						{tooltip?.text}
					</span>
					<Fa size="4x" icon={faLocationDot} color="grey"/>
				</div-->
				<div class="relative markerContainer">
				<div class="variant-filled marker z-10 text-base px-2">
					{tooltip?.text}
				</div>
				</div>	
			<!--Popup {lngLat} open={true} offset={[-10, 0]} anchor="right">
      <div class="badge variant-filled">{name}</div>
    </Popup-->
		</Marker>
	{/each}
	{/snippet}
</MapLibre>
{/if}

<style lang="postcss">
	div.marker {
  position: center;
  border: 1px solid;
}
	div.markerContainer {
  position: relative;
  top: 25px;
  left: 0px;
}

</style>