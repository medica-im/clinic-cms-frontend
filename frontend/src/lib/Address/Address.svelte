<script>
	import { onMount } from 'svelte';
    import { beforeUpdate, afterUpdate } from 'svelte';
	export let contactData;
	let addressData = {
        "formattedName": null,
			"street": null,
			"zip": null,
			"city": null,
			"state": null
    };

    $: contactData && createAddressData();

    function createAddressData() {
        addressData = {
			"formattedName": contactData.formatted_name,
			"street": contactData.addresses[0].street,
			"zip": contactData.addresses[0].zip,
			"city": contactData.addresses[0].city,
			"state": contactData.addresses[0].state
		};

    };
</script>

<address>
	{addressData?.formattedName ?? ''}<br />
	{addressData?.street ?? ''}<br />
	{addressData?.zip ?? ''}
	{addressData?.city ?? ''}
    {#if addressData.state}<br />
	{addressData?.state ?? ''}{/if}
</address>
