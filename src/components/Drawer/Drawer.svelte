<script lang="ts">
import { Drawer } from '@skeletonlabs/skeleton';
import Sidebar from '$components/Sidebar/Sidebar.svelte';
import { drawerStore } from '@skeletonlabs/skeleton';
	$: classesDrawer = $drawerStore.id === 'doc-sidenav' ? 'lg:hidden' : '';

export let data;
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
