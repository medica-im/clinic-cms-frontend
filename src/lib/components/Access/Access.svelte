<script lang="ts">
	import { onMount } from 'svelte';

	import LL from '$i18n/i18n-svelte';
	import { handlePostRequestsWithPermissions } from '$lib/utils/requestUtils';
	import Fa from 'svelte-fa';
	import { faMask, faPeopleGroup, faGlobe } from '@fortawesome/free-solid-svg-icons';
	export let roles: number[];
	export let url: string;
	export let noRecord: boolean;
	export let contact_id: number;
	let selected: string;

	$: roles = selected ? selected.split(',').map(Number) : [];
	$: patchRoles(selected);

	onMount(async () => {
		if (noRecord) {
			//selected = '1,2,3,4,5';
			return;
		}
		let profile = await refresh();
		let roles = profile.roles;
		if (roles.length) {
			console.log(roles);
			roles.sort((a, b) => a - b);
			console.log(roles);
			selected = roles.toString();
		} else {
			selected = '1,2,3,4,5';
		}
	});

	async function refresh() {
		const [data, error] = await handlePostRequestsWithPermissions(fetch, url, null, 'GET');
		return data;
	}
	const onChange = async () => {
		if (noRecord) return;
		await patchRoles(selected);
	};
	async function patchRoles(selected: string) {
		if (!selected || noRecord) {
			return;
		}
		let roles = selected.split(',').map(Number);
		console.log(roles);
		console.log(url);
const [data, error] = await handlePostRequestsWithPermissions(
			fetch,
					url,
			{
				contact: contact_id,
				roles: roles
			},
			'PATCH'
		);
		console.log(data, error);
		if (error?.length) {
			console.error(JSON.stringify(error));
		} else {
			console.log(data);
		}
	}

	const choices: { [key: string]: { label: object; icon: object; summary: object } } = {
		'1,2,3,4,5': {
			label: $LL.ACCESS.CHOICES.PUBLIC(),
			icon: faGlobe,
			summary: $LL.ACCESS.SUMMARY.PUBLIC()
		},
		'3,4,5': {
			label: $LL.ACCESS.CHOICES.TEAM(),
			icon: faPeopleGroup,
			summary: $LL.ACCESS.SUMMARY.TEAM()
		},
		'4,5': { label: $LL.ACCESS.CHOICES.ADMIN(), icon: faMask, summary: $LL.ACCESS.SUMMARY.ADMIN() }
	};
</script>

<div class="card variant-ghost p-2 space-y-2">
	<h4 class="h4">{$LL.ACCESS.ACCESS_CONTROL()}</h4>
	<select class="select" on:change={onChange} bind:value={selected}>
		{#each Object.keys(choices) as k}
			<option value={k}>{choices[k].label}</option>
		{/each}
	</select>
	{#if selected}
		<div class="flex p-2 space-x-2">
			<div><Fa icon={choices[selected].icon} /></div>
			<div>{choices[selected].summary}</div>
		</div>
	{/if}
</div>
