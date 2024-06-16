<script lang="ts">
	import { notificationData } from '$lib/store/notificationStore';
	import {
		post,
		browserSet,
		browserGet,
		getCurrentUser,
		emptyLocaleStorage
	} from '$lib/utils/requestUtils';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/utils/constants';
	import { fly } from 'svelte/transition';
	import { toggleAuth } from '$lib/store/authStore';
	import { invalidate } from '$app/navigation';
	import { userData } from '$lib/store/userStore';
	import { isObjectEmpty } from '$lib/utils/utils';
	import { get } from '@square/svelte-store';
	import type { Access, User } from '$lib/interfaces/user.interface';
	import type { UserResponse } from '$lib/interfaces/user.interface';
	import type { CustomError } from '$lib/interfaces/error.interface';
	import { changeText } from '$lib/helpers/buttonText';
	import LL from '$i18n/i18n-svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { getPermissions } from '$lib/utils/permissions';

	export let data;

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
		let userDataValue = get(userData);
        if (!isObjectEmpty(userDataValue) && data.redirect) {
            goto(data.redirect);
        };
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
		response = jsonRes;

		if (err.length > 0) {
			errors = err;
			console.error(`errors: ${errors}`);
			submitButtonInnerHTML = $LL.LOGIN.TOLOGIN();
		} else if (response.user && response.user.error) {
			errors = response.user.error[0];
			console.error(`errors: ${errors}`);
			submitButtonInnerHTML = $LL.LOGIN.TOLOGIN();
		} else if (response.user && response.user.tokens) {
			console.log(response);
			notificationData.update(() => `${$LL.LOGIN.SUCCESSFUL()}`);
			emptyLocaleStorage();
			browserSet('refreshToken', response.user.tokens.refresh);
			if (browserGet('refreshToken')) {
				const res = await fetch(`${variables.BASE_API_URI}/access/control/`);
				const access = await res.json();
				const [user, errs] = await getCurrentUser(
					fetch,
					`${variables.BASE_API_URI}/accounts/token/refresh/`,
					`${variables.BASE_API_URI}/accounts/user/`
				);
				if (errs.length <= 0) {
					user.access = getPermissions(user, access);
					console.log(user);
					userData.set(user);
					console.log(get(userData));
				} else {
					userData.set(null);
				}
			}
			toggleAuth();
			let redirect: string = data.redirect || '/accounts/user';
			await goto(redirect);
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
					autocomplete="on"
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
				<p><a href="/accounts/reset">{$LL.LOGIN.PASSWORD_FORGOTTEN()}</a></p>
			</form>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
