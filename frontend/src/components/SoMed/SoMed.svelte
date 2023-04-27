<script lang="ts">
	import { AppRailTile } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import {
		faTwitter,
		faFacebook,
		faLinkedin,
		faInstagram,
		faYoutube,
		faSkype
	} from '@fortawesome/free-brands-svg-icons';
	import { drawerStore } from '@skeletonlabs/skeleton';
	export let embedded = false;
	export let data;
	export let appBar = false;
	export let sideBar = false;
	export let appRail = false;

	// ListItem Click Handler
	function onListItemClick(): void {
		// On Drawer embed Only:
		if (!embedded) return;
		drawerStore.close();
	}

	/*
    function ulClasses() {
        if (isNavbar) {
            return "navbar-nav d-flex flex-row"
        } else {
            return "list-group list-group-flush list-group-horizontal"
        }
    }
    function liClasses() {
        if (isNavbar) {
            return "nav-item"
        } else {
            return "list-group-item border-0"
        }
    }
	
    function hasSoMed(somed) {
		return data.some((e) => e.type == somed);
	}
	
    function getUrl(somed) {
		var element = data.find((e) => e.type == type);
		return element.url;
	}
    */
	function getIcon(somed) {
		let type = somed.type;
		const icons = {
			T: faTwitter,
			F: faFacebook,
			LI: faLinkedin,
			I: faInstagram,
			YT: faYoutube,
			S: faSkype
		};
		return icons[type];
	}
</script>

{#if appBar}
	{#each data as somed}
		<a
			href={somed.url}
			title={somed.get_type_display}
			class="btn-icon btn-icon-sm hover:variant-soft-secondary"
			target="_blank"
			rel="noreferrer"
		>
			<span><Fa icon={getIcon(somed)} size="lg" /></span>
		</a>
	{/each}
{:else if sideBar}
	{#each data as somed}
		<li>
			<a href={somed.url} class="hover:variant-soft-secondary" target="_blank" rel="noreferrer">
				<span><Fa icon={getIcon(somed)} size="lg" /></span><span>{somed.get_type_display}</span>
			</a>
		</li>
	{/each}
{:else if appRail}
	{#each data as somed}
		<AppRailTile
			label={somed.get_type_display}
			tag="a"
			href={somed.url}
			value={'blog'}
			on:click={onListItemClick}
			class="lg:hidden"
		>
			<span><Fa icon={getIcon(somed)} size="lg" /></span>
		</AppRailTile>
	{/each}
{:else}
<span class="align-middle space-x-2">
	{#each data as somed}
		<a
            href={somed.url}
            title={somed.get_type_display}
            class="btn-icon variant-ghost-secondary"
            target="_blank"
            rel="external">
			<span><Fa icon={getIcon(somed)} size="lg" /></span>
		</a>
	{/each}
</span>
{/if}
