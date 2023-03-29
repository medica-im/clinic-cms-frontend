<script lang="ts">
    import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter($LL.HEALTH_RECORD(), $language)}
	</title>
</svelte:head>

<h2>Partage d’information au sein de l’équipe de soins</h2>

<h3>L'équipe de soins</h3>
<p>Les professionnels de la Maison de Santé Pluriprofessionnelle intervenant directement auprès des patients pour la réalisation d’actes diagnostiques, thérapeutiques, de compensation du handicap, de soulagement de la douleur ou de prévention de perte d'autonomie, ou aux actions nécessaires à la coordination de plusieurs de ces actes, constituent une équipe de soins (<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031919050">article L1110-12</a> du Code de la Santé Publique).</p>

<h3>Secret partagé</h3>
<p>Le secret est implicitement partagé pour l’accès au dossier du patient entre les professionnels de santé constituant cette équipe de soins (<a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000227015/">loi relative aux droits des malades et à la qualité du système de santé</a> et <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043895798">article L1110-4</a> du Code de la santé publique).</p>

<p>Toutefois, chacun conserve le droit de s’opposer à tout moment à un échange ou un partage d’informations le concernant. Si c’est votre cas, exprimez votre opposition auprès de votre professionnel de santé.</p>