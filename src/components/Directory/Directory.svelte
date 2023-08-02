<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import { facilityStore } from '$lib/store/facilityStore';
	import { filteredEffectors, effectors } from '$lib/store/directoryStore';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import SearchDirectory from '$components/Directory/SearchDirectory.svelte';
	import Effector from './Effector.svelte';
	import SelectCommunes from './SelectCommunes.svelte';
	import SelectCategories from './SelectCategories.svelte';
	export let effectorsLoad: any;
</script>

<svelte:head>
	<title>
		{$LL.ADDRESSBOOK.TITLE()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<div>
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container">
			{#await filteredEffectors.load()}
				<div class="space-y-2">
					<div class="row">
						<div class="col">
							<SelectCategories />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SelectCommunes />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SearchDirectory />
						</div>
					</div>
				</div>
				<div class="my-4">
					{#each effectorsLoad as effector}
						<section class="space-y-4 my-4">
							<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
								<Effector {effector} />
							</div>
						</section>
					{/each}
				</div>
			{:then}
				<div class="space-y-2">
					<div class="row">
						<div class="col">
							<SelectCategories />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SelectCommunes />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SearchDirectory />
						</div>
					</div>
				</div>
				<div class="my-4">
					{#each $filteredEffectors as effector}
						<section class="space-y-4 my-4">
							<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
								<Effector {effector} />
							</div>
						</section>
					{/each}
				</div>
			{/await}
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-8 md:py-12;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
	/* Team Gradient */
	/* prettier-ignore */
	.team-gradient {
		background-image:
			radial-gradient(at 0% 100%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%);
	}
	/* Tailwind Gradient */
	/* prettier-ignore */
	.tailwind-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%),
			radial-gradient(at 100% 100%,  rgba(var(--color-primary-500) / 0.24) 0px, transparent 50%);
	}
	/* Programs Gradient */
	/* prettier-ignore */
	.programs-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 100% 0%,  rgba(var(--color-primary-500) / 0.33) 0px, transparent 50%);
	}
</style>
