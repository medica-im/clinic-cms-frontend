<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	export let data;
</script>

<div class="flex items-center p-1">
	<div class="w-9"><Fa icon={faCreditCard} size="sm" /></div>
	<div>
		<h3 class="h3">
			{#if data.length < 2}{$LL.ADDRESSBOOK.PAYMENT_METHOD()}{:else}{$LL.ADDRESSBOOK.PAYMENT_METHODS()}{/if}
        </h3>
	</div>
</div>
<div class="flex p-1">
	<div class="w-9" />
	<div class="p-1">
		{#each data as method, i}
			{#if i == 0}{capitalizeFirstLetter(
					method.label_fr
				)}{:else}{' '}{method.label_fr}{/if}{#if i < data.length - 2},
			{:else if i == data.length - 2}{' '}{$LL.AND()}{:else}.{/if}
		{/each}
	</div>
</div>
