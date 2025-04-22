<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import {
	    faMicroscope,
		faVirus,
		faCircleMinus,
		faCirclePlus
	} from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$lib/ProgramNav/ProgramNav.svelte';
	import parcoursCancerCol from '$lib/assets/images/cervical_cancer/parcours-doccu.png';
	import VideoPlayer from '$lib/components/Video/VideoPlayer.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { programsNavLinks } from "$var/variables.ts";

	let videos = [
		{
			src: '/videos/cancer-col-uterus-depistage_1080.mp4',
			type: 'video/mp4'
		},
		{
			src: '/videos/cancer-col-uterus-depistage_720.mp4',
			type: 'video/mp4'
		},
		{
			src: '/videos/cancer-col-uterus-depistage_480.mp4',
			type: 'video/mp4'
		}
	];
</script>

<svelte:head>
	<title>
		Cancer du col de l'utérus - {capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE(), $language)}</span
		>

		<h1 class="h1">{capitalizeFirstLetter(m.SCREENING_CERVICAL_CANCER(), $language)}</h1>
		<p>
			Prévention et dépistage du cancer du col de l'utérus: 90% des cancers du col de l’utérus
			pourraient être évités<sup><a href="#cite_note-1" class="anchor">1</a></sup>.
		</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Comment survient le cancer du col de l'utérus?</h2>
		<!--div class="py-2 xl:px-6 xl:float-right">
			<figure>
				<img src={colonRectum} alt="schéma anatomique du colon et du rectum" />
				<figcaption>Colon («gros intestin») et rectum.</figcaption>
			</figure>
		</div-->
		<p>
			Le cancer du col de l’utérus est provoqué par des virus de la famille des papillomavirus
			humain (HPV). Très fréquents, ces virus présents sur les tissus et les muqueuses se
			transmettent le plus souvent lors de rapports sexuels, avec ou sans pénétration. Il s’agit de
			l’infection sexuellement transmissible (IST) la plus fréquente. La plupart des hommes et des
			femmes seront infectés par ces virus au cours de leur vie. Le préservatif ne permet pas de
			s’en protéger complètement.
		</p>
		<p>
			Dans environ 90% des cas, l’infection aux HPV disparaît spontanément dans les 2 ans. Mais dans
			certains cas, cette infection persiste et peut provoquer des lésions qui, si elles ne sont pas
			traitées, peuvent évoluer vers un cancer 10 à 20 ans après l’infection. Toutes les infections
			aux papillomavirus ne se transforment pas en cancer mais les papillomavirus sont quasiment
			toujours en cause dans la survenue d’un cancer du col de l’utérus.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Prévention du cancer du col de l'utérus</h2>
		<p>
			Il existe deux moyens complémentaires pour limiter le risque de cancer du col de l’utérus:
		</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>La réalisation d’un test de dépistage pour les femmes de 25 à 65 ans</li>
				<li>
					La vaccination contre les HPV pour tous les jeunes (filles et garçons) entre 11 et 14 ans
				</li>
			</ul>
		</div>

		<h3 class="h3">Dépistage organisé du cancer du col de l'utérus</h3>
		<div class="py-2 xl:px-6 xl:float-right">
			<figure>
				<img
					src={parcoursCancerCol}
					alt="Description du parcours du dépistage organisé du cancer du col de l'utérus."
				/>
				<figcaption>Parcours - Dépistage organisé du cancer du col de l'utérus.</figcaption>
			</figure>
		</div>
		<h4 class="h4">Pourquoi me faire dépister?</h4>
		<p>
			Il arrive que l’infection due aux HPV (papillomavirus humains) provoque des lésions au niveau
			du col de l’utérus. Ces lésions peuvent ensuite évoluer en cancer. Le test de dépistage
			cervico-utérin (frottis) permet de détecter des lésions cancéreuses, ou précancéreuses avant
			qu’elles n’évoluent en cancer.
		</p>

		<p>
			Dépisté à un stade précoce, le cancer du col de l’utérus peut être traité tôt avec des soins
			moins lourds.
		</p>
		<h4 class="h4">À qui s'adresse le dépistage?</h4>

		<p>
			Il s’adresse à toutes les femmes entre 25 à 65 ans. Il inclut les femmes enceintes, les femmes
			ménopausées et les femmes vaccinées contre les infections à HPV.
		</p>

		<p>Cas particuliers:</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					Les femmes qui présentent des symptômes gynécologiques (douleurs, saignements après les
					rapports sexuels ou entre les règles…) doivent consulter un médecin et bénéficier d’un
					examen médical immédiat sans attendre un test de dépistage, pour rechercher la cause de
					ces symptômes
				</li>
				<li>
					Les femmes qui ont été traitées pour une lésion précancéreuse ou cancéreuse du col de
					l’utérus bénéficient d’un suivi particulier
				</li>
			</ul>
		</div>
		<h4 class="h4">Qui réalise le dépistage?</h4>

		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li><a href="/annuaire/sage-femme/" class="anchor">sage-femme</a></li>
				<li><a href="/annuaire/medecin-generaliste/" class="anchor">médecin généraliste</a></li>
				<li>gynécologue</li>
				<li>laboratoire de biologie médicale sur prescription médicale </li>
			</ul>
		</div>
		<h4 class="h4">Modalités pratiques du dépistage du cancer du col</h4>
		<p>
			Il existe deux types de tests de dépistage du cancer du col de l’utérus. Ces deux types de
			tests sont réalisés sur un prélèvement de cellules au niveau du col de l’utérus, appelé
			prélèvement cervico-utérin (ou « frottis »).
		</p>

		<Accordion>
			<AccordionItem close>
				<svelte:fragment slot="lead"><Fa icon={faMicroscope} /></svelte:fragment>
				<svelte:fragment slot="summary"><h5 class="h5">L’examen cytologique</h5></svelte:fragment>
				<svelte:fragment slot="content">
					<p>
						L’examen cytologique est l’examen au microscope de cellules du col de l’utérus, à la
						recherche d’anomalies des cellules. Il détecte d’éventuelles lésions précancéreuses au
						niveau du col de l’utérus. Il permet de les traiter et ainsi de prévenir le
						développement d’un cancer. Si le résultat de ce test est anormal, la présence de virus
						HPV à haut risque pourra être recherchée, dans certains cas, sur le même prélèvement.
					</p>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Fa icon={faVirus} /></svelte:fragment>
				<svelte:fragment slot="summary"><h5 class="h5">Le test HPV-HR</h5></svelte:fragment>
				<svelte:fragment slot="content"
					><p>
						Le test HPV-HR (HR pour papillomavirus à Haut Risque oncogène) détecte la présence du
						virus HPV dans les cellules du col de l’utérus. Il recherche les virus HPV à haut risque
						de cancer (oncogène) qui peuvent entrainer des anomalies cellulaires et des cancers du
						col de l’utérus. Si ce test de dépistage HPV est positif, on recherchera la présence
						d’anomalies des cellules sur le même prélèvement..
					</p></svelte:fragment
				>
			</AccordionItem>
		</Accordion>
<p>Avant 30 ans, les infections à HPV transitoires sont très fréquentes : en identifiant des infections qui auraient spontanément disparu, le dépistage par test HPV-HR risquerait d’entrainer des examens et des traitements inutiles. C’est pour cela que le test préconisé avant 30 ans est un examen cytologique et non HPV.</p>
Selon l’âge au moment du dépistage, les techniques de dépistage diffèrent :

<h5 class="h5">Entre 25 et 29 ans</h5>
<p>Il est recommandé de réaliser deux examens cytologiques à 1 an d’intervalle, puis 3 ans si le résultat des deux premiers est normal.</p>

<h5 class="h5">À partir de 30 ans</h5>
<p>Il est recommandé de se faire dépister par le test HPV-HR qui est plus efficace à cet âge et plus adapté que le dépistage par examen cytologique:</p>

<dl class="list-dl">
	<div>
		<span class="badge bg-primary-500"><Fa icon={faCircleMinus}/></span>
		<span class="flex-auto">
			<dt>Le test HPV-HR ne montre pas d’infection</dt>
			<dd>Il est recommandé de faire un nouveau test tous les 5 ans.</dd>
		</span>
		</div>
		<div>
		<span class="badge bg-primary-500"><Fa icon={faCirclePlus}/></span>
		<span class="flex-auto">
			<dt>Le test HPV-HR montre une infection</dt>
			<dd>Vous en serez informée par votre médecin qui vous précisera la modalité de suivi la plus adaptée à votre situation. Dans le cas où l’infection est associée à une anomalie des cellules, les examens de confirmation diagnostique reposent sur la colposcopie, avec une éventuelle biopsie.
			</dd>
		</span>
	</div>
</dl>
		<div class="py-4">
			<VideoPlayer data={videos} />
		</div>
		<h3 class="h3">Vaccination contre les HPV</h3>
		<p>La vaccination est une méthode de prévention contre le cancer du col de l’utérus. La vaccination contre les infections à HPV protège contre des types de HPV qui causent le cancer du col de l’utérus.</p>

<p>La vaccination contre les infections à Papillomavirus humains (HPV) était recommandée depuis 2007, en France, chez les jeunes filles. Depuis décembre 2019 elle est recommandée pour toutes les jeunes filles et tous les jeunes garçons de 11 à 14 ans avec un rattrapage vaccinal possible entre 15 et 19 ans.</p>

<p>Pratiquée avant le début de la vie sexuelle, la vaccination contre les HPV prévient jusqu’à 90% des infections HPV à l’origine des cancers<sup><a href="#cite_note-2" class="anchor">2</a></sup>.</p>

<p>Elle est indiquée pour les filles ou pour les garçons contre:</p>
<div class="pl-5">
	<ul class="list-disc space-y-4 p-4">
		<li>les lésions précancéreuses et/ou les cancers du col de l‘utérus, de la vulve, du vagin, de l‘anus, du pénis et de la gorge
		</li>
		<li>les lésions bénignes qui apparaissent sur la peau ou les muqueuses de l’anus et de la région génitale (verrues anogénitales)
		</li>
	</ul>
</div>
<p>Elle protège mieux lorsqu’elle est faite avant les premiers rapports sexuels et donc avant d’avoir été exposé au virus HPV.</p>
<p>La vaccination ne protège pas contre tous les HPV liés au cancer du col de l’utérus. Le dépistage par frottis doit donc être réalisé, de 25 ans à 65 ans, que l’on soit vaccinée ou non.</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">En savoir plus</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					<a
						href="https://www.depistagecancer-na.fr/depistage-cancer-col-uterus/
					"
						class="anchor">Dépistage des cancers. Centre de coordination Nouvelle-Aquitaine.</a
					>
				</li>
				<li>
					<a
						href="https://www.e-cancer.fr/Comprendre-prevenir-depister/Se-faire-depister/Depistage-du-cancer-du-col-de-l-uterus/Vos-questions-sur-le-HPV/Le-depistage"
						class="anchor"
						rel="external">Cancer du col de l'utérus: vos questions sur le dépistage</a
					>
				</li>
				<li>
					<a
						href="https://vaccination-info-service.fr/Les-maladies-et-leurs-vaccins/Les-Infections-a-Papillomavirus-humains-HPV"
						class="anchor"
						rel="external">Vaccination Info Service - Infections à Papillomavirus humains (HPV)</a
					>
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
						href="https://www.e-cancer.fr/Comprendre-prevenir-depister/Se-faire-depister/Depistage-du-cancer-du-col-de-l-uterus/Pourquoi-se-faire-depister"
						class="anchor"
						>Institut national du cancer – Cancer du col de l'utérus : pourquoi se faire dépister ?</a
					>
				</li>
				<li id="cite_note-2">
					<a
					href="https://www.e-cancer.fr/Expertises-et-publications/Catalogue-des-publications/Depliant-sur-la-vaccination-contre-les-cancers-HPV-papillomavirus-humains"
					class="anchor">
				Institut national du cancer - Dépliant sur la vaccination contre les cancers HPV (papillomavirus humains)
				</a>
			</ol>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav pathname={$page.url.pathname} {programsNavLinks} />
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
