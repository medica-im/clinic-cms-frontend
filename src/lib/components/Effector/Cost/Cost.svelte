<script lang="ts">
	import * as m from "$msgs";	import Fa from 'svelte-fa';
	import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	export let data;
</script>

	<div class="flex items-center p-1">
		<div class="w-9"><Fa icon={faEuroSign} size="sm" /></div>
		<div>
			<h3 class="h3">
				{m.ADDRESSBOOK_COSTS_AND_REIMBURSEMENTS()}
			</h3>
		</div>
	</div>
	{#if data?.convention != null}
		<div class="flex p-1">
			<div class="w-9" />
			<div class="p-1">
				Conventionnement: {data.convention.label}.
			</div>
		</div>
	{/if}

	{#if data?.carte_vitale != null}
		<div class="flex p-1">
			<div class="w-9" />
			<div class="p-1">
				Carte Vitale: {data.carte_vitale ? m.YES() : m.NO()}.
			</div>
		</div>
	{/if}

	{#if data?.third_party_payers?.length}
		<div class="flex p-1">
			<div class="w-9" />
			<div class="p-1">
				{m.ADDRESSBOOK_THIRD_PARTY_PAYER()}:
				{#each data.third_party_payers as p, i}
					{@const count = data.third_party_payers.length}
					{#if i > 0}{' '}{/if}{p.label_fr}{#if i < count - 2},{:else if i == count - 2}{' '}{m.AND()}{:else}.{/if}
				{/each}
			</div>
		</div>
	{/if}
