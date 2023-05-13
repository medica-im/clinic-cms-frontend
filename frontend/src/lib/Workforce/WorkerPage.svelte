<script lang="ts">
	import type { Worker } from '$lib/interfaces/workforce.interface';
	import { variables } from '$lib/utils/constants';
	import LL from '$i18n/i18n-svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Payment from '$components/Addressbook/Payment/Payment.svelte';
	import Cost from '$components/Addressbook/Cost/Cost.svelte';
	import Info from '$components/Addressbook/Info/Info.svelte';
	import Appointment from './Appointment.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import { workerTitleFormattedName } from '$lib/helpers/stringHelpers';
	import WorkerFacility from '$lib/components/Worker/WorkerFacility.svelte';
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faCircleNodes } from '@fortawesome/free-solid-svg-icons';

	export let userData: Worker;

	if (import.meta.env.VITE_DEV == 'true') {
		console.log(JSON.stringify(userData));
	}

	function getUrl(userData: Worker) {
		if (userData.profile_picture_url && userData.profile_picture_url.lt) {
			return variables.BASE_URI + userData.profile_picture_url.lt;
		} else {
			return `${variables.BASE_URI}/media/profile_images/default_profile_picture.png`;
		}
	}
</script>

<div class="lg:flex m-auto font-serif m-4 p-4 gap-8">
	<div class="space-y-2">
		<h2 class="w-full text-2xl">
			{workerTitleFormattedName(userData)}
		</h2>

		{#each userData.occupations as occupation}
			{#if occupation.specialty}
				<h3>
					{occupation.specialty.label}
				</h3>
				{#each occupation.specialty.facilities as facility}
					<WorkerFacility {facility} />
				{/each}
			{:else}
				<h3>
					{occupation.label}
				</h3>
				{#each occupation.facilities as facility}
					<WorkerFacility {facility} />
				{/each}
			{/if}
		{/each}
		<ul class="py-4 space-y-4">
			{#if userData.appointments && userData.appointments.length}
				<li class="list-group-item d-flex justify-content-between align-items-start">
					<Appointment appointments={userData.appointments} />
				</li>
			{/if}
			{#if userData.account_email}
				<li class="list-group-item d-flex justify-content-between align-items-start">
					<div class="flex items-center p-1">
						<div class="w-9"><Fa icon={faEnvelope} /></div>
						<div>
							<h3>Email</h3>
						</div>
					</div>
					<div class="flex p-1">
						<div class="w-9" />
						<div>
					{userData.account_email}
					
					</div>
				</div>
				</li>
			{/if}

			{#if userData.phone_numbers}
				{#each Object.keys(userData.phone_numbers) as key}
					{#each userData.phone_numbers[key] as phone}
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<p class="card-text"><small class="text-muted">{key}: {phone}</small></p>
						</li>
					{/each}
				{/each}
			{/if}

			<li class="list-group-item d-flex justify-content-between align-items-start">
				<Cost data={userData} />
			</li>
			{#if userData.payment != null}
				<li class="list-group-item d-flex justify-content-between align-items-start">
					<Payment data={userData.payment} />
				</li>
			{/if}
			<li class="list-group-item d-flex justify-content-between align-items-start">
				<Info data={userData}/>
			</li>
			{#if userData.websites.length}
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faGlobe} /></div>
					<div>
						<h3>Web</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="space-x-2">
						{#each userData.websites as website}
							<Website {website} />
						{/each}
					</div>
				</div>
			{/if}
			{#if userData.socialnetworks.length}
				<li class="list-group-item d-flex justify-content-between align-items-start">
					<div class="flex items-center p-1">
						<div class="w-9"><Fa icon={faCircleNodes} /></div>
						<div>
							<h3>{$LL.ADDRESSBOOK.SOMED()}</h3>
						</div>
					</div>
					<div class="flex p-1">
						<div class="w-9" />
						<div class="space-x-2">
							<SoMed data={userData.socialnetworks} appBar={false} />
						</div>
					</div>
				</li>
			{/if}
		</ul>
	</div>
	<div class="p-4 space-y-2">
		<img
			src={getUrl(userData)}
			alt="{$LL.ADDRESSBOOK.A11Y.PROFILE_PIC_OF()}  {workerTitleFormattedName(userData)}"
			class="w-auto h-auto lg:w-72 lg:h-72 rounded-lg"
		/>
	</div>
</div>
