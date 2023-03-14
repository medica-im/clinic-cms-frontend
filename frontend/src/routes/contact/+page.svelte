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
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.CONTACT.TITLE()}
		</title>
</svelte:head>

	<!-- Section: Design Block -->
	<section class="mb-32 text-gray-800">

		<div class="block rounded-lg shadow-lg bg-white">
			<div class="flex flex-wrap items-center">
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
										<Fa icon={faBuilding} size="2x" />
									</div>
								</div>
								<div class="grow ml-6">
									<p class="font-bold mb-1">Informations légales</p>
									<p class="text-gray-500">MAISON DE SANTE PLURIPROFESSIONNELLE DE VEDENE</p>
									<p class="text-xs">
										Forme juridique: Société Interprofessionnelle de Soins Ambulatoires
									</p>
									<p class="text-xs">SIREN 893932160</p>
									<p class="text-xs">R.C.S. AVIGNON 893 932 160</p>
									<p class="text-xs">Numéro TVA intracommunautaire: FR50893932160</p>
								</div>
							</div>
						</div>
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
                                    209 Place du Petit Pont<br>
									84270 Vedène<br>
									France<br>
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
									<p class="font-bold mb-1">{$LL.CONTACT.CALL_US()}</p>
									<p class="text-gray-500">Secrétariat</p>
									<p class="text-gray-500"><a href="tel:+33490163675">0490163675</a></p>
								</div>
							</div>
						</div>
						<div
							class="mb-12 lg:mb-0 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12"
						>
							<div class="flex align-start">
								<div class="shrink-0">
									<div
										class="p-4 bg-primary-500 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
									>
										<Fa icon={faServer} size="2x" />
									</div>
								</div>
								<div class="grow ml-6">
									<p class="font-bold mb-1">Hébergeur</p>
									<p class="text-gray-500">DigitalOcean, LLC</p>
										<p class="text-xs">
											101 Avenue of the Americas<br />
											10th Floor<br />
											New York<br />
											NY 10013<br />
											United States of America<br />
											+1 234-567-89
										</p>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Section: Design Block -->

<style>
    .map-container-2 {
        height: 500px;
    }
</style>