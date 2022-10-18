<script lang="ts">
	import LL from '$i18n/i18n-svelte';
    import { mdiPostOutline } from '@mdi/js';
    import { mdiWeb } from '@mdi/js'; 
    import { Svg } from '@smui/common/elements';
    import { Icon } from '@smui/icon-button';
    export let website;

    function removeHttp(url) {
        return url.replace(/^https?:\/\//, '');
    } 
</script>

{#if website.type == "Blog"}
<a href="{website.url}" rel="external" class="card-link">
<Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
    <path fill="currentColor" d={mdiPostOutline} />
</Icon>Blog
</a>
{:else}
<a href="{website.url}" rel="external" class="card-link">
    <Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor" d={mdiWeb} />
    </Icon>{removeHttp(website.url)}
    </a>
{/if}