<script lang="ts">
import type PageData from '$types';
import EffectorPage from '$components/Directory/EffectorPage.svelte';
import { getEffectors } from '$lib/store/directoryStore';

export let data: PageData;

function findEffector(effectors) {
    return effectors.find(e => e.commune.slug==data.commune && e.types.some(t => t.slug==data.type) && e.slug==data.effector)
}
</script>

<!--{data.type}/{data.commune}/{data.effector}-->
{#await getEffectors.load()}
{:then}
<EffectorPage effector={findEffector($getEffectors)}/>
{/await}