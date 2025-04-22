<script lang="ts">
import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
import Sidebar from '$lib/SkeletonAppBar/Sidebar.svelte';
import { setContext } from 'svelte';

let classesDrawer = $state();
let widthSetting = $state({width: 'w-[80]'});
setContext('widthSetting', widthSetting);
const drawerStore = getDrawerStore();

$effect(()=>{classesDrawer = $drawerStore.id === 'doc-sidenav' ? 'lg:hidden' : '';}
);

let data = $props();
</script>

<Drawer class={classesDrawer} width={widthSetting.width}>
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
