<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	export let data;
</script>

	<div class="flex items-center py-2">
		<div class="w-9"><Fa icon={faEuroSign} /></div>
		<div>
			<h3>
				{$LL.ADDRESSBOOK.COSTS_AND_REIMBURSEMENTS()}
			</h3>
		</div>
	</div>
	{#if data?.convention != null}
		<div class="flex">
			<div class="w-9" />
			<div>
				Conventionnement: {data.convention.label}.
			</div>
		</div>
	{/if}

	{#if data?.carte_vitale != null}
		<div class="flex">
			<div class="w-9" />
			<div>Carte Vitale: {data.carte_vitale ? $LL.YES() : $LL.NO()}.</div>
		</div>
	{/if}

	{#if data?.third_party_payers?.length}
		<div class="flex">
			<div class="w-9" />
			<div>
				{$LL.ADDRESSBOOK.THIRD_PARTY_PAYER()}:
				{#each data.third_party_payers as p, i}
				    {@const count = data.third_party_payers.length}
					{#if i > 0}{' '}{/if}{p.label_fr}{#if i < count - 2},{:else if i == count - 2}{' '}{$LL.AND()}{:else}.{/if}
				{/each}
			</div>
		</div>
	{/if}
