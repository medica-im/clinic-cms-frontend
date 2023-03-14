<script lang="ts">
    import LL from '$i18n/i18n-svelte';
    import { page } from '$app/stores';
    import { logOutUser } from '$lib/utils/requestUtils';
	import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
	HeaderAction,
	HeaderUtilities,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
	SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SideNavDivider,
  } from "carbon-components-svelte";
	export let user;
    export let facility;

    function isObjectEmpty(obj) {
		for (var i in obj) return false;
		return true;
	}
</script>

	{#if isObjectEmpty(user)}
	<HeaderNavItem href="/accounts/login" text={$LL.NAVBAR.LOGIN()} isSelected= {$page.url.pathname === '/accounts/login'} />
		{#if facility.registration === true}
		<HeaderNavItem href="/accounts/register" text={$LL.NAVBAR.REGISTER()} isSelected= {$page.url.pathname === '/accounts/register'} />
		{/if}
	{/if}
	{#if user.username && user.username.length}
	<HeaderNavItem href="/accounts/user/{user.username}-{user.id}" text="{$LL.NAVBAR.HI()} {user.username}" isSelected={$page.url.pathname === `/accounts/user/${user.username}-${user.id}`} />
	<HeaderNavItem text={$LL.NAVBAR.LOGOUT()} on:click={async () => await logOutUser()} />
	{/if}
