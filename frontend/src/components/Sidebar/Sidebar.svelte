<script lang="ts">
	import { language} from '$lib/store/languageStore';
	import LL from '$i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';
	import { variables } from '$lib/utils/constants';

	import DocsIcon from '$components/Icon/Icon.svelte';
	import { menuNavLinks } from '../../links';
	import { AppRail } from '@skeletonlabs/skeleton';

	import { AppRailTile } from '@skeletonlabs/skeleton';
	import SoMed from '$components/SoMed/SoMed.svelte';

	// Stores
	import { storeCurrentUrl } from '$lib/store/skeletonStores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import OutpatientClinicLogo from '$components/Logos/OutpatientClinicLogo.svelte';
	import Fa from 'svelte-fa';
	import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
	import {
		faBars,
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
		faPersonChalkboard
	} from '@fortawesome/free-solid-svg-icons';
	// Props
	export let embedded = false;
	export let data;

	// Local
	const storeCategory: Writable<string> = writable('guides'); // guides | docs | tailwind | svelte | utilities
	let filteredMenuNavLinks: any[] = menuNavLinks;

	// ListItem Click Handler
	function onListItemClick(): void {
		// On Drawer embed Only:
		if (!embedded) return;
		drawerStore.close();
	}

	function setNavCategory(c: string): void {
		if (c === 'blog') return;
		storeCategory.set(c);
		// prettier-ignore
		switch($storeCategory) {
			case('education'):
			    filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['education-therapeutique', 'education-sante'].includes(linkSet.id));
				break;
			case('maison-de-sante'):
			    filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet.id === 'maison-de-sante');
				break;
			case('prevention'):
			    filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet.id === 'prevention');
				break;
		}
	}

	// Lifecycle
	page.subscribe((p) => {
		let pathMatch: string = p.url.pathname.split('/')[1];
		if (!pathMatch) return;
		if (['education-sante', 'education-therapeutique'].includes(pathMatch)) pathMatch = 'education';
		setNavCategory(pathMatch);
	});
	storeCategory.subscribe((c: string) => setNavCategory(c));

	// Reactive
	$: classesActive = (href: string) => {
		return $storeCurrentUrl==href ? 'variant-ringed-primary' : '';
	}
</script>

<div class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ?? ''} p-1">
	<!-- App Rail -->
	<AppRail selected={storeCategory} background="bg-transparent" border="border-r border-surface-500/30">
		<AppRailTile label="Maison de santé" value={'maison-de-sante'}>
			<DocsIcon name="outpatientClinic" width="w-6" height="h-6" />
		</AppRailTile>
		<AppRailTile label="Éducation" value={'education'}>
			<DocsIcon name="faPersonChalkboard" width="w-6" height="h-6" />
		</AppRailTile>
		<AppRailTile label="Prévention" value={'prevention'}>
			<DocsIcon name="faShieldHeart" width="w-6" height="h-6" />
		</AppRailTile>
		<hr class="opacity-30" />
		<AppRailTile label="Sites" value={'sites'} tag="a" href="/sites" on:click={onListItemClick} class="lg:hidden">
			<DocsIcon name="mapLocationDot" width="w-6" height="h-6" />
		</AppRailTile>
		<AppRailTile label={$LL.NAVBAR.ADDRESSBOOK()} value={'annuaire'} tag="a" href="/annuaire" on:click={onListItemClick} class="lg:hidden">
			<DocsIcon name="addressBook" width="w-6" height="h-6" />
		</AppRailTile>
		<AppRailTile label="Contact" value={'contact'} tag="a" href="/contact" on:click={onListItemClick} class="lg:hidden">
			<DocsIcon name="envelope" width="w-6" height="h-6" />
		</AppRailTile>

		<svelte:fragment slot="trail">
			<AppRailTile label="Blog" tag="a" href="{variables.BLOG_URI}" rel="noreferrer" value={'blog'} on:click={onListItemClick} class="lg:hidden">
				<span><Fa icon={faBlog} size="lg" /></span>
			</AppRailTile>
			<SoMed data={data.contact.socialnetworks} appRail={true} />
		</svelte:fragment>
	</AppRail>
	<!-- Nav Links -->
	<section class="p-4 pb-20 space-y-4 overflow-y-auto">
		{#each filteredMenuNavLinks as { id, title, href, list }, i}
			{#if list.length > 0}
				<!-- Title -->
				<div {id} class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">{title[$language]}</div>
				<!-- Navigation List -->
				<nav class="list-nav">
					<ul>
						{#each list as { href, label, badge }}
							<li on:click={onListItemClick} on:keypress>
								<a {href} class={classesActive(href)} data-sveltekit-preload-data="hover">
									<span class="flex-auto">{@html label}</span>
									{#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				<!-- Divider -->
				{#if i + 1 < filteredMenuNavLinks.length}<hr class="!my-6 opacity-50" />{/if}
			{/if}
		{/each}
	</section>
</div>
