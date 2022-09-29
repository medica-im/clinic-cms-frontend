<script lang="ts">
	import IconButton, { Icon } from '@smui/icon-button';
	import CircularProgress from '@smui/circular-progress';
	import { page } from '$app/stores';
	import { userData } from '$lib/store/userStore';
	import { logOutUser } from '$lib/utils/requestUtils';
	import { locale } from '$i18n/i18n-svelte';
	import LocaleSwitcher from '$lib/LocaleSwitcher.svelte';
	import fetchFacilitiesStore from '$lib/store/facilityStore';
	import { mdiTwitter, mdiFacebook, mdiLinkedin } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap/src';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	let [facilitiesData, loading, error, get] = fetchFacilitiesStore();
	function onLocaleChange(...args) {
		[facilitiesData, loading, error, get] = fetchFacilitiesStore();
	}
	$: onLocaleChange($locale);
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
	<Navbar class="mb-2 navbar bg-light" expand="lg">
		{#if $loading}
			<div style="display: flex; justify-content: center">
				<CircularProgress style="height: 32px; width: 32px;" indeterminate />
			</div>
		{:else if $error}
			Error: {$error}
		{:else}
			<NavbarBrand href="/"
				>{capitalizeFirstLetter(
					$facilitiesData.formatted_name,
					$facilitiesData.language
				)}</NavbarBrand
			>
		{/if}
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ms-auto" navbar>
				<NavItem>
					<NavLink href="/contact" active={$page.url.pathname === '/contact'}>Contact</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/annuaire" active={$page.url.pathname === '/annuaire'}
						>{$LL.NAVBAR.ADDRESSBOOK()}</NavLink
					>
				</NavItem>
				<NavItem>
					<NavLink href="https://msp-vedene.fr/blog">Blog</NavLink>
				</NavItem>
				{#if !$userData.username}
					<NavItem>
						<NavLink href="/accounts/login" active={$page.url.pathname === '/accounts/login'}
							>{$LL.NAVBAR.LOGIN()}</NavLink
						>
					</NavItem>
					{#if facilitiesData.registration === true}
						<NavItem>
							<NavLink
								href="/accounts/register"
								active={$page.url.pathname === '/accounts/register'}
								>{$LL.NAVBAR.REGISTER()}</NavLink
							>
						</NavItem>
					{/if}
				{:else}
					<NavItem>
						<NavLink
							href="/accounts/user/{$userData.username}-{$userData.id}"
							active={$page.url.pathname === '/accounts/user'}>Hi, {$userData.username}</NavLink
						>
					</NavItem>
					<NavItem>
						<NavLink href={null} on:click={logOutUser}>{$LL.NAVBAR.LOGOUT()}</NavLink>
					</NavItem>
				{/if}
				<NavItem>
					{#if $loading}
						<div style="display: flex; justify-content: center">
							<CircularProgress style="height: 32px; width: 32px;" indeterminate />
						</div>
					{:else if $error}
						Error: {$error}
					{:else if hasSoMed($facilitiesData.contact.socialnetworks, 'Twitter')}
						<a href={getUrl($facilitiesData.contact.socialnetworks, 'Twitter')}>
							<IconButton class="material-icons" size="button">
								<Icon component={Svg} viewBox="0 0 24 24">
									<path fill="currentColor" d={mdiTwitter} />
								</Icon>
							</IconButton>
						</a>
					{/if}
				</NavItem>
				<NavItem>
					{#if $loading}
						<div style="display: flex; justify-content: center">
							<CircularProgress style="height: 32px; width: 32px;" indeterminate />
						</div>
					{:else if $error}
						Error: {$error}
					{:else if hasSoMed($facilitiesData.contact.socialnetworks, 'Facebook')}
						<a href={getUrl($facilitiesData.contact.socialnetworks, 'Facebook')}>
							<IconButton class="material-icons" size="button">
								<Icon component={Svg} viewBox="0 0 24 24">
									<path fill="currentColor" d={mdiFacebook} />
								</Icon>
							</IconButton>
						</a>
					{/if}
				</NavItem>
				<NavItem>
					{#if $loading}
						<div style="display: flex; justify-content: center">
							<CircularProgress style="height: 32px; width: 32px;" indeterminate />
						</div>
					{:else if $error}
						Error: {$error}
					{:else if hasSoMed($facilitiesData.contact.socialnetworks, 'LinkedIn')}
						<a href={getUrl($facilitiesData.contact.socialnetworks, 'LinkedIn')}>
							<IconButton class="material-icons" size="button">
								<Icon component={Svg} viewBox="0 0 24 24">
									<path fill="currentColor" d={mdiLinkedin} />
								</Icon>
							</IconButton>
						</a>
					{/if}
				</NavItem>
				<!--{#if $facilitiesData.contact.socialnetworks.some(e => e.type == 'Twitter')}
				<IconButton class="material-icons"
					>Twitter</IconButton
				  >
				{/if}-->
				<NavItem>
					<LocaleSwitcher />
				</NavItem>
				<!--Dropdown nav inNavbar>
					<DropdownToggle nav caret>Options</DropdownToggle>
					<DropdownMenu end>
						<DropdownItem>Option 1</DropdownItem>
						<DropdownItem>Option 2</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>Reset</DropdownItem>
					</DropdownMenu>
				</Dropdown-->
			</Nav>
		</Collapse>
	</Navbar>
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
