<script lang="ts">
import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
import Sidebar from '$components/Sidebar/Sidebar.svelte';

export let data;

const drawerStore = getDrawerStore();
$: classesDrawer = $drawerStore.id === 'doc-sidenav' ? 'lg:hidden' : '';
</script>

<Drawer class={classesDrawer}>
	{#if $drawerStore.id === 'doc-sidenav'}
		<!-- Sidebar -->
		<Sidebar {data} embedded={true} />
	{:else}
		<!-- Fallback Error -->
		<div class="w-full h-full flex justify-center items-center">
			<div class="text-center space-y-2">
				<p>Invalid <code>$drawerStore.id</code> provided.</p>
			</div>
		</div>
	{/if}
</Drawer>
