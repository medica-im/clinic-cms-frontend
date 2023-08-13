<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMobileScreen, faPhone, faFax, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
	export let data;
</script>

<ul class="list">
    {#if data.building}
    <li>{data.building}</li>
    {/if}
    <li>{data.street || "MISSING ADDRESS FIELD: STREET"}</li>
    {#if data.geographical_complement}
    <li>({data.geographical_complement})</li>
    {/if}
    <li>{data.zip || "MISSING ADDRESS FIELD: ZIP"}</li>
    <li><b>{data.city || "MISSING ADDRESS FIELD: CITY"}</b></li>
{#if data.latitude && data.longitude}
<li>
    <a href="https://www.openstreetmap.org/#map={data.zoom || 19}/{data.latitude}/{data.longitude}"><Fa icon={faMapLocationDot} size="lg"/></a>
</li>
{/if}
</ul>