<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe } from '@fortawesome/free-solid-svg-icons';
	import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
	import Appointment from './Appointment.svelte';
	import type { Appointment as AppointmentType } from '$lib/interfaces/appointment.interface';

	export let appointments: AppointmentType[];
</script>

<div class="flex items-center p-1">
	<div class="w-9"><Fa icon={faCalendarCheck} /></div>
	<div>
		<h3 class="h4">{$LL.ADDRESSBOOK.APPOINTMENT.LABEL()}</h3>
	</div>
</div>
<div class="flex items-center p-1">
	<div class="w-9" />
		{#if appointments.some((a) => a.house_call)}
			<div class="flex flex-wrap gap-8">
				<div class="p-2">
					<p>Pour des soins à domicile</p>
					<div class="space-y-2 py-2">
						{#each appointments.filter((a) => a.house_call) as appointment}
							<div>
								<Appointment {appointment} />
							</div>
						{/each}
					</div>
				</div>
				<div class="p-2">
					<p>Pour des soins au cabinet</p>
					<div class="space-y-2 py-2">
						{#each appointments.filter((a) => !a.house_call) as appointment}
							<div>
								<Appointment {appointment} />
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<ul class="space-y-2 py-2">
				{#each appointments as appointment}
					<li>
						<Appointment {appointment} />
					</li>
				{/each}
			</ul>
		{/if}
</div>
