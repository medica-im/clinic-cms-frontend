<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { logOutUser } from '$lib/utils/requestUtils';
	import { userData } from '$lib/store/userStore';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { isObjectEmpty } from '$lib/utils/utils';

	import Fa from 'svelte-fa';
	import {
		faBars,
		faInfo,
		faTimeline,
		faBookMedical,
		faHouse,
		faMapLocationDot,
		faAddressBook,
		faEnvelope,
		faBlog,
		faRightToBracket,
		faRightFromBracket,
		faUserPlus,
		faUser
	} from '@fortawesome/free-solid-svg-icons';
	export let embedded = false;

	// ListItem Click Handler
	function onListItemClick(): void {
		// On Drawer embed Only:
		if (!embedded) return;
		drawerStore.close();
	}
	export let facility;
	export let sideBar = false;
	export let appBar = false;

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

{#if sideBar}
	<ul class="navbar-nav">
		{#if isObjectEmpty($userData)}
			<li class="nav-item">
				<a class={classesActive('/accounts/login')} href="/accounts/login"
					><span><Fa icon={faRightToBracket} size="lg" /></span>
					<span>{$LL.NAVBAR.LOGIN()}</span></a
				>
			</li>
			{#if facility.registration === true}
				<li>
					<a
						class={$page.url.pathname === '/accounts/register' ? 'active aria-current="page"' : ''}
						href="/accounts/register">{$LL.NAVBAR.REGISTER()}</a
					>
				</li>
			{/if}
		{/if}
		{#if $userData?.email && $userData?.email?.length}
			<li class="nav-item">
				<a
					href="/accounts/user/{$userData.id}"
					class={classesActive(`/accounts/user`)}
					><span><Fa icon={faUser} size="lg" /></span>
					<span>{$LL.NAVBAR.HI()} {$userData.email}</span></a
				>
			</li>
			<li class="nav-item">
				<button type="button" on:click={async () => await logOutUser()}
					><span><Fa icon={faRightFromBracket} size="lg" /></span>
					<span>{$LL.NAVBAR.LOGOUT()}</span></button
				>
				<!--a class="nav-link" href="#" on:click={async () => await logOutUser()}
				>{$LL.NAVBAR.LOGOUT()}</a
            -->
			</li>
		{/if}
	</ul>
{:else}
	{#if isObjectEmpty($userData)}
		<a
			class="{classesActive('/accounts/login')} btn hover:variant-soft-primary lg:inline-block"
			href="/accounts/login"
			title={$LL.NAVBAR.LOGIN()}
			><span class="lg:inline-block align-text-bottom"
				><Fa icon={faRightToBracket} size="lg" /></span
			>
			<span class="hidden xl:inline-block">{$LL.NAVBAR.LOGIN()}</span></a
		>
	{/if}
	{#if $userData?.email && $userData?.email?.length}
		<a
			href="/accounts/user"
			title={$userData.email}
			class="{classesActive(
				`/accounts/user`
			)} btn hover:variant-soft-primary lg:inline-block"
			><span class="lg:inline-block align-text-bottom"><Fa icon={faUser} size="lg" /></span>
			<span class="hidden lg:inline-block">{$userData.email}</span></a
		>
		<button
			type="button"
			class="btn hover:variant-soft-primary lg:inline-block"
			title={$LL.NAVBAR.LOGOUT()}
			on:click={async () => await logOutUser()}
			><span class="lg:inline-block align-text-bottom"
				><Fa icon={faRightFromBracket} size="lg" /></span
			>
			<span class="hidden lg:inline-block">{$LL.NAVBAR.LOGOUT()}</span></button
		>
	{/if}
{/if}
