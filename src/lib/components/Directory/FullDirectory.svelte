<script lang="ts">
    import { getContext } from 'svelte';
    import { getSelectSituation } from './context.ts';
   	import { scrollY } from '$lib/store/scrollStore.ts';
    import { variables } from '$lib/utils/constants.ts';
    import Spinner from '$components/Spinner.svelte';
    import SearchDirectory from '$lib/components/Directory/SearchDirectory.svelte';
	import SelectCommunes from '$lib/components/Directory/SelectCommunes.svelte';
	import SelectCategories from '$lib/components/Directory/SelectCategories.svelte';
	import SelectCategoriesChips from '$lib/components/Directory/SelectCategoriesChips.svelte';
	import SelectSituations from '$lib/components/Directory/SelectSituations.svelte';
	import SelectFacility from '$lib/components/Directory/SelectFacility.svelte';
	import List from '$lib/components/Directory/List.svelte';
	import Geocoder from '$lib/components/Geocoder/Geocoder.svelte';
	import Fa from 'svelte-fa';
	import { faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons';
    import type { Writable, AsyncWritable, Loadable } from '@square/svelte-store';

    export let data: any = null;
	export let displayGeocoder: boolean = variables.INPUT_GEOCODER;
	export let displaySituation: boolean = variables.INPUT_SITUATION;
	export let displayCommune: boolean = variables.INPUT_COMMUNE;
	export let displayCategory: boolean = variables.INPUT_CATEGORY;
	export let displayFacility: boolean = variables.INPUT_FACILITY;
	export let displaySearch: boolean = variables.INPUT_SEARCH;
	export let avatar: boolean = true;
    export let communeOf;
    export let categoryOf;
    export let facilityOf;

    const cCFE = getContext<Loadable<Map<any,any>>>('cardinalCategorizedFilteredEffectors');
    const selectSituation = getSelectSituation();
    let top: Element;
	let countString = '';
	let showOnPx = 500;
	function contactCount(_categorizedFilteredEffectors: Map<string, any>) {
		let count = 0;
		if (_categorizedFilteredEffectors) {
			count = [..._categorizedFilteredEffectors.values()].flat().length;
		}
		return `${count} contact${count > 1 ? 's' : ''}`;
	}
	$: countString = contactCount($cCFE);
	const scrollToTop = () => {
		top.scrollIntoView();
	};
</script>

<svelte:window bind:scrollY={$scrollY} />

<div>
	<section class="bg-surface-100-800-token programs-gradient">
		<div class="section-container" bind:this={top}>
			<div class="space-y-2">
				{#if displayGeocoder}
					<div class="row">
						<div class="col">
							<Geocoder />
						</div>
					</div>
				{/if}
				{#if displaySituation}
					<div class="row">
						<div class="col">
							<SelectSituations />
						</div>
					</div>
				{/if}
				{#if displayCommune}
					<div class="row">
						<div class="col">
							<SelectCommunes {communeOf} />
						</div>
					</div>
				{/if}
				{#if displayCategory}
					{#if $selectSituation}
						<div class="row">
							<div class="col">
								<SelectCategoriesChips />
							</div>
						</div>
					{:else}
						<div class="row">
							<div class="col">
								<SelectCategories {categoryOf} types={data.types} />
							</div>
						</div>
					{/if}
				{/if}
				{#if displayFacility}
					<div class="row">
						<div class="col">
							<SelectFacility {facilityOf} />
						</div>
					</div>
				{/if}
				{#if displaySearch}
					<div class="row">
						<div class="col">
							<SearchDirectory />
						</div>
					</div>
				{/if}
				<div class="my-4 space-y-4">
					{#await cCFE.load()}
						{#if data && [...data]?.length}
							<List {data} {avatar} loading={true}/>
						{:else}
							<div class="flex justify-center m-2 space-x-2 items-center">
								<Spinner w={4} h={4} />
								<p>Chargement...</p>
							</div>
						{/if}
					{:then}
					<List data={$cCFE} {avatar} loading={false}/>
					{/await}
				</div>
			</div>
		</div>
	</section>
</div>

{#if $scrollY > showOnPx}
	<button type="button" class="back-to-top btn-icon btn-lg variant-filled" on:click={scrollToTop}>
		<Fa icon={faArrowsUpToLine} size="lg" /></button
	>
{/if}

<style lang="postcss">
	.anchordiv {
		scroll-margin-top: 1rem;
	}
	.section-container {
		@apply mx-auto w-full max-w-7xl p-4 py-4 md:py-8;
		scroll-padding-top: 4rem;
	}
	.programs-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 100% 0%, rgba(var(--color-primary-500) / 0.33) 0px, transparent 50%);
	}
	.back-to-top {
		position: fixed;
		z-index: 99;
		right: 15px;
		user-select: none;
		bottom: 15px;
	}
</style>