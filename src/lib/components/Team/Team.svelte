<script lang="ts">
	import { page } from '$app/stores';
	import Occupations from '$lib/Organization/Occupations.svelte';
	import LL from '$i18n/i18n-svelte.ts';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import TeamCarousel from '$components/Carousel/TeamCarousel.svelte';
	import { currentOrg, limitCategories} from '$lib/store/directoryStore.ts';
	export let data: any;
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 items-center">
	{#if data.teamCarousel.length}
	<div class="place-items-center items-center justify-center content-center">
		<TeamCarousel data={data.teamCarousel}/>
	</div>
	{/if}
	<div class="col-span-2 p-0 space-y-4 text-center self-center">
		<h2 class="h2">{$LL.HOME.TEAM.TITLE()}</h2>
		<p>
			{$LL.HOME.TEAM.TEXT()}
		</p>
		<div class="p-0 text-left">
			{#key [$currentOrg, $limitCategories, $page.url]}
			<Occupations data={data.cardinalTypes}/>
			{/key}
		</div>
		<a href="/annuaire" class="btn variant-ghost-surface" data-sveltekit-preload-data="hover">
			<span><Fa icon={faAddressBook} /></span><span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
		</a>
		
	</div>
</div>
