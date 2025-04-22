<script lang="ts">
  	import Spinner from '$lib/Spinner/Spinner.svelte';
    import Effector from '$lib/components/Directory/Effector.svelte';
	import Clear from '$lib/components/Directory/Clear.svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';

    export let data;
    export let avatar: boolean = true;
    export let loading: boolean = true;

    function contactCount(_categorizedFilteredEffectors: Map<string, any>) {
		let count = 0;
		if (_categorizedFilteredEffectors) {
			count = [..._categorizedFilteredEffectors.values()].flat().length;
		}
		return `${count} contact${count > 1 ? 's' : ''}`;
	}
</script>

<div class="flex justify-between w-full">
    <span class="badge variant-ghost-surface">{contactCount(data)}</span>
    <div class="inline-flex items-center space-x-2 m-0 p-0">
        {#if loading}
        <Spinner w={3} h={3} />
        <span>Mise à jour...</span>
        {/if}
    </div>
    <Clear />
</div>
<div class="m-4 space-y-4">
    {#each [...data] as [key, value]}
        <div class="space-y-6 my-6 anchordiv" id={key}>
            <div class="relative inline-block">
                <span class="badge-icon variant-filled-primary absolute -top-2 -right-3 z-5">
                    {value.length}
                </span>

                <span class="badge variant-filled"
                    ><h4 class="h4">{capitalizeFirstLetter(key)}</h4></span
                >
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 space-y-4">
            {#each value as entry}
                <Effector {entry} {avatar} />
            {/each}
        </div>
    {/each}
</div>