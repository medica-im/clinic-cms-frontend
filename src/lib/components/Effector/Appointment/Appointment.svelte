<script lang="ts">
	import * as m from "$msgs";	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
	import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
	import type { Appointment } from '$lib/interfaces/appointment.interface.ts';

	export let appointment: Appointment;
</script>

{#if appointment.url}
	<a href={appointment.url} rel="external" class="btn variant-ghost-secondary">
		<span><Fa icon={faGlobe} size="sm" /></span><span>{m.WEBSITE()}</span></a
	>
{:else if appointment.phone}
<a href="tel:{appointment.phone}" rel="external" class="btn variant-ghost-secondary">
	<span><Fa icon={faPhone} size="sm" /></span><span>{appointment.phone}</span></a
>	
<!--a href="tel:{appointment.phone}">{appointment.phone}</a-->
{/if}
