<script lang="ts">
import type PageData from '$types';
import EffectorPage from '$components/Directory/EffectorPage.svelte';
import CareHomePage from '$components/Directory/CareHomePage.svelte';
import Back from '$components/Directory/Back.svelte';
export let data: PageData;

const componentSelect = {
	"default": EffectorPage,
	"careHome": CareHomePage
}
let component=componentSelect[data.component];
</script>

<svelte:component this={component} effector={data.effector} />
<div class="m-4 flex flex-row-reverse">
	<Back />
</div>
