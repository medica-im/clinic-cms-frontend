<script lang="ts">
    import Email from '$lib/Email/Email.svelte';
    import Mssante from '$lib/Email/Mssante.svelte';
    import type { Email as EmailType } from '$lib/interfaces/email.interface';

	export let data: EmailType[];

</script>
{#each data as email}
{#if email.type=="M"}
<Mssante data={email}/>
{:else}
<Email data={email}/>
{/if}
{/each}
