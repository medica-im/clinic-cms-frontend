<script lang="ts">
	import * as m from '$msgs';
	import { reactiveQueryArgs } from '$lib/utils/utils.svelte';
	import { useQueryClient, createQuery } from '@tanstack/svelte-query';
	import { getEffector } from './data';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { Effector } from '$lib/interfaces/v2/effector';

	let { effectorType, facility }: { effectorType: string; facility: string } = $props();

	const effectorStore = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['effectors', effectorType, facility],
			queryFn: () => getEffector(effectorType, facility)
		}))
	);
	let { error, isLoading, isRefetching, data } = $derived($effectorStore);
</script>

{#if isLoading}
	<span>{m.LOADING}</span>
{:else if error}
	<span>{m.ERROR}: {error.message}</span>
{:else if data}
	{@const count = data.length}
	{#if count}
		<div class="grid grid-cols-1 gap-4 w-full variant-ringed p-4">
			<p>{count} personne{count > 1 ? 's' : ''} de cette catégorie dans cet établissement:</p>
			<div class="flex flex-wrap gap-4">
				{#each data as effector}
					<a href="/" class="anchor">
						<div class="btn variant-ghost p-2 w-min">
							<Avatar src="" width="w-10">
								<Fa icon={faUser} />
							</Avatar>
							<div>{effector.name_fr}</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
{/if}
