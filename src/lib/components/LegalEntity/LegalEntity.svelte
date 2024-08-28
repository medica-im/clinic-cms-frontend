<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faMobileScreen, faPhone } from '@fortawesome/free-solid-svg-icons';
	export let data;
</script>

{#if data}
	<div class="flex flex-col">
		<div class="flex flex-col md:flex-row space-x-2">
			<div class="font-semibold md:font-normal">Dénomination</div>
			<div>{data?.name ?? 'name'}</div>
		</div>
		{#if data.type}
			<div class="flex flex-col md:flex-row space-x-2">
				<div class="font-semibold md:font-normal">Forme juridique</div>
				<div>{data?.get_type_display ?? 'type'}</div>
			</div>
		{/if}
		{#if data.RNA}
			<div class="flex flex-col md:flex-row space-x-2">
				<div class="font-semibold md:font-normal">RNA</div>
				<div>{data?.RNA ?? 'RNA'}</div>
			</div>
		{/if}
		{#if data.SIREN}
			<div class="flex flex-col md:flex-row space-x-2">
				<div class="font-semibold md:font-normal">SIREN</div>
				<div>{data?.SIREN ?? 'SIREN'}</div>
			</div>
		{/if}
		{#if data.SIRET}
			<div class="flex flex-col md:flex-row space-x-2">
				<div class="font-semibold md:font-normal">SIRET</div>
				<div>{data?.SIRET ?? 'SIRET'}</div>
			</div>
		{/if}
		{#if data.RCS}
			<div class="flex flex-col md:flex-row space-x-2">
				<div class="font-semibold md:font-normal">RCS</div>
				<div>RCS {data?.RCS ?? 'RCS'}</div>
			</div>
		{/if}
		{#if data.VAT}
			<div class="flex flex-col md:flex-row space-x-2">
				<div class="font-semibold md:font-normal">Numéro TVA intracommunautaire</div>
				<div>{data?.VAT ?? 'VAT'}</div>
			</div>
		{/if}
		{#if data.CAPITAL}
			<div class="flex flex-col md:flex-row space-x-2">
				<div class="font-semibold md:font-normal">Capital</div>
				<div>{data?.SHARE_CAPITAL ?? 'SHARE_CAPITAL'}€</div>
			</div>
		{/if}
	</div>
{/if}
