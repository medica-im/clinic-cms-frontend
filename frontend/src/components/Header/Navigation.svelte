<script lang="ts">
	import IconButton, { Icon } from '@smui/icon-button';
	import { page } from '$app/stores';
	import { logOutUser } from '$lib/utils/requestUtils';
	import { language } from '$lib/store/languageStore';
	import LocaleSwitcher from '$lib/LocaleSwitcher.svelte';
	import { mdiTwitter, mdiFacebook, mdiLinkedin } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink
	} from 'sveltestrap/src';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { userData } from '$lib/store/userStore';
	import { facilityStore } from '$lib/store/facilityStore';
    import User from './User.svelte';
	import { get } from '@square/svelte-store';
	import SocialNetworks from '$lib/components/SoMed/SocialNetworks.svelte';

	export let facility;

	function hasSoMed(socialnetworks, somed) {
		return socialnetworks.some((e) => e.type == somed);
	}
	function getUrl(array, type) {
		var element = array.find((e) => e.type == type);
		return element.website;
	}
</script>

	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="/"
				>{capitalizeFirstLetter(facility.formatted_name, $language)}</a
			>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname === '/contact'
								? 'active aria-current="page"'
								: ''}"
							aria-current="page"
							href="/contact">Contact</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname === '/annuaire'
								? 'active aria-current="page"'
								: ''}"
							href="/annuaire">{$LL.NAVBAR.ADDRESSBOOK()}</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname === '/blog' ? 'active aria-current="page"' : ''}"
							rel="external"
							href="https://msp-vedene.fr/blog/">Blog</a
						>
					</li>
				</ul>
				<User user={$userData} facility={facility} />
				<SocialNetworks data={facility.contact.socialnetworks} isNavbar=true />
				<ul class="navbar-nav d-flex flex-row">
					<li class="nav-item">
						<LocaleSwitcher />
					</li>
				</ul>
			</div>
		</div>
	</nav>