<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { getProgram, getIsOther } from '../links';
	export let data;

	const program = getProgram(data);
	const isOther = getIsOther(data);
</script>

{#if program.list.length > 0}
<hr>
<div class="card bg-initial w-fit my-2 py-2">
	<header class="card-header">
		<h3>
			{#if program.list.length > 1}
				{#if isOther}
					{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.OUR_OTHER_PROGRAMS(), $language)}
				{:else}
					{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.OUR_PROGRAMS(), $language)}
				{/if}
			{:else}
			    {#if isOther}
				    {capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.OUR_OTHER_PROGRAM(), $language)}
			    {:else}
				    {capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.OUR_PROGRAM(), $language)}
				{/if}
			{/if}
		</h3>
	</header>
	<section class="p-4 space-y-4">
		<nav class="list-nav">
			<ul class="space-y-4">
				{#each program.list as prog}
					<li class="py-1">
						<a href={prog.href} class="btn variant-ghost-surface p-2">
							{#if prog.icon}
								<span class="badge bg-primary-500">{prog.icon}</span>
							{/if}
							<span class="flex-auto">{prog.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</section>
</div>
{/if}