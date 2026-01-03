<script lang="ts">
	import Email from '$lib/Email/Email.svelte';
	import Mssante from '$lib/Email/Mssante.svelte';
	import type { Email as EmailType } from '$lib/interfaces/email.interface';

	let { data, editMode=false }: { data: EmailType[]; editMode?: boolean } = $props();


	const mss: string = 'mssante';
</script>

{#each data as email (email.id)}
	{#if email.email.includes(mss)}
		<Mssante data={email} editMode={editMode} />
	{:else}
		<Email data={email} editMode={editMode} />
	{/if}
{/each}
