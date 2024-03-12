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
	import Map from '$components/Map/Map.svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Appointment from '$lib/components/Effector/Appointment/Appointments.svelte';
	import Cost from '$lib/components/Effector/Cost/Cost.svelte';
	import Payment from '$components/Addressbook/Payment/Payment.svelte';
	import FacilityLink from '$lib/components/Facility/FacilityLink.svelte';
	import Info from '$lib/components/Effector/Info/Info.svelte';
	import Avatar from '$lib/components/Effector/Avatar/Avatar.svelte';
	import Back from '$components/Directory/Back.svelte';
	export let effector: any;
</script>

<svelte:head>
	<title>
		{effector.name} - {capitalizeFirstLetter($page.data.facility.formatted_name, $language)}
	</title>
</svelte:head>

<div class="flex flex-col m-2 space-y-8">
	<div class="flex flex-wrap max-w-3xl p-2 gap-8">
		<div class="space-y-2">
			<h2 class="h3">{effector.name}</h2>
			<h3 class="h4 italic">{effector?.effector_type?.name}</h3>
			<FacilityLink data={effector.facility} />
		</div>
		<div class="flex-none">
			{#if effector?.avatar}
				<Avatar data={effector} />
			{/if}
		</div>
	</div>
	{#if effector?.appointments?.length}
		<div class="card max-w-3xl variant-ghost p-2 d-flex justify-content-between align-items-start">
			<Appointment appointments={effector.appointments} />
		</div>
	{/if}
	<div class="flex flex-wrap card variant-ghost max-w-3xl gap-8 p-2">
		{#if effector.phones?.length}
			<div class="d-flex justify-content-between align-items-start">
				<div class="flex items-center py-2">
					<div class="w-9"><Fa icon={faPhone} /></div>
					<div>
						<h3 class="h4">{capitalizeFirstLetter($LL.PHONE())}</h3>
					</div>
				</div>
				<div class="flex items-center p-2">
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
					<div class="w-9"><Fa icon={faEnvelope} /></div>
					<div>
						<h3>Email</h3>
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
	</div>
	<div class="flex flex-wrap card variant-ghost max-w-3xl gap-8 p-2">
		<div>
			<Cost data={effector} />
		</div>
		{#if effector?.payment_methods?.length}
			<div class="d-flex justify-content-between align-items-start">
				<Payment data={effector.payment_methods} />
			</div>
		{/if}
	</div>
	<div class="flex flex-wrap card variant-ghost max-w-3xl gap-8 p-2">
		{#if effector.websites?.length}
			<div class="d-flex justify-content-between align-items-start">
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faGlobe} /></div>
					<div>
						<h3>Web</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="py-2 space-x-2">
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
						<h3>{$LL.ADDRESSBOOK.SOMED()}</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="py-2 space-x-2">
						<SoMed data={effector.socialnetworks} appBar={false} />
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="flex flex-wrap card variant-ghost max-w-3xl gap-4 p-2">
	{#if effector?.spoken_languages || effector?.rpps || effector?.adeli}
		<div class="d-flex justify-content-between align-items-start">
			<Info data={effector} />
		</div>
	{/if}
	</div>
	{#if effector.address}
	<div class="card max-w-3xl variant-ghost p-2">
		<div class="d-flex justify-content-between align-items-start">
			<div class="flex items-center p-1">
				<div class="w-9"><Fa icon={faMapLocationDot} /></div>
				<div>
					<h3>{capitalizeFirstLetter($LL.ADDRESSBOOK.LOCATION())}</h3>
				</div>
			</div>
			<div class="flex p-1">
				<div class="w-9" />
				<div class="p-2 space-y-2 h-96 w-full">
					<FacilityLink data={effector.facility} />
					<Address data={effector.address} />
					<Map data={effector.address} />
				</div>
			</div>
		</div>
	</div>
	{/if}
	<div class="flex flex-row-reverse">
		<Back />
	</div>
</div>
