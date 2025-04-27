<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import { enhance, applyAction } from '$app/forms';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { GhostSiteResponse, GhostSite, GhostError } from '$lib/interfaces/ghost.interface';

	let {
		form,
		ghost
	}: {
		form: any;
		ghost: GhostSiteResponse;
	} = $props();

	const ghostData: GhostSite | null = ghost.success ? ghost.data : null;

	let visible: boolean = $state(true);
	let errorMsg: string = $state('');
	let inputClass: string = $state('');
	let email: string | undefined = $state();

	$effect(() => {
		if (
			!page?.form?.success &&
			page.form?.errors.some((e: GhostError) => e.context.includes('existing email address'))
		) {
			errorMsg =
				'Un membre avec cette adresse e-mail existe déjà. Essayez de vous connecter en suivant le lien "Se connecter".';
			inputClass = 'input-error';
		} else {
			inputClass = '';
		}
	});

	$effect(() => {
		if (!page?.form?.success && !email) {
			errorMsg = '';
			inputClass = '';
		}
	});

	const mySubmitFunction: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await goto(result.location);
			} else {
				await applyAction(result);
			}
		};
	};
</script>

{#if page?.form?.success}
	{#if visible}
		<aside
			class="card grid grid-cols-1 items-center place-items-center variant-ghost p-4 space-y-4 max-w-96"
		>
			<Fa icon={faEnvelope} size={'2x'} />
			<h3 class="h3 text-center">Veuillez vérifier votre boîte de réception!</h3>
			<p class="text-center">
				Pour confirmer votre inscription, veuillez cliquer le lien de confirmation dans l'e-mail que
				vous allez recevoir. S’il ne vous parvient pas dans les 3 minutes, vérifiez votre dossier
				d'indésirables!
			</p>
			<!-- Actions -->
			<button type="button" class="btn variant-filled" onclick={() => (visible = false)}>
				<span><Fa icon={faXmark} size={'lg'} /></span>
				<span>Fermer</span>
			</button>
		</aside>
	{/if}
{:else}
	<div class="card p-4 variant-ghost-secondary max-w-md">
		<div class="grid grid-cols-1 place-items-center gap-2">
			{#if ghostData}
				<h3 class="h3 text-center">{ghostData.title}</h3>
				<!--p>{ghostData.description}</p-->
				<p>Inscrivez-vous pour recevoir les prochains billets!</p>
			{/if}

			<form
				method="POST"
				action="/ghost/add-member"
				use:enhance={mySubmitFunction}
				class="p-2 space-y-4 grid grid-cols-1 justify-items-stretch"
			>
				<label class="label place-self-start">
					<span>E-mail</span>
					{#if page?.form?.success == false}
						<p class="variant-filled-error">{errorMsg}</p>
					{/if}

					<input
						class="input {inputClass}"
						name="email"
						type="email"
						placeholder="jean.martin@exemple.com"
						bind:value={email}
					/>
				</label>
				<button type="submit" class="variant-filled-secondary btn">S'inscrire</button>
			</form>
			<p class="text-sm">
				Déjà abonné? <a href="/blog/#/portal/signin" rel="external" class="anchor">Se connecter</a>
			</p>
		</div>
	</div>
{/if}
