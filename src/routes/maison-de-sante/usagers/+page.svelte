
<script lang="ts">
    import Email from '$lib/Email/Email.svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
    import { PUBLIC_BLOG_URI } from '$env/static/public';
	import calendrierSimplifieVaccinationsPdf2024 from '$lib/assets/pdf/vaccines/calendrier_simplifie_des_vaccinations_2024.pdf';
	import { Fa } from 'svelte-fa';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>
		Usagers - {capitalizeFirstLetter(
			$facilityStore.formatted_name
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>Maison de santé</span
		>

		<h1 class="h1">Usagers</h1>
		<p>Tout savoir sur les relations entre la maison de santé et ses usagers.</p>
	</div>
</header>

<section>
	<div class="section-container">
        <h2 class="h2">Représentantes des usagers</h2>
        <div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>Martine Nectoux</li>
				<li>Geneviève Scellier</li>
			</ul>
		</div>
        <div class="flex flex-wrap gap-2"><span>Contact:</span><span><Email data={{email:"usagers.msp.gadagne@gmail.com"}}/></span></div>
        </div>
</section>


<section>
	<div class="section-container">
        <h2 class="h2">Boite à idées</h2>

        <p>Une boîte à idées est à votre disposition dans l'accueil de la maison de santé.</p>
        
        <h3 class="h3">Pourquoi faire&#8239;?</h3>

        <p>➢ Recueillir de façon anonyme vos suggestions pour mettre en place
        des actions de prévention et d’éducation à la santé.</p>
        <p>➢ Mieux connaître vos besoins spécifiques dans le domaine de la
        santé.</p>
        
        <h3 class="h3">Pour faire quoi&#8239;?</h3>

        <p>➢ Vous offrir la possibilité d’être pleinement acteur dans la gestion de votre santé.</p>
        <p>➢ Vous permettre d’être force de proposition pour développer des
        projets impliquant les usagers au côté des professionnels de la
        Maison de Santé Pluriprofessionnelle.</p>
        
        <h3 class="h3">Et après&#8239;?</h3>
        
        <p>➢ Toutes vos idées seront étudiées par l’équipe pluriprofessionnelle et les représentantes des usagers. Les initiatives qui en découleront vous seront communiquées par affichage dans la salle d’attente de la MSP et publication dans notre <a class="anchor" rel="external" href="{PUBLIC_BLOG_URI}" title="Blog">blog</a> et dans le <a class="anchor" rel="external" href="http://www.chateauneufdegadagne.fr/la-mairie/bulletins-municipaux">bulletin municipal</a>.</p>     
        </div>
</section>


<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl space-y-2 p-4 py-4 md:space-y-4 md:py-8;
	}
	dt {
		font-weight: bold;
	}
</style>
