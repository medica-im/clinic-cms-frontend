<script lang="ts">
	import { page } from '$app/stores';
	import { userData } from '$lib/store/userStore';
	import { logOutUser } from '$lib/utils/requestUtils';
	import { locale } from '$i18n/i18n-svelte'
	import LocaleSwitcher from '$lib/LocaleSwitcher.svelte'
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
	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}
</script>


<header>
	<Navbar class="mb-2 navbar-dark bg-primary" expand="lg">
		<NavbarBrand href="/">MSP Vedène</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ms-auto" navbar>
				<NavItem>
					<NavLink href="/contact" active={$page.url.pathname === '/contact'}>Contact</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/annuaire" active={$page.url.pathname === '/annuaire'}>Annuaire</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="https://msp-vedene.fr/blog">Blog</NavLink>
				</NavItem>
				{#if !$userData.username}
				<NavItem>
					<NavLink href="/accounts/login" active={$page.url.pathname === '/accounts/login'}>{$LL.NAVBAR.LOGIN()}</NavLink
					>
				</NavItem>
				<NavItem>
					<NavLink href="/accounts/register" active={$page.url.pathname === '/accounts/register'}>{$LL.NAVBAR.REGISTER()}</NavLink
					>
				</NavItem>
				{:else}
				<NavItem>
					<NavLink href="/accounts/user/{$userData.username}-{$userData.id}" active={$page.url.pathname === '/accounts/user'}>Hi, {$userData.username}</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href={null} on:click={logOutUser}>{$LL.NAVBAR.LOGOUT()}</NavLink
					>
				</NavItem>
				{/if}
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
