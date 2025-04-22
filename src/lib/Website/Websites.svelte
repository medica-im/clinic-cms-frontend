<script lang="ts">
	import * as m from "$msgs";	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook, faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faBlog } from '@fortawesome/free-solid-svg-icons';
    import Website from '$lib/Website/Website.svelte';
    import type { Website as WebsiteType } from '$lib/interfaces/website.interface';

	export let data: WebsiteType[];

</script>
<div class="">
{#each data as website}
<Website data={website}/>
{/each}
</div>