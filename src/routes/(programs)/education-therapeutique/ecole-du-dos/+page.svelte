<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { language } from '$lib/store/languageStore.ts';
	import Fa from 'svelte-fa';
	import Alert from './Alert.svelte';
	import {
		faEnvelope,
		faGlobe,
		faMobileScreen
	} from '@fortawesome/free-solid-svg-icons';
	import { faInstagram } from '@fortawesome/free-brands-svg-icons';
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import DayGrid from '@event-calendar/day-grid';
	import List from '@event-calendar/list';
	import { getDate as d } from '$lib/helpers/dateTime.ts';

	const firstEventDate = d('2025-04-22','19:00');
	const lastEventDate = d('2025-06-26','20:00');
	let startStr = new Intl.DateTimeFormat('fr-FR', {
		dateStyle: 'medium',
		timeZone: 'Europe/Paris'
	}).format(firstEventDate);
	let endStr = new Intl.DateTimeFormat('fr-FR', {
		dateStyle: 'medium',
		timeZone: 'Europe/Paris'
	}).format(lastEventDate);

	let plugins = [TimeGrid, DayGrid, List];
	let options = {
		locale: 'fr-FR',
		buttonText: function (text) {
			text.dayGridMonth = 'mois'
			text.next = 'Mois suivant'
			text.listDay = 'liste'
			text.listWeek = 'liste'
			text.listMonth = 'liste'
			text.listYear = 'liste'
			//text.listMonth.next = 'Mois suivant'
			text.prev = 'Mois précédent'
			return text
		},
		view: 'listYear', //'dayGridMonth',
		headerToolbar: { start: 'title', center: '', end: 'listYear dayGridMonth prev,next' },
		validRange: {
            start: firstEventDate,
			end: lastEventDate
		},
		currentStart: d('2025-04-22','19:00'),
		activeStart: d('2025-04-22','19:00'),
		currentEnd: d('2025-06-26','20:00'),
		activeEnd: d('2025-06-26','20:00'),
		views: {
			listYear: {
				titleFormat: function (start: Date, end: Date) {
					return `${startStr} - ${endStr}`;
				}
			}
		},
		noEventsContent: "Pas d'évènements",
		events: [
			/*{
				id: 1,
				start: new Date('2024-09-02T19:00:00.000+02:00'),
				end: new Date('2024-09-02T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°1</p>' }
			},
			{
				id: 2,
				start: new Date('2024-09-04T19:00:00.000+02:00'),
				end: new Date('2024-09-04T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°2</p>' }
			},
			{
				id: 3,
				start: new Date('2024-09-11T19:00:00.000+02:00'),
				end: new Date('2024-09-11T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°3</p>' }
			},
			{
				id: 4,
				start: new Date('2024-09-16T19:00:00.000+02:00'),
				end: new Date('2024-09-16T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°4</p>' }
			},
			{
				id: 5,
				start: new Date('2024-09-18T19:00:00.000+02:00'),
				end: new Date('2024-09-18T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°5</p>' }
			},
			{
				id: 6,
				start: new Date('2024-09-25T19:00:00.000+02:00'),
				end: new Date('2024-09-25T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°6</p>' }
			},
			{
				id: 7,
				start: new Date('2024-09-30T19:00:00.000+02:00'),
				end: new Date('2024-09-30T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°7</p>' }
			},
			{
				id: 8,
				start: new Date('2024-10-02T19:00:00.000+02:00'),
				end: new Date('2024-10-02T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°8</p>' }
			},
			{
				id: 9,
				start: new Date('2024-10-09T19:00:00.000+02:00'),
				end: new Date('2024-10-09T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°9</p>' }
			},
			{
				id: 10,
				start: new Date('2024-10-16T19:00:00.000+02:00'),
				end: new Date('2024-10-16T20:00:00.000+02:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°10</p>' }
			},*/
			{
				id: 11,
				start: d('2025-04-22','19:00'),
				end: d('2025-04-22','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°1</p>' }
			},
			{
				id: 12,
				start: d('2025-04-24','19:00'),
				end: d('2025-04-24','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°2</p>' }
			},
			{
				id: 13,
				start: d('2025-04-28','19:00'),
				end: d('2025-04-28','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°3</p>' }
			},
			{
				id: 14,
				start: d('2025-05-06','19:00'),
				end: d('2025-05-06','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°4</p>' }
			},
			{
				id: 15,
				start: d('2025-05-15','19:00'),
				end: d('2025-05-15','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°5</p>' }
			},
			{
				id: 16,
				start: d('2025-05-22','19:00'),
				end: d('2025-05-22','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°6</p>' }
			},
			{
				id: 17,
				start: d('2025-06-05','19:00'),
				end: d('2025-06-05','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°7</p>' }
			},
			{
				id: 18,
				start: d('2025-06-12','19:00'),
				end: d('2025-06-12','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°8</p>' }
			},
			{
				id: 19,
				start: d('2025-06-19','19:00'),
				end: d('2025-06-19','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°9</p>' }
			},
			{
				id: 18,
				start: d('2025-06-26','19:00'),
				end: d('2025-06-26','20:00'),
				title: { html: '<p class="text-sm px-2">Atelier n°10</p>' }
			}
		]
	};
</script>

<svelte:head>
	<title>
		École du dos - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<header>
	<div class="section-container">
		<h1 class="h1">L'école du dos</h1>
		<p>
			Les soignants de la maison de santé de Vedène et les enseignantes en activité physique adaptée
			l'association KAPA Vedène vous apprendront à prendre soin de votre dos, pour augmenter votre
			mobilité et prévenir ou réduire les douleurs.
		</p>
	</div>
</header>

<Alert/>

<section>
	<div class="section-container">
		<h2 class="h2">Qui peut bénéficier de l'école du dos?</h2>
		<div class="md:px-4">
			<p>Toute personne</p>
			<div class="md:px-4">
				<ul class="list-disc space-y-4 p-4">
					<li>souffrant du dos</li>
					<li>n’ayant pas de douleur et qui ne veut pas en avoir</li>
				</ul>
			</div>
		</div>
	</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2">L'école du dos en pratique</h2>
		<div class="md:px-4">
			<ul class="list-disc space-y-4 p-4">
				<li>1 bilan d’entrée</li>
				<li>
					3 ateliers théoriques pour comprendre le fonctionnement de la colonne et en prendre soin
				</li>
				<li>7 ateliers pratiques pour soulager et prévenir les douleurs de dos</li>
				<li>1 bilan de sortie</li>
			</ul>

			<p>Chaque atelier dure une heure.</p>
			<p>Prévoir une tenue vestimentaire d'aisance pour les exercices et une bouteille d'eau.</p>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Intervenants</h2>
		<div class="md:px-4">
			<ul class="list-disc space-y-4 p-4">
				<li>1 enseignante en activité physique adaptée</li>
				<li>1 kinésithérapeute</li>
				<li>1 médecin généraliste</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Calendrier</h2>
		<div class="md:px-4">
			<p>
				Les ateliers ont lieu au <a class="anchor" href="/sites#pole_sante_vedene_anchor"
					>pôle médico-social Jean Jaurès</a
				>. Porte C.
			</p>
			<div class="py-2">
				<Calendar {plugins} {options} />
			</div>
			<p>
				Prévenir en cas d'absence: <a class="anchor" href="tel:+33769630393">
					<span class="badge variant-ghost"><Fa icon={faMobileScreen} /></span>
					<span class="flex-auto">0769630393</span></a
				>
			</p>
		</div>
	</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2" id="inscription">Inscription</h2>
		<div class="px-2 md:px-4 space-y-2 md:space-y-4">
			<h3 class="h3">Tarif</h3>
			<div class="px-2 md:px-4 space-y-2 md:space-y-4">
				<p>Une participation au programme de 70€ est demandée.</p>
			</div>
			<h3 class="h3">Contact</h3>
			<nav class="list-nav flex">
				<ul>
					<li>
						<a class="anchor" href="mailto:kapa.vedene@gmail.com">
							<span class="badge variant-ghost"><Fa icon={faEnvelope} /></span>
							<span class="flex-auto">kapa.vedene@gmail.com</span></a
						>
					</li>

					<li>
						<a class="anchor" href="tel:+33769630393">
							<span class="badge variant-ghost"><Fa icon={faMobileScreen} /></span>
							<span class="flex-auto">0769630393</span></a
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">En savoir plus</h2>
		<div class="md:px-4">
			<nav class="list-nav flex">
				<ul>
					<li>
						<a class="anchor" href="https://instagram.com/kapavedene">
							<span class="badge variant-ghost"><Fa icon={faInstagram} /></span>
							<span class="flex-auto">@kapavedene</span></a
						>
					</li>
					<li>
						<a class="anchor" href="/activite-physique-adaptee">
							<span class="badge variant-ghost"><Fa icon={faGlobe} /></span>
							<span class="flex-auto">Activité physique adaptée et KAPA Vedène</span></a
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-6 space-y-2 md:space-y-4;
	}
</style>
