<script lang="ts">
	import Error404 from '$lib/components/404/Error404.svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { get } from '@square/svelte-store';
	import { variables } from '$lib/utils/constants';
	import Card, {
		Content,
		ActionButtons,
		ActionIcons,
		Actions,
		PrimaryAction,
		Media,
		MediaContent
	} from '@smui/card';
	import List, { Item, Graphic, Text, PrimaryText, SecondaryText } from '@smui/list';
	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';
	import {
		workforceDataCached,
		getWorkforceDataCached,
		workerSlug,
		occupations
	} from '$lib/store/workforceStore';
	import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
	import { useQuery } from '@sveltestack/svelte-query';
	import LL from '$i18n/i18n-svelte';
	export let slug;
	import Editor from 'cl-editor/src/Editor.svelte';
	import { dataset_dev } from 'svelte/internal';
	import Appointment from './Appointment.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import facilityStore from '$lib/store/facilityStore';
	import { locale } from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { goto } from '$app/navigation';

	let html = '';
	let editor;
	let editorSwitch = false;
	let worker=`worker_${variables.DEFAULT_LANGUAGE}`;

	async function getWorkerData() {
		const wfdc = await getWorkforceDataCached();
		if (wfdc) {
			let w = wfdc.find((element) => element.slug == slug);
			if (w==undefined) {
                throw new Error(`${slug} does not correspond to any worker slug in our database.`);
			}
			let id = w.id;
			let apiUrl = `${variables.BASE_API_URI}/workforce/${id}/?lang=${$language}`;
			const [response, error] = await handleRequestsWithPermissions(fetch, apiUrl);
			if (response) {
				if (response.profile) {
					html = response.profile.text;
				}
				if (import.meta.env.DEV) {
					console.log(response);
				}
				return response;
			} else {
				throw new Error(error);
			}
		}
	}

	let queryResult = useQuery(worker, getWorkerData);

	function onLocaleChange(locale) {
		worker = `worker_${locale}`;
		queryResult = useQuery(worker, getWorkerData);
	}

	$: onLocaleChange($locale)

	function getUrl(url) {
		if (!url) {
			return `${variables.BASE_URI}/media/profile_images/default_profile_picture.png`;
		}
		return variables.BASE_URI + url;
	}

	function displayEditor(permissions) {
		if (permissions & 2 || permissions & 4) {
			return true;
		} else {
			return false;
		}
	}
</script>

{#if $queryResult.isLoading}
<div class="spinner-border" role="status">
	<span class="visually-hidden">{$LL.LOADING()}</span>
</div>
{:else if $queryResult.isError}
	<Error404 />
{:else}
	<div style="display: flex; align-items: center;">
		<IconButton class="material-icons" href="/annuaire">arrow_back</IconButton><a href="/annuaire"
			>{$LL.ADDRESSBOOK.GOTOADDRESSBOOK()}</a
		>
	</div>
	<div class="card mb-3" style="max-width: 540px;">
		<div class="row g-0">
			<div class="col-md-4">
				<img
					src={getUrl($queryResult.data.profile_picture_url.lt)}
					class="img-fluid rounded-start"
					alt="profile"
				/>
			</div>
			<div class="col-md-8">
				<div class="card-body">
					<h5 class="card-title">{$queryResult.data.formatted_name}</h5>
					<ul class="list-group list-group">
						{#each $queryResult.data.occupations as occupation}
							<li class="list-group-item d-flex justify-content-between align-items-start">
								<div class="ms-2 me-auto">
									<div class="fw-bold">{occupation.label}</div>
									{#if occupation.specialty}
									{$LL.ADDRESSBOOK.SPECIALTY()}: {occupation.specialty.label}<br />
									{$LL.ADDRESSBOOK.LOCATION()}:
										{#each occupation.specialty.facilities as facility}
											<a href="/contact#{facility.facility__name}_anchor"
												>{facility.facility__contact__formatted_name}</a
											>
										{/each}
									{:else if occupation.facilities.length > 0}
										<br />
										{$LL.ADDRESSBOOK.LOCATION()}:
										{#each occupation.facilities as facility}
											<a href="/contact#{facility.facility__name}_anchor"
												>{facility.facility__contact__formatted_name}</a
											>
										{/each}
									{/if}
								</div>
							</li>
						{/each}
					</ul>
					{#if $queryResult.data.profile.text && !editorSwitch}
						<p class="card-text">
							{$queryResult.data.profile.text}
						</p>
						{#if displayEditor($queryResult.data.profile.permissions)}
							<Button color="secondary" on:click={() => (editorSwitch = true)} variant="outlined">
								<Label>Edit</Label>
							</Button>
						{/if}
					{:else if displayEditor($queryResult.data.profile.permissions) && !editorSwitch}
						<Button color="secondary" on:click={() => (editorSwitch = true)} variant="outlined">
							<Label>Create profile</Label>
						</Button>
					{/if}
					{#if displayEditor($queryResult.data.profile.permissions) && editorSwitch}
						{@html html}
						<Editor {html} on:change={(evt) => (html = evt.detail)} />
						<Button color="secondary" on:click={() => (editorSwitch = false)} variant="outlined">
							<Label>Close without saving</Label>
						</Button>
					{/if}
					<ul class="list-group list-group">
						{#if $queryResult.data.account_email}
							<li class="list-group-item d-flex justify-content-between align-items-start">
								<p class="card-text">
									<small class="text-muted">{$queryResult.data.account_email}</small>
								</p>
							</li>
						{/if}

						{#if $queryResult.data.phone_numbers}
							{#each Object.keys($queryResult.data.phone_numbers) as key}
								{#each $queryResult.data.phone_numbers[key] as phone}
									<li class="list-group-item d-flex justify-content-between align-items-start">
										<p class="card-text"><small class="text-muted">{key}: {phone}</small></p>
									</li>
								{/each}
							{/each}
						{/if}

						{#if $queryResult.data.websites}
							{#each $queryResult.data.websites as website}
								<li class="list-group-item d-flex justify-content-between align-items-start">
									<Website website={website} />
								</li>
							{/each}
						{/if}
						{#if $queryResult.data.appointments.length}
							<Appointment appointments={$queryResult.data.appointments} />
						{/if}
					</ul>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
</style>
