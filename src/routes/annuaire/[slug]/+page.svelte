<script lang="ts">
    import { language } from '$lib/store/languageStore';
    import type { PageData } from './$types';
    import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
    import Directory2 from '$components/Directory/Directory2.svelte';
    import { page } from '$app/stores';
    import LL from '$i18n/i18n-svelte';
    export let data: PageData;
</script>

<svelte:head>
<title>
    Annuaire - {capitalizeFirstLetter($page.data.organization.formatted_name, $language)}
</title>
</svelte:head>

<!-- hero -->
<header id="hero" class="bg-surface-100-800-token hero-gradient">
    <div class="section-container">
        <h2 class="h2">
            {$LL.ADDRESSBOOK.TITLE()}
        </h2>
    </div>
</header>
<div>
    <Directory2 data={data} />
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-8 md:py-10;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
</style>
