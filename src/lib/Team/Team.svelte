<script lang="ts">
	import { page } from '$app/state';
	import Occupations from '$lib/Organization/Occupations.svelte';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import TeamCarousel from '$lib/Carousel/TeamCarousel.svelte';
	import { currentOrg, limitCategories} from '$lib/store/directoryStore.js';
	export let data: any;
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 items-center">
	{#if data.teamCarousel.length}
	<div class="place-items-center items-center justify-center content-center">
		<TeamCarousel data={data.teamCarousel}/>
	</div>
	{/if}
	<div class="col-span-2 p-0 space-y-4 text-center self-center">
		<h2 class="h2">Équipe</h2>
		<p>
			Notre équipe pluriprofessionnelle s'engage pour votre santé et celle de vos proches.
		</p>
		<div class="p-0 text-left">
			{#key [$currentOrg, $limitCategories, page.url]}
			<Occupations data={data.cardinalTypes}/>
			{/key}
		</div>
		<a href="/annuaire" class="btn variant-ghost-surface" data-sveltekit-preload-data="hover">
			<span><Fa icon={faAddressBook} /></span><span>Annuaire</span>
		</a>
		
	</div>
</div>
