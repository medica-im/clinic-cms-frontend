<script lang="ts">
	import type { Worker } from '$lib/interfaces/workforce.interface';
	import { variables } from '$lib/utils/constants';
	import LL from '$i18n/i18n-svelte';
	import IconButton, { Icon } from '@smui/icon-button';
	import SocialNetworks from '$lib/components/SoMed/SocialNetworks.svelte';
	import Appointment from './Appointment.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import Button, { Label } from '@smui/button';
	import Editor from 'cl-editor/src/Editor.svelte';

	export let userData: Worker;

    if (import.meta.env.VITE_DEV == "true") {
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
		console.log(Boolean(occupation.facilities));
		console.log(Boolean(occupation.facilities.length > 0));
		if (occupation && occupation.facilities && occupation.facilities.length > 0) {
			return true;
		} else {
			return false;
		}
	}
</script>

<div style="display: flex; align-items: center;">
	<IconButton class="material-icons" href="/annuaire">arrow_back</IconButton><a href="/annuaire"
		>{$LL.ADDRESSBOOK.GOTOADDRESSBOOK()}</a
	>
</div>
<div class="card mb-3">
	<div class="row g-0">
		<div class="col-lg-4">
			<div class="row g-0">
				<img src={getUrl(userData)} class="img-fluid rounded-start" alt="profile" />
			</div>
			<div class="row g-0">
				{#if userData.socialnetworks}
					<SocialNetworks data={userData.socialnetworks} />
				{/if}
			</div>
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h5 class="card-title">{userData.formatted_name}</h5>
				<ul class="list-group list-group">
					{#if userData.occupations}
                    {#each userData.occupations as occupation}
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<div class="ms-2 me-auto">
								<div class="fw-bold">{occupation.label}</div>
								{#if occupation.specialty}
									{$LL.ADDRESSBOOK.SPECIALTY()}: {occupation.specialty.label}<br />
									{$LL.ADDRESSBOOK.LOCATION()}:
                                    {#if occupation.specialty.facilities}
									  {#each occupation.specialty.facilities as facility}
										<a href="/contact#{facility.facility__name}_anchor"
											>{facility.facility__contact__formatted_name}</a
										>
									  {/each}
                                    {/if}
								{:else}
                                    {#if occupation.facilities && occupation.facilities.length > 0}
									{$LL.ADDRESSBOOK.LOCATION()}:
                                    {#each occupation.facilities as facility}
										<a href="/contact#{facility.facility__name}_anchor"
											>{facility.facility__contact__formatted_name}</a
										>
									{/each}
                                    {/if}
								{/if}
							</div>
						</li>
					{/each}
                    {/if}
				</ul>
                
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
				<ul class="list-group list-group">
					{#if userData.account_email}
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<p class="card-text">
								<small class="text-muted">{userData.account_email}</small>
							</p>
						</li>
					{/if}

					{#if userData.phone_numbers}
						{#each Object.keys(userData.phone_numbers) as key}
							{#each userData.phone_numbers[key] as phone}
								<li class="list-group-item d-flex justify-content-between align-items-start">
									<p class="card-text"><small class="text-muted">{key}: {phone}</small></p>
								</li>
							{/each}
						{/each}
					{/if}

					{#if userData.websites}
						{#each userData.websites as website}
							<li class="list-group-item d-flex justify-content-between align-items-start">
								<Website {website} />
							</li>
						{/each}
					{/if}
					{#if userData.appointments && userData.appointments.length}
						<Appointment appointments={userData.appointments} />
					{/if}
				</ul>
			</div>
		</div>
	</div>
</div>
