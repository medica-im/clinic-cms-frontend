<script lang="ts">
import * as m from "$msgs";
import { reactiveQueryArgs } from '$lib/utils/utils.svelte';
import { createQuery } from '@tanstack/svelte-query';
import FacilityCard from '$lib/Facility/FacilityCardDisplay.svelte';
import { getFacility } from '$lib/Web/data';
import type { Facility, Commune } from '$lib/interfaces/v2/facility.ts';

let { facilityUid, showEffectors } : {facilityUid: string; showEffectors: boolean } = $props();

const facilityStore = createQuery(
    reactiveQueryArgs(()=> ({
				queryKey: ['facility', facilityUid],
				queryFn: () => getFacility(facilityUid)
			}))
        );
let { error, isLoading, isRefetching, data } = $derived($facilityStore);
</script>
{#if isLoading}
<span>{m.LOADING}</span>
{:else if error}
<span>{m.ERROR}: {error.message}</span>
{:else if data}
<FacilityCard data={data} {showEffectors} />
{/if}
