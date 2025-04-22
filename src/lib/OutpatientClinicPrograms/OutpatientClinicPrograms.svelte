<script lang="ts">
	import { language } from '$lib/store/languageStore.ts';
    import { facilityStore } from '$lib/store/facilityStore.ts';
	import * as m from "$msgs";	import Fa from 'svelte-fa';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { getProgram } from '$lib/links.ts';
	import type { ProgramsNavLinks } from '$lib/interfaces/variables.interface.ts';

	export let programsNavLinks: ProgramsNavLinks;
</script>

<div class="space-y-4 md:space-y-10">
	<!-- Info -->
	<div class="space-y-4 text-center">
		<h2 class="h2">Actions santé</h2>
		<p>En plus des habituelles séances et consultations, les professionnels de {$facilityStore.formatted_name_definite_article} agissent pour votre santé en vous proposant un ensemble de services et de programmes dédiés au dépistage, à la prévention et aux soins.</p>
	</div>
	<!-- Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-{Object.keys(programsNavLinks).length} gap-4 align-top justify-items-center">
		<!-- Loop -->
		{#each Object.values(programsNavLinks) as progCat}
			{@const program = getProgram(progCat.href, programsNavLinks)}
			<!-- Card -->
			<div class="card variant-glass p-4 shadow-lg md:p-10 space-y-4 text-center">
				<div>
                    <a href={progCat.href} title="{progCat.title[$language]}" class="btn-icon btn-icon-xl variant-soft-primary">
						<Fa icon={progCat.icon} />
                    </a>
            </div>
            <div>
				<a href={progCat.href} class="btn bg-initial hover:variant-soft-primary"><h3 class="flex flex-wrap whitespace-normal text-left">{progCat.title[$language]}</h3></a>
            </div>
            <div>
				<ul class="list text-left">
					{#each program.list as prog}
						<li>
							<a href={prog.href} class="btn bg-initial hover:variant-soft-primary">
                                <span class="badge variant-filled-primary"><Fa icon={faArrowRight} /></span>
								
								<span class="flex flex-wrap whitespace-normal text-left">{prog.label}</span>
							</a>
						</li>
					{/each}
				</ul>
            </div>
			</div>
		{/each}
	</div>
</div>
