<script lang="ts">
	import { browser } from '$app/environment'
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { organizationStore } from '$lib/store/facilityStore';
    import '../app.postcss';
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import Sidebar from '$lib/SkeletonAppBar/Sidebar.svelte';
    import { userData } from '$lib/store/userStore';
    import { afterNavigate } from '$app/navigation';
    import { notificationData } from '$lib/store/notificationStore';
    import { fly } from 'svelte/transition';
    import { afterUpdate, onMount } from 'svelte';
    import { page } from '$app/state';
    import { getCurrentUser, browserGet } from '$lib/utils/requestUtils';
    import { variables } from '$lib/utils/constants';
    import favIcon from '$lib/assets/favicon/favicon.svg';
    import maskIcon from '$lib/assets/favicon/mask-icon.svg';
    import appleTouchIcon from '$lib/assets/favicon/apple-touch-icon.png';
    import { AppShell } from '@skeletonlabs/skeleton';
    import { Toast } from '@skeletonlabs/skeleton';
    // Modal Components
    import Search from '$lib/Search/Search.svelte';

    // Types
    import type { ModalComponent } from '@skeletonlabs/skeleton';
    // components
    import SkeletonAppBar from '$lib/SkeletonAppBar/SkeletonAppBar.svelte';
    import Drawer from '$lib/Drawer/Drawer.svelte';
    import Footer from '$lib/Footer/Footer.svelte';

    // Theme stylesheet is loaded from LayoutServerData
    import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
    import type { ComponentProps } from 'svelte';
    import { scrollY } from '$lib/store/scrollStore';
	import type { User } from '$lib/interfaces/user.interface';
	import type { CustomError } from '$lib/interfaces/error.interface';
	import { locales, localizeHref } from '$prgld/runtime.js';
	import { programsNavLinks } from '$var/variables.ts';

	initializeStores();

    function scrollHandler(event: ComponentProps<AppShell>['scroll']) {
	scrollY.set(event.currentTarget.scrollTop);
}

    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    onMount(async () => {
		if (browserGet('refreshToken')) {
			const [response, errs]: [User, CustomError[]] = await getCurrentUser(fetch);
			//console.log(`User: ${JSON.stringify(response)}`);
			if (errs.length <= 0) {
				userData.set(response);
			} else {
				userData.set(undefined);
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
			const [response, _] = await getCurrentUser(fetch);
			userData.update(() => response);
		}
	});

    afterNavigate((params: any) => {
		// Scroll to top
		const isNewPage: boolean =
			params.from && params.to && params.from.route.id !== params.to.route.id;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});

    function matchList(pageUrlPath: string): boolean {
		const url = ['maison-de-sante/', 'education-therapeutique', 'education-sante', 'prevention', 'soins'];
		let match = url.filter(function (e) {
			let m: boolean;
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
    $: slotSidebarLeft = matchList(page.url.pathname) ? 'bg-surface-50-900-token lg:w-auto z-auto' : 'w-0';
	const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })
</script>

<svelte:head>
	{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}
	<link rel="icon" href="{favIcon}">
	<link rel="mask-icon" href="{maskIcon}" color="#000000">
	<link rel="apple-touch-icon" href="{appleTouchIcon}">
	<!--script defer data-domain="sante-gadagne.fr" src="https://plausible.medica.im/js/script.js"></script-->
	<!--set .env variable VITE_NOINDEX to "true" to prevent all search engines that support the noindex rule (including Google) from indexing a page on your site--> 
	{#if variables.NOINDEX==true}
	<meta name="robots" content="noindex">
	{/if}
</svelte:head>
<!-- Overlays -->
<Modal components="{modalComponentRegistry}"></Modal>
<Toast></Toast>

<Drawer data="{$organizationStore}"></Drawer>

<AppShell class="z-[90000]" {slotSidebarLeft} regionpage="overflow-y-scroll" slotfooter="bg-black p-4" on:scroll="{scrollHandler}">
		<svelte:fragment slot="header">
			<SkeletonAppBar facility="{$organizationStore}"></SkeletonAppBar>
		</svelte:fragment>
		<svelte:fragment slot="sidebarLeft">
			<Sidebar data="{$organizationStore}" class="hidden lg:grid w-[360px] overflow-hidden"></Sidebar>
		</svelte:fragment>
		<svelte:fragment slot="pageHeader">
			{#if $notificationData}
				<p class="notification" id="notification" in:fly={{x: 200, duration: 500, delay: 0 }} out:fly={{}}>
					{$notificationData}
				</p>
			{/if}
		</svelte:fragment>
		<!-- Page Content -->
		<QueryClientProvider client={queryClient}>
			<slot></slot>
		</QueryClientProvider>
		<svelte:fragment slot="pageFooter"><Footer {programsNavLinks}/></svelte:fragment>
	</AppShell>
	<div style="display:none">
		{#each locales as locale}
			<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
		{/each}
	</div>