<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import * as m from "$msgs";	import calendrierSimplifieVaccinationsPdf2024 from '$lib/assets/pdf/vaccines/calendrier_simplifie_des_vaccinations_2024.pdf';
	import { Fa } from 'svelte-fa';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>
		Calendrier des vaccinations - {capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE())} - {capitalizeFirstLetter(
			$facilityStore.formatted_name
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE())}</span
		>

		<h1 class="h1">Calendrier simplifié des vaccinations</h1>
		<p>
			Version accessible au format web du calendrier simplifié des vaccinations 2024 édité par Santé
			publique France.
		</p>
	</div>
</header>

<section>
	<div class="section-container">
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table table-compact table-hover">
				<thead>
					<tr>
						<th>Âge approprié</th>
						<th>1 mois</th>
						<th>2 mois</th>
						<th>3 mois</th>
						<th>4 mois</th>
						<th>5 mois</th>
						<th>11 mois</th>
						<th>12 mois</th>
						<th>16–18 mois</th>
						<th>6 ans</th>
						<th>11–13 ans</th>
						<th>14 ans</th>
						<th>25 ans</th>
						<th>45 ans</th>
						<th>65 ans et +</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>BCG</td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>DTP</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td>1 injection</td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td>1 injection</td>
						<td>1 injection tous les 10 ans</td>
					</tr>
					<tr>
						<td>Coqueluche</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td>1 injection</td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Hib</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Hépatite B</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Pneumocoque</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>ROR</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>1 injection</td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Méningocoque C</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Rotavirus</td>
						<td></td>
						<td>1<sup>re</sup> dose</td>
						<td>2<sup>e</sup> dose</td>
						<td><a class="anchor" href="#rotavirus">3<sup>e</sup> dose</a></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Méningocoque B</td>
						<td></td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td>1 injection</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>HPV</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td colspan="2">2 injections espacées de 5 mois</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>Grippe</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>1 injection tous les ans</td>
					</tr>
					<tr>
						<td>Covid-19</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>1 injection tous les ans</td>
					</tr>
					<tr>
						<td>Zona</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>1 injection</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Tuberculose (BCG)</h2>

		<p>
			La vaccination contre la tuberculose est le plus souvent recommandée à partir de 1 mois et
			jusqu’à l’âge de 15 ans chez les enfants exposés à un risque élevé de tuberculose.
		</p>

		<h2 class="h2">Diphtérie-Tétanos-Poliomyélite (DTP)</h2>

		<p>
			Les rappels de l’adulte sont recommandés à âges fixes soit 25, 45, 65 ans et ensuite tous les
			dix ans.
		</p>

		<h2 class="h2">Coqueluche</h2>

		<p>
			Le rappel de l’adulte contre la coqueluche se fait à 25 ans avec rattrapage possible jusqu’à
			39 ans. La vaccination contre la coqueluche de la femme enceinte dès le 2e trimestre de
			grossesse est recommandée pour protéger son nourrisson.
		</p>

		<h2 class="h2">Haemophilus Influenzae de type b (Hib)</h2>

		<p>
			Pour les enfants n’ayant pas été vaccinés avant 6 mois, un rattrapage vaccinal peut être
			effectué jusqu’à l’âge de 5 ans avec le vaccin monovalent (1 à 3 doses selon l’âge).
		</p>

		<h2 class="h2">Hépatite B</h2>

		<p>
			Si la vaccination n’a pas été effectuée au cours de la 1re année de vie, elle peut être
			réalisée jusqu’à 15 ans inclus. À partir de 16 ans, elle est recommandée uniquement chez les
			personnes exposées au risque d’hépatite B.
		</p>

		<h2 class="h2">Pneumocoque</h2>

		<p>Au-delà de 24 mois, cette vaccination est recommandée chez l’enfant et l’adulte à risque.</p>

		<h2 class="h2">Rougeole-Oreillons-Rubéole (ROR)</h2>

		<p>
			Pour les personnes nées à partir de 1980, être à jour signifie avoir eu deux doses de vaccin.
		</p>
		<h2 class="h2">Méningocoque C</h2>

		<p>
			À partir de l’âge de 12 mois et jusqu’à l’âge de 24 ans inclus, une dose unique est
			recommandée pour ceux qui ne sont pas déjà vaccinés.
		</p>

		<h2 class="h2" id="rotavirus">Rotavirus</h2>

		<p>
			Recommandé à tous les nourrissons à partir de 2 mois. Deux à trois doses (par voie orale) sont
			nécessaires selon le vaccin.
		</p>

		<h2 class="h2">Méningocoque B</h2>

		<p>
			Un rattrapage est possible jusqu’à l’âge de 2 ans pour les nourrissons n’ayant pas reçu les
			trois doses de vaccins recommandées à 3, 5 et 12 mois.
		</p>

		<h2 class="h2">Papillomavirus humain (HPV)</h2>

		<p>
			La vaccination est recommandée chez les filles et les garçons âgés de 11 à 14 ans avec un
			rattrapage jusqu’à 19 ans inclus. De plus, la vaccination est recommandée aux hommes ayant des
			relations sexuelles avec des hommes (HSH) jusqu’à l’âge de 26 ans.
		</p>

		<h2 class="h2">Grippe</h2>

		<p>
			La vaccination est recommandée, chaque année, notamment pour les personnes à risque de
			complications : les personnes âgées de 65 ans et plus, celles atteintes de certaines maladies
			chroniques dont les enfants à partir de 6 mois, les femmes enceintes et les personnes
			souffrant d’obésité (IMC>40 kg m²). La vaccination contre la grippe sera désormais proposée à
			tous les enfants de 2 à 17 ans.
		</p>
		<h2 class="h2">Covid-19</h2>

		<p>
			En automne, en plus des personnes à risque ciblées par la vaccination contre la grippe, les
			personnes atteintes de troubles psychiatriques, de démence ou de trisomie 21 sont également
			ciblées pour la vaccination contre le Covid-19. Au printemps, la vaccination est recommandée
			pour les personnes de 80 ans et plus, les résidents d’EHPAD et USLD, et les personnes
			immunodéprimées quel que soit leur âge.
		</p>
		<h2 class="h2">Zona</h2>

		<p>La vaccination est recommandée chez les personnes de 65 ans et plus.</p>
	</div>
</section>
<div class="flex flex-row-reverse m-4">
	<a href="/prevention/vaccins" class="btn variant-ghost-primary">
		<span class="badge variant-filled-primary"><Fa icon={faArrowLeft} /></span>
		<span class="whitespace-normal text-left">Vaccins</span>
	</a>
</div>

<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl space-y-2 p-4 py-4 md:space-y-4 md:py-8;
	}
	dt {
		font-weight: bold;
	}
</style>
