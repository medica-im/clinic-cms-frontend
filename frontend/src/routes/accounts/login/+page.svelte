<script lang="ts">
	import { notificationData } from '$lib/store/notificationStore';
	import { post, browserSet, browserGet } from '$lib/utils/requestUtils';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/utils/constants';
	import { fly } from 'svelte/transition';

	import type { UserResponse } from '$lib/interfaces/user.interface';
	import type { CustomError } from '$lib/interfaces/error.interface';
	import { changeText } from '$lib/helpers/buttonText';
	import LL from '$i18n/i18n-svelte';

	let email = '',
		password = '',
		errors: Array<CustomError>;

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
		const response: UserResponse = jsonRes;

		if (err.length > 0) {
			errors = err;
		} else if (response.user) {
			browserSet('refreshToken', response.user.tokens.refresh);
			notificationData.update(() => `${$LL.LOGIN.SUCCESSFUL()}`);
			await goto('/');
		}
	};
</script>

<svelte:head>
	<title>{$LL.LOGIN.LOGIN()}</title>
</svelte:head>

<section
	class="container"
	in:fly={{ x: -100, duration: 500, delay: 500 }}
	out:fly={{ duration: 500 }}
>
	<h1>{$LL.LOGIN.LOGIN()}</h1>
	{#if errors}
		{#each errors as error}
			<p class="center error">{error.error}</p>
		{/each}
	{/if}
	<form class="form" on:submit|preventDefault={handleLogin}>
		<div class="mb-3">
			<label for="inputEmail" class="form-label">{$LL.EMAILADDRESS()}</label>
		<input
		id="inputEmail"
			bind:value={email}
			name="email"
			type="email"
			class="form-control"
			aria-label={$LL.EMAILADDRESS()}
			required
		/>
	</div>
	<div class="mb-3">
		<label for="inputPassword" class="form-label">{$LL.PASSWORD()}</label>
		<input
		id="inputPassword"
		class="form-control"
			bind:value={password}
			name="password"
			type="password"
			aria-label={$LL.PASSWORD()}
			required
		/>
		</div>
		<button class="btn btn-primary" type="submit" on:click={(e) => changeText(e, $LL.LOGIN.SIGNINGIN())}>{$LL.LOGIN.TOLOGIN()}</button
		>
		<!--div class="form-text">{$LL.LOGIN.NOACCOUNT()} <a href="/accounts/register">{$LL.LOGIN.CREATEACCOUNT()}</a>
		</div-->
	</form>
</section>
