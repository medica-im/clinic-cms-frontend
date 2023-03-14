<script lang="ts">
    import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import healthProjectPdf from '$lib/assets/projet_de_sante_ MSP_Vedene.pdf';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.NAVBAR.HEALTH_PROJECT()}
	</title>
</svelte:head>
<h2>{$LL.NAVBAR.HEALTH_PROJECT()}</h2>
<h3>Code de la santé publique</h3>
<p>L'<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044628615/2021-12-25/">article L6323-3</a>, qui définit une maison de santé pluriprofessionnelle, aborde également le projet santé.</p>
<blockquote>Le projet de santé est compatible avec les orientations des schémas régionaux mentionnés à l'article <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045213708">L. 1434-2</a>. Il est transmis pour information à l'agence régionale de santé. Ce projet de santé est signé par chacun des professionnels de santé membres de la maison de santé. Il peut également être signé par toute personne dont la participation aux actions envisagées est explicitement prévue par le projet de santé.</blockquote>
<p>Le projet de santé s’appuie sur le diagnostic du territoire.</p>
<iframe src={healthProjectPdf} class="w-full aspect-square"></iframe>
