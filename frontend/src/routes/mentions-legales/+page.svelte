<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
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
		{capitalizeFirstLetter(
			$LL.LEGAL_NOTICES(),
			$language
		)} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<h2>{capitalizeFirstLetter(
	$LL.LEGAL_NOTICES(),
	$language
)}</h2>


<!-- Section: Design Block -->
<section class="mb-32">

    <div class="card p-4 variant-ghost-surface">
        <div class="flex flex-wrap items-center">
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
                                <p>MAISON DE SANTE PLURIPROFESSIONNELLE DE VEDENE</p>
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
                                <p>DigitalOcean, LLC</p>
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