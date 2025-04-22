<script lang="ts">
	import { dateTime } from '$lib/store/dateTimeStore.ts';
	import secretary from '$lib/assets/images/parcours/secretary.png';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import {
		faSync,
		faMobileScreen,
		faPhone,
		faSms,
		faFax,
		faMapLocationDot,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import { isServiceAvailable } from '$lib/Schedule/available.ts';
	import { publicHolidays } from '$lib/store/publicHolidaysStore.ts';
	import { loadAll } from '@square/svelte-store';
	import SkeletonAppBar from '$lib/SkeletonAppBar/SkeletonAppBar.svelte';

	export let data;
</script>

<div class="card h-full">
	<header class="card-header">
		<h3 class="h3">SMS</h3>
	</header>
	<div class="p-4 space-y-4">
    <a href="sms:0749693238" class="btn variant-filled"><span><Fa icon={faSms} /></span><span>0749693238</span></a>
			<p>
				La prise de rendez-vous par SMS est&nbsp;
			<span class="inline-flex items-baseline">
			{#await loadAll([dateTime, publicHolidays])}
			<Fa icon={faSync} size="3x" spin />
			{:then}
			<span>
				{isServiceAvailable('phoneAppointment', $dateTime, $publicHolidays)
						? 'ouverte'
						: 'fermée'}
			</span>
			{/await}.
			</span>
		</p>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<Fa icon={faSms} />
		<div class="flex-auto flex justify-between items-center">
			<h6 class="font-bold" data-toc-ignore>RDV SMS</h6>
			<small>{$dateTime.toLocaleString("fr-FR")}</small>
		</div>
	</footer>
</div>
