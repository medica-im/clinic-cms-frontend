<script lang="ts">
export let effector: any;
</script>
<div class="card p-4">
<h3 class="h3">{effector.name_fr}</h3>
<ul>
<li>{effector.communes.map(commune => commune.name)}</li>
<li>{effector.types.map(type => type.name)}</li>
</ul>
</div>