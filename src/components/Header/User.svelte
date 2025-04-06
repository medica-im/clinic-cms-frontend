<script lang="ts">
    import * as m from "$msgs";    import { page } from '$app/stores';
    import { logOutUser } from '$lib/utils/requestUtils';
	export let user;
    export let facility;

    function isObjectEmpty(obj) {
		for (var i in obj) return false;
		return true;
	}
</script>

<ul class="navbar-nav">
	{#if isObjectEmpty(user)}
		<li class="nav-item">
			<a
				class="nav-link {$page.url.pathname === '/accounts/login'
					? 'active aria-current="page"'
					: ''} "
				href="/accounts/login">{m.NAVBAR_LOGIN()}</a
			>
		</li>
		{#if facility.registration === true}
			<li class="nav-item">
				<a
					class="nav-link {$page.url.pathname === '/accounts/register'
						? 'active aria-current="page"'
						: ''}"
					href="/accounts/register">{m.NAVBAR_REGISTER()}</a
				>
			</li>
		{/if}
	{/if}
	{#if user.username && user.username.length}
		<li class="nav-item">
			<a
				href="/accounts/user/{user.username}-{user.id}"
				class="nav-link {$page.url.pathname === `/accounts/user/${user.username}-${user.id}` ? 'active aria-crruent="page"' : ''}"
				>{m.NAVBAR_HI()} {user.username}</a
			>
		</li>
		<li class="nav-item">
            <button class="btn btn-sm btn-outline-danger" type="button" on:click={async () => await logOutUser()}>{m.NAVBAR_LOGOUT()}</button>
			<!--a class="nav-link" href="#" on:click={async () => await logOutUser()}
				>{m.NAVBAR_LOGOUT()}</a
            -->
		</li>
	{/if}
</ul>