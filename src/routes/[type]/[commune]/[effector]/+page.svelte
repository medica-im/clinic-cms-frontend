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
<div class="section-container">
<div class="card !bg-transparent lg:variant-ringed p-2 lg:p-4 lg:m-4 flex-grow">
<svelte:component this={component} effector={data.effector} />
</div>
<div class="p-2 lg:p-4 lg:m-4 flex flex-row-reverse">
	<Back />
</div>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-2 py-8 md:py-12;
	}
</style>