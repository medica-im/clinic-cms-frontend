<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook, faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe, faBlog } from '@fortawesome/free-solid-svg-icons';
    import Email from '$components/Email/Email.svelte';
    import Mssante from '$components/Email/Mssante.svelte';
    import type { Email as EmailType } from '$lib/interfaces/email.interface';

	export let data: EmailType[];

</script>
{#each data as email}
{#if email.type=="M"}
<Mssante data={email}/>
{:else}
<Email data={email}/>
{/if}
{/each}
