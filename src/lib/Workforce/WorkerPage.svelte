<script lang="ts">
	import { capitalizeFirstLetter as cFL } from '$lib/helpers/stringHelpers';
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
	import { faGlobe, faCircleNodes, faPhone, faBook } from '@fortawesome/free-solid-svg-icons';
	import WorkerProfile from './WorkerProfile.svelte';
    import { displayEditor } from '$lib/utils/permissions';
    import { isAuth } from '$lib/store/authStore';
	import { page } from '$app/stores';
	import { userData } from '$lib/store/userStore';

	export let workerData: Worker;

	if (import.meta.env.VITE_DEV == 'true') {
		console.log(JSON.stringify(workerData));
	}

	function getUrl(wD: Worker) {
		const path = wD.profile_picture_url?.lt || '/media/profile_images/default_profile_picture.png'
			return `${variables.BASE_URI}${path}`;
		}
</script>

<div class="lg:flex m-auto font-serif m-4 p-4 gap-8">
	<div class="space-y-2">
		<h2 class="w-full text-2xl">
			{workerTitleFormattedName(workerData)}
		</h2>

		{#each workerData.occupations as occupation}
			{#if occupation.specialty}
				<h3 class="h3">
					{occupation.specialty.label}
				</h3>
				{#each occupation.specialty.facilities as facility}
					<WorkerFacility {facility} />
				{/each}
			{:else}
				<h3 class="h3">
					{occupation.label}
				</h3>
				{#each occupation.facilities as facility}
					<WorkerFacility {facility} />
				{/each}
			{/if}
		{/each}
		<ul class="py-4 space-y-4">
			{#if workerData?.appointments?.length}
				<li class="d-flex justify-content-between align-items-start">
					<Appointment appointments={workerData.appointments} />
				</li>
			{/if}
			{#if workerData.account_email}
				<li class="d-flex justify-content-between align-items-start">
					<div class="flex items-center p-1">
						<div class="w-9"><Fa icon={faEnvelope} /></div>
						<div>
							<h3 class="h3">Email</h3>
						</div>
					</div>
					<div class="flex p-1">
						<div class="w-9" />
						<div>
							<a class="anchor" href="mailto:{workerData.account_email}">{workerData.account_email}</a>
						</div>
					</div>
				</li>
			{/if}

			{#if workerData.phone_numbers.length}
				<li class="d-flex justify-content-between align-items-start">
					<div class="flex items-center p-1">
						<div class="w-9"><Fa icon={faPhone} /></div>
						<div>
							<h3 class="h3">{cFL($LL.PHONE())}</h3>
						</div>
					</div>

					{#each workerData.phone_numbers as p}
						<div class="flex p-1">
							<div class="w-9" />
							<div>
								<a class="anchor" href="tel:{p.phone}" rel="nofollow">{p.phone}</a> ({p.type_display})
							</div>
						</div>
					{/each}
				</li>
			{/if}

			<li class="d-flex justify-content-between align-items-start">
				<Cost data={workerData} />
			</li>
			{#if workerData.payment != null}
				<li class="d-flex justify-content-between align-items-start">
					<Payment data={workerData.payment} />
				</li>
			{/if}
			<li class="d-flex justify-content-between align-items-start">
				<Info data={workerData} />
			</li>
			{#if workerData.websites.length}
				<li class="d-flex justify-content-between align-items-start">
					<div class="flex items-center p-1">
						<div class="w-9"><Fa icon={faGlobe} /></div>
						<div>
							<h3 class="h3">Web</h3>
						</div>
					</div>
					<div class="flex p-1">
						<div class="w-9" />
						<div class="space-x-2">
							{#each workerData.websites as website}
								<Website {website} />
							{/each}
						</div>
					</div>
				</li>
			{/if}
			{#if workerData.socialnetworks.length}
				<li class="d-flex justify-content-between align-items-start">
					<div class="flex items-center p-1">
						<div class="w-9"><Fa icon={faCircleNodes} /></div>
						<div>
							<h3 class="h3">{$LL.ADDRESSBOOK.SOMED()}</h3>
						</div>
					</div>
					<div class="flex p-1">
						<div class="w-9" />
						<div class="space-x-2">
							<SoMed data={workerData.socialnetworks} appBar={false} />
						</div>
					</div>
				</li>
			{/if}
			{#if (workerData?.profile?.text != null) && (workerData?.profile?.text != "")}
			<li class="d-flex justify-content-between align-items-start">
				<div class="flex items-center p-1">
					<div class="w-9"><Fa icon={faBook} /></div>
					<div>
						<h3 class="h3">{cFL($LL.PROFILE())}</h3>
					</div>
				</div>
				<div class="flex p-1">
					<div class="w-9" />
					<div class="space-x-2">
						{@html workerData.profile.text}<WorkerProfile data={workerData} name={$LL.PROFILE()}/>
					</div>
				</div>
			</li>
		   {:else if $userData && displayEditor($userData, workerData.user_id)}
		   <li class="d-flex justify-content-between align-items-start">
			<div class="flex items-center p-1">
				<div class="w-9"><Fa icon={faBook} /></div>
				<div>
					<h3 class="h3">{cFL($LL.PROFILE())}</h3>
				</div>
			</div>
			<div class="flex p-1">
				<div class="w-9" />
				<div class="space-x-2">
					<WorkerProfile data={workerData} name={$LL.PROFILE()}/>
				</div>
			</div>
		</li>
		   {/if}
		</ul>
	</div>
	<div class="p-4 space-y-2">
		<img
			src={getUrl(workerData)}
			alt="{$LL.ADDRESSBOOK.A11Y.PROFILE_PIC_OF()}  {workerTitleFormattedName(workerData)}"
			class="w-auto h-auto md:w-72 md:h-72 rounded-lg"
		/>
	</div>
</div>
