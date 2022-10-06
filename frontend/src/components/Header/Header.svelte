<script lang="ts">
	import IconButton, { Icon } from '@smui/icon-button';
	import CircularProgress from '@smui/circular-progress';
	import { page } from '$app/stores';
	import { userData } from '$lib/store/userStore';
	import { logOutUser } from '$lib/utils/requestUtils';
	import { language } from '$lib/store/languageStore';
	import LocaleSwitcher from '$lib/LocaleSwitcher.svelte';
	import { facilityStore } from '$lib/store/facilityStore';
	import { mdiTwitter, mdiFacebook, mdiLinkedin } from '@mdi/js';
	import MdiTwitter from 'svelte-material-icons/Check.svelte';
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

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}
	function isTwitter(element) {
		return element.type == 'Twitter';
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
	{#await facilityStore.load()}
		<div style="display: flex; justify-content: center">
			<CircularProgress style="height: 32px; width: 32px;" indeterminate />
		</div>
	{:then}
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="/"
					>{capitalizeFirstLetter($facilityStore.formatted_name, $language)}</a
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
							<NavLink href="/contact" active={$page.url.pathname === '/contact'}>Contact</NavLink>
						</li>
						<li class="nav-item">
							<NavLink href="/annuaire" active={$page.url.pathname === '/annuaire'}
								>{$LL.NAVBAR.ADDRESSBOOK()}</NavLink
							>
						</li>
						<li class="nav-item">
							<NavLink href="https://msp-vedene.fr/blog">Blog</NavLink>
						</li>
						{#if !$userData.username}
							<li class="nav-item">
								<NavLink href="/accounts/login" active={$page.url.pathname === '/accounts/login'}
									>{$LL.NAVBAR.LOGIN()}</NavLink
								>
							</li>
							{#if $facilityStore.registration === true}
								<li class="nav-item">
									<NavLink
										href="/accounts/register"
										active={$page.url.pathname === '/accounts/register'}
										>{$LL.NAVBAR.REGISTER()}</NavLink
									>
								</li>
							{/if}
						{:else}
							<li class="nav-item">
								<NavLink
									href="/accounts/user/{$userData.username}-{$userData.id}"
									active={$page.url.pathname === '/accounts/user'}>Hi, {$userData.username}</NavLink
								>
							</li>
							<li class="nav-item">
								<NavLink href={null} on:click={logOutUser}>{$LL.NAVBAR.LOGOUT()}</NavLink>
							</li>
						{/if}

						{#if hasSoMed($facilityStore.contact.socialnetworks, 'Twitter')}
							<li class="nav-item">
								<a href={getUrl($facilityStore.contact.socialnetworks, 'Twitter')}>
									<IconButton class="material-icons" size="button">
										<Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
											<path fill="currentColor" d={mdiTwitter} />
										</Icon>
									</IconButton>
								</a>
							</li>
						{/if}
						{#if hasSoMed($facilityStore.contact.socialnetworks, 'Facebook')}
							<li class="nav-item">
								<a href={getUrl($facilityStore.contact.socialnetworks, 'Facebook')}>
									<IconButton class="material-icons" size="button">
										<Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
											<path fill="currentColor" d={mdiFacebook} />
										</Icon>
									</IconButton>
								</a>
							</li>
						{/if}
						{#if hasSoMed($facilityStore.contact.socialnetworks, 'LinkedIn')}
							<li class="nav-item">
								<a href={getUrl($facilityStore.contact.socialnetworks, 'LinkedIn')}>
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
	{/await}
</header>

<!--header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li class:active={$page.url.pathname === '/'}>
				<a sveltekit:prefetch href="/">Home</a>
			</li>
			<li class:active={$page.url.pathname === '/map'}>
				<a sveltekit:prefetch href="/map">Map</a>
			</li>
			<li class:active={$page.url.pathname === '/blog'}>
				<a sveltekit:prefetch href="https://msp-vedene.fr/blog">Blog</a>
			</li>
			{#if !$userData.username}
				<li class:active={$page.url.pathname === '/accounts/login'}>
					<a sveltekit:prefetch href="/accounts/login">Login</a>
				</li>
				<li class:active={$page.url.pathname === '/accounts/register'}>
					<a sveltekit:prefetch href="/accounts/register">Register</a>
				</li>
			{:else}
				<li>
					Hi, <a sveltekit:prefetch href="/accounts/user/{$userData.username}-{$userData.id}"
						>{$userData.username}</a
					>
				</li>
				<li>
					<a href={null} on:click={logOutUser} style="cursor: pointer;">Logout</a>
				</li>
			{/if}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
</header-->
