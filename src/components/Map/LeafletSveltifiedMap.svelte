<script lang="ts">
	import { Icon, LeafletMap, Marker, TileLayer } from '@locationlabuo/leaflet-sveltified';
	export let geoData;
	const point: [number, number] = [geoData.latitude, geoData.longitude];
	const zoom: number = geoData.zoom;
	let container: HTMLElement;
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
