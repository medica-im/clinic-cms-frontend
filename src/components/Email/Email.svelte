<script lang="ts">
	import * as m from "$msgs";	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faAddressBook, faEnvelope } from '@fortawesome/free-regular-svg-icons';

	export let data;
</script>

<div class="flex content-start space-x-2 items-center">
	<div class="flex-initial break-words overflow-hidden p-0">
		<span class="w-4"><Fa icon={faEnvelope} size="sm" /></span>
	</div>
	<a class="unstyled underline underline-offset-4" href="mailto:{data.email}">
		<div class="w-64 md:w-full flex-initial break-words overflow-hidden">
			{data.email}
		</div>
	</a>
</div>
