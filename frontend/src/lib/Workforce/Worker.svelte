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

<div class="card font-serif m-2 p-2 lg:grid grid-flow-col auto-cols-max">
	<div class="flex w-50 m-2">
		<a href="/{workerData.slug}">
			<img
				src={getUrl(workerData.profile_picture_url.fb)}
				alt="{$LL.ADDRESSBOOK.A11Y.PROFILE_PIC_OF()}  {workerTitleFormattedName(workerData)}"
				class="w-32 md:w-40 lg:w-48 h-auto rounded-lg"
			/>
		</a>
	</div>
	<div class="m-2 content-start">
		<div class="my-2">
			<a href="/{workerData.slug}" class="">
				<h3>
					{workerTitleFormattedName(workerData)}
				</h3>
			</a>
		</div>
		<div class="my-2">
			{#each workerData.occupations as occupation}
				{#if occupation.name == currentOccupationName}
					{#if occupation.specialty}
						<div class="my-2">
							<h5>
								{occupation.specialty.label}
							</h5>
						</div>
						{#each occupation.specialty.facilities as facility}
							<div class="my-2">
								<WorkerFacility {facility} />
							</div>
						{/each}
					{:else}
						<div class="my-2">
							<h5>
								{occupation.label}
							</h5>
						</div>
						{#each occupation.facilities as facility}
							<div class="my-2">
								<WorkerFacility {facility} />
							</div>
						{/each}
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</div>
