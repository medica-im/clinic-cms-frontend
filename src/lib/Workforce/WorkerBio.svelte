<script lang="ts">
	import type { Worker } from '$lib/interfaces/workforce.interface';
	import { variables } from '$lib/utils/constants';
	import LL from '$i18n/i18n-svelte';
	import IconButton, { Icon } from '@smui/icon-button';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Appointment from './Appointment.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import Button, { Label } from '@smui/button';
	import Editor from 'cl-editor/src/Editor.svelte';
	import { workerTitleFormattedName } from '$lib/helpers/stringHelpers';
	import WorkerFacility from '$lib/components/Worker/WorkerFacility.svelte';

	export let userData: Worker;

	if (import.meta.env.VITE_DEV == 'true') {
		console.log(JSON.stringify(userData));
	}

	let html = '';
	let editorSwitch = false;

	function getUrl(userData: Worker) {
		if (userData.profile_picture_url && userData.profile_picture_url.lt) {
			return variables.BASE_URI + userData.profile_picture_url.lt;
		} else {
			return `${variables.BASE_URI}/media/profile_images/default_profile_picture.png`;
		}
	}

	function displayEditor(userData: Worker) {
		let permissions;
		try {
			permissions = userData.profile.permissions;
		} catch {
			return false;
		}
		if (permissions & 2 || permissions & 4) {
			return true;
		} else {
			return false;
		}
	}

	function hasOccupationFacilities(occupation) {
		if (occupation && occupation.facilities && occupation.facilities.length > 0) {
			return true;
		} else {
			return false;
		}
	}
</script>

{#if userData.profile && userData.profile.text && !editorSwitch}
	<p class="card-text">
		{userData.profile.text}
	</p>
	{#if displayEditor(userData)}
		<Button color="secondary" on:click={() => (editorSwitch = true)} variant="outlined">
			<Label>Edit</Label>
		</Button>
	{/if}
{:else if displayEditor(userData) && !editorSwitch}
	<Button color="secondary" on:click={() => (editorSwitch = true)} variant="outlined">
		<Label>Create profile</Label>
	</Button>
{/if}
{#if displayEditor(userData) && editorSwitch}
	{@html html}
	<Editor {html} on:change={(evt) => (html = evt.detail)} />
	<Button color="secondary" on:click={() => (editorSwitch = false)} variant="outlined">
		<Label>Close without saving</Label>
	</Button>
{/if}