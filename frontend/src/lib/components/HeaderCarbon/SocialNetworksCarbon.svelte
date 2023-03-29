<script lang="ts">
	import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
	HeaderAction,
    HeaderActionLink,
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
    import { Link } from "carbon-components-svelte";
    import LogoTwitter from "carbon-icons-svelte/lib/LogoTwitter.svelte";
    import LogoFacebook from "carbon-icons-svelte/lib/LogoFacebook.svelte";
    import LogoLinkedin from "carbon-icons-svelte/lib/LogoLinkedin.svelte";
    import LogoInstagram from "carbon-icons-svelte/lib/LogoInstagram.svelte";
    import LogoYoutube from "carbon-icons-svelte/lib/LogoYoutube.svelte";
    import LogoSkype from "carbon-icons-svelte/lib/LogoSkype.svelte";

    export let data;

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
    
    function getIcon(somed) {
        let type = somed.type
        const icons = {
            "T": LogoTwitter,
            "F": LogoFacebook,
            "LI": LogoLinkedin,
            "I": LogoInstagram,
            "YT": LogoYoutube,
            "S": LogoSkype
        };
        return icons[type]
    }
</script>

{#each data as somed}
<HeaderActionLink icon={getIcon(somed)} href={somed.url}></HeaderActionLink>
{/each}