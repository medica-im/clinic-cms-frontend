<script lang="ts">
	import { MapLibre as Map } from 'clinic-cms';

	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import Address from '$lib/Address/Address.svelte';
	import { createMapData } from '$lib/components/Map/mapData';
	import Emails from '$components/Email/Emails.svelte';
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
	//import Logo from '$lib/components/Logo/Logo.svelte';
	import logo from "$lib/assets/images/logo.png";

	export let data;
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
			<div class="grid lg:grid-cols-2">
				<div class="grow-0 basis-auto lg:w-6/12 xl:w-8/12">
					<div class="flex flex-wrap pt-12 lg:pt-0">
						<div
							class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12"
						>
							<div class="flex items-start">
								<div class="shrink-0 hidden lg:block">
									<div
										class="p-4 bg-primary-500 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
									>
										<Fa icon={faLocationDot} size="2x" />
									</div>
								</div>
								<div class="ml-6">
									<p class="font-bold mb-1">Siège social</p>
									<Address data={$facilityStore.contact} />
									{#if $facilityStore.contact.emails}
										<Emails data={$facilityStore.contact.emails} />
									{/if}
									<img class="rounded-lg py-4 max-w-80" src={logo} alt="logo de la MSP représentant un stéthoscope en forme de cœur et le profil stylisé de la commune escarpée avec au sommet le clocher de l'église Saint-Jean-Baptiste" />
								</div>
							</div>
						</div>
						<!--div
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
							</div-->
					</div>
				</div>
				<div class="justify-stretch justify-items-stretch h-80 lg:h-full p-2">
						<Map data={createMapData(data?.facility?.contact?.address, data?.facility?.formatted_name)} />
					
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl p-4 py-8 md:py-12;
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
</style>
