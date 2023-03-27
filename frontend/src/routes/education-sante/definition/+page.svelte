<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter($LL.HEALTH_EDUCATION())}
	</title>
</svelte:head>

<h2>{capitalizeFirstLetter($LL.HEALTH_EDUCATION(), $language)}</h2>

<svg
	aria-hidden="true"
	class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
	viewBox="0 0 24 27"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	><path
		d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
		fill="currentColor"
	/></svg
>
<blockquote>
	L’éducation pour la santé comprend la création délibérée de possibilités d’apprendre grâce à une
	forme de communication visant à améliorer les compétences en matière de santé, ce qui comprend
	l’amélioration des connaissances et la transmission d’aptitudes utiles dans la vie, qui favorisent
	la santé des individus et des communautés.
</blockquote>
<blockquote>
	L’éducation pour la santé concerne non seulement la communication d’informations, mais également
	le développement de la motivation, des compétences et de la confiance en soi nécessaires pour agir
	en vue d’améliorer sa santé.
</blockquote>
<blockquote>
	L’éducation pour la santé comprend la communication d’informations concernant les conditions
	sociales, économiques et environnementales de base qui ont des effets sur la santé, ainsi que sur
	les différents facteurs de risque et comportements à risque, et sur l’utilisation du système de
	santé. En conséquence, l’éducation pour la santé peut consister à communiquer des informations et
	à transmettre des aptitudes, ce qui démontre la faisabilité politique et les possibilités
	organisationnelles de différentes formes d’action visant à agir sur les déterminants sociaux,
	économiques et environnementaux de la santé.
</blockquote>

<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
	<a
		href="http://apps.who.int/iris/bitstream/handle/10665/67245/WHO_HPR_HEP_98.1_fre.pdf;jsessionid=C27F36AD744B0C6EFDAEE65D77C9C321?sequence=1#%5B%7B%22num%22%3A117%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitB%22%7D%5D" target="_blank" rel="noreferrer"><cite class="pr-3 text-sm text-gray-500 dark:text-gray-400"
			>Glossaire de la promotion de la santé</cite
		></a
	>
	<cite class="pl-3 font-medium text-gray-900 dark:text-white"
		>Organisation mondiale de la santé</cite
	>
</div>

<svg
	aria-hidden="true"
	class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
	viewBox="0 0 24 27"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	><path
		d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
		fill="currentColor"
	/></svg
>
