<script lang="ts">
	import { page } from '$app/stores';
	import { language } from '$lib/store/languageStore';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { userData } from '$lib/store/userStore';
	import User from './User.svelte';
	import SocialNetworks from '$lib/components/SoMed/SocialNetworks.svelte';
	import { variables } from '$lib/utils/constants';

	export let facility;

	const timeline = variables.TIMELINE;

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
		<a class="navbar-brand" href="/">{capitalizeFirstLetter(facility.formatted_name, $language)}</a>
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
						class="nav-link {$page.url.pathname === '/contact' ? 'active aria-current="page"' : ''}"
						aria-current="page"
						href="/contact">Contact</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link {$page.url.pathname === '/sites' ? 'active aria-current="page"' : ''}"
						aria-current="page"
						href="/sites">Sites</a
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
						href="{variables.BLOG_URI}">Blog</a
					>
				</li>
				{#if facility.category.name == 'msp'}
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							role="button"
							data-bs-toggle="dropdown"
						>
							{$LL.FACILITY.OUTPATIENT_CLINIC()}
						</a>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="/{ facility.category.slug }">{$LL.NAVBAR.ABOUT()}</a></li>
							{#if timeline}
								<li><a class="dropdown-item" href="/chronologie">{$LL.NAVBAR.TIMELINE()}{timeline}</a></li>
							{/if}
						</ul>
					</li>
				{/if}
			</ul>
			<User user={$userData} {facility} />
			<SocialNetworks data={facility.contact.socialnetworks} isNavbar="true" />
			<ul class="navbar-nav d-flex flex-row">
				<li class="nav-item">
					<LocaleSwitcher />
				</li>
			</ul>
		</div>
	</div>
</nav>
