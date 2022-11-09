<script lang="ts">
    import { mdiTwitter, mdiFacebook, mdiLinkedin, mdiInstagram, mdiYoutube, mdiSkype, mdiTwitch } from '@mdi/js';
    import { Svg } from '@smui/common/elements';
	import { Icon } from '@smui/icon-button';

    export let data;
	
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

<ul class="list-group list-group-flush list-group-horizontal">
{#each data as somed}
        <li class="list-group-item">
            <a href={somed.url}>
                <Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor" d={getIcon(somed)} />
                </Icon>
            </a>
        </li>
{/each}
</ul>