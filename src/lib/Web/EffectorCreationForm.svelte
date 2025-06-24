<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import { enhance, applyAction } from '$app/forms';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import AddMarkerMap from '$lib/MapLibre/AddMarkerMap.svelte';
	import Geocoder from '$lib/components/Geocoder/Geocoder.svelte';
	import * as m from '$msgs';
	import type { Commune } from '$lib/interfaces/v2/facility.ts';

	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Select } from '$lib/interfaces/select.ts';
	import type { Effector } from '$lib/interfaces/v2/effector.ts';

	interface FacilityCreationForm {
		commune: string;
		department: string;
	}
	let {
		memberOfOrg = $bindable(),
		createdEffector = $bindable(),
		showCreateEffectorForm = $bindable(),
		org_cat,
		selectedFacility,
		form,
		selectedEffectorType
	}: {
		memberOfOrg: boolean|undefined;
		createdEffector: Effector | undefined;
		showCreateEffectorForm: boolean;
		org_cat: string;
		selectedFacility: Select | undefined;
		form: any;
		selectedEffectorType: Select | undefined;
	} = $props();

	interface InputClass {
		name_fr: string;
		label_fr: string;
		slug_fr: string;
		gender: string;
		memberOfOrg: string;
	}
	interface ValidateForm {
		name_fr: boolean;
		label_fr: boolean;
		slug_fr: boolean;
		gender: boolean;
		memberOfOrg: boolean;
	}
	const inputError = 'input-error';
	let triggered: boolean = $state(false);
	const modalStore = getModalStore();
	let visible: boolean = $state(true);
	let success: boolean = $state(false);
	let errorMsg: string = $state('');
	const inputClass: InputClass = $state({
		name_fr: '',
		label_fr: '',
		slug_fr: '',
		gender: '',
		memberOfOrg: '',
	});
	const validateForm: ValidateForm = $state({
		name_fr: false,
		label_fr: true,
		slug_fr: true,
		gender: true,
		memberOfOrg: false,
	});
	let name_fr: string = $state('');
	let label_fr: string = $state('');
	let slug_fr: string = $state('');
	let gender: string = $state('');
	let orgRadio: string | undefined = $state();
	$effect(() => {
        memberOfOrg = orgRadio=="yes";
	});
	let disabled: boolean = $derived(!Object.values(validateForm).every((v) => v === true));

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const modalFunction = async (r: any) => {
		/*email = '';
		await delay(100);
		modalStore.clear();
		inputClass = '';*/
	};

	const nameIsValid = (value: string) => {
		return true;
	};
	const labelIsValid = (value: string) => {
		return true;
	};
	const slugIsValid = (value: string) => {
		const regexpSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
		return regexpSlug.test(value);
	};
	/**
	 * Validate name input.
	 */
	$effect(() => {
		if (name_fr && nameIsValid(name_fr)) {
			validateForm.name_fr = true;
			inputClass.name_fr = '';
		} else {
			inputClass.name_fr = inputError;
			validateForm.name_fr = false;
		}
	});
	/**
	 * Validate label input.
	 */
	$effect(() => {
		if (!label_fr) {
			return;
		} else if (label_fr && labelIsValid(label_fr)) {
			inputClass.label_fr = '';
			validateForm.label_fr = true;
		} else {
			inputClass.label_fr = inputError;
			validateForm.label_fr = false;
		}
	});
	/**
	 * Validate slug input.
	 */
	$effect(() => {
		if (!slug_fr) {
			return;
		} else if (slug_fr && slugIsValid(slug_fr)) {
			inputClass.slug_fr = '';
			validateForm.slug_fr = true;
		} else {
			inputClass.slug_fr = inputError;
			validateForm.slug_fr = false;
		}
	});
	/**
	 * Validate radio memberOfOrg input.
	 */
	$effect(() => {
		if (orgRadio) {
			validateForm.memberOfOrg = true;
			inputClass.memberOfOrg = '';
		} else {
			inputClass.memberOfOrg = inputError;
			validateForm.memberOfOrg = false;
		}
	});
	const mySubmitFunction: SubmitFunction = (data) => {
		console.log(JSON.stringify(data));
		return async ({ result }) => {
			console.log(JSON.stringify(result));
			triggered = false;
			if (result.type === 'redirect') {
				await goto(result.location);
			} else {
				await applyAction(result);
			}
		};
	};
	/** @param {FormData} data */
	function manipulateForm(data: FormData) {
		return;
	}
</script>

<!--
{form}<br />
{JSON.stringify(form)}<br />
{form?.status}<br />
{form?.type}
-->
{#if success}
	<aside
		class="card rounded-lg grid grid-cols-1 items-center place-items-center variant-ghost p-4 space-y-4 w-80"
	>
		<Fa icon={faEnvelope} size={'2x'} />
		<h3 class="h3 text-center">Personne créé!</h3>
		<button
			type="button"
			class="btn variant-filled"
			onclick={() => {
				console.log(JSON.stringify(form));
				success = false;
			}}>OK</button
		>
	</aside>
{:else}
	<div class="rounded-lg p-6 variant-ghost-secondary space-y-6 items-center place-items-center">
		<h3 class="h3 text-center">Créer une personne physique ou morale</h3>
		<div class="p-4 space-y-2 justify-items-stretch grid grid-cols-1 gap-6">
			<form
				id="effector"
				method="POST"
				action="/web/effector/create"
				use:enhance={({ formElement, formData, action, cancel }) => {
					manipulateForm(formData);
					return async ({ result, update }) => {
						//if (do_update) update();
						console.log(`result: ${result}`);
						console.log(`result.type: ${result.type}`);
						await applyAction(result);
						console.log(`result.data:${JSON.stringify(result)}`);
						if (result.type === 'success') {
							success = true;
						}
						createdEffector = result.data.data;
					};
				}}
				class=""
			>
				<label class="flex label place-self-start place-items-center space-x-2 w-full">
					<span>Nom</span>
					<input
						oninput={() => {}}
						class="input {inputClass.name_fr}"
						name="name_fr"
						type="text"
						placeholder=""
						bind:value={name_fr}
					/>
				</label>
				<label class="flex label place-self-start place-items-center space-x-2 w-full">
					<span>Label</span>
					<input
						oninput={() => {}}
						class="input {inputClass.label_fr}"
						name="label_fr"
						type="text"
						placeholder=""
						bind:value={label_fr}
					/>
				</label>
				<label class="flex label place-self-start place-items-center space-x-2 w-full">
					<span>Slug</span>
					<input
						oninput={() => {}}
						class="input {inputClass.slug_fr}"
						name="slug_fr"
						type="text"
						placeholder=""
						bind:value={slug_fr}
					/>
				</label>
				<label class="flex label place-self-start place-items-center space-x-2 w-full">
					<span>Genre grammatical</span>
					<!--input
							oninput={() => {}}
							class="input {inputClass.gender}"
							name="gender"
							type="text"
							placeholder=""
							bind:value={gender}
						/-->
					<select
						class="select {inputClass.gender} w-min"
						name="gender"
						size="3"
						bind:value={gender}
					>
						<option value="F">Féminin</option>
						<option value="M">Masculin</option>
						<option value="N">Neutre</option>
					</select>
				</label>
			</form>

			<div class="py-2 space-y-2">
				<div>
					Cette personne est-elle membre de {page.data.organization
						.formatted_name_definite_article}?
				</div>
				<div class="flex items-center space-x-4">
					<label class="flex items-center space-x-2">
						<input class="radio {inputClass.memberOfOrg}" type="radio" name="radio-direct" value="yes" bind:group={orgRadio} />
						<p>Oui</p>
					</label>
					<label class="flex items-center space-x-2">
						<input class="radio {inputClass.memberOfOrg}" type="radio" name="radio-direct" value="no" bind:group={orgRadio} />
						<p>Non</p>
					</label>
				</div>
			</div>
		</div>
		<div class="flex gap-8">
			<div class="w-auto justify-center">
				<button type="submit" form="effector" class="variant-filled-secondary btn w-min" {disabled}>Envoyer</button>
			</div>
			<div class="w-auto justify-center">
				<button
					type="button"
					class="variant-filled-error btn w-min"
					onclick={() => {
						showCreateEffectorForm = false;
					}}>Annuler</button
				>
			</div>
		</div>
	</div>
{/if}
