<script lang="ts">
	import type { PageData } from './$types';
	import Response from '$lib/components/Survey/Response.svelte';
	import Responses from '$lib/components/Survey/Responses.svelte';
	import { userData } from '$lib/store/userStore';
	import { isObjectEmpty } from '$lib/utils/utils';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import Fa from 'svelte-fa';
    import { faSpaghettiMonsterFlying } from '@fortawesome/free-solid-svg-icons';

	export let data: PageData;

	let textarea = '';
	let label = 'Ajouter une contribution:';
	let labelClass = '';
	let disabled = false;
	let unmoderatedResponses;
	let publicResponses;
	let privateResponses;
	let spamResponses;

	$: unmoderatedResponses = data.responses.filter((e) => e.moderation == 'UN');
	$: publicResponses = data.responses.filter((e) => e.moderation == 'PU');
	$: privateResponses = data.responses.filter((e) => e.moderation == 'PR');
	$: spamResponses = data.responses.filter((e) => e.moderation == 'SP');
</script>

<div class="section-container">
	<h1 class="h1">{data.survey.label}</h1>
	<div class="space-y-2">{@html data.survey.presentation}</div>

	<h2 class="h2">Contribuer</h2>
	<div class="space-y-2">
		<label class="label space-y-2">
			<span class={labelClass}>{label}</span>
			<textarea bind:value={textarea} {disabled} class="textarea" rows="4" autocomplete="off" />
		</label>

		<button
			{disabled}
			type="button"
			class="btn variant-ghost"
			on:click={async (e) => {
				const content = textarea;
				const survey = data.survey.id;
				const res = await fetch(data.responsesUrl, {
					method: 'POST',
					body: JSON.stringify({ content, survey }),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (res.ok) {
					const newResponse = await res.json();
					console.log(newResponse);
					data.responses = [newResponse, ...data.responses];
					textarea = '';
					disabled = true;
					label =
						"Merci pour votre contribution à notre enquête. Elle sera affichée sur cette page après modération (prévoir un délai d'un à deux jours ouvrés).";
				}
				labelClass = 'alert variant-ghost-success';
			}}>Envoyer</button
		>
	</div>
	<h2 class="h2">Contributions</h2>
	{#if !data.responses?.length}
	<p>Il n'y a pas encore de contribution. Soyez le premier à contribuer en remplissant le formulaire ci-dessus!</p>
	{:else}
	<div class="px-2 space-y-4">
		{#if unmoderatedResponses.length && !isObjectEmpty($userData)}
			<h3 class="h3">Contributions en attente de modération</h3>
			<Responses data={unmoderatedResponses} />
		{/if}

		{#if publicResponses.length}
			{#if !isObjectEmpty($userData)}
				<h3 class="h3">Contributions publiques</h3>
			{/if}
			<Responses data={publicResponses} />
		{/if}

		{#if privateResponses.length}
			<h3 class="h3">Contributions privées</h3>
			<Responses data={privateResponses} />
		{/if}

		{#if spamResponses.length}
			<h3 class="h3">Contributions indésirables</h3>
            <Accordion>
                <AccordionItem>
                    <svelte:fragment slot="lead"><Fa icon={faSpaghettiMonsterFlying}/></svelte:fragment>
                    <svelte:fragment slot="summary">Voir les contributions indésirables (spam).</svelte:fragment>
                    <svelte:fragment slot="content">			<Responses data={spamResponses} />
                </svelte:fragment>
                </AccordionItem>
            </Accordion>
		{/if}
	</div>
	{/if}
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 space-y-6;
	}
</style>
