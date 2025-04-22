<script lang="ts">
	import { getContext } from 'svelte';
	import { language } from '$lib/store/languageStore.ts';
	import * as m from "$msgs";
	import { page } from '$app/stores';
	import { variables } from '$lib/utils/constants.ts';
	import DocsIcon from '$lib/Icon/Icon.svelte';
	import { menuNavLinks, menuNavCats } from '$var/variables.ts';
	import { AppRail, AppRailTile, AppRailAnchor, getDrawerStore } from '@skeletonlabs/skeleton';
	import SoMed from '$lib/SoMed/SoMed.svelte';
	import Fa from 'svelte-fa';
	import { faBlog } from '@fortawesome/free-solid-svg-icons';

	const widthSetting: {width: string} = getContext('widthSetting');

	const drawerStore = getDrawerStore();
	// Props
	export let embedded = false;
	export let data;

	// Local
	let currentRailCategory: string | undefined = undefined;

	function onClickAnchor(): void {
		currentRailCategory = undefined;
		drawerStore.close();
	}

	let filteredMenuNavLinks: any[] = [];

	// ListItem Click Handler
	function onListItemClick(): void {
		// On Drawer embed Only:
		if (!embedded) return;
		drawerStore.close();
	}
	// Lifecycle
	page.subscribe((page) => {
		let basePath: string = page.url.pathname.split('/')[1];
		let menuNavCat = menuNavCats.find(e=>e.list.includes(basePath));
		if (menuNavCat) {
		    currentRailCategory = menuNavCat.id;
		}
	});
	function getMenuNavLinks(currentRailCategory: string|undefined) {
		if (!currentRailCategory) return;
		let path: string = $page.url.pathname;
		//console.log(`path: ${path}`);
		//console.log(`currentRailCategory: ${currentRailCategory}`);
		//let basePath: string = page.url.pathname.split('/')[1];

		//if (!path || path == '/') return;
		// Translate path to menuNavCats id
		const cat = menuNavCats.find(cat=>cat.id==currentRailCategory);
		//console.log(`cat: ${JSON.stringify(cat)}`);
		const list = cat.list;
		//console.log(`list: ${JSON.stringify(list)}`);
		let _filteredMenuNavLinks = Object.values(menuNavLinks).filter((linkSet: any) => {
			return list.some((e: any) => e == linkSet.id);
		});
		//console.log(filteredMenuNavLinks);
		if (_filteredMenuNavLinks.length) {
			let menuNavLinkId = _filteredMenuNavLinks[0].id;
			let selectNavCats = menuNavCats.filter((navCat: any) => {
				return navCat.list.some((e: any) => e == menuNavLinkId);
			});
			//console.log(`selectNavCats: ${JSON.stringify(selectNavCats)}`);
			if (selectNavCats.length) {
				let menuNavCatId: string = selectNavCats[0].id;
				currentRailCategory = menuNavCatId;
				//console.log(`currentRailCategory: ${currentRailCategory}`)
			}
		}
		//console.log(`_filteredMenuNavLinks: ${JSON.stringify(_filteredMenuNavLinks)}`);
		return _filteredMenuNavLinks
	};

	// Reactive
	//$: filteredMenuNavLinks = Object.values(menuNavLinks).filter((e) => e.id == currentRailCategory);
	$: filteredMenuNavLinks = getMenuNavLinks(currentRailCategory);
	$: classesActive = (href: string) => {
		return $page.url.pathname == href ? 'variant-ringed-primary' : '';
	};
	// Set the width of the Drawer component to hide empty space.
	$: if (widthSetting) {
		if (!filteredMenuNavLinks?.length) {
			widthSetting.width="w-[80]"
		} else {
			widthSetting.width=""
		};
	};
</script>

<div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ??
		''}"
>
	<!-- App Rail -->
	<AppRail background="!bg-transparent" border="border-r border-surface-500/30">
		<AppRailAnchor
		    data-sveltekit-preload-data="off"
			href="/"
			selected={$page.url.pathname == '/' && !currentRailCategory}
			class="lg:hidden"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="home" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>{m.HOME_TITLE()}</span>
		</AppRailAnchor>
		<AppRailAnchor
			href="/annuaire"
			selected={$page.url.pathname.startsWith('/annuaire') && !currentRailCategory}
			class="lg:hidden"
			on:click={() => {onClickAnchor();}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="addressBook" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>{m.NAVBAR_ADDRESSBOOK()}</span>
		</AppRailAnchor>
		<AppRailAnchor
			href="/sites"
			selected={$page.url.pathname == '/sites' && !currentRailCategory}
			class="lg:hidden"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="mapLocationDot" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Sites</span>
		</AppRailAnchor>
		{#if variables.ORGANIZATION_CATEGORY == 'msp'}
			<AppRailTile bind:group={currentRailCategory} name="msp" value={'msp'}>
				<svelte:fragment slot="lead"
					><DocsIcon name="outpatientClinic" width="w-6" height="h-6" /></svelte:fragment
				>
				<span>Maison de santé</span>
			</AppRailTile>
			<AppRailTile bind:group={currentRailCategory} name="education" value={'education'}>
				<svelte:fragment slot="lead"
					><DocsIcon name="faPersonChalkboard" width="w-6" height="h-6" /></svelte:fragment
				>
				<span>Éducation</span>
			</AppRailTile>
			<AppRailTile bind:group={currentRailCategory} name="soins" value={'soins'}>
				<svelte:fragment slot="lead"
					><DocsIcon name="faHandHoldingMedical" width="w-6" height="h-6" /></svelte:fragment
				>
				<span>Soins</span>
			</AppRailTile>
			<AppRailTile bind:group={currentRailCategory} name="prevention" value={'prevention'}>
				<svelte:fragment slot="lead"
					><DocsIcon name="faShieldHeart" width="w-6" height="h-6" /></svelte:fragment
				>
				<span>Prévention</span>
			</AppRailTile>

			<hr class="opacity-30" />
		{/if}
		<AppRailAnchor
			href="/contact"
			selected={$page.url.pathname == '/contact' && !currentRailCategory}
			class="lg:hidden"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="envelope" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Contact</span>
		</AppRailAnchor>
		{#if variables.BLOG_URI}
			<AppRailAnchor
				href={variables.BLOG_URI}
				rel="external"
				class="lg:hidden"
				on:click={() => {
					onClickAnchor();
				}}
			>
				<svelte:fragment slot="lead"
					><Fa icon={faBlog} size="lg" class="inline-block outline-none" /></svelte:fragment
				>
				<span>Blog</span>
			</AppRailAnchor>
		{/if}
		{#if data?.contact?.socialnetworks}
			<SoMed data={data.contact.socialnetworks} appRail={true} />
		{/if}
	</AppRail>
	{#if filteredMenuNavLinks?.length}
		<!-- Nav Links -->
		<section class="p-4 pb-20 space-y-4 overflow-y-auto">
			{#each filteredMenuNavLinks as { id, title, href, list }, i}
				{#if list.filter(e=>e.active!=false).length > 0}
					<!-- Title -->
					<div {id} class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">
						{title[$language]}
					</div>
					<!-- Navigation List -->
					<nav class="list-nav">
						<ul>
							{#each list.filter(e=>e.active!=false) as { href, label, badge }}
								<li>
									<a href={href} class={classesActive(href)} data-sveltekit-preload-data="hover" on:click={onListItemClick}>
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
	{/if}
</div>