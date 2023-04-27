<script lang="ts">
	import { Icon, LeafletMap, Marker, Popup, TileLayer } from '@locationlabuo/leaflet-sveltified';
	import MapToolbar from './MapToolbar.svelte';
	import { onMount } from 'svelte';
    import { beforeUpdate, afterUpdate } from 'svelte';
	export let geoData;
	const point: [number, number] = [geoData.latitude, geoData.longitude];
	const zoom: number = geoData.zoom;
	let container: HTMLElement;


	/*	
    let n = 0;
	const points: [number, number][] = [];
	function getRandomLatLng(): [number, number] {
		return [-90 + 180 * Math.random(), -180 + 360 * Math.random()];
	}
	for (let i = 0; i < n; i = i + 1) {
		points.push(getRandomLatLng());
	}
*/
</script>

<div class="container" bind:this={container}>
	{#if container}
		<LeafletMap
			options={{
				center: point,
				zoom: zoom
			}}
			{container}
		>
			<TileLayer
				url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
				options={{
					maxZoom: 20
				}}
			/>
			<Marker latLng={point}>
				<Icon />
				<!--Popup>
					<div>This is a svelte component</div>
					<button
						on:click={() => {
							n = n + 1;
						}}>Increment: {n}</button
					>
				</Popup-->
			</Marker>
		</LeafletMap>
	{/if}
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		z-index: 0;
	}
</style>
