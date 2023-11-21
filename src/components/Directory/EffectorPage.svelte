<script lang="ts">
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import Distance from './Distance.svelte';
	import { distanceEffectors } from '$lib/store/directoryStore';
	import Address from './Address.svelte';
	import LeafletMap from '$components/Map/LeafletSveltifiedMap.svelte';
    import Back from './Back.svelte';
	export let effector: any;

	const createFacilityGeoData = (data) => {
		let facilityGeoData = {
			name: data?.name ?? 'default',
			latitude: Number(data?.latitude ?? 0),
			longitude: Number(data?.longitude ?? 0),
			zoom: data?.zoom ?? 0
		};
		console.log(facilityGeoData);
		return facilityGeoData;
	};

	function effectorPageUrl(effector) {
		let typeSlug = effector.types[0].slug;
		let communeSlug = effector.commune.slug;
		let nameSlug = effector.slug;
		console.log(`${typeSlug}, ${communeSlug}, ${nameSlug}`)

		if (!typeSlug || !communeSlug || !nameSlug) {
			return;
		} else {
			return `/${typeSlug}/${communeSlug}/${nameSlug}`;
		}
	}
</script>

<div class="card p-4 m-4">
	<a class="unstyled" href={effectorPageUrl(effector)}>

		<h3 class="h3">{effector.name}</h3>
	<ul class="list">
		<li>
			<h4 class="h4">{effector.types.map((type) => type.name)}</h4>
		</li>
		{#if effector.phones?.length}
			<li><Phones data={effector.phones} /></li>
		{/if}
		{#if effector.address}
			<li><Address data={effector.address} /></li>
		{/if}
		<div class="m-1 p-1 h-56 max-w-screen-sm">
			<LeafletMap geoData={createFacilityGeoData(effector.address)} />
		</div>
		{#if effector.other_addresses?.length}
			<li><Addresses data={effector.other_addresses} /></li>
		{/if}
	</ul>
</a>

</div>
<Back />