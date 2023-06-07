<script lang="ts">
    import { facilityStore } from '$lib/store/facilityStore';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { storeCurrentUrl, storeTheme } from '$lib/store/skeletonStores';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import { userData } from '$lib/store/userStore';
	import { navigating } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { loading } from '$lib/store/loadingStore';
	import { i18nNotificationData, notificationData } from '$lib/store/notificationStore';
	import { fly } from 'svelte/transition';
	import { afterUpdate, onMount } from 'svelte';
	import type { Load } from '@sveltejs/kit';
	import type { Locales } from '$i18n/i18n-types';
	import type { Facility } from '$lib/interfaces/facility.interface';
	import { baseLocale, locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import LL from '$i18n/i18n-svelte';
	import { setLocale } from '$i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { getCurrentUser, browserGet } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';
	import { language } from '$lib/store/languageStore';
	import favicon from '$lib/assets/favicon.png';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	// Modal Components
	import Search from '$modals/Search/Search.svelte';

	// Types
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	// components
	import SkeletonAppBar from '$components/SkeletonAppBar/SkeletonAppBar.svelte';
	import Drawer from '$components/Drawer/Drawer.svelte';
	import Footer from '$components/Footer/Footer.svelte';

	// Theme stylesheet is loaded from LayoutServerData
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;

	$: loading.setNavigate(!!$navigating);
	$: loading.setLoading(!!$navigating, 'Loading, please wait...');

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

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

	afterNavigate((params: any) => {
		// Store current page route URL
		storeCurrentUrl.set($page.url.pathname);
		// Scroll to top
		const isNewPage: boolean =
			params.from && params.to && params.from.route.id !== params.to.route.id;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});

	function matchList(pageUrlPath: string): boolean {
		const url = ['maison-de-sante', 'education-therapeutique', 'education-sante', 'prevention'];
		let match = url.filter(function (e) {
			let m: bool;
			try {
				m = pageUrlPath.includes(e);
			} catch (err) {
				m = false;
			}
			return m;
		});
		return Boolean(match.length);
	}

	// Registered list of Components for Modals
	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalSearch: { ref: Search }
	};

	// Disable left sidebar on homepage
	$: slotSidebarLeft = matchList($page.url.pathname) ? 'bg-surface-50-900-token lg:w-auto' : 'w-0';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	
	<!--set .env variable VITE_NOINDEX to "true" to prevent all search engines that support the noindex rule (including Google) from indexing a page on your site--> 
	{#if variables.NOINDEX==true}
	<meta name="robots" content="noindex">
	{/if}
</svelte:head>
<!-- Overlays -->
<Modal components={modalComponentRegistry} />
<Toast />
<!--
{#await facilityStore.load()}
-->
<Drawer data={$facilityStore} />

<AppShell {slotSidebarLeft} regionPage="overflow-y-scroll" slotFooter="bg-black p-4">
		<svelte:fragment slot="header">
			<SkeletonAppBar facility={$facilityStore} />
		</svelte:fragment>
		<svelte:fragment slot="sidebarLeft">
			<Sidebar data={$facilityStore} class="hidden lg:grid w-[360px] overflow-hidden" />
		</svelte:fragment>
		<svelte:fragment slot="pageHeader">
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
		</svelte:fragment>
		<!-- Page Content -->
			<slot />
		<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
	</AppShell>

	<!--
{:then}
	<Drawer data={$facilityStore} />
	<AppShell {slotSidebarLeft}>
		<svelte:fragment slot="header">
			<SkeletonAppBar facility={$facilityStore} />
		</svelte:fragment>
		<svelte:fragment slot="sidebarLeft">
			<Sidebar data={$facilityStore} class="hidden lg:grid w-[360px] overflow-hidden" />
		</svelte:fragment>
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
		<div class="container mx-auto p-6 space-y-6">
			<slot />
		</div>
		<svelte:fragment slot="pageFooter"><Footer data={$facilityStore} /></svelte:fragment>
	</AppShell>
{/await}
-->