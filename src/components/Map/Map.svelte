<script lang="ts">
	import LeafletMap from '$components/Map/LeafletMap.svelte';
	export let data: any;

	const createFacilityGeoData = (data) => {
		let facilityGeoData = {
			name: data?.name ?? 'default',
			latitude: Number(data?.latitude ?? 0),
			longitude: Number(data?.longitude ?? 0),
			zoom: data?.zoom ?? 0
		};
		return facilityGeoData;
	};
</script>

<LeafletMap geoData={createFacilityGeoData(data)} />