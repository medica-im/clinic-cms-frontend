<script lang="ts">
	import type PageData from '$types';
	import EffectorPage from '$components/Directory/EffectorPage.svelte';
	import CareHomePage from '$components/Directory/CareHomePage.svelte';
	import Back from '$components/Directory/Back.svelte';
	import UsldPage from '$components/Directory/UsldPage.svelte';
	export let data: PageData;

	const componentSelect = {
		default: EffectorPage,
		careHome: CareHomePage,
		usld: UsldPage
	};
	let component = componentSelect[data.component];
</script>
<div class="flex flex-col">
<div class="card !bg-transparent lg:variant-ringed p-4 m-4 min-h-96 flex-grow">
<svelte:component this={component} effector={data.effector} />
</div>
<div class="pt-20 lg:pt-1 m-4 flex flex-row-reverse">
	<Back />
</div>
</div>
