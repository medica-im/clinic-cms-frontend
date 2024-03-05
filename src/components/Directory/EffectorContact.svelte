<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faCircleNodes, faPhone } from '@fortawesome/free-solid-svg-icons';
	import LL from '$i18n/i18n-svelte';
	import Emails from '$components/Email/Emails.svelte';
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import Address from './Address.svelte';
	import Websites from '$components/Website/Websites.svelte';
	import Map from '$components/Map/Map.svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Appointment from '$lib/Workforce/Appointment.svelte';
	export let effector: any;
</script>

<li>
	<h2 class="h3 italic">{effector?.effector_type?.name}</h2>
</li>
{#if effector?.appointments?.length}
	<li class="d-flex justify-content-between align-items-start">
		<Appointment appointments={effector.appointments} />
	</li>
{/if}
{#if effector.phones?.length}
	<li><Phones data={effector.phones} /></li>
{/if}
{#if effector.emails?.length}
	<li><Emails data={effector.emails} /></li>
{/if}
{#if effector.websites?.length}
	<li><Websites data={effector.websites} /></li>
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
			<div class="space-x-2">
				<SoMed data={effector.socialnetworks} appBar={false} />
			</div>
		</div>
	</li>
{/if}
{#if effector.address}
	<li><Address data={effector.address} /></li>
{/if}
<div class="m-1 p-1 h-56 max-w-screen-sm">
	<Map data={effector.address} />
</div>
{#if effector.other_addresses?.length}
	<li><Addresses data={effector.other_addresses} /></li>
{/if}
