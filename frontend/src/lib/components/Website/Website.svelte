<script lang="ts">
	import LL from '$i18n/i18n-svelte';
    import Fa from 'svelte-fa'
    import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
    import { faGlobe, faBlog } from '@fortawesome/free-solid-svg-icons';

    export let website;

    function removeHttp(url) {
        return url.replace(/^https?:\/\//, '');
    } 
</script>

{#if website.type == "Blog"}
<a href="{website.website}" rel="external" class="btn variant-soft-secondary">
<span><Fa icon={faBlog} /></span><span>Blog</span>
</a>
{:else}
<a href="{website.website}" rel="external" class="btn variant-soft-secondary">
    <span><Fa icon={faGlobe} /></span><span>{removeHttp(website.website)}</span>
    </a>
{/if}