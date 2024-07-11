<script lang="ts">
	import * as LS from '@locationlabuo/leaflet-sveltified';
    //import LeafletMap from '@locationlabuo/leaflet-sveltified';
	//import Marker from '@locationlabuo/leaflet-sveltified';
    //import Popup from '@locationlabuo/leaflet-sveltified';
    //import TileLayer from '@locationlabuo/leaflet-sveltified';

	export let data;

	let latLng = data[0]?.latLng;
	let zoom = data[0]?.zoom;

	let container: HTMLElement;
</script>

<div class="container" bind:this={container}>
	{#if container}
		<LS.LeafletMap
			options={{
				center: latLng,
				zoom: zoom
			}}
			{container}
		>
			<LS.TileLayer
				url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
				options={{
					maxZoom: 18
				}}
			/>
			<LS.Marker latLng={latLng}>
				<LS.Icon />
				<!--LS.Popup>
					<div>This is a svelte component</div>
					<button
						on:click={() => {
							n = n + 1;
						}}>Increment: {n}</button
					>
				</LS.Popup-->
			</LS.Marker>
		</LS.LeafletMap>
	{/if}
</div>

<style>
	.container {
		z-index: 0;
		height: 100%;
		width: 100%;
	}
</style>