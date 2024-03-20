<script lang="ts">
	import Occupations from '$lib/Organization/Occupations.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import TeamCarousel from '$components/Carousel/TeamCarousel.svelte';
	import { resetDirectory } from '$components/Directory/utils';
	export let data: any;
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 items-center">
	<div class="place-items-center items-center justify-center content-center">
		<!--img
			src="https://source.unsplash.com/random/500x500?healthcare"
			class="w-full"
			alt="healthcare"
		/-->
		<!--TeamCarousel data={data.teamCarousel} /-->
	</div>
	<div class="col-span-2 p-2 space-y-2">
		<h2>{$LL.HOME.TEAM.TITLE()}</h2>
		<p>
			{$LL.HOME.TEAM.TEXT()}
		</p>
		<div class="py-2">
			<Occupations data={data.cardinalTypes}/>
		</div>
		<a href="/annuaire" on:click={resetDirectory} class="btn variant-filled-primary" data-sveltekit-preload-data="hover">
			<span><Fa icon={faAddressBook} /></span><span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
		</a>
		
	</div>
</div>
