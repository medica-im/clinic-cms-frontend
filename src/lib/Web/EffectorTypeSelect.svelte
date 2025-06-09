<script lang='ts'>
  	import * as m from "$msgs";
    import Select from 'svelte-select';
    import { useQueryClient, createQuery } from '@tanstack/svelte-query';
    import { getEffectorTypes } from './data';
    import type { EffectorType } from '$lib/interfaces/v2/effector';

    let { selectedEffectorType = $bindable() }: {selectedEffectorType: {label: string, value: string}|undefined} = $props();

      const types = createQuery<EffectorType[], Error>({
    queryKey: ['effector-types'],
    queryFn: () => getEffectorTypes(),
  })

</script>

{#if $types.status === 'pending'}
<span>{m.LOADING}</span>
{:else if $types.status === 'error'}
<span>{m.ERROR}: {$types.error.message}</span>
{:else}
<Select items={$types.data.map(e=>{return {value: e.uid, label: e.name_fr}})} bind:value={selectedEffectorType} />
{/if}