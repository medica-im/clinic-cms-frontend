<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faMobileScreen, faPhone } from '@fortawesome/free-solid-svg-icons';
	export let data;
</script>

<address>
	{data?.address?.street}<br />
	{data?.address?.zip}
	{data?.address?.city ?? 'city'}
	{#if data?.address?.state}<br />
		{data.address.state}
	{/if}
	{#if data?.phones}<br />
		<ul class="list">
			{#each data.phones as phone}
				<li>
					<span
						>{#if ['M', 'MW'].includes(phone.type)}<Fa
								icon={faMobileScreen}
							/>{:else if ['W'].includes(phone.type)}<Fa icon={faPhone} />{/if}</span
					>
					<span class="flex-auto"><a href="tel:{phone.phone}">{phone.phone}</a></span>
				</li>
			{/each}
		</ul>
	{/if}
</address>
