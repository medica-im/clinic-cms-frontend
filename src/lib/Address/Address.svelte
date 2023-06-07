<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faMobileScreen, faPhone } from '@fortawesome/free-solid-svg-icons';
	export let data;
	export let formattedName = false;

	let addressData = {
		formattedName: data.formatted_name,
		street: data.addresses[0].street,
		zip: data.addresses[0].zip,
		city: data.addresses[0].city,
		state: data.addresses[0].state,
		phones: data.phonenumbers
	};
</script>

<address>
	{#if formattedName}
	{addressData?.formattedName ?? 'Formatted Name'}
	{/if}
	{addressData?.street ?? 'street'}<br />
	{addressData?.zip ?? 'zip'}
	{addressData?.city ?? 'city'}
	{#if addressData.state}<br />
		{addressData?.state}
	{/if}
	{#if addressData.phones}<br />
	<ul class="list">
	{#each addressData.phones as phone}
	<li>
	<span>{#if ['M', 'MW'].includes(phone.type)}<Fa icon={faMobileScreen}/>{:else if ['W'].includes(phone.type)}<Fa icon={faPhone}/>{/if}</span>
	<span class="flex-auto"><a href="tel:{phone.phone}">{phone.phone}</a></span>
    </li>
	{/each}
</ul>
	{/if}
</address>
