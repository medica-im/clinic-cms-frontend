<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import { enhance, applyAction } from '$app/forms';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import * as m from '$msgs';

	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type {
		GhostSiteResponse,
		GhostSite,
		GhostAddMemberError
	} from '$lib/interfaces/ghost.interface';

	let { data }: { data: GhostSiteResponse } = $props();

	let triggered: boolean = $state(false);
	const modalStore = getModalStore();
	const ghostData: GhostSite | null = data.success ? data.data : null;
	let visible: boolean = $state(true);
	let errorMsg: string = $state('');
	let inputClass: string = $state('');
	let email: string = $state('');
	let disabled: boolean = $state(true);
	let lastEmails: string[] = $state([]);
	let latestEmail: string = $state('');

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const modalFunction = async (r: any) => {
		email = '';
		await delay(100);
		modalStore.clear();
		inputClass = '';
	};

	const emailIsValid = (value: string) => {
		return (
			value &&
			!!value.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		);
	};

	$effect(() => {
		if (
			lastEmails.includes(email) &&
			page?.form?.success === false &&
			page?.form?.errors.some((e: GhostAddMemberError) =>
				e.context.includes('existing email address')
			)
		) {
			errorMsg = `Un membre avec l'adresse e-mail ${email} existe déjà. Essayez de vous connecter en suivant le lien "Se connecter".`;

			const modal: ModalSettings = {
				type: 'alert',
				title: 'Erreur',
				body: errorMsg,
				buttonTextCancel: m.CANCEL(),
				response: modalFunction
			};
			if (!triggered) {
				modalStore.trigger(modal);
				triggered = true;
			}
			if (lastEmails.includes(email)) {
				inputClass = 'input-error';
			} else {
				inputClass = '';
			}
		}
	});

	$effect(() => {
		if (email && emailIsValid(email) && !lastEmails.includes(email)) {
			disabled = false;
		} else {
			disabled = true;
		}
	});

	$effect(() => {
		if (!email) {
			inputClass = '';
		}
	});

	$effect(() => {
		if (lastEmails.includes(email)) {
			inputClass = 'input-error';
		} else {
			inputClass = '';
		}
	});

	const mySubmitFunction: SubmitFunction = () => {
		return async ({ result }) => {
			lastEmails.push(email);
			latestEmail = email;
			triggered = false;
			if (result.type === 'redirect') {
				await goto(result.location);
			} else {
				await applyAction(result);
			}
		};
	};
	const onInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		if (lastEmails.includes(e.currentTarget.value)) {
			inputClass = 'input-error';
		}
	};
</script>

{#if page?.form?.success}
	{#if visible}
		<aside
			class="card rounded-lg grid grid-cols-1 items-center place-items-center variant-ghost p-4 space-y-4 w-80"
		>
			<Fa icon={faEnvelope} size={'2x'} />
			<h3 class="h3 text-center">Veuillez vérifier votre boîte de réception&#8239;!</h3>
			<p class="text-center">
				Pour confirmer votre inscription, veuillez cliquer le lien de confirmation dans l'e-mail que
				vous allez recevoir. S’il ne vous parvient pas dans les 3 minutes, vérifiez votre dossier
				d'indésirables&#8239;!
			</p>
			<button type="button" class="btn variant-filled" onclick={() => (visible = false)}>
				<span><Fa icon={faXmark} size={'lg'} /></span>
				<span>Fermer</span>
			</button>
		</aside>
	{/if}
{:else}
	<div class="card rounded-lg p-4 variant-ghost-secondary w-80">
		<div class="grid grid-cols-1 place-items-center gap-2">
			{#if ghostData}
				<h3 class="h3 text-center">{ghostData.title}</h3>
				<!--p>{ghostData.description}</p-->
				<p>Inscrivez-vous pour recevoir les prochains billets&#8239;!</p>
			{/if}

			<form
				method="POST"
				action="/ghost/add-member"
				use:enhance={mySubmitFunction}
				class="p-2 space-y-4 grid grid-cols-1 justify-items-stretch grow-0"
			>
				<label class="label place-self-start">
					<span>E-mail</span>
					<input
						oninput={onInput}
						class="input {inputClass}"
						name="email"
						type="email"
						placeholder="jean.martin@exemple.com"
						bind:value={email}
					/>
				</label>
				<button type="submit" class="variant-filled-secondary btn" {disabled}>S'inscrire</button>
			</form>
			<p class="text-sm">
				Déjà abonné&#8239;? <a href="/blog/#/portal/signin" rel="external" class="anchor"
					>Se connecter</a
				>
			</p>
		</div>
	</div>
{/if}
