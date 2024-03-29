<script lang="ts">
	import { language } from '$lib/store/languageStore';
    import { facilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faPills, faShieldHeart, faPersonChalkboard, faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import ProgramNav from '$components/ProgramNav.svelte';
	import { programsNavLinks } from '../../lib/links';
	import { getProgram } from '../../lib/links';
</script>

<div class="space-y-4 md:space-y-10">
	<!-- Info -->
	<div class="space-y-4 text-center">
		<h2 class="h2">Actions santé</h2>
		<p>Au-delà des habituelles séances et consultations, les professionnels de {$facilityStore.formatted_name_definite_article} agissent pour votre santé en vous proposant ces ateliers.</p>
	</div>
	<!-- Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
		<!-- Loop -->
		{#each Object.values(programsNavLinks) as progCat}
			{@const program = getProgram(progCat.href)}
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
