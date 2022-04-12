<script context="module" lang="ts">
	import { userData } from '$lib/store/userStore';
	import { navigating } from '$app/stores';
	import { loading } from '$lib/store/loadingStore';
	import { notificationData } from '$lib/store/notificationStore';
	import { fly } from 'svelte/transition';
	import { afterUpdate, onMount } from 'svelte';
	import type { Load } from '@sveltejs/kit'
	import type { Locales } from '$i18n/i18n-types'
	import { replaceLocaleInUrl } from '../utils'
	import { baseLocale, locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import Loader from '../components/Loader/Loader.svelte';
</script>

<script lang="ts">
	import Header from '../components/Header/Header.svelte';
	import { setLocale } from '$i18n/i18n-svelte'
	let locale: Locales
	setLocale(locale);

	$: loading.setNavigate(!!$navigating);
	$: loading.setLoading(!!$navigating, 'Loading, please wait...');

	import { getCurrentUser, browserGet } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';

	onMount(async () => {
		if (browserGet('refreshToken')) {
			const [response, errs] = await getCurrentUser(
				fetch,
				`${variables.BASE_API_URI}/token/refresh/`,
				`${variables.BASE_API_URI}/user/`
			);
			if (errs.length <= 0) {
				userData.set(response);
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
				`${variables.BASE_API_URI}/token/refresh/`,
				`${variables.BASE_API_URI}/user/`
			);
			userData.update(() => response);
		}
	});
	type LoadParams = {
		lang?: Locales
	}
	export const load: Load<LoadParams> = async ({ url, session, params }) => {
		// fallback needed because of https://github.com/sveltejs/kit/issues/3647
		const lang = params.lang || (url.pathname.split('/')[1] as Locales) || 'fr'
		// redirect to preferred language if user comes from page root
		if (!lang) {
			return {
				status: 302,
				redirect: `/${session.locale}`,
			}
		}
		// redirect to base locale if language is not present
		if (!locales.includes(lang)) {
			return {
				status: 302,
				redirect: replaceLocaleInUrl(url.pathname, baseLocale),
			}
		}
		// delete session locale since we don't need it to be sent to the client
		delete session.locale
		await loadLocaleAsync(lang)
		return { props: { locale: lang } }
	}

</script>

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- The page supports both dark and light color schemes,
			 and the page author prefers / default is light. -->
	<meta name="color-scheme" content="light dark" />

	<!-- Replace the Bootstrap CSS with the
			 Bootstrap-Dark Variant CSS -->
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-dark.min.css"
		rel="stylesheet"
	/>

	<!-- Optional Meta Theme Color is also supported on Safari and Chrome -->
	<meta name="theme-color" content="#111111" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#eeeeee" media="(prefers-color-scheme: dark)" />
	<!--link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
		crossorigin="anonymous"
	/-->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
	/>
</head>

<Header />

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
	<Loader />
	<div class="container">
	<slot />
    </div>
</main>

<footer in:fly={{ y: -50, duration: 500, delay: 500 }} out:fly={{ duration: 500 }}>
</footer>
