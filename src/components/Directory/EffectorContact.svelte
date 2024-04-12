<script lang="ts">
	import { page } from '$app/stores';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import {
		faGlobe,
		faCircleNodes,
		faPhone,
		faCalendarCheck,
		faMapLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import LL from '$i18n/i18n-svelte';
	import Emails from '$components/Email/Emails.svelte';
	import Phones from './Phones.svelte';
	import Address from './Address.svelte';
	import Websites from '$components/Website/Websites.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Appointment from '$lib/components/Effector/Appointment/Appointments.svelte';
	import Cost from '$lib/components/Effector/Cost/Cost.svelte';
	import Payment from '$components/Addressbook/Payment/Payment.svelte';
	import FacilityLink from '$lib/components/Facility/FacilityLink.svelte';
	import Info from '$lib/components/Effector/Info/Info.svelte';
	import Avatar from '$lib/components/Effector/Avatar/Avatar.svelte';
	import Back from '$components/Directory/Back.svelte';
	import { createMapData } from '$lib/components/Map/mapData';

	export let effector: any;
</script>

<svelte:head>
	<title>
		{effector.name} - {capitalizeFirstLetter($page.data.facility.formatted_name, $language)}
	</title>
</svelte:head>

<div class="grid grid-col-1 justify-center space-y-4">
	<div class="flex flex-wrap p-2 gap-10">
		<div class="space-y-2">
			<h2 class="h2 flex-initial break-words overflow-hidden">{effector.name}</h2>
			<h3 class="h3 italic">{effector?.effector_type?.label}</h3>
			<FacilityLink data={effector.facility} />
		</div>
		<div class="flex-none">
			{#if effector?.avatar}
				<Avatar data={effector} />
			{/if}
		</div>
	</div>
	<div class="grid grid-col-1 lg:grid-cols-1 p-2 gap-4">
		{#if effector?.appointments?.length}
			<div class="d-flex justify-content-between align-items-start">
				<Appointment appointments={effector.appointments} />
			</div>
		{/if}
		{#if effector.phones?.length}
			<div class="d-flex justify-content-between align-items-start">
				<div class="flex items-center py-2">
					<div class="w-9"><Fa icon={faPhone} size="sm" /></div>
					<div>
						<h3 class="h3">{capitalizeFirstLetter($LL.PHONE())}</h3>
					</div>
				</div>
				<div class="flex items-center p-1">
					<div class="w-9" />
					<div class="py-2 space-x-2">
						<Phones data={effector.phones} />
					</div>
				</div>
			</div>
		{/if}
		{#if effector.emails?.length}
			<div class="d-flex justify-content-between align-items-start">
				<div class="flex items-center py-2">
					<div class="w-9"><Fa icon={faEnvelope} size="sm" /></div>
					<div>
						<h3 class="h3">Email</h3>
					</div>
				</div>
				<div class="flex">
					<div class="w-9" />
					<div class="py-2">
						<Emails data={effector.emails} />
					</div>
				</div>
			</div>
		{/if}

		{#if effector?.convention || effector?.carte_vitale || effector?.third_party_payers?.length || effector?.payment_methods?.length}
			<div class="d-flex justify-content-between align-items-start">
				<Cost data={effector} />
			</div>
			{#if effector?.payment_methods?.length}
				<div class="d-flex justify-content-between align-items-start">
					<Payment data={effector.payment_methods} />
				</div>
			{/if}
		{/if}
		{#if effector.websites?.length}
			<div class="d-flex justify-content-between align-items-start">
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faGlobe} size="sm" /></div>
					<div>
						<h3 class="h3">Web</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="p-1 space-x-2">
						<Websites data={effector.websites} />
					</div>
				</div>
			</div>
		{/if}
		{#if effector.socialnetworks?.length}
			<div class="d-flex justify-content-between align-items-start">
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faCircleNodes} /></div>
					<div>
						<h3 class="h3">{$LL.ADDRESSBOOK.SOMED()}</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="p-1 space-x-2">
						<SoMed data={effector.socialnetworks} appBar={false} />
					</div>
				</div>
			</div>
		{/if}
		{#if effector?.spoken_languages || effector?.rpps || effector?.adeli}
			<div class="d-flex justify-content-between align-items-start">
				<Info data={effector} />
			</div>
		{/if}
	</div>
	{#if effector.address}
		<div class="px-2">
			<div class="flex items-center p-1">
				<div class="w-9"><Fa icon={faMapLocationDot} size="sm" /></div>
				<div>
					<h3 class="h3">{capitalizeFirstLetter($LL.ADDRESSBOOK.LOCATION())}</h3>
				</div>
			</div>
			<div class="flex p-1">
				<div class="w-9" />
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-1">
					<div class="space-y-2">
						<FacilityLink data={effector.facility} />
						<Address data={effector.address} />
					</div>
					<div class="h-56 w-64 lg:h-64 lg:w-96 p-2">
						<Map data={createMapData(effector.address)} />
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-row-reverse">
		<Back />
	</div>
</div>
