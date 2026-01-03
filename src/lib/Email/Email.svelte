<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook, faEnvelope } from '@fortawesome/free-regular-svg-icons';
	//import Update from "$lib/Web/Email/Update.svelte";
	//import Delete from "$lib/Web/Email/Delete.svelte";
	import type { Email } from '$lib/interfaces/email.interface';

	let { data, editMode=false } : { data: Email; editMode?: boolean } = $props();
</script>

<div class="flex content-start space-x-4 items-center">
	<div class="flex-initial break-words overflow-hidden p-0">
		<span class="w-4"><Fa icon={faEnvelope} size="sm" /></span>
	</div>
	<a class="unstyled underline underline-offset-4" href="mailto:{data.email}">
		<div class="w-64 md:w-full flex-initial break-words overflow-hidden">
			{data.email}
		</div>
	</a>
	<!--{#if editMode}
	<Update {data} /> <Delete {data} />
	{/if}-->
</div>
