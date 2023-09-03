<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { changeText } from '$lib/helpers/buttonText';

	import { fly } from 'svelte/transition';

	import type { CustomError } from '$lib/interfaces/error.interface';

	export let data: PageData;
	export let form: ActionData;

    const minLength = 8;

	let password: string = '';
    let confirmPassword: string = '';
    let errors: Array<CustomError>;
    let passCountBadge: string;
    let passCount: number;

    $: passCount=passwordLength(password, confirmPassword);

    function passwordLength(password: string, confirmPassword: string) {
        let pass = password.length || 0;
        let conf = confirmPassword.length || 0;
        let max = Math.max(pass, conf);
        return max;
    }

	const passwordConfirm = () => (password !== confirmPassword ? false : true);
</script>

<!--div class="flex flex-col">
<div>uid:{data.uid}</div>
<div>token:{data.token}</div>
</div-->

<svelte:head>
	<title>{$LL.LOGIN.CHANGE_PASSWORD()}</title>
</svelte:head>

<div>
    		<header>
			<div class="section-container">
				<h1 class="h1">{$LL.LOGIN.CHANGE_PASSWORD()}</h1>
			</div>
		</header>

	<section
		class="container"
		in:fly={{ y: 100, duration: 500, delay: 500 }}
		out:fly={{ duration: 500 }}
	>

		<div class="section-container">

		{#if errors}
        {#each errors as error}
            <p class="center error">{error.error}</p>
        {/each}
    {/if}
			<form class="space-y-4 lg:max-w-2xl" method="POST">
				<input type="hidden" id="uid" name="uid" value={data.uid} />
				<input type="hidden" id="token" name="token" value={data.token} />
				<input
					class="input"
					bind:value={password}
					type="password"
					name="new_password1"
                    autocomplete="new-password"
					aria-label="password"
					placeholder={$LL.LOGIN.ENTER_PASSWORD()}
					required
				/>
				<input
					class="input"
					bind:value={confirmPassword}
					type="password"
					name="new_password2"
                    autocomplete="new-password"
					aria-label="$LL.CONFIRL"
					placeholder={$LL.LOGIN.CONFIRM_PASSWORD()}
					required
				/>
					<button
						class="btn bg-primary-500"
						type="submit"
                        disabled={password!=confirmPassword || password?.length<8}
						on:click={(e) => changeText(e, 'Registering...')}
					>
						{$LL.LOGIN.SET_NEW_PASSWORD()}
					</button>
                    {#if password || confirmPassword}
                    <span class={passCount>=minLength ? 'badge variant-ghost-success' : 'badge variant-ghost-error'}>{passCount} {passCount>1 ? $LL.CHARACTER.PLURAL() : $LL.CHARACTER.SINGULAR()}</span>
                    {/if}
			</form>
			{#if form?.success}
				<!-- this message is ephemeral; it exists because the page was rendered in
       response to a form submission. it will vanish if the user reloads -->
				<p>{$LL.LOGIN.CHANGE_PASSWORD_SUCCESS()}</p>
			{/if}
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>