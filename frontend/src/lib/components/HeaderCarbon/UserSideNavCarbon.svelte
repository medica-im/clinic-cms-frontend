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
  import Fade from "carbon-icons-svelte/lib/Fade.svelte";
  import Login from "carbon-icons-svelte/lib/Login.svelte";
  import Logout from "carbon-icons-svelte/lib/Logout.svelte";
  import User from "carbon-icons-svelte/lib/User.svelte";

	export let user;
    export let facility;

    function isObjectEmpty(obj) {
		for (var i in obj) return false;
		return true;
	}
</script>

	{#if isObjectEmpty(user)}
	<SideNavLink icon={Login} href="/accounts/login" text={$LL.NAVBAR.LOGIN()} isSelected= {$page.url.pathname === '/accounts/login'} />
		{#if facility.registration === true}
		<SideNavLink icon={Fade} href="/accounts/register" text={$LL.NAVBAR.REGISTER()} isSelected= {$page.url.pathname === '/accounts/register'} />
		{/if}
	{/if}
	{#if user.username && user.username.length}
	<SideNavLink icon={User} href="/accounts/user/{user.username}-{user.id}" text="{$LL.NAVBAR.HI()} {user.username}" isSelected={$page.url.pathname === `/accounts/user/${user.username}-${user.id}`} />
	<SideNavLink icon={Logout} text={$LL.NAVBAR.LOGOUT()} on:click={async () => await logOutUser()} />
	{/if}
