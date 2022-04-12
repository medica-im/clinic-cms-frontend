<script>
	import LeafletMap from '$lib/map/LeafletMap.svelte';
    const mspGeoData = {"latitude": 43.97964, "longitude": 4.90704, "zoom": 19}
</script>

<main>
	<LeafletMap geoData={mspGeoData} />
</main>