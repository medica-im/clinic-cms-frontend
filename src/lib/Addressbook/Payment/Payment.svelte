<script lang="ts">
	import * as m from "$msgs";	import Fa from 'svelte-fa';
	import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	export let data;
</script>

<div class="flex items-center p-1">
	<div class="w-9"><Fa icon={faCreditCard} size="sm" /></div>
	<div>
		<h3 class="h3">
			{#if data.length < 2}{m.ADDRESSBOOK_PAYMENT_METHOD()}{:else}{m.ADDRESSBOOK_PAYMENT_METHODS()}{/if}
        </h3>
	</div>
</div>
<div class="flex p-1">
	<div class="w-9"></div>
	<div class="p-1">
		{#each data as method, i}
			{#if i == 0}{capitalizeFirstLetter(
					method.label_fr
				)}{:else}{' '}{method.label_fr}{/if}{#if i < data.length - 2},
			{:else if i == data.length - 2}{' '}{m.AND()}{:else}.{/if}
		{/each}
	</div>
</div>
