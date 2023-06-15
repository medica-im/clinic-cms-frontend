<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faMobileScreen, faPhone } from '@fortawesome/free-solid-svg-icons';
	import { facilityStore } from '$lib/store/facilityStore';
</script>

{#if $facilityStore.legal_entity}
	{@const LE = $facilityStore.legal_entity}
	{LE?.name ?? 'name'}
	<dl>
		{#if LE.type}
		<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dl class="text-sm leading-6">Forme juridique</dl>
				<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{LE?.get_type_display ?? 'type'}</dd>
		</div>
		{/if}
		{#if LE.RNA}
		<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm leading-6">RNA</dt>
			<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{LE?.RNA ?? 'RNA'}</dd>
		</div>
		{/if}
		{#if LE.SIREN}
		<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm leading-6">SIREN</dt>
					<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{LE?.SIREN ?? 'SIREN'}</dd>
			</div>
		{/if}
		{#if LE.SIRET}
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm leading-6">SIRET</dt>
					<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{LE?.SIRET ?? 'SIRET'}</dd>
			</div>
		{/if}
		{#if LE.RCS}
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">				
					<dt class="text-sm leading-6">RCS</dt>
					<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">RCS {LE?.RCS ?? 'RCS'}</dd>
			</div>
			{/if}
			{#if LE.VAT}
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">				
					<dt class="text-sm leading-6">Numéro TVA intracommunautaire</dt>
					<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{LE?.VAT ?? 'VAT'}</dd>
			</div>
			{/if}
			{#if LE.CAPITAL}
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">				
					<dt class="text-sm leading-6">Capital</dt>
					<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{LE?.SHARE_CAPITAL ?? 'SHARE_CAPITAL'}€</dd>
			
			</div>
			{/if}
	</dl>
{/if}
