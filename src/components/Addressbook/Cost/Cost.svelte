<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	export let data;
</script>

{#if data.conventionnement || data.carte_vitale || data.third_party_payer.length}
	<div class="flex items-center p-1">
		<div class="w-9"><Fa icon={faEuroSign} /></div>
		<div>
			<h3 class="h3">
				{$LL.ADDRESSBOOK.COSTS_AND_REIMBURSEMENTS()}
			</h3>
		</div>
	</div>
	{#if data.conventionnement != null}
		<div class="flex p-1">
			<div class="w-9" />
			<div>
				Conventionnement: {data.conventionnement.label}.
			</div>
		</div>
	{/if}

	{#if data.carte_vitale != null}
		<div class="flex p-1">
			<div class="w-9" />
			<div>
				Carte Vitale: {data.carte_vitale ? $LL.YES() : $LL.NO()}.
			</div>
		</div>
	{/if}

	{#if data.third_party_payer.length}
		<div class="flex p-1">
			<div class="w-9" />
			<div>
				{$LL.ADDRESSBOOK.THIRD_PARTY_PAYER()}:
				{#each data.third_party_payer as p, i}
					{#if i > 0}{' '}{/if}{p.label}{#if i < data.length - 2},
					{:else if i == data.length - 2}{' '}{$LL.AND()}{:else}.{/if}
				{/each}
			</div>
		</div>
	{/if}
{/if}
