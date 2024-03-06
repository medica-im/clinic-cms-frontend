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
	import FacilityLink from '$lib/components/Facility/FacilityLink.svelte';
	import Back from '$components/Directory/Back.svelte';
	export let effector: any;
</script>

<svelte:head>
	<title>
		{effector.name} - {capitalizeFirstLetter($page.data.facility.formatted_name, $language)}
	</title>
</svelte:head>

<div class="flex flex-col m-2 space-y-8">
	<h2 class="h3">{effector.name}</h2>
	<h3 class="h4 italic">{effector?.effector_type?.name}</h3>
		{#if effector?.appointments?.length}
			<div class="card max-w-md variant-ghost p-1 d-flex justify-content-between align-items-start">
				<Appointment appointments={effector.appointments} />
			</div>
		{/if}
		{#if effector.phones?.length}
			<div class="card variant-ghost max-w-md p-1 d-flex justify-content-between align-items-start">
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faPhone} /></div>
					<div>
						<h3 class="h4">{capitalizeFirstLetter($LL.PHONE())}</h3>
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
		<ul class="py-4 space-y-4">
		{#if effector.emails?.length}
			<li class="d-flex justify-content-between align-items-start">
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faEnvelope} /></div>
					<div>
						<h3>Email</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="py-2 space-x-2">
						<Emails data={effector.emails} />
					</div>
				</div>
			</li>
		{/if}
		{#if effector.websites?.length}
			<li class="d-flex justify-content-between align-items-start">
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
			</li>
		{/if}
		{#if effector.socialnetworks?.length}
			<li class="d-flex justify-content-between align-items-start">
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
			</li>
		{/if}
		{#if effector.address}
			<li class="d-flex justify-content-between align-items-start">
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faMapLocationDot} /></div>
					<div>
						<h3>{capitalizeFirstLetter($LL.ADDRESSBOOK.LOCATION())}</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="py-2 space-x-2 space-y-4 h-64 w-full">
						<FacilityLink data={effector.facility} />
						<Address data={effector.address} />
						<Map data={effector.address} />
					</div>
				</div>
			</li>
		{/if}
	</ul>
	<div class="pt-32 flex flex-row-reverse">
		<Back />
	</div>
</div>



