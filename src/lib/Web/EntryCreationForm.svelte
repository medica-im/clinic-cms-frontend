<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-regular-svg-icons';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import { enhance, applyAction } from '$app/forms';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import * as m from '$msgs';
	import DisplayFacility from '$lib/Web/DisplayFacility.svelte';
	import DisplayEntry from '$lib/Web/DisplayEntry.svelte';
	import type { Commune } from '$lib/interfaces/v2/facility.ts';
	import type { Effector } from '$lib/interfaces/v2/effector.ts';

	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Select } from '$lib/interfaces/select.ts';

	let { memberOfOrg, createdEffector, showEntryCreationForm = $bindable(), 	showCreateEffectorForm = $bindable(), selectedFacility, form, selectedEffectorType }: { memberOfOrg: boolean; createdEffector: Effector; showEntryCreationForm: boolean; showCreateEffectorForm: boolean; selectedFacility: Select; form: any; selectedEffectorType: Select; } = $props();

	interface InputClass {
		effector: string;
		effector_type: string;
		facility: string;
		organization: string;
	}
	interface ValidateForm {
		effector: boolean;
		effector_type: boolean;
		facility: boolean;
		organization: boolean;
	}
	const inputError = 'input-error';
	let triggered: boolean = $state(false);
	const modalStore = getModalStore();
	let visible: boolean = $state(true);
	let success: boolean = $state(false);
	let errorMsg: string = $state('');
	const inputClass: InputClass = $state({
		effector: '',
		effector_type: '',
		facility: '',
		organization: '',
	});
	const validateForm: ValidateForm = $state({
		effector: false,
		effector_type: true,
		facility: true,
		organization: true
	});
	let effector: string = $derived(createdEffector.uid);
	let effector_type: string = $derived(selectedEffectorType.value);
	let facility: string = $derived(selectedFacility.value);
	let organizations: string|null = $derived(memberOfOrg ? page.data.organization.uid : null);
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

	const effectorIsValid = (value: string) => {
		return true;
	};
	const effectorTypeIsValid = (value: string) => {
		return true;
	};
	const facilityIsValid = (value: string) => {
		return true;
	};
	/**
	 * Validate effector input.
	 */
	$effect(() => {
		if (effector && effectorIsValid(effector)) {
			validateForm.effector = true;
			inputClass.effector = '';
		} else {
			inputClass.effector = inputError;
			validateForm.effector = false;
		}
	});
	/**
	 * Validate effector_type input.
	 */
	$effect(() => {
		if (effector_type && effectorTypeIsValid(effector_type)) {
			inputClass.effector_type = '';
			validateForm.effector_type = true;
		} else {
			inputClass.effector_type = inputError;
			validateForm.effector_type = false;
		}
	});
	/**
	 * Validate facility input.
	 */
	$effect(() => {
		if (facility && facilityIsValid(facility)) {
			inputClass.facility = '';
			validateForm.facility = true;
		} else {
			inputClass.facility = inputError;
			validateForm.facility = false;
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
		console.log(JSON.stringify(data))
		return
	}
</script>

{JSON.stringify(form)}<br>
{form?.status}<br>
{form?.data}

{#if success}
			<div class="grid grid-cols-1 rounded-lg p-4 variant-ghost-secondary gap-4 items-center place-items-center">

			<Fa icon={faUser} size={'2x'} />
			<h3 class="h3 text-center">Entrée créé!</h3>
			{#if form?.data}
			<DisplayEntry entryUid={form.data} />
			{/if}
			<button type="button" class="btn variant-filled" onclick={() => {console.log(JSON.stringify(form)); form=null; success=false; 	showCreateEffectorForm = true; showEntryCreationForm=false; }}>Créer une nouvelle entrée</button>
			</div>
{:else}
	<div class="rounded-lg p-4 variant-ghost-secondary gap-2 items-center place-items-center">
		<form
			method="POST"
			action="/web/entry/create"
			use:enhance={({ formElement, formData, action, cancel }) => {
				manipulateForm(formData);
				return async ({ result, update }) => {
					console.log(`result.type: ${result.type}`);
					await applyAction(result);
					console.log(`result:${JSON.stringify(result)}`);
                    if (result.type==='success') {
						success=true;
					};
				};
			}}
			class=""
		>
			<div class="p-2 space-y-4 justify-items-stretch gap-6">
				<div class="p-2 space-y-2 w-full">
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Personne:</span>
						<input
							oninput={() => {}}
							class="hidden input {inputClass.effector}"
							name="effector"
							type="text"
							placeholder=""
							bind:value={effector}
						/>
						<div class="badge variant-ghost-surface">{createdEffector.name_fr}</div>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Catégorie:</span>
						<input
							oninput={() => {}}
							class="input hidden {inputClass.effector_type}"
							name="effector_type"
							type="text"
							placeholder=""
							bind:value={effector_type}
						/>
						<div class="badge variant-ghost-surface">{selectedEffectorType.label}</div>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Établissement:</span>
						<input
							oninput={() => {}}
							class="input hidden {inputClass.facility}"
							name="facility"
							type="text"
							placeholder=""
							bind:value={facility}
						/>
					</label>
					<DisplayFacility facilityUid={selectedFacility.value} showEffectors={false} />
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Organisation:</span>
						<input
							oninput={() => {}}
							class="input hidden {inputClass.organization}"
							name="organizations"
							type="text"
							placeholder=""
							value={organizations}
						/>
						<div class="badge variant-ghost-surface">{page.data.organization.formatted_name}</div>
					</label>
				</div>
			</div>
			<div class="flex gap-8">
			<div class="w-auto justify-center">
					<button type="submit" class="variant-filled-secondary btn w-min" {disabled}
						>Confirmer</button
					>
				</div>
				<div class="w-auto justify-center">
					<button type="button" class="variant-filled-error btn w-min" onclick={()=>{showEntryCreationForm=false}}
						>Annuler</button
					>
				</div>
			</div>
		</form>
	</div>
{/if}
