<script lang="ts">
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
	import {
		faBuilding,
		faLocationDot,
		faPhone,
		faServer,
		faTimeline,
		faBookMedical,
		faHouse,
		faMapLocationDot,
		faAddressBook,
		faEnvelope,
		faBlog
	} from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>
		{$LL.CONTACT.TITLE()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<div>
	<!-- programs -->
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container">
			<div class="p-4">
				<div class="flex flex-wrap">
					<div class="grow-0 shrink-0 basis-auto block w-full lg:flex lg:w-6/12 xl:w-4/12">
						<div class="map-container-2 w-full">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.0282014982663!2d4.90483021385626!3d43.9794663392923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5f2ba51a6c6e7%3A0xeefbcecdde5cdee0!2zcMO0bGUgbcOpZGljYWw!5e0!3m2!1sfr!2str!4v1677725135937!5m2!1sfr!2str"
								class="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
								loading="lazy"
								frameborder="0"
								allowfullscreen
								title="map"
							/>
						</div>
					</div>
					<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
						<div class="flex flex-wrap pt-12 lg:pt-0">
							<div
								class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12"
							>
								<div class="flex items-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-primary-500 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
										>
											<Fa icon={faLocationDot} size="2x" />
										</div>
									</div>
									<div class="grow ml-6">
										<p class="font-bold mb-1">Siège social</p>
										<address>
											209 Place du Petit Pont<br />
											84270 Vedène<br />
											France<br />
										</address>
									</div>
								</div>
							</div>
							<div
								class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12"
							>
								<div class="flex align-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-primary-500 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
										>
											<Fa icon={faPhone} size="2x" />
										</div>
									</div>
									<div class="grow ml-6">
										<p class="font-bold mb-1">{capitalizeFirstLetter($LL.PHONE(), $language)}</p>
										<p>Secrétariat</p>
										<a href="tel:+33490163675">0490163675</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-8 md:py-12;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
	/* Team Gradient */
	/* prettier-ignore */
	.team-gradient {
		background-image:
			radial-gradient(at 0% 100%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%);
	}
	/* Tailwind Gradient */
	/* prettier-ignore */
	.tailwind-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%),
			radial-gradient(at 100% 100%,  rgba(var(--color-primary-500) / 0.24) 0px, transparent 50%);
	}
	/* Programs Gradient */
	/* prettier-ignore */
	.programs-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 100% 0%,  rgba(var(--color-primary-500) / 0.33) 0px, transparent 50%);
	}
	.map-container-2 {
		height: 500px;
	}
</style>
