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
	import type {
		GhostSiteResponse,
		GhostSite,
		GhostAddMemberError
	} from '$lib/interfaces/ghost.interface';
	import type { LngLatLike } from 'svelte-maplibre';
	import type { AddressFeature } from '$lib/store/directoryStoreInterface';

	interface FacilityCreationForm {
		commune: string;
		department: string;
	}
	let { commune, org_cat, createdFacility = $bindable(), form, createFacility = $bindable() }: { commune: { label: string; value: string }; org_cat: string; createdFacility: { label: string; value: string } | undefined; form: any; createFacility: boolean; } =
		$props();

	interface InputClass {
		name: string;
		label: string;
		slug: string;
		building: string;
		street: string;
		geographical_complement: string;
		zip: string;
		zoom: string;
		commune: string;
	}
	interface ValidateForm {
		name: boolean;
		label: boolean;
		slug: boolean;
		building: boolean;
		street: boolean;
		geographical_complement: boolean;
		zip: boolean;
		zoom: boolean;
		commune: boolean;
	}
	const inputError = 'input-error';
	let addressFeature: AddressFeature | undefined = $state();
	let triggered: boolean = $state(false);
	const modalStore = getModalStore();
	let visible: boolean = $state(true);
	let success: boolean = $state(false);
	let errorMsg: string = $state('');
	const inputClass: InputClass = $state({
		name: '',
		label: '',
		slug: '',
		building: '',
		street: '',
		geographical_complement: '',
		zip: '',
		zoom: '',
		commune: ''
	});
	const validateForm: ValidateForm = $state({
		name: org_cat == 'msp' ? false : true,
		label: org_cat == 'msp' ? false : true,
		slug: org_cat == 'msp' ? false : true,
		building: true,
		street: false,
		geographical_complement: true,
		zip: false,
		zoom: false,
		commune: false
	});
	let name: string = $state('');
	let label: string = $state('');
	let slug: string = $state('');
	let building: string = $state('');
	let street: string | undefined = $derived(addressFeature?.properties?.name);
	let geographical_complement: string = $state('');
	let zip: string = $derived(addressFeature?.properties?.postcode || '');
	let zoom: number = $state(18);
	let lngLat: LngLatLike = $derived.by(() => {
		const lngLatArray: [number, number] | undefined = addressFeature?.geometry.coordinates;
		if (lngLatArray) {
			return { lng: lngLatArray[0], lat: lngLatArray[1] };
		} else {
			return { lng: 0, lat: 0 };
		}
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
	const zipIsValid = (value: string) => {
		const regexpFiveDigits = /^\d{5}$/;
		return regexpFiveDigits.test(value);
	};
	const zoomIsValid = (value: number) => {
		return value >= 0 && value <= 20;
	};

	$effect(() => {
		/*
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
		}*/
	});
	/**
	 * Validate name input.
	 */
	$effect(() => {
		if (name && nameIsValid(name)) {
			validateForm.name = true;
			inputClass.name = '';
		} else {
			inputClass.name = inputError;
			validateForm.name = false;
		}
	});
	/**
	 * Validate label input.
	 */
	$effect(() => {
		if (!label) {
			validateForm.label = false;
			inputClass.label = inputError;
		} else if (label && labelIsValid(label)) {
			inputClass.label = '';
			validateForm.label = true;
		} else {
			inputClass.label = inputError;
			validateForm.label = false;
		}
	});
	/**
	 * Validate slug input.
	 */
	$effect(() => {
		if (!slug) {
			validateForm.slug = false;
			inputClass.slug = inputError;
		} else if (slug && slugIsValid(slug)) {
			inputClass.slug = '';
			validateForm.slug = true;
		} else {
			inputClass.slug = inputError;
			validateForm.slug = false;
		}
	});
	/**
	 * Validate zip input.
	 */
	$effect(() => {
		if (!zip) {
			validateForm.zip = true;
			return;
		} else if (zip && zipIsValid(zip)) {
			inputClass.zip = '';
			validateForm.zip = true;
		} else {
			inputClass.zip = inputError;
			validateForm.zip = false;
		}
	});
	/**
	 * Validate commune input.
	 */
	$effect(() => {
		if (commune === undefined) {
			inputClass.commune = inputError;
			validateForm.commune = false;
			return;
		} else {
			inputClass.commune = '';
			validateForm.commune = true;
		}
	});

	/**
	 * Validate zoom input.
	 */
	$effect(() => {
		if (!zoom) {
			validateForm.zoom = true;
			return;
		} else if (zoom && zoomIsValid(zoom)) {
			validateForm.zoom = true;
			inputClass.zoom = '';
		} else {
			inputClass.zoom = inputError;
			validateForm.zoom = false;
		}
	});

	$effect(() => {
		if (!street) {
			inputClass.street = inputError;
			validateForm.street = false;
		} else {
			inputClass.street = '';
			validateForm.street = true;
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
	/*const onInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		if (lastEmails.includes(e.currentTarget.value)) {
			inputClass = 'input-error';
		}
	};*/
	/** @param {FormData} data */
	function manipulateForm(data: FormData) {
		const longitude = lngLat.lng.toString();
		const latitude = lngLat.lat.toString();
		data.append('longitude', longitude);
		data.append('latitude', latitude);
		const communeUid = commune.value;
		data.set('commune', communeUid);
	}
</script>

{form}
{JSON.stringify(form)}
{form?.status}
{form?.type}

{#if success}
		<aside
			class="card rounded-lg grid grid-cols-1 items-center place-items-center variant-ghost p-4 space-y-4 w-80"
		>
			<Fa icon={faEnvelope} size={'2x'} />
			<h3 class="h3 text-center">Établissement créé!</h3>
			<button type="button" class="btn variant-filled" onclick={() => {console.log(JSON.stringify(form)); success=false;}}>OK</button>
		</aside>
{:else}
	<div class="rounded-lg p-4 variant-ghost-secondary gap-2 items-center place-items-center">
		<h3 class="h3 text-center">Créer un établissement</h3>
		<form
			method="POST"
			action="/web/facility/create"
			use:enhance={({ formElement, formData, action, cancel }) => {
				manipulateForm(formData);
				return async ({ result, update }) => {
					//if (do_update) update();
					console.log(`result: ${result}`);
					console.log(`result.type: ${result.type}`);
					await applyAction(result);
					console.log(`result.data:${JSON.stringify(result)}`);
                    if (result.type==='success') {
						success=true;
					};
					createdFacility = {label: result.data.data.name, value: result.data.data.uid};
				};
			}}
			class=""
		>
			<div class="p-2 space-y-4 justify-items-stretch grid grid-cols-2 gap-6">
				<div class="p-2 space-y-2 w-full">
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Nom</span>
						<input
							oninput={() => {}}
							class="input {inputClass.name}"
							name="name"
							type="text"
							placeholder=""
							bind:value={name}
						/>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Label</span>
						<input
							oninput={() => {}}
							class="input {inputClass.label}"
							name="label"
							type="text"
							placeholder=""
							bind:value={label}
						/>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Slug</span>
						<input
							oninput={() => {}}
							class="input {inputClass.slug}"
							name="slug"
							type="text"
							placeholder=""
							bind:value={slug}
						/>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Bâtiment</span>
						<input
							oninput={() => {}}
							class="input {inputClass.building}"
							name="building"
							type="text"
							placeholder=""
							bind:value={building}
						/>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Rue</span>
						<input
							oninput={() => {}}
							class="input {inputClass.street}"
							name="street"
							type="text"
							placeholder="1 rue de la Paix"
							bind:value={street}
						/>
					</label>
					{#if commune}
						<Geocoder bind:addressFeature commune={commune?.label} />
					{/if}
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Complément géographique</span>
						<input
							oninput={() => {}}
							class="input {inputClass.geographical_complement}"
							name="geographical_complement"
							type="text"
							placeholder=""
							bind:value={geographical_complement}
						/>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2">
						<span>Code postal</span>
						<input
							oninput={() => {}}
							class="input {inputClass.zip} w-min"
							name="zip"
							type="text"
							placeholder=""
							bind:value={zip}
						/>
					</label>
					<label class="flex label place-self-start place-items-center space-x-2 w-full">
						<span>Commune</span>
						<input
							disabled
							oninput={() => {}}
							class="input {inputClass.commune} w-full"
							name="commune"
							type="text"
							placeholder="Sélectionner département puis commune"
							value={commune?.label || ''}
						/>
					</label>
				</div>
				<div class="p-2 space-y-2 w-full h-full">
					<label class="flex label place-self-start place-items-center space-x-2">
						<span>Zoom</span>
						<input
							oninput={() => {}}
							class="input {inputClass.zoom}"
							name="zoom"
							type="number"
							min="0"
							max="20"
							placeholder=""
							bind:value={zoom}
						/>
					</label>
					<AddMarkerMap bind:lngLat bind:zoom />
				</div>
			</div>
			<div class="flex gap-8">
			<div class="w-auto justify-center">
					<button type="submit" class="variant-filled-secondary btn w-min" {disabled}
						>Envoyer</button
					>
				</div>
				<div class="w-auto justify-center">
					<button type="button" class="variant-filled-error btn w-min" onclick={()=>{createFacility=false}}
						>Annuler</button
					>
				</div>
			</div>
		</form>
	</div>
{/if}
