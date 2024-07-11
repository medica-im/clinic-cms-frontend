<script lang="ts">
	import { onMount } from 'svelte';
	import type { Worker } from '$lib/interfaces/workforce.interface';
	import { variables } from '$lib/utils/constants';
	import LL from '$i18n/i18n-svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import { handlePostRequestsWithPermissions } from '$lib/utils/requestUtils';
	import Fa from 'svelte-fa';
	import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons';
	import { invalidateAll, invalidate } from '$app/navigation';
	import { workerData } from '$lib/Workforce/rest';
	import { capitalizeFirstLetter as cFL } from '$lib/helpers/stringHelpers';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Access from '$lib/components/Access/Access.svelte';
	import { displayEditor, displayDestroy } from '$lib/utils/permissions';
	import { userData } from '$lib/store/userStore';

	export let data: Worker;
	export let name: string;

	if (import.meta.env.VITE_DEV == 'true') {
		console.log(JSON.stringify(data));
	}

	let roles: number[];
	let errorObject: {};
	let errorVisible: boolean = false;
	let databaseHtml: string = data?.profile?.text || '';
	let html: string = data?.profile?.text || '';
	let editorSwitch: boolean = false;
	let dirty: boolean = false;
	let closeButton: string = 'Close';
	let conf = {
		plugins: 'link autolink',
		menubar: 'edit insert view format table tools link'
	};
	let noRecord: boolean;
	$: noRecord = data?.profile?.text == null;
	$: dirty = databaseHtml != html;
	$: closeButton = dirty ? 'Close without saving' : 'Close';
	$: toggleEditor(editorSwitch);

	onMount(() => {
		roles = data?.profile?.roles;
		databaseHtml = data?.profile?.text || '';
		html = data?.profile?.text || '';
	});

	function toggleEditor(editorSwitch: boolean) {
		if (editorSwitch == true) {
			html = databaseHtml;
		}
	}

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	async function post() {
		if (data.profile?.id) {
			await restUpdate();
		} else {
			await restCreate();
		}
	}

	async function restCreate() {
		let body = {
			text: html,
			contact: data.contact_id,
		}
		if (roles?.length) {
			Object.assign(body, {roles: roles});
		}
		const url = `${variables.BASE_API_URI}/addressbook/profile/`;
		const [res, error] = await handlePostRequestsWithPermissions(fetch, url, body);
		if (error.length) {
			console.error(JSON.stringify(error));
			errorObject = error;
			errorVisible = true;
		} else {
			databaseHtml = html;
		}
	}

	async function restUpdate() {
		const url = `${variables.BASE_API_URI}/addressbook/profile/${data.profile.id}`;
		const [res, error] = await handlePostRequestsWithPermissions(
			fetch,
			url,
			{
				text: html,
				contact: data.contact_id
			},
			'PATCH'
		);
		if (error.length) {
			console.error(JSON.stringify(error));
			errorObject = error;
			errorVisible = true;
		} else {
			databaseHtml = html = res.text;
			invalidate(`/${data.slug}`);
		}
	}

	async function restDelete() {
		const url = `${variables.BASE_API_URI}/addressbook/profile/${data.profile.id}`;
		const [res, error] = await handlePostRequestsWithPermissions(fetch, url, null, 'DELETE');
		if (error.length) {
			console.error(JSON.stringify(error));
			errorObject = error;
			errorVisible = true;
		} else {
			databaseHtml = html = '';
			invalidateAll();
		}
	}

	async function refresh() {
		const slug = data.slug;
		res = await workerData({ fetch, slug });
	}

	function handleClose() {
		if (databaseHtml == null || databaseHtml == '') {
			html = '';
			editorSwitch = false;
		} else if (databaseHtml == html) {
			editorSwitch = false;
		}
		invalidateAll();
	}
	function handleCloseWithoutSaving() {
		html = '';
		editorSwitch = false;
	}
</script>

<!--ul>
	<li>html: "{html}" {html?.length}</li>
	<li>databaseHtml: "{databaseHtml}" {databaseHtml?.length}</li>
	<li>databaseHtml==html: {databaseHtml==html}</li>
	<li>dirty: {dirty}</li>
	<li>closeButton: {closeButton}</li>
	<li>roles: {roles}</li>
</ul-->
{#if data && $userData && displayEditor($userData, data.user_id)}
	{#if !editorSwitch}
		{#if databaseHtml}
			<div class="card p-2 variant-filled-secondary" data-popup="popupHover">
				<p>{cFL($LL.EDIT())}</p>
				<div class="arrow variant-filled-secondary" />
			</div>
			<button
				type="button"
				class="btn-icon btn-icon-sm variant-filled [&>*]:pointer-events-none"
				use:popup={popupHover}
				on:click={() => (editorSwitch = true)}
			>
				<Fa icon={faEdit} />
			</button>
		{:else}
			<button type="button" class="btn variant-filled" on:click={() => (editorSwitch = true)}>
				{cFL($LL.CREATE())}
				{name}
			</button>
		{/if}
	{:else}
		<div class="card variant-ghost p-2 m-2 space-y-2">
			{#if data.profile?.id}
			<Access
				bind:noRecord
				bind:roles
				contact_id={data.contact_id}
				url={`${variables.BASE_API_URI}/addressbook/profile/${data.profile.id}`}
			/>
			{/if}
			<div class="card p-2 space-y-2 ">
				<h4 class="h4">{cFL($LL.PREVIEW())}</h4>
				<div class="p-2 variant-ghost-secondary">
					{@html html}
				</div>
			</div>
			<div>
				<Editor scriptSrc="/tinymce/5.10.7/tinymce.min.js" bind:value={html} {conf} />
			</div>
			<div class="flow-root">
				<div class="float-left">
					{#if dirty}
						<button type="button" class="btn variant-filled" on:click={handleCloseWithoutSaving}>
							{cFL($LL.CLOSE_NO_SAVE())}
						</button>
					{:else}
						<button type="button" class="btn variant-filled" on:click={handleClose}>
							{cFL($LL.CLOSE())}
						</button>
					{/if}
					{#if dirty}
						<button type="button" class="btn variant-filled" on:click={async () => post()}>
							{cFL($LL.SAVE())}
						</button>
					{/if}
				</div>
				<div class="float-right">
					{#if databaseHtml}
						<button
							disabled={!html}
							type="button"
							class="btn variant-filled-warning"
							on:click={() => (html = '')}
						>
							{cFL($LL.DELETE())}
						</button>
					{/if}
					{#if $userData?.is_superuser && databaseHtml}
						<button
							type="button"
							class="btn variant-filled-error"
							on:click={async () => restDelete()}
						>
							{cFL($LL.DESTROY())}
						</button>
					{/if}
				</div>
			</div>
		</div>
	{/if}
	{#if errorVisible}
		<aside class="alert variant-filled-error">
			<!-- Icon -->
			<div>(icon)</div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3">(title)</h3>
				<p>{JSON.stringify(errorObject)}</p>
			</div>
			<!-- Actions -->
			<button
				type="button"
				class="btn variant-filled alert-actions"
				on:click={() => (errorVisible = false)}
			>
				<Fa icon={faWindowClose} size="lg" />
			</button>
		</aside>
	{/if}
{/if}