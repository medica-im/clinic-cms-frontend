<script context="module" lang="ts">
	import { userData } from '$lib/store/userStore';
	import { navigating } from '$app/stores';
	import { loading } from '$lib/store/loadingStore';
	import { notificationData } from '$lib/store/notificationStore';
	import { fly } from 'svelte/transition';
	import { afterUpdate, onMount } from 'svelte';
	import type { Load } from '@sveltejs/kit';
	import type { Locales } from '$i18n/i18n-types';
	import type { Facility } from '$lib/interfaces/facility.interface';
	import { replaceLocaleInUrl } from '../utils';
	import { baseLocale, locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import Loader from '../components/Loader/Loader.svelte';
	import CircularProgress from '@smui/circular-progress';
	import LL from '$i18n/i18n-svelte';
 /* 
  type LoadParams = {
		lang?: Locales;
	};
	export const load: Load<LoadParams> = async ({ url, session, params }) => {
		// fallback needed because of https://github.com/sveltejs/kit/issues/3647
		const lang = params.lang || (url.pathname.split('/')[1] as Locales) || 'fr';
		// redirect to preferred language if user comes from page root
		if (!lang) {
			return {
				status: 302,
				redirect: `/${session.locale}`
			};
		}
		// redirect to base locale if language is not present
		if (!locales.includes(lang)) {
			return {
				status: 302,
				redirect: replaceLocaleInUrl(url.pathname, baseLocale)
			};
		}
		// delete session locale since we don't need it to be sent to the client
		delete session.locale;
		await loadLocaleAsync(lang);
		return { props: { locale: lang } };
	};
	*/
</script>

<script lang="ts">
	import Header from '../components/Header/Header.svelte';
	import { setLocale } from '$i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { facilityStore } from '$lib/store/facilityStore';

	$: loading.setNavigate(!!$navigating);
	$: loading.setLoading(!!$navigating, 'Loading, please wait...');

	import { getCurrentUser, browserGet } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';

	onMount(async () => {
		if (browserGet('refreshToken')) {
			const [response, errs] = await getCurrentUser(
				fetch,
				`${variables.BASE_API_URI}/accounts/token/refresh/`,
				`${variables.BASE_API_URI}/accounts/user/`
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
				`${variables.BASE_API_URI}/accounts/token/refresh/`,
				`${variables.BASE_API_URI}/accounts/user/`
			);
			userData.update(() => response);
		}
	});

	/*$: if ($page.url.hash) {
  // Workaround until https://github.com/sveltejs/kit/issues/2664 is fixed
  if (typeof window !== "undefined" && window.location.hash) {
    const deepLinkedElement = document.getElementById(
      window.location.hash.substring(1)
    );
    if (deepLinkedElement) {
		window.setTimeout(() => deepLinkedElement.scrollIntoView(), 100);    }
  }
}*/
</script>

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- The page supports both dark and light color schemes,
			 and the page author prefers / default is light. -->
	<meta name="color-scheme" content="light" />

	<!-- Replace the Bootstrap CSS with the
			 Bootstrap-Dark Variant CSS -->
	<!--link
		href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-dark.min.css"
		rel="stylesheet"
	/-->

	<!-- Optional Meta Theme Color is also supported on Safari and Chrome -->
	<meta name="theme-color" content="#111111" media="(prefers-color-scheme: light)" />
	<!--meta name="theme-color" content="#eeeeee" media="(prefers-color-scheme: dark)" /-->
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
	/>
</head>

{#await facilityStore.load()}
<div style="display: flex; justify-content: center">
	<CircularProgress style="height: 32px; width: 32px;" indeterminate />
</div>
{:then}
{#if $userData}
<Header user={$userData} facility={$facilityStore} />
{/if}
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
<footer class="footer mt-auto py-3 bg-light">
	<div class="container">
	  <span class="text-muted"><svg
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
	{$LL.HOME.FOOTER.WIP()} <a href="https://medecinelibre.com">Médecine Libre</a>.</span>
	</div>
  </footer>
<!--footer in:fly={{ y: -50, duration: 500, delay: 500 }} out:fly={{ duration: 500 }} /-->