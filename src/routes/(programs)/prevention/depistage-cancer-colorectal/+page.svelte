<script lang="ts">
	import LL from '$i18n/i18n-svelte.ts';
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import {
		faPersonWalking,
		faWeightScale,
		faWineGlassEmpty,
		faBanSmoking,
		faCheese,
		faAppleWhole,
		faBurger
	} from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
	import colonRectum from '$lib/assets/images/colorectal_cancer/colon-rectum.jpg';
	import VideoPlayer from '$lib/components/Video/VideoPlayer.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	let videos = [
		{
			src: '/videos/depistage-cancer-colorectal-1080.mp4',
			type: 'video/mp4'
		},
		{
			src: '/videos/depistage-cancer-colorectal-720.mp4',
			type: 'video/mp4'
		},
		{
			src: '/videos/depistage-cancer-colorectal-480.mp4',
			type: 'video/mp4'
		}
	];
</script>

<svelte:head>
	<title>
		Cancer colorectal - {capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</span
		>

		<h1 class="h1">{capitalizeFirstLetter($LL.SCREENING.COLORECTAL_CANCER(), $language)}</h1>
		<p>Prévention et dépistage du cancer colorectal.</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Qu'est-ce que le cancer colorectal?</h2>
		<div class="py-2 xl:px-6 xl:float-right">
			<figure>
				<img src={colonRectum} alt="schéma anatomique du colon et du rectum" />
				<figcaption>Colon («gros intestin») et rectum.</figcaption>
			</figure>
		</div>
		<p>
			En France, avec 43 000 nouveaux cas et 17 000 décès par an, le cancer colorectal fait partie
			des cancers les plus fréquents (3<sup>ème</sup> rang chez l’homme et 2<sup>ème</sup> chez la
			femme) et représente la 2<sup>ème</sup> cause de décès par cancer<sup
				><a href="#cite_note-1" class="anchor">1</a></sup
			>.
		</p>
		<p>
			Le cancer colorectal se développe à l’intérieur du côlon ou du rectum (dernière partie du tube
			digestif, appelée aussi « gros intestin »), le plus souvent à partir de petites lésions
			appelées polypes. Son évolution est lente, souvent sans signe apparent et sans symptôme dans
			les premières années de développement de la maladie. Ce cancer touche aussi bien les femmes
			que les hommes.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Personnes concernées par le dépistage</h2>
		<p>
			Vous avez entre 50 ans et 74 ans et vous ne présentez pas de symptômes, ni antécédents
			personnels ou familiaux, ni facteurs de risque particuliers? Tous les 2 ans, vous êtes invité
			par courrier par l’assurance maladie à réaliser un dépistage du cancer colorectal.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Test de dépistage du cancer colorectal</h2>
		<h3 class="h3">Objectif du dépistage</h3>
		<p>
			Le test de dépistage du cancer colorectal permet de déceler la présence de sang dans les
			selles qui n'est pas visible à l’œil nu. Le dépistage permet de repérer un polype avant qu’il
			n’évolue en cancer, ou de détecter un cancer à un stade très précoce pour augmenter les
			chances de guérison.
		</p>
		<p>
			Il est à faire chez soi, puis à envoyer par La Poste au laboratoire pour être analysé. Il est
			pris en charge à 100% par l’Assurance Maladie, sans avance de frais, tous les 2 ans.
		</p>
		<h3 class="h3">Comment se procurer un kit de dépistage?</h3>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					Chez votre <a href="/annuaire/medecin/" class="anchor">médecin généraliste</a>
				</li>
				<li>Chez votre gynécologue</li>
				<li>En pharmacie</li>
				<li>Chez votre gastro-entérologue</li>
				<li>
					Via <a href="https://monkit.depistage-colorectal.fr" class="anchor" rel="external"
						>monkit.depistage-colorectal.fr</a
					>
				</li>
			</ul>
			<p>
				Chez votre médecin ou chez votre pharmacien, le test peut être retiré avec ou sans lettre d'invitation. Des questions vous seront posées sur vos antécédents personnels et familiaux
				afin de déterminer si ce test vous concerne.
			</p>
		</div>
		<div class="py-4">
			<VideoPlayer data={videos} />
		</div>
		<h3 class="h3">Résultats du dépistage</h3>
		<p>Il est reçu sous 15 jours avec copie au médecin traitant.</p>
		<h4 class="h4">Test négatif</h4>
		<p>
			Dans 95,5% des cas, le test ne révèle rien d'anormal dans les selles. Il est à renouveler tous
			les 2 ans.
		</p>
		<h4 class="h4">Test positif</h4>
		<p>
			Dans 4,5% des cas, le test détecte du sang dans les selles. Une coloscopie est proposée sous
			anesthésie générale pour déceler et/ou retirer d’éventuels polypes.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Réduire le risque de cancer colorectal</h2>
		<Accordion>
			<AccordionItem open>
				<svelte:fragment slot="lead"><Fa icon={faPersonWalking} /></svelte:fragment>
				<svelte:fragment slot="summary"
					><h3 class="h3">Bougez plus et passez moins de temps assis</h3></svelte:fragment
				>
				<svelte:fragment slot="content">
					<p>
						La recherche démontre que l’activité physique pratiquée régulièrement peut réduire votre
						risque de cancer colorectal. Les adultes devraient viser 30 minutes par jour d’une
						activité d’intensité modérée, par exemple la marche ou les tâches domestiques comme
						passer l’aspirateur.
					</p>
					<p>
						La recherche démontre également que le comportement sédentaire, ou le temps passé assis,
						fait augmenter le risque de cancer colorectal. Vous pouvez réduire votre risque en
						restant moins longtemps assis et en prenant des pauses courtes et fréquentes de la
						position assise.
					</p>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faWeightScale} /></svelte:fragment>
				<svelte:fragment slot="summary"><h3 class="h3">Ayez un poids santé</h3></svelte:fragment>
				<svelte:fragment slot="content"
					><p>
						Des études ont démontré que l’embonpoint ou l’obésité fait augmenter votre risque de
						cancer colorectal. Vous pouvez réduire votre risque en maintenant un poids santé. Manger
						sainement et être physiquement actif peut vous aider à conserver un poids santé.
					</p></svelte:fragment
				>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faWineGlassEmpty} /></svelte:fragment>
				<svelte:fragment slot="summary"
					><h3 class="h3">Limitez votre consommation d'alcool</h3>
				</svelte:fragment>
				<svelte:fragment slot="content"
					><p>
						Consommer de l’alcool fait augmenter votre risque de cancer colorectal. Pour réduire
						votre risque de cancer, le mieux est de ne pas boire d’alcool.
					</p>

					<p>
						Si vous choisissez de boire de l’alcool, faites en sorte de réduire au minimum votre
						risque de cancer en ne buvant pas plus de deux verres standards par semaine. Moins vous
						buvez d'alcool, plus vous réduisez votre risque de cancer.
					</p>

					<p>
						Apprenez-en davantage sur les façons de limiter la consommation d’alcool avec <a
							href="https://www.alcool-info-service.fr/alcool-et-vous/arreter-consommation-alcool/Je-veux-reduire-ma-consommation-d-alcool"
							rel="external"
							class="anchor">Alcool info service</a
						>.
					</p></svelte:fragment
				>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faBanSmoking} /></svelte:fragment>
				<svelte:fragment slot="summary"><h3 class="h3">Vivez sans fumée</h3></svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						Fumer du tabac fait augmenter le risque d’états précancéreux et de cancer du côlon ou du
						rectum. Si vous fumez, demandez de l'aide pour renoncer au tabac. <a
							href="https://www.tabac-info-service.fr/j-arrete-de-fumer"
							rel="external"
							class="anchor"
						>
							J'arrête de fumer (Tabac info service)</a
						>.
					</p></svelte:fragment
				>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faCheese} /></svelte:fragment>
				<svelte:fragment slot="summary"
					><h3 class="h3">Consommez des produits laitiers</h3>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						Les « produits laitiers » comprennent le lait et les boissons à base de lait : les
						yaourts, les petits suisses, les fromages blancs et les fromages (frais, affinés…). Ne
						sont pas inclus ici les produits à base de lait riches en graisses (beurre, crème) ou en
						sucres (crèmes dessert ou glaces).
					</p>
					<p>
						La consommation quotidienne de produits laitiers est associée à la prévention du cancer
						colorectal. Le Programme national nutrition santé (PNNS) recommande aujourd’hui de
						consommer deux produits laitiers par jour, en les alternant (lait, fromage, yaourt
						nature, fromage blanc).
					</p></svelte:fragment
				>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faAppleWhole} /></svelte:fragment>
				<svelte:fragment slot="summary"
					><h3 class="h3">Mangez des aliments riches en fibres</h3>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						Les fibres aident à maintenir l'appareil digestif en santé et à régulariser le transit
						intestinal. Elles augmentent le volume des selles et accélèrent le mouvement des
						aliments dans le côlon. Des études permettent de constater que la consommation
						d’aliments contenant des fibres alimentaires réduit le risque de cancer colorectal.
					</p>

					<p>Les aliments riches en fibres sont entre autres:</p>
					<div class="pl-5">
						<ul class="list-disc">
							<li>les fruits et légumes;</li>
							<li>les grains entiers et les produits céréaliers;</li>
							<li>les légumineuses, dont les haricots, pois et lentilles.</li>
						</ul>
					</div>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faBurger} /></svelte:fragment>
				<svelte:fragment slot="summary"
					><h3 class="h3">Limitez votre consommation de viande rouge et de charcuterie</h3>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						Une alimentation qui est riche en viande rouge ou qui comprend de la charcuterie accroît
						le risque de cancer colorectal. Manger moins de viande rouge et éviter la charcuterie
						aide à diminuer votre risque.
					</p>

					<p>
						Cuire la viande à de fortes températures produit des substances chimiques carcinogènes.
						Ces substances chimiques font augmenter le risque de cancer colorectal. N'optez pas trop
						souvent pour des méthodes de cuisson qui nécessitent une température élevée, comme la
						cuisson au barbecue, à la poêle et au gril, afin de réduire la quantité de substances
						chimiques nuisibles.
					</p></svelte:fragment
				>
			</AccordionItem>

			<!-- ... -->
		</Accordion>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">En savoir plus</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					<a
						href="https://depistage-cancers-sud.org/pourquoi-qui-quels-examens-cancer-colorectal/"
						class="anchor">Dépistage des cancers. Centre de coordination SUD Provence-Alpes-Côte d'Azur.</a
					>
				</li>
				<li>
					<a
						href="https://santebd.org/les-fiches-santebd/cancer/le-test-de-depistage-du-cancer-colorectal"
						class="anchor"
						rel="external"
						>Bande dessinée en "Facile à lire et à comprendre" (FALC) sur le dépistage du cancer
						colorectal</a
					>, médecin généraliste
				</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Notes et références</h2>
		<div class="pl-5">
			<ol class="list-decimal space-y-4 p-4">
				<li id="cite_note-1">
					<a
						href="https://www.santepubliquefrance.fr/maladies-et-traumatismes/cancers/cancer-du-colon-rectum/donnees#:~:text=En%20France%2C%20avec%2043%20336,l'%C3%A2ge%20de%2050%20ans"
						class="anchor">Santé Publique France – Cancer du colon rectum</a
					>
				</li>
			</ol>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav data={$page.url.pathname} />
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl space-y-2 p-4 py-4 md:space-y-4 md:py-8;
	}
	.anchor {
		@apply underline underline-offset-4;
	}
</style>
