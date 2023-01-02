<script lang="ts">
	import { userData } from '$lib/store/userStore';
	import { navigating } from '$app/stores';
	import { loading } from '$lib/store/loadingStore';
	import { i18nNotificationData, notificationData } from '$lib/store/notificationStore';
	import { fly } from 'svelte/transition';
	import { afterUpdate, onMount } from 'svelte';
	import type { Load } from '@sveltejs/kit';
	import type { Locales } from '$i18n/i18n-types';
	import type { Facility } from '$lib/interfaces/facility.interface';
	import { replaceLocaleInUrl } from '../utils';
	import { baseLocale, locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import Loader from '../components/Loader/Loader.svelte';
	import LL from '$i18n/i18n-svelte';
	import Navigation from '../components/Header/Navigation.svelte';
	import { setLocale } from '$i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { facilityStore } from '$lib/store/facilityStore';
	import { getCurrentUser, browserGet } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';
	import { language } from '$lib/store/languageStore';
	import favicon from '$lib/assets/favicon.png';

    /** @type {import('./$types').LayoutData} */
	export let data;

	$: loading.setNavigate(!!$navigating);
	$: loading.setLoading(!!$navigating, 'Loading, please wait...');

	onMount(async () => {
		if (browserGet('refreshToken')) {
			const [response, errs] = await getCurrentUser(
				fetch,
				`${variables.BASE_API_URI}/accounts/token/refresh/`,
				`${variables.BASE_API_URI}/accounts/user/`
			);
			if (errs.length <= 0) {
				userData.set(response);
			} else {
				userData.set({});
			}
		}
	});

	afterUpdate(async () => {
		const notifyEl = document.getElementById('notification') as HTMLElement;
		// const notifyEl = document.getElementsByClassName('notification');
		if (notifyEl && $notificationData !== '') {
			setTimeout(() => {
				notifyEl.classList.add('disappear');
				notificationData.set('');
			}, 3000);
		}
		if (browserGet('refreshToken')) {
			const [response, _] = await getCurrentUser(
				fetch,
				`${variables.BASE_API_URI}/accounts/token/refresh/`,
				`${variables.BASE_API_URI}/accounts/user/`
			);
			userData.update(() => response);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} /> 
</svelte:head>

{#await facilityStore.load()}
    <Navigation facility={data.facility} />
{:then}
	<Navigation facility={$facilityStore} />
{/await}

	{#if $notificationData}
		<p
			class="notification"
			id="notification"
			in:fly={{ x: 200, duration: 500, delay: 500 }}
			out:fly={{ x: 200, duration: 500 }}
		>
			{$notificationData}
		</p>
	{/if}

	<main>
		<!--Loader /-->
		<div class="container">
			<slot />
		</div>
	</main>

	{#if import.meta.env.DEV}
		<footer class="footer mt-auto py-3 bg-light">
			<div class="container">
				<span class="text-muted"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-cone-striped"
						viewBox="0 0 16 16"
					>
						<path
							d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z"
						/>
					</svg>
					{$LL.HOME.FOOTER.WIP()} <a href="https://medecinelibre.com">Médecine Libre</a>.</span
				>
			</div>
		</footer>
	{/if}
<!--
{/await}
-->
