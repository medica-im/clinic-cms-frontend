<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';
	import { variables } from '$lib/utils/constants';
	import SocialNetworks from '../SoMed/SoMed.svelte';
	import BlogIconLink from '$components/Blog/BlogIconLink.svelte';
	import { facilityStore } from '$lib/store/facilityStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import OutpatientClinicLogo from '$components/Logos/OutpatientClinicLogo.svelte';
	import { programsNavLinks } from '../../lib/links';
	import { resetDirectory } from '$components/Directory/utils';
</script>

<footer class="page-footer text-xs md:text-base">
	<div class="w-full max-w-7xl mx-auto p-4 py-16 md:py-24 space-y-10">
		<!-- Row 1 -->
		<div class="md:flex md:justify-between">
			<div class="mb-6 md:mb-0">
				<a data-sveltekit-preload-data="off" href="/" title={$LL.NAVBAR.GO_HOME()}>
					<div class="flex items-center space-x-2">
						<span class="flex w-8 h-8 items-center"><OutpatientClinicLogo /></span>

						<h3 class="h3">
							{capitalizeFirstLetter($facilityStore.formatted_name, $locale)}
						</h3>
					</div>
				</a>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
				<div>
					<h6 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
						{capitalizeFirstLetter($LL.RESOURCES(), $locale)}
					</h6>
					<ul class="text-gray-600 dark:text-gray-400 font-medium">
						<li class="mb-4">
							<a data-sveltekit-preload-data="off" href="/">
								{$LL.HOME.TITLE()}
							</a>
						</li>
						<li class="mb-4">
							<a href="/annuaire" on:click={resetDirectory}> Annuaire </a>
						</li>
						<li class="mb-4">
							<a href="/sites"> Sites </a>
						</li>

						<li class="mb-4">
							<a href="/contact"> Contact </a>
						</li>
					</ul>
				</div>
				{#if variables.ORGANIZATION_CATEGORY=="msp"}
				<div>
					<h6 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
						{$LL.OUTPATIENT_CLINIC.PROGRAMS()}
					</h6>
					<ul class="text-gray-600 dark:text-gray-400 font-medium">
						{#each Object.values(programsNavLinks) as navLink}
							<li class="mb-4">
								<a href={navLink.href} class="hover:underline ">{navLink.title[$language]}</a>
							</li>
						{/each}
					</ul>
				</div>
				{/if}
				<div>
					<h6 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
						{capitalizeFirstLetter($LL.LEGAL(), $language)}
					</h6>
					<ul class="text-gray-600 dark:text-gray-400 font-medium">
						<!--li class="mb-4">
							<a href="/politique-de-confidentialite" class="hover:underline"
								>{capitalizeFirstLetter($LL.PRIVACY_POLICY(), $language)}</a
							>
						</li-->
						<li class="mb-4">
							<a href="/mentions-legales" class="hover:underline"
								>{capitalizeFirstLetter($LL.LEGAL_NOTICES(), $language)}</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
		<!-- Row 2 -->
		<div class="sm:flex sm:items-center sm:justify-between">
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>© 2024 <a href="/" class="hover:underline">{$facilityStore.company_name}</a>.
			</span>
			<div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
				{#if $facilityStore?.contact?.socialnetworks}
				<SocialNetworks data={$facilityStore.contact.socialnetworks} appBar={true} />
				{/if}
				{#if variables.BLOG_URI}
				<BlogIconLink />
				{/if}
			</div>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
		<!-- Row 3 -->
		<div class="sm:flex sm:items-center sm:justify-between">
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>Site propulsé par la solution Pluripro Web créée par <a href="https://medecinelibre.com" class="anchor">Médecine Libre</a>.
			</span>
			<!--div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
				<SocialNetworks data={$facilityStore.contact.socialnetworks} appBar={true} />
				<BlogIconLink />
			</div-->
		</div>
	</div>
</footer>

<style lang="postcss">
	a {
		@apply !no-underline;
	}
</style>
