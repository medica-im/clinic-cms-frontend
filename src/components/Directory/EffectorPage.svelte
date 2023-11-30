<script lang="ts">
	import EffectorContact from './EffectorContact.svelte';
	export let effector: any;
</script>

<div class="card p-4 m-4">
	<h3 class="h3">{effector.name}</h3>
	<ul class="list">
		<EffectorContact {effector} />
	</ul>
</div>
