<script lang="ts">
	import Occupations from '$lib/Organization/Occupations.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';

	export let data: any;
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 items-start">
	<div>
		<img
			src="https://source.unsplash.com/random/500x500?healthcare"
			class="w-full"
			alt="healthcare"
		/>
	</div>
	<div class="col-span-2 p-2 space-y-2">
		<h6 class="text-primary-500">
			{capitalizeFirstLetter(data.facility.formatted_name, $language)}
		</h6>
		<h3>{$LL.HOME.TEAM.TITLE()}</h3>
		<article>
			<p>
				{$LL.HOME.TEAM.TEXT()}
			</p>
			<div class="py-2">
				<Occupations
					data={{
						cO: data.cO,
						wO: data.wO
					}}
				/>
				</div>
		</article>
		<a href="/annuaire" class="btn bg-primary-500" data-sveltekit-preload-data="hover">
			<span><Fa icon={faAddressBook} /></span><span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
		</a>
	</div>
</div>
