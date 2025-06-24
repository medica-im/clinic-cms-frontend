<script lang="ts">
import * as m from "$msgs";
import { reactiveQueryArgs } from '$lib/utils/utils.svelte';
import { createQuery } from '@tanstack/svelte-query';
import Entry from '$lib/components/Directory/EntrySvelte5.svelte';
import { getEntry } from '$lib/Web/data';

let { entryUid } : { entryUid: string; } = $props();

const entryStore = createQuery(
    reactiveQueryArgs(()=> ({
				queryKey: ['entry', entryUid],
				queryFn: () => getEntry(entryUid)
			}))
        );
let { error, isLoading, isRefetching, data } = $derived($entryStore);
</script>
{#if isLoading}
<span>{m.LOADING}</span>
{:else if error}
<span>{m.ERROR}: {error.message}</span>
{:else if data}
<Entry entry={data} avatar={true} />
{/if}
