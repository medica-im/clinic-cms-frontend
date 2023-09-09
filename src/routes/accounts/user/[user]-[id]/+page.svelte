<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore';
	import { locale } from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { scale } from 'svelte/transition';
	import { UpdateField } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';
	import { nodeBefore } from '$lib/helpers/whitespacesHelper';
	import type { User, UserResponse } from '$lib/interfaces/user.interface';
	import LL from '$i18n/i18n-svelte';
	import type { PageData } from './$types';
	import { capitalizeFirstLetter as cFL } from '$lib/helpers/stringHelpers';
	import { workforceDataCached as workforce } from '$lib/store/workforceStore';
	import Fa from 'svelte-fa';
	import { faLink } from '@fortawesome/free-solid-svg-icons';

	export let data: PageData;

	const url = `${variables.BASE_API_URI}/accounts/user/`;

	let updateResponse: UserResponse; // updated response from the update
	let triggerUpdate = async (e: Event) => {
		const sibling = nodeBefore(<HTMLElement>e.target);
		const [res, err] = await UpdateField(sibling.name, sibling.value, url);
		if (err.length <= 0) {
			updateResponse = res; //assigns the response to the updated response if no errors
		}
	};
	let currentUserData: User;
	$: data,
		(() => {
			currentUserData = data.response;
			if (updateResponse) currentUserData = updateResponse.user; // if updated data is available, update the currentUserData too...
		})();

	function getUrl(w) {
		let slug = w.find((e) => e.user_id == data.response.id).slug;
		return `${data.url.origin}/${slug}`;
	}
</script>

<svelte:head>
	<title>
		{$LL.USER.ACCOUNT_SETTINGS()} - {capitalizeFirstLetter($facilityStore.formatted_name, $locale)}
	</title>
</svelte:head>

<div class="container mx-auto p-4 m-4 space-y-4 max-w-screen-sm">
	{#if currentUserData && currentUserData.id}
		<h1 class="h1">{$LL.USER.ACCOUNT_SETTINGS()}</h1>
		<h2 class="h2">
			{currentUserData.full_name || currentUserData.username}
		</h2>

		<div class="card max-w-screen-sm">
			<header class="card-header"><h3 class="h3">{$LL.USER.PAGE()}</h3></header>
			<section class="p-4">
				{#await $workforce}
					...loading
				{:then}
					<a class="flex space-x-2" data-sveltekit-preload-data="hover" href={getUrl($workforce)}>
						{getUrl($workforce)}</a
					>
				{/await}
			</section>
			<footer class="card-footer">
				Sur cette page, vous pouvez créer et modifier votre profil.
			</footer>
		</div>

		<div class="card max-w-screen-sm">
			<header class="card-header"><h3 class="h3">{$LL.USER.ROLE()}</h3></header>
			<section class="p-4">{currentUserData.role.label}</section>
			<footer class="card-footer">{currentUserData.role.description}</footer>
		</div>

		<div class="card variant-ghost p-4 space-y-4 max-w-screen-sm">
			<label class="label">
				<span>{cFL($LL.USER.FULL_NAME())}</span>
				<div class="flex space-x-2">
					<input
						class="input"
						aria-label="User's full name"
						type="text"
						placeholder="User's full name"
						name="full_name"
						value={currentUserData.full_name}
					/>
					<button
						class="btn variant-filled"
						type="button"
						aria-label="Save user's full name"
						on:click={(e) => triggerUpdate(e)}>{cFL($LL.UPDATE())}</button
					>
				</div>
			</label>
			<!--label class="label">
				<span>{cFL($LL.USER.USERNAME())}</span>
			<div class="flex space-x-2">
				<input
					class="input"
					aria-label="User's username"
					type="text"
					placeholder="User's username"
					name="username"
					value={currentUserData.username}
				/>
				<button
					class="btn variant-filled"
					type="button"
					aria-label="Save user's username"
					on:click={(e) => triggerUpdate(e)}>{cFL($LL.UPDATE())}</button
				>
			</div>
			</label-->
			<label class="label">
				<span>{cFL($LL.EMAILADDRESS())}</span>
				<div class="flex space-x-2">
					<input
						class="input"
						aria-label="User's email"
						placeholder="User's email"
						type="email"
						name="email"
						value={currentUserData.email}
					/>
					<button
						class="btn variant-filled"
						type="button"
						aria-label="Save user's email"
						on:click={(e) => triggerUpdate(e)}>{cFL($LL.UPDATE())}</button
					>
				</div>
			</label>
			<label class="label">
				<span>{cFL($LL.DOB())}</span>
				<div class="flex space-x-2">
					<input
						class="input"
						aria-label="User's date of birth"
						type="date"
						name="birth_date"
						placeholder="User's date of birth"
						value={currentUserData.birth_date}
					/>
					<button
						class="btn variant-filled"
						type="button"
						aria-label="Save user's date of birth"
						on:click={(e) => triggerUpdate(e)}>{cFL($LL.UPDATE())}</button
					>
				</div>
			</label>
		</div>
	{/if}
</div>
