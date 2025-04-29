<script lang="ts">
	import isEmpty from 'lodash.isempty';
	import { page } from '$app/state';
	import { beforeUpdate } from 'svelte';
	import * as m from "$msgs";
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import Fa from 'svelte-fa';
	import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import {
		term,
		selectCommunes,
		selectCategories,
		selectSituation,
		addressFeature,
		selectFacility
	} from '$lib/store/directoryStore';

	let origin: string | null = null;

	beforeUpdate(() => {
		origin = page.url.searchParams.get('origin');
	});
</script>

{#if origin}
	<a href={origin} class="btn variant-filled">
		{#if $term.length || $selectCommunes.length || $selectCategories.length || $selectSituation.length || $selectFacility || !isEmpty($addressFeature)}
			<span class="badge variant-filled-primary"> <Fa icon={faArrowLeft} /></span>
			<span class="whitespace-normal text-left">
				{capitalizeFirstLetter(m.ADDRESSBOOK_GOTOSEARCH())}
			</span>
		{:else}
			<span class="badge variant-filled-primary"> <Fa icon={faArrowRight} /></span>
			<span class="whitespace-normal text-left">
				{capitalizeFirstLetter(m.NAVBAR_ADDRESSBOOK())}
			</span>
		{/if}
	</a>
{/if}
