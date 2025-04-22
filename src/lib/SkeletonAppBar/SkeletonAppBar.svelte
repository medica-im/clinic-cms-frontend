<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { variables } from '$lib/utils/constants';
	import Fa from 'svelte-fa';
	import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
	import {
		faBars,
		faCaretDown,
		faInfo,
		faTimeline,
		faBookMedical,
		faHouse,
		faMapLocationDot,
		faAddressBook,
		faEnvelope,
		faBlog,
		faRightToBracket,
		faRightFromBracket,
		faUserPlus,
		faUser,
		faPalette
	} from '@fortawesome/free-solid-svg-icons';
	import User from '$lib/SkeletonAppBar/User.svelte';
	// Types
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	// Docs
	import OutpatientClinicLogo from '$lib/Logos/OutpatientClinicLogo.svelte';
	import AddressBookLogo from '$lib/Logos/AddressBookLogo.svelte';
	import SkeletonIcon from '$lib/Icon/Icon.svelte';
	import SocialNetworks from '../SoMed/SoMed.svelte';

	// Components
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import MenuNavLinks from '$lib/SkeletonAppBar/MenuNavLinks.svelte';

	// Utilities
	import { popup } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Stores
	import { storeTheme } from '$lib/store/skeletonStores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import * as m from "$msgs";
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { userData } from '$lib/store/userStore';
	import { isObjectEmpty } from '$lib/utils/utils';

	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();

	export let facility;

	// Local
	let isOsMac = false;

	// Set Search Shortkey Keys
	if (browser) {
		let os = navigator.userAgent;
		isOsMac = os.search('Mac') !== -1;
	}

	// Drawer Handler
	function drawerOpen(): void {
		const s: DrawerSettings = { id: 'doc-sidenav' };
		drawerStore.open(s);
	}

	// Search
	function triggerSearch(): void {
		const d: ModalSettings = {
			type: 'component',
			component: 'modalSearch',
			position: 'item-start'
		};
		modalStore.trigger(d);
	}

	// Keyboard Shortcut (CTRL/⌘+K) to Focus Search
	function onWindowKeydown(e: KeyboardEvent): void {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			// Prevent default browser behavior of focusing URL bar
			e.preventDefault();
			// If modal currently open, close modal (allows to open/close search with CTRL/⌘+K)
			$modalStore.length ? modalStore.close() : triggerSearch();
		}
	}

	const themes = [
		{ type: 'skeleton', name: 'Skeleton', icon: '💀' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️' },
		{ type: 'modern', name: 'Modern', icon: '🤖' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕' }
		// { type: 'seasonal', name: 'Seasonal', icon: '🎆' }
		// { type: 'test', name: 'Test', icon: '🚧' },
	];

	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();

		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};
</script>

<!-- NOTE: using stopPropagation to override Chrome for Windows search shortcut -->
<svelte:window on:keydown|stopPropagation={onWindowKeydown} />

<AppBar shadow="shadow-lg">
	<svelte:fragment slot="lead">
			<!-- Hamburger Menu -->
			<button on:click={drawerOpen} class="btn-icon xl:!hidden">
				<Fa icon={faBars} />
			</button>
		</svelte:fragment>
			<!-- Logo -->
			<a data-sveltekit-preload-data="off" href="/" title={m.NAVBAR_GO_HOME()}>
				<div class="flex items-center">

				<div class="w-8 h-8 mx-1 flex-none"><OutpatientClinicLogo /></div>
				{#if isObjectEmpty($userData)}
					<div class="2xl:hidden flex-none">MSP Gadagne</div>
					<span class="hidden 2xl:inline-block"
						><h3 class="h3">{capitalizeFirstLetter(facility.formatted_name, $language)}</h3></span
					>
				{/if}
				</div>
				</a>
	<svelte:fragment slot="trail">
			<!-- Search -->
			<!--div class="md:inline md:ml-4">
			<button class="btn btn-sm variant-ghost-surface hidden lg:inline-block" on:click={triggerSearch}>
				<i class="fa-solid fa-magnifying-glass" />
				<span class="hidden lg:inline-block">Search</span>
				<span class="hidden lg:inline-block text-[11px] font-bold opacity-60 pl-2">{isOsMac ? '⌘' : 'Ctrl'}+K</span>
			</button>
		</div-->

			<!-- Navigate -->
			<div class="relative hidden xl:block">
				<!-- trigger -->
				<button
					class="btn hover:variant-soft-primary"
					use:popup={{ event: 'click', target: 'features' }}
				>
					<span>{m.NAVBAR_NAVIGATE()}</span>
					<span class="opacity-50"><Fa icon={faCaretDown} /></span>
				</button>
				<!-- popup -->
				<!-- prettier-ignore -->
				<div class="card p-4 w-60 shadow-xl" data-popup="features">
				<nav class="list-nav">
					<ul>
						<li>
							<a data-sveltekit-preload-data="off" href="/">
								<span class="w-6 text-center"><Fa icon={faHouse} /></span>
								<span>{m.HOME_TITLE()}</span>
							</a>
						</li>
						<li>
							<a data-sveltekit-preload-data="tap" href="/annuaire">
								<span class="w-6 text-center"><Fa icon={faAddressBook} /></span>
								<span>{m.NAVBAR_ADDRESSBOOK()}</span>
							</a>
						</li>
						<li>
							<a href="/sites">
								<span class="w-6 text-center"><Fa icon={faMapLocationDot} /></span>
								<span>Sites</span>
							</a>
						</li>

						<li>
							<a href="/contact">
								<span class="w-6 text-center"><Fa icon={faEnvelope} /></span>
								<span>Contact</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			</div>
			<div class="hidden">
				<!-- trigger -->
				<button
					class="btn hover:variant-soft-primary"
					use:popup={{ event: 'click', target: 'facility' }}
				>
					<span>{m.OUTPATIENT_CLINIC()}</span>
					<span class="opacity-50"><Fa icon={faCaretDown} /></span>
				</button>
				<!-- popup -->
				<!-- prettier-ignore -->
				<div class="card p-4 w-60 shadow-xl" data-popup="facility">
				<nav class="list-nav">
					<ul>
						{#if variables.ORGANIZATION_CATEGORY == "msp"}

						<li>
							<a href="/{ facility.category.slug }/a-propos">
								<span class="w-6 text-center"><Fa icon={faInfo} /></span>
								<span>{m.NAVBAR_ABOUT()}</span>
							</a>
							{#if variables.TIMELINE}
							<a href="/{ facility.category.slug }/chronologie">
								<span class="w-6 text-center"><Fa icon={faTimeline} /></span>
								<span>{m.NAVBAR_TIMELINE()}</span>
							</a>
							{/if}
							<!--hr class="my-4"-->
							<a href="/{ facility.category.slug }/projet-de-sante">
								<span class="w-6 text-center"><Fa icon={faBookMedical} /></span>
								<span>{m.NAVBAR_HEALTH_PROJECT()}</span>
							</a>
						</li>
					{/if}
					</ul>
				</nav>
			</div>
			</div>
			<div class="relative hidden xl:block">
				<MenuNavLinks />
			</div>

			<!-- trigger-->
			<button
				class="btn hover:variant-soft-primary"
				use:popup={{ event: 'click', target: 'theme' }}
			>
				<span class="2xl:hidden">
					<Fa icon={faPalette} />
				</span>
				<span class="hidden 2xl:inline-block">{m.NAVBAR_THEME()}</span>
				<span class="opacity-50"><Fa icon={faCaretDown} /></span>
			</button>
			<!-- popup -->
			<div class="card p-4 w-60 shadow-xl" data-popup="theme">
				<section class="flex justify-between items-center">
					<h6 class="h6">Mode</h6>
					<LightSwitch />
				</section>
				<hr class="my-4" />
					<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
						<form action="/?/setTheme" method="POST" use:enhance={setTheme}>
							<ul>
								{#each themes as { icon, name, type }}
									<li>
										<button
											class="option w-full h-full"
											type="submit"
											name="theme"
											value={type}
											class:bg-primary-active-token={$storeTheme === type}
										>
											<span>{icon}</span>
											<span class="flex-auto text-left">{name}</span>
										</button>
									</li>
								{/each}
							</ul>
						</form>
					</nav>
			</div>

			<!-- Social -->
			<!-- prettier-ignore -->
			<div class="relative hidden xl:block">
			{#if facility?.contact?.socialnetworks}
            <SocialNetworks data={facility.contact.socialnetworks} appBar={true} />
			{/if}
			{#if variables.BLOG_URI}

			<a href={variables.BLOG_URI} title={'blog'} class="btn hover:variant-soft-primary" target="_blank" rel="noreferrer">
				<span><Fa icon={faBlog} size="lg" /></span>
				<span class="hidden 2xl:inline-block">Blog</span>
			</a>
			{/if}
        </div>
			<div>
				<section class="space-x-1">
					<User {facility} />
				</section>
			</div>
	</svelte:fragment>
</AppBar>
