<script lang="ts">
    import { language } from '$lib/store/languageStore.ts';
    import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
    import Directory from '$lib/components/Directory/CtxDirectory.svelte';
    import { page } from '$app/state';
    import LL from '$i18n/i18n-svelte.ts';
	import { title } from 'process';
    export let data;

    const getTitle = () => {
        const firstValue = data.cardinal.entries().next().value; 
        if (firstValue) {
            return capitalizeFirstLetter(firstValue[0]);
        }
    };
</script>

<svelte:head>
<title>
    {getTitle()} - Annuaire - {capitalizeFirstLetter(page.data.organization.formatted_name, $language)}
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
    <Directory
    data={data?.cardinal}
    propCurrentOrg={true}
    displayCommune={false}
    displayCategory={true}
    setRedirect={true}
    avatar={true} />
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
