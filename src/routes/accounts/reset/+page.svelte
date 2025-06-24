<script lang="ts">
	import { notificationData } from '$lib/store/notificationStore';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/utils/constants';
	import { fly } from 'svelte/transition';
	import { toggleAuth } from '$lib/store/authStore';

	import type { UserResponse } from '$lib/interfaces/user.interface';
	import type { CustomError } from '$lib/interfaces/error.interface';
	import { changeText } from '$lib/helpers/buttonText';
	import * as m from "$msgs";
	import { afterUpdate, onMount } from 'svelte';
	let submitButton;
	let submitButtonInnerHTML: string = m.RESET();
	let response: UserResponse;
	let emailWarn = false;
	let success = false;
	let email = '';
	let	errors: Array<CustomError>;

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
			errors=[{error: res.status}];
			submitButtonInnerHTML = m.RESET();
		} else {
			success=true
			//notificationData.update(() => `${$LL.LOGIN.RESET_SUCCESSFUL()}`);
		}
		const jsn = await res.json();
		console.log(jsn);
	};
</script>

<svelte:head>
	<title>{m.RESET_PASSWORD()}</title>
</svelte:head>

<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{m.RESET_PASSWORD()}</h1>
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
					console.log("handleReset()");
					e.preventDefault();
					handleReset();
				}}
			>
				{#if errors}
					<p>{JSON.stringify(errors)}</p>
				{/if}
				<input
					class="input {emailWarn ? 'input-error':''}"
					type="email"
					bind:value={email}
					disabled='{success}'
					placeholder="{m.EMAILADDRESS()}..."
					required
				/>
				<button
					class="btn bg-primary-500"
					bind:this={submitButton}
					type="submit"
					disabled='{success}'
					on:click={() => {
						submitButtonInnerHTML = m.RESET();
					}}>{submitButtonInnerHTML}</button
				>
				{#if success}
				<p>{m.RESET_SUCCESSFUL()}</p>
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
