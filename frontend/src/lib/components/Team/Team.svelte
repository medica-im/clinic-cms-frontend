<script lang="ts">
	import Occupations from '$lib/Organization/Occupations.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';

	export let data: any;
</script>

<div class="card card-hover overflow-hidden">
	<!-- Header -->
	<header>
		<img
			src="https://source.unsplash.com/random/1280x540?healthcare"
			class="bg-black/50 w-full aspect-[21/9]"
			alt="healthcare"
		/>
	</header>
	<!-- Body -->
	<div class="p-4 space-y-4">
		<h6 class="text-primary-500">{capitalizeFirstLetter(data.facility.formatted_name, $language)}</h6>
		<h3>{$LL.HOME.TEAM.TITLE()}</h3>
		<article>
			<p>
				{$LL.HOME.TEAM.TEXT()}
			</p>
			<p>
				<Occupations data = {
					{
						"cO": data.cO,
						"wO": data.wO
					}
				} />
			</p>
		</article>
	</div>
	<hr />
	<!-- Footer -->
	<footer class="p-4 flex justify-start items-center space-x-4">
		<a href="/annuaire" class="btn bg-primary-500" data-sveltekit-preload-data="hover">
			<span><Fa icon={faAddressBook} /></span><span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
		</a>
	</footer>
</div>
