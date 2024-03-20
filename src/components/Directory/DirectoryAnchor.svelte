<script lang="ts">
    import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
    import { resetDirectory } from '$components/Directory/utils';

    export let data  = "text";
</script>

{#if data=="button"}
<a href="/annuaire" on:click={resetDirectory} class="btn variant-filled-primary" data-sveltekit-preload-data="hover">
    <span><Fa icon={faAddressBook} /></span><span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
</a>
{:else if data=="text"}
<a href="/annuaire" on:click={resetDirectory}>
    {$LL.NAVBAR.ADDRESSBOOK()}
</a>
{/if}