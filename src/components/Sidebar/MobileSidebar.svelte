<script lang="ts">
	import { language } from '$lib/store/languageStore';
	import LL from '$i18n/i18n-svelte';
	import { page } from '$app/state';
	import { facilityStore } from '$lib/store/facilityStore';

	import DocsIcon from '$components/Icon/Icon.svelte';
	import { AppRail, AppRailTile, AppRailAnchor, getDrawerStore } from '@skeletonlabs/skeleton';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Fa from 'svelte-fa';
	import { faBlog } from '@fortawesome/free-solid-svg-icons';

	let {
		currentRailCategory = $bindable(),
		navLinks
	}: {
		currentRailCategory: string | undefined;
		navLinks: any[] | undefined;
	} = $props();

	const drawerStore = getDrawerStore();

	function onClickAnchor(): void {
		drawerStore.close();
	}

	function onListItemClick(): void {
		drawerStore.close();
	}

	let classesActive = $derived((href: string) => {
		return page.url.pathname == href ? 'variant-ringed-primary' : '';
	});
</script>

<div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30"
>
	<!-- App Rail -->
	<AppRail
		background="bg-transparent"
		border="border-r border-surface-500/30"
	>
		<AppRailTile
			bind:group={currentRailCategory}
			name={'maison-de-sante'}
			value={'msp'}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="outpatientClinic" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Maison de santé</span>
		</AppRailTile>
		<AppRailTile bind:group={currentRailCategory} name={'education'} value={'education'}>
			<svelte:fragment slot="lead"
				><DocsIcon name="faPersonChalkboard" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Éducation</span>
		</AppRailTile>
		<AppRailTile bind:group={currentRailCategory} name="Prévention" value={'prevention'}>
			<svelte:fragment slot="lead"
				><DocsIcon name="faShieldHeart" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Prévention</span>
		</AppRailTile>

		<hr class="opacity-30" />

		<AppRailAnchor
			href="/sites"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="mapLocationDot" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Sites</span>
		</AppRailAnchor>

		<AppRailAnchor
			href="/annuaire"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="addressBook" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
		</AppRailAnchor>

		<AppRailAnchor
			href="/contact"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="envelope" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Contact</span>
		</AppRailAnchor>

		<AppRailAnchor
			href="/blog"
			rel="external"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"><Fa icon={faBlog} size="lg" class="inline-block outline-none" /></svelte:fragment>
			<span>Blog</span>
		</AppRailAnchor>

		<SoMed data={$facilityStore.contact.socialnetworks} appRail={true} />
	</AppRail>
	<!-- Nav Links -->
	{#if navLinks?.length}
		<section class="p-4 pb-20 space-y-4 overflow-y-auto">
			{#each navLinks as { id, title, href, list }, i}
				{#if list.filter((e) => e.active != false).length > 0}
					<!-- Title -->
					<div {id} class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">
						{title[$language]}
					</div>
					<!-- Navigation List -->
					<nav class="list-nav">
						<ul>
							{#each list as { href, label, badge }}
								<li>
									<a {href} class={classesActive(href)} data-sveltekit-preload-data="hover" on:click={onListItemClick}>
										<span class="flex-auto">{@html label}</span>
										{#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
					<!-- Divider -->
					{#if navLinks && i + 1 < navLinks.length}<hr class="!my-6 opacity-50" />{/if}
				{/if}
			{/each}
		</section>
	{/if}
</div>
