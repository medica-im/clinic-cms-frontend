<script lang="ts">
    import Phones from './Phones.svelte'
export let effector: any;
</script>
<div class="card p-4">
<h3 class="h3">{effector.name_fr}</h3>
<ul class="list">
<li>{effector.types.map(type => type.name)}</li>
<li>{effector.communes.map(commune => commune.name)}</li>
<li>{effector.addresses.map(address => address.street)}</li>
{#if effector.phones?.length}
<li><Phones data={effector.phones}/></li>
{/if}
</ul>
</div>