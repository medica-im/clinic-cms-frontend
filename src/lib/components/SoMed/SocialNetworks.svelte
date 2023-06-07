<
    script lang="ts">
    import { mdiTwitter, mdiFacebook, mdiLinkedin, mdiInstagram, mdiYoutube, mdiSkype, mdiTwitch } from '@mdi/js';
    import { Svg } from '@smui/common';
	import { Icon } from '@smui/icon-button';

    export let data;
    export let isNavbar=false;

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
            "T": mdiTwitter,
            "F": mdiFacebook,
            "LI": mdiLinkedin,
            "I": mdiInstagram,
            "YT": mdiYoutube,
            "S": mdiSkype
        };
        return icons[type]
    }
</script>

<ul class="{ulClasses()}">
{#each data as somed}
        <li class="{liClasses()}">
            <a href={somed.url} class="btn variant-ghost-secondary">
                <Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor" d={getIcon(somed)} />
                </Icon>
            </a>
        </li>
{/each}
</ul>