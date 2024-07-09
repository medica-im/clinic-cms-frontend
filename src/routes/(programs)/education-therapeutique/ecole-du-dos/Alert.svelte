<script lang="ts">
	import Fa from 'svelte-fa';
	import Icon from '$components/Icon/Icon.svelte';
	import {
		faArrowRight,
		faXmark
	} from '@fortawesome/free-solid-svg-icons';

	const firstEventDate = new Date('2024-09-02T19:00:00.000+02:00');
	const lastEventDate = new Date('2024-10-16T20:00:00.000+02:00');
	let visible: boolean = new Date().getTime() < firstEventDate.getTime();
let startStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeZone: 'Europe/Paris'
}).format(firstEventDate);
let endStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeZone: 'Europe/Paris'
}).format(lastEventDate);
</script>

{#if visible}
	<div class="section-container">
		<aside class="alert variant-ghost-success">
			<!-- Icon -->
			<Icon name="bodyHealthicons" width={"w-6 md:w-10"} height={"h-6 md:h-10"}/>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3">École du dos 2024</h3>
				<p>L'inscription pour la session du {startStr} au {endStr} est ouverte!</p>
			</div>
			<!-- Actions -->
			<div class="alert-actions"><a href="/education-therapeutique/ecole-du-dos#inscription" class="btn variant-ghost"><span><Fa icon={faArrowRight}/></span><span>Je m'inscris</span></a>
			<button on:click={()=>visible=false} class="btn variant-ghost"><span><Fa icon={faXmark}/></span></div>
		</aside>
	</div>
{/if}

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-6 space-y-2 md:space-y-4;
	}
</style>