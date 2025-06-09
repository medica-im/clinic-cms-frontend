<script lang="ts">
	import { notificationData } from '$lib/store/notificationStore';
	import { post, browserSet, browserGet, setCurrentUser } from '$lib/utils/requestUtils';
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
	let submitButtonInnerHTML: string = m.TOLOGIN();
	let response: UserResponse;
	let emailWarn = false;
	let passwordWarn = false;
	let email = '',
		password = '',
		errors: Array<CustomError>;

	onMount(() => {
		submitButtonInnerHTML = m.TOLOGIN();
	});

	$: if (response && response.user && response.user.error) {
		submitButtonInnerHTML = m.TOLOGIN();
		emailWarn = true;
		passwordWarn = true;
	}

	const handleLogin = async () => {
		if (browserGet('refreshToken')) {
			localStorage.removeItem('refreshToken');
		}
		const [jsonRes, err] = await post(fetch, `${variables.BASE_API_URI}/accounts/login/`, {
			user: {
				email: email,
				password: password
			}
		});
		response = jsonRes;
		console.log(JSON.stringify(response));

		if (err.length > 0) {
			errors = err;
			console.error(`errors: ${errors}`);
			submitButtonInnerHTML = m.TOLOGIN();
		} else if (response.user && response.user.error) {
			errors = response.user.error[0];
			console.error(`errors: ${errors}`);
			submitButtonInnerHTML = m.TOLOGIN();
		} else if (response.user && response.user.tokens) {
			browserSet('refreshToken', response.user.tokens.refresh);
			await setCurrentUser();
			toggleAuth();
			notificationData.update(() => `${m.LOGIN_SUCCESSFUL()}`);
			await goto('/');
		}
	};
</script>

<svelte:head>
	<title>{m.LOGIN()}</title>
</svelte:head>

<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{m.LOGIN()}</h1>
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
					handleLogin();
				}}
			>
				{#if errors}
					<p>{errors}</p>
				{/if}
				<input
					class="input"
					type="email"
					bind:value={email}
					hideLabel
					labelText={m.EMAILADDRESS()}
					placeholder="{m.EMAILADDRESS()}..."
					required
					warn={emailWarn}
				/>
				<input
					class="input"
					bind:value={password}
					required
					type="password"
					labelText={m.PASSWORD()}
					placeholder="{m.PASSWORD()}..."
					warn={passwordWarn}
				/>
				<button
					class="btn bg-primary-500"
					bind:this={submitButton}
					type="submit"
					on:click={() => {
						submitButtonInnerHTML = m.SIGNINGIN();
					}}>{submitButtonInnerHTML}</button
				>
			</form>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
