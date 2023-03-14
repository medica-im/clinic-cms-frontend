<script lang="ts">
	import type { Worker } from '$lib/interfaces/workforce.interface';
	import { variables } from '$lib/utils/constants';
	import LL from '$i18n/i18n-svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Appointment from './Appointment.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import { workerTitleFormattedName } from '$lib/helpers/stringHelpers';
	import WorkerFacility from '$lib/components/Worker/WorkerFacility.svelte';

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
			<p>
				{#if occupation.specialty}
					<h5>
						{occupation.specialty.label}
					</h5>
					{#each occupation.specialty.facilities as facility}
						<WorkerFacility {facility} />
					{/each}
				{:else}
					<h5>
						{occupation.label}
					</h5>
					{#each occupation.facilities as facility}
						<WorkerFacility {facility} />
					{/each}
				{/if}
			</p>
		{/each}
		<ul class="list-group list-group">
			{#if userData.account_email}
				<li class="list-group-item d-flex justify-content-between align-items-start">
					<p class="card-text">
						<small class="text-muted">{userData.account_email}</small>
					</p>
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

			{#if userData.websites}
				<ul
					class="mb-12 whitespace-nowrap no-scrollbar overflow-x-scroll overflow-y-hidden space-x-2"
				>
					{#each userData.websites as website}
						<li class="w-fit inline-block">
							<Website {website} />
						</li>
					{/each}
				</ul>
			{/if}
			{#if userData.appointments && userData.appointments.length}
				<Appointment appointments={userData.appointments} />
			{/if}
		</ul>
	</div>
	<div class="card p-4 space-y-2">
		<img
			src={getUrl(userData)}
			alt="{$LL.ADDRESSBOOK.A11Y.PROFILE_PIC_OF()}  {workerTitleFormattedName(userData)}"
			class="w-auto h-auto lg:w-72 lg:h-72 rounded-lg"
		/>
		<div>
			{#if userData.socialnetworks}
				<SoMed data={userData.socialnetworks} appBar={false} />
			{/if}
		</div>
	</div>
</div>
