<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
</script>

<svelte:head>
	<title>
		{m.NAVBAR_HEALTH_PROJECT()} -{capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>
<div>
<header>
	<div class="section-container">
		<h1 class="h1">{m.NAVBAR_HEALTH_PROJECT()}</h1>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Définition</h2>
		<p>
			L'<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044628615/2021-12-25/"
				>article L6323-3</a
			>, qui définit une maison de santé pluriprofessionnelle, aborde également le projet santé.
		</p>

		<blockquote>
			Le projet de santé est compatible avec les orientations des schémas régionaux mentionnés à
			l'article <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045213708"
				>L. 1434-2</a
			>. Il est transmis pour information à l'agence régionale de santé. Ce projet de santé est
			signé par chacun des professionnels de santé membres de la maison de santé. Il peut également
			être signé par toute personne dont la participation aux actions envisagées est explicitement
			prévue par le projet de santé.
		</blockquote>

		<p>Le projet de santé s’appuie sur le diagnostic du territoire.</p>
	</div>
</section>

<!--section>
	<div class="section-container">
		<iframe
			src={healthProjectPdf}
			title={m.NAVBAR_HEALTH_PROJECT()}
			class="w-full aspect-square"
		/>
	</div>
</section-->
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>