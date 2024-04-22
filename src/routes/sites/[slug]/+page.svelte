<script lang="ts">
	import FacilityPage from '$components/Facility/FacilityPage.svelte';
	import SitesLink from '$lib/components/Sites/SitesLink.svelte';
	export let data;
</script>

<header id="hero" class="bg-surface-100-800-token hero-gradient">
    <div class="mx-0 flex flex-col items-center justify-center p-4 py-6">
	
    <h1 class="h2">{data.facility.name}</h1>
</div>
</header>

<div class="mx-0 flex flex-col items-center justify-center p-4 py-6">
<div class="grid grid-cols-1 gap-4">
	<div>
		<FacilityPage facility={data.facility} />
	</div>
	<div>
		<SitesLink />
	</div>
	<!--{JSON.stringify(data.facility)}-->
</div>
</div>
<style lang="postcss">
	.section-container {
		@apply p-4 py-8;
	}
    /* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
</style>
