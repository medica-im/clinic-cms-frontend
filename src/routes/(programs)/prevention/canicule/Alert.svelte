<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faArrowRight,
		faXmark,
		faSun
	} from '@fortawesome/free-solid-svg-icons';

	const startEventDate = new Date('2025-06-30T06:03:00.000+02:00');
	const stopEventDate = new Date('2025-07-02T00:00:00.000+02:00');
	let visible: boolean = (new Date().getTime() < stopEventDate.getTime());
let startStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
	timeStyle: "short",
    timeZone: 'Europe/Paris'
}).format(startEventDate);
let endStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
	timeStyle: "short",
    timeZone: 'Europe/Paris'
}).format(stopEventDate);
</script>

{#if visible}
<div class="py-8 lg:py-10">
		<aside class="alert variant-ghost-warning">
			<!-- Icon -->
			<div class="hidden lg:block">
			<Fa icon={faSun} size="3x" />
		</div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3"><span class="inline-block lg:hidden px-2"><Fa icon={faSun}/></span>
				Vigilance canicule</h3>
				<p>Vigilance météorologique canicule Vaucluse émise par Météo France le {startStr} valable jusqu'au {endStr}.</p>
			</div>
			<!-- Actions -->
			<div class="flex flex-wrap lg:flex-nowrap alert-actions gap-4 align-center place-content-center"><a href="/prevention/canicule" class="btn variant-ghost"><span><Fa icon={faArrowRight}/></span><span>Fiche prévention canicule</span></a>
			<button on:click={()=>visible=false} class="btn variant-ghost"><span><Fa icon={faXmark}/></span></div>
		</aside>
</div>
{/if}

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-6 space-y-2 md:space-y-4;
	}
</style>