<script lang="ts">
	import { page } from '$app/state';
	import { menuNavLinks, menuNavCats } from '../../links';
	import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import MobileSidebar from '$components/Sidebar/MobileSidebar.svelte';

	const drawerStore = getDrawerStore();
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
	let widthSetting = $derived.by(() => {
		if (navLinks?.length) {
			return '';
		} else {
			return 'w-[80]';
		}
	});
</script>

<Drawer width={widthSetting}>
	{#if $drawerStore.id === 'doc-sidenav'}
		<Sidebar />
	{:else if $drawerStore.id === 'mobile'}
		<MobileSidebar bind:currentRailCategory {navLinks} />
	{:else}
		<!-- Fallback Error -->
		<div class="w-full h-full flex justify-center items-center">
			<div class="text-center space-y-2">
				<p>Invalid <code>$drawerStore.id</code> provided.</p>
			</div>
		</div>
	{/if}
</Drawer>
