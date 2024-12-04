<script lang="ts">
	import isEmpty from 'lodash.isempty';
	import { page } from '$app/stores';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import Fa from 'svelte-fa';
	import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import type { URLSearchParams } from 'url';

	function isSearchParamsEmpty(searchParams: URLSearchParams): boolean {
		const params: string[] = ['term', 'situation', 'facility', 'types', 'communes'];
		for (let param of params) {
			if (searchParams.get(param)!=null) return false;
		}
		return true;
	}

	function buildUrl(searchParams: URLSearchParams): string {
		let origin = searchParams.get('origin');
		if (origin == '/annuaire') {
			return origin;
		}
		let params: string[] = [];
		const situationParam = searchParams.get('situation');
		if (situationParam) {
			params.push(`situation=${encodeURIComponent(situationParam)}`);
		}
		const facilityParam = searchParams.get('facility');
		if (facilityParam) {
			params.push(`facility=${encodeURIComponent(facilityParam)}`);
		}
		const communesParam = searchParams.get('communes');
		if (communesParam) {
			params.push(`communes=${encodeURIComponent(communesParam)}`);
		}
		const typesParam = searchParams.get('types');
		if (typesParam) {
			params.push(`types=${encodeURIComponent(typesParam)}`);
		}
		const termParam = searchParams.get('term');
		if (termParam) {
			params.push(`term=${encodeURIComponent(termParam)}`);
		}
		const addressParam = searchParams.get('address');
		if (addressParam) {
			params.push(`address=${encodeURIComponent(addressParam)}`);
		}
		const parameters = params.join('&');
		let url = `${origin}`;
		if (params.length) url+=`?${parameters}`;
		return url;
	}
</script>

{#if $page.url.searchParams.get('origin')}
	<a href={buildUrl($page.url.searchParams)} class="btn variant-filled">
		{#if isSearchParamsEmpty($page.url.searchParams)}
			<span class="badge variant-filled-primary"> <Fa icon={faArrowRight} /></span>
			<span class="whitespace-normal text-left">
				{capitalizeFirstLetter($LL.NAVBAR.ADDRESSBOOK())}
			</span>
		{:else}
			<span class="badge variant-filled-primary"> <Fa icon={faArrowLeft} /></span>
			<span class="whitespace-normal text-left">
				{capitalizeFirstLetter($LL.ADDRESSBOOK.GOTOSEARCH())}
			</span>
		{/if}
	</a>
{/if}
