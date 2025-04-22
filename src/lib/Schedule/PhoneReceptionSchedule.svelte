<script lang="ts">
	import { dateTime } from '$lib/store/dateTimeStore.ts';
	import secretary from '$lib/assets/images/parcours/secretary.png';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import {
		faSync,
    faHeadset,
		faMobileScreen,
		faPhone,
		faFax,
		faMapLocationDot,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import Phones from '$lib/Directory/Phones.svelte';
	import { isServiceAvailable } from '$lib/Schedule/available.ts';
	import { publicHolidays } from '$lib/store/publicHolidaysStore.ts';
	import { loadAll } from '@square/svelte-store';

	export let data;
</script>

<div class="card h-full">
	<header class="card-header">
		<h3 class="h3">Accueil téléphonique</h3>
	</header>
	<div class="p-4 space-y-4">
		<Phones data={data.contact.phonenumbers} />
			<p>
				L'accueil téléphonique du secrétariat est&nbsp;
				<span class="inline-flex items-baseline">
					{#await loadAll([dateTime, publicHolidays])}
						<Fa icon={faSync} size="3x" spin />
					{:then}
						<span>
							{isServiceAvailable('phoneAppointment', $dateTime, $publicHolidays)
								? 'ouvert'
								: 'fermé'}
						</span>
					{/await}.
				</span>
			</p>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<Fa icon={faHeadset} />
		<div class="flex-auto flex justify-between items-center">
			<h6 class="font-bold" data-toc-ignore>Secrétariat</h6>
			<small>{$dateTime.toLocaleString("fr-FR")}</small>
		</div>
	</footer>
</div>
