<script lang="ts">
	import * as m from "$msgs";
	import { page } from '$app/stores';
	import { logOutUser } from '$lib/utils/requestUtils';
	import { userData } from '$lib/store/userStore';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
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
	const drawerStore = getDrawerStore();

	// ListItem Click Handler
	function onListItemClick(): void {
		// On Drawer embed Only:
		if (!embedded) return;
		drawerStore.close();
	}
	export let facility;
	export let sideBar = false;

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

{#if sideBar}
	<ul class="navbar-nav">
		{#if isObjectEmpty($userData)}
			<li class="nav-item">
				<a class={classesActive('/accounts/login')} href="/accounts/login"
					><span><Fa icon={faRightToBracket} size="lg" /></span>
					<span>{m.NAVBAR_LOGIN()}</span></a
				>
			</li>
			{#if facility.registration === true}
				<li>
					<a
						class={$page.url.pathname === '/accounts/register' ? 'active aria-current="page"' : ''}
						href="/accounts/register">{m.NAVBAR_REGISTER()}</a
					>
				</li>
			{/if}
		{/if}
		{#if $userData.username && $userData.username.length}
			<li class="nav-item">
				<a
					href="/accounts/user/{$userData.username}-{$userData.id}"
					class={classesActive(`/accounts/user/${$userData.username}-${$userData.id}`)}
					><span><Fa icon={faUser} size="lg" /></span>
					<span>{m.NAVBAR_HI()} {$userData.username}</span></a
				>
			</li>
			<li class="nav-item">
				<button type="button" on:click={async () => await logOutUser()}
					><span><Fa icon={faRightFromBracket} size="lg" /></span>
					<span>{m.NAVBAR_LOGOUT()}</span></button
				>
				<!--a class="nav-link" href="#" on:click={async () => await logOutUser()}
				>{m.NAVBAR_LOGOUT()}</a
            -->
			</li>
		{/if}
	</ul>
{:else}
	{#if isObjectEmpty($userData)}
		<a
			class="{classesActive('/accounts/login')} btn hover:variant-soft-primary lg:inline-block"
			href="/accounts/login"
			title={m.NAVBAR_LOGIN()}
			><span class="lg:inline-block align-text-bottom"
				><Fa icon={faRightToBracket} size="lg" /></span
			>
			<span class="hidden xl:inline-block">{m.NAVBAR_LOGIN()}</span></a
		>
	{/if}
	{#if $userData.username && $userData.username.length}
		<a
			href="/accounts/user/{$userData.username}-{$userData.id}"
			title={$userData.username}
			class="{classesActive(
				`/accounts/user/${$userData.username}-${$userData.id}`
			)} btn hover:variant-soft-primary lg:inline-block"
			><span class="lg:inline-block align-text-bottom"><Fa icon={faUser} size="lg" /></span>
			<span class="hidden lg:inline-block">{$userData.username}</span></a
		>
		<button
			type="button"
			class="btn hover:variant-soft-primary lg:inline-block"
			title={m.NAVBAR_LOGOUT()}
			on:click={async () => await logOutUser()}
			><span class="lg:inline-block align-text-bottom"
				><Fa icon={faRightFromBracket} size="lg" /></span
			>
			<span class="hidden lg:inline-block">{m.NAVBAR_LOGOUT()}</span></button
		>
	{/if}
{/if}
