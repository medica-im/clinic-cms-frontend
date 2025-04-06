<script lang="ts">
	import * as m from "$msgs";
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
				{m.ADDRESSBOOK_COSTS_AND_REIMBURSEMENTS()}
			</h3>
		</div>
	</div>
	{#if data.conventionnement != null}
		<div class="flex p-1">
			<div class="w-9"></div>
			<div>
				Conventionnement: {data.conventionnement.label}.
			</div>
		</div>
	{/if}

	{#if data.carte_vitale != null}
		<div class="flex p-1">
			<div class="w-9" />
			<div>
				Carte Vitale: {data.carte_vitale ? m.YES() : m.NO()}.
			</div>
		</div>
	{/if}

	{#if data.third_party_payer.length}
		<div class="flex p-1">
			<div class="w-9" />
			<div>
				{m.ADDRESSBOOK_THIRD_PARTY_PAYER()}:
				{#each data.third_party_payer as p, i}
					{#if i > 0}{' '}{/if}{p.label}{#if i < data.length - 2},
					{:else if i == data.length - 2}{' '}{m.AND()}{:else}.{/if}
				{/each}
			</div>
		</div>
	{/if}
{/if}
