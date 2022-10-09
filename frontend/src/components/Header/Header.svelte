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

	export let user;
	export let facility;

	async function logOut() {
		await logOutUser();
	}
	function hasSoMed(socialnetworks, somed) {
		return socialnetworks.some((e) => e.type == somed);
	}
	function getUrl(array, type) {
		var element = array.find((e) => e.type == type);
		return element.url;
	}
</script>

<header>
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
								class="nav-link {$page.url.pathname === '/blog'
									? 'active aria-current="page"'
									: ''} "
								href="https://msp-vedene.fr/blog">Blog</a
							>
						</li>
						{#if (user.username == undefined)}
							<li class="nav-item">
								<a
									class="nav-link {$page.url.pathname === '/accounts/login'
										? 'active aria-current="page"'
										: ''} "
									href="/accounts/login">{$LL.NAVBAR.LOGIN()}</a
								>
							</li>
							{#if facility.registration === true}
								<li class="nav-item">
									<a class="nav-link {$page.url.pathname === '/accounts/register'
									? 'active aria-current="page"'
									: ''}"
										href="/accounts/register"
										>{$LL.NAVBAR.REGISTER()}</a
									>
								</li>
							{/if}
						{/if}
						{#if user.username}
							<li class="nav-item">
								<NavLink
									href="/accounts/user/{user.username}-{user.id}"
									active={$page.url.pathname ===
										`/accounts/user/${user.username}-${user.id}`}
									>{$LL.NAVBAR.HI()} {user.username}</NavLink
								>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/#" on:click={async () => {await logOut()}}>{$LL.NAVBAR.LOGOUT()}</a>
							</li>
						{/if}
						{#if hasSoMed(facility.contact.socialnetworks, 'Twitter')}
							<li class="nav-item">
								<a href={getUrl(facility.contact.socialnetworks, 'Twitter')}>
									<IconButton class="material-icons" size="button">
										<Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
											<path fill="currentColor" d={mdiTwitter} />
										</Icon>
									</IconButton>
								</a>
							</li>
						{/if}
						{#if hasSoMed(facility.contact.socialnetworks, 'Facebook')}
							<li class="nav-item">
								<a href={getUrl(facility.contact.socialnetworks, 'Facebook')}>
									<IconButton class="material-icons" size="button">
										<Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
											<path fill="currentColor" d={mdiFacebook} />
										</Icon>
									</IconButton>
								</a>
							</li>
						{/if}
						{#if hasSoMed(facility.contact.socialnetworks, 'LinkedIn')}
							<li class="nav-item">
								<a href={getUrl(facility.contact.socialnetworks, 'LinkedIn')}>
									<IconButton class="material-icons" size="button">
										<Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
											<path fill="currentColor" d={mdiLinkedin} />
										</Icon>
									</IconButton>
								</a>
							</li>
						{/if}
						<li class="nav-item">
							<LocaleSwitcher />
						</li>
					</ul>
				</div>
			</div>
		</nav>
</header>