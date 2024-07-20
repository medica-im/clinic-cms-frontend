<script lang="ts">
	import { notificationData } from '$lib/store/notificationStore';
	import { post, browserSet, browserGet } from '$lib/utils/requestUtils';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/utils/constants';
	import { fly } from 'svelte/transition';
	import { emptyLocaleStorage } from '$lib/utils/requestUtils';
	import { toggleAuth } from '$lib/store/authStore';

	import type { UserResponse } from '$lib/interfaces/user.interface';
	import type { CustomError } from '$lib/interfaces/error.interface';
	import { changeText } from '$lib/helpers/buttonText';
	import LL from '$i18n/i18n-svelte';
	import { afterUpdate, onMount } from 'svelte';
	let submitButton;
	let submitButtonInnerHTML: string = $LL.LOGIN.RESET();
	let response: UserResponse;
	let emailWarn = false;
	let success = false;
	let email = '',
		errors: Array<CustomError>;

	const handleReset = async () => {
		const res = await fetch(
			`${variables.BASE_URI}/dj-rest-auth/password/reset/`,
			{
			method: "POST",
				headers: {
					"Content-Type": "application/json",
				  },
				body: JSON.stringify({
			    email: email,
			})
		}
		);
		if (!res.ok) {
			console.error(`error: ${res.status}`);
			submitButtonInnerHTML = $LL.LOGIN.RESET();
		} else {
			success=true
			//notificationData.update(() => `${$LL.LOGIN.RESET_SUCCESSFUL()}`);
		}
		const jsn = await res.json();
		console.log(jsn);
	};
</script>

<svelte:head>
	<title>{$LL.LOGIN.RESET_PASSWORD()}</title>
</svelte:head>

<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{$LL.LOGIN.RESET_PASSWORD()}</h1>
		</div>
	</header>

	<section
		class="container"
		in:fly={{ x: -100, duration: 500, delay: 500 }}
		out:fly={{ duration: 500 }}
	>
		<div class="section-container">
			<form
				class="space-y-4 lg:max-w-2xl"
				on:submit={(e) => {
					e.preventDefault();
					handleReset();
				}}
			>
				{#if errors}
					<p>{JSON.stringify(errors)}</p>
				{/if}
				<input
					class="input"
					type="email"
					bind:value={email}
					disabled='{success}'
					hideLabel
					labelText={$LL.EMAILADDRESS()}
					placeholder="{$LL.EMAILADDRESS()}..."
					required
					warn={emailWarn}
				/>
				<button
					class="btn bg-primary-500"
					bind:this={submitButton}
					type="submit"
					disabled='{success}'
					on:click={() => {
						submitButtonInnerHTML = $LL.LOGIN.RESET();
					}}>{submitButtonInnerHTML}</button
				>
				{#if success}
				<p>{$LL.LOGIN.RESET_SUCCESSFUL()}</p>
				{/if}
			</form>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
