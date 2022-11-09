<script>
	export let contactData;
	let addressData = {
		formattedName: null,
		street: null,
		zip: null,
		city: null,
		state: null
	};

	$: contactData && createAddressData();

	function createAddressData() {
		if (contactData.addresses.length > 0) {
			addressData = {
				formattedName: contactData.formatted_name,
				street: contactData.addresses[0].street,
				zip: contactData.addresses[0].zip,
				city: contactData.addresses[0].city,
				state: contactData.addresses[0].state,
				phones: contactData.phonenumbers
			};
		}
	}
</script>

<address>
	{addressData?.street ?? 'street'}<br />
	{addressData?.zip ?? 'zip'}
	{addressData?.city ?? 'city'}
	{#if addressData.state}<br />
		{addressData?.state}
	{/if}
	{#if addressData.phones}<br />
	{#each addressData.phones as phone}
	{phone.phone}
	{/each}
	{/if}
</address>
