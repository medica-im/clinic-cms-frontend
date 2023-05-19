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
	let submitButtonInnerHTML: string = $LL.LOGIN.TOLOGIN();
	let response: UserResponse;
	let emailWarn = false;
	let passwordWarn = false;
	let email = '',
		password = '',
		errors: Array<CustomError>;

	onMount(() => {
		submitButtonInnerHTML = $LL.LOGIN.TOLOGIN();
	});

	$: if (response && response.user && response.user.error) {
		submitButtonInnerHTML = $LL.LOGIN.TOLOGIN();
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
		//console.log(`jsonRes: ${JSON.stringify(jsonRes)}`);
		//console.log(`err: ${JSON.stringify(err)}`);
		response = jsonRes;

		if (err.length > 0) {
			errors = err;
			console.log(`errors: ${errors}`);
			submitButtonInnerHTML = $LL.LOGIN.TOLOGIN();
		} else if (response.user && response.user.error) {
			errors = response.user.error[0];
			console.log(`errors: ${errors}`);
			submitButtonInnerHTML = $LL.LOGIN.TOLOGIN();
		} else if (response.user && response.user.tokens) {
			emptyLocaleStorage();
			browserSet('refreshToken', response.user.tokens.refresh);
			toggleAuth();
			notificationData.update(() => `${$LL.LOGIN.SUCCESSFUL()}`);
			await goto('/');
		}
	};
</script>

<svelte:head>
	<title>{$LL.LOGIN.LOGIN()}</title>
</svelte:head>

<div>
	<header>
		<div class="section-container">
			<h1>{$LL.LOGIN.LOGIN()}</h1>
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
					//console.log('submit', e);
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
					labelText={$LL.EMAILADDRESS()}
					placeholder="{$LL.EMAILADDRESS()}..."
					required
					warn={emailWarn}
				/>
				<input
					class="input"
					bind:value={password}
					required
					type="password"
					labelText={$LL.PASSWORD()}
					placeholder="{$LL.PASSWORD()}..."
					warn={passwordWarn}
				/>
				<button
					class="btn bg-primary-500"
					bind:this={submitButton}
					type="submit"
					on:click={() => {
						submitButtonInnerHTML = $LL.LOGIN.SIGNINGIN();
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
