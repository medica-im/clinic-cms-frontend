<script lang="ts">
	import type PageData from '$types';
	import EffectorContact from '$components/Directory/EffectorContact.svelte';
	import CareHomePage from '$components/Directory/CareHomePage.svelte';
	import UsldPage from '$components/Directory/UsldPage.svelte';
	export let data: PageData;

	const componentSelect = {
		default: EffectorContact,
		careHome: CareHomePage,
		usld: UsldPage
	};
	let component = componentSelect[data.component];
</script>

<div class="w-full max-w-5xl mx-auto p-4 py-4 md:py-8">
<svelte:component this={component} effector={data.effector} />
</div>