<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import WorkerFacility from '$lib/components/Worker/WorkerFacility.svelte';
	import type { Worker } from '$lib/interfaces/workforce.interface';
	import LL from '$i18n/i18n-svelte';
	import { workerTitleFormattedName } from '$lib/helpers/stringHelpers';

	export let workerData: Worker;
	export let currentOccupationName;

	function getUrl(url) {
		if (!url) {
			return `${variables.BASE_URI}/media/profile_images/default_profile_picture_170x170.png`;
		}
		return variables.BASE_URI + url;
	}
</script>

<div class="card flex flex-wrap font-serif m-2 p-2">
	<div class="flex-none w-52 h-52 relative">
		<a href="/{workerData.slug}">
			<img
				src={getUrl(workerData.profile_picture_url.fb)}
				alt="{$LL.ADDRESSBOOK.A11Y.PROFILE_PIC_OF()}  {workerTitleFormattedName(workerData)}"
				class="object-scale-down w-96 h-auto rounded-lg"
			/>
		</a>
	</div>
	<div class="p-2 m-2">
		<a href="/{workerData.slug}" class="">
			<h3>
				{workerTitleFormattedName(workerData)}
			</h3>
		</a>

		{#each workerData.occupations as occupation}
			{#if occupation.name == currentOccupationName}
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
			{/if}
		{/each}
	</div>
</div>