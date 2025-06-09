<script lang='ts'>
    import Select from 'svelte-select';
    import { useQueryClient, createQuery } from '@tanstack/svelte-query';
    import { getOrganizations } from './data';

    let { value = $bindable() }: {value: string|null} = $props();

      const orgs = createQuery<
    { uid:string; label_fr: string; name_fr: string }[],
    Error
  >({
    queryKey: ['posts'],
    queryFn: () => getOrganizations(),
  })

</script>

{#if $orgs.status === 'pending'}
<span>Loading...</span>
{:else if $orgs.status === 'error'}
<span>Error: {$orgs.error.message}</span>
{:else}
<Select items={$orgs.data.map(e=>{return {value: e.uid, label: e.name_fr}})} bind:value />
{/if}