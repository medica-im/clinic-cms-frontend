<script lang="ts">
	import type { PageData } from './$types';
	import Response from '$lib/components/Survey/Response.svelte';
    import Fa from 'svelte-fa';
    import { faSpaghettiMonsterFlying, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

	export let data: PageData;
</script>

<div class="section-container">
	<h1>{data.survey.label}</h1>

	{#if data.response?.id}
	<h2 class="h2">Contribution {data.response.id}</h2>
	<div class="p-2 space-y-4">
			<Response data={data.response} />
	</div>
	{:else}
	<p>Aucune contribution retrouvée.</p>
	{/if}
	<a href="/enquete/{data.surveyName}" class="btn variant-filled">
		<span class="badge variant-filled-primary"> <Fa icon={faArrowLeft} /></span>
		<span class="whitespace-normal text-left">
			Retourner vers l'enquête
		</span>
</a>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-12 md:space-y-8;
	}
</style>
