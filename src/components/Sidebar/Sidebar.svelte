<script lang="ts">
	import { language } from '$lib/store/languageStore';
	import { page } from '$app/state';
	import { variables } from '$lib/utils/constants';

	import DocsIcon from '$components/Icon/Icon.svelte';
	import { menuNavLinks, menuNavCats } from '../../links';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';

	let basePath: string = $derived(page.url.pathname.split('/')[1]);
	let currentRailCategory: string | undefined = $derived(
		menuNavCats.find((e) => e.list.includes(basePath))?.id
	);

	const getMenuNavLinks = (): any[] | undefined => {
		if (!currentRailCategory) {
			return;
		}
		const cat = menuNavCats.find((cat) => cat.id == currentRailCategory);
		const list = cat?.list;
		if (!list) {
			return;
		}
		let _filteredMenuNavLinks: any[] = Object.values(menuNavLinks).filter((linkSet: any) => {
			return list.some((e: any) => e == linkSet.id);
		});
		if (_filteredMenuNavLinks.length) {
			return _filteredMenuNavLinks;
		} else {
			return;
		}
	};
	let navLinks = $derived(getMenuNavLinks());

	let classesActive = $derived((href: string) => {
		return page.url.pathname == href ? 'variant-ringed-primary' : '';
	});
</script>

{#if navLinks}
	<div class="hidden lg:block h-full">
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
			</AppRail>
			<!-- Nav Links -->
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
										<a {href} class={classesActive(href)} data-sveltekit-preload-data="hover">
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
		</div>
	</div>
{/if}
