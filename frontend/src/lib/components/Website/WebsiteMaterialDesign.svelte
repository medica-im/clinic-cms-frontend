<script lang="ts">
	import LL from '$i18n/i18n-svelte';
    import { mdiPostOutline } from '@mdi/js';
    import { mdiWeb } from '@mdi/js'; 
    import { Svg } from '@smui/common';
    import { Icon } from '@smui/icon-button';
    export let website;

    function removeHttp(url) {
        return url.replace(/^https?:\/\//, '');
    } 
</script>

{#if website.type == "Blog"}
<a href="{website.website}" rel="external" class="card-link">
<span><Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
    <path fill="currentColor" d={mdiPostOutline} />
</Icon></span><span>Blog</span>
</a>
{:else}
<a href="{website.website}" rel="external" class="card-link">
    <span><Icon component={Svg} width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor" d={mdiWeb} />
    </Icon></span><span>{removeHttp(website.website)}</span>
    </a>
{/if}