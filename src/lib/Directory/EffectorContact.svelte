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
		faMapLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import * as m from "$msgs";	import Emails from '$lib/Email/Emails.svelte';
	import Phones from './Phones.svelte';
	import Address from './Address.svelte';
	import Websites from '$lib/Website/Websites.svelte';
	import { Map } from '$lib';
	import { createMapData } from '$lib';
	import SoMed from '$lib/SoMed/SoMed.svelte';
	import Appointment from '$lib/components/Effector/Appointment/Appointments.svelte';
	import Cost from '$lib/components/Effector/Cost/Cost.svelte';
	import Payment from '$lib/Addressbook/Payment/Payment.svelte';
	import { FacilityLink } from '$lib';
	import Info from '$lib/components/Effector/Info/Info.svelte';
	import AvatarList from '$lib/components/Effector/Avatar/Avatar.svelte';
	import Back from '$lib/components/Directory/Back.svelte';
	import { copy } from 'svelte-copy';
	import type { User } from '$lib/interfaces/user.interface.ts';

	export let effector: any;
	export let userData: User;
</script>

<svelte:head>
	<title>
		{effector.name} - {capitalizeFirstLetter($page.data.organization.formatted_name, $language)}
	</title>
</svelte:head>

<div class="grid grid-col-1 justify-center space-y-4">
	<div class="flex flex-wrap p-2 gap-10">
		<div class="space-y-2">
			<h2 class="h2 flex-initial break-words overflow-hidden">{effector.name}</h2>
			{#if userData && userData?.is_staff}	
				{effector?.effector_uid}
				<button use:copy={effector?.effector_uid}>
					Copy!
				</button>			
			{/if}
			<h3 class="h3 italic">{effector?.effector_type?.label}</h3>
				{#if userData && userData?.is_staff}
				
					{effector?.effector_type?.uid}
					<button use:copy={effector?.effector_type?.uid}>
						Copy!
					</button>			
			    
				{/if}
			
			<FacilityLink data={effector.facility} />
		</div>
		<div class="flex-none">
			{#if effector?.avatar}
				<AvatarList data={effector} />
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
						<h3 class="h3">{capitalizeFirstLetter(m.PHONE())}</h3>
					</div>
				</div>
				<div class="flex items-center p-1">
					<div class="w-9"></div>
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
					<div class="w-9"></div>
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
					<div class="w-9"></div>
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
						<h3 class="h3">{m.ADDRESSBOOK_SOMED()}</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9"></div>
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
					<h3 class="h3">{capitalizeFirstLetter(m.ADDRESSBOOK_LOCATION())}</h3>
				</div>
			</div>
			<div class="flex p-1">
				<div class="w-9"></div>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-1">
					<div class="space-y-2">
						<FacilityLink data={effector.facility} />
						<Address data={effector.address} />
					</div>
					{#if effector.address.longitude && effector.address.latitude}
					<div class="h-56 w-64 lg:h-64 lg:w-96 p-2 z-0">
						<Map data={createMapData(effector.address, effector.facility.name)} />
					</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-row-reverse">
		<Back />
	</div>
</div>
