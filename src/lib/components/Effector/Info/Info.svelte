<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faInfo } from '@fortawesome/free-solid-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import Languages from './Languages.svelte';
	export let data: any;
</script>

	<div class="flex items-center p-1">
		<div class="w-9"><Fa icon={faInfo} /></div>
		<div>
			<h3>
				{capitalizeFirstLetter($LL.ADDRESSBOOK.INFORMATIONS())}
			</h3>
		</div>
	</div>
	{#if data.spoken_languages && data?.spoken_languages.length}
		<div class="flex p-1">
			<div class="w-9" />
			<div>
				<Languages data={data.spoken_languages} />
			</div>
		</div>
	{/if}
	{#if data.rpps}
		<div class="flex p-1">
			<div class="w-9" />
			<div>
				N° RPPS: {data.rpps}
			</div>
		</div>
	{/if}
	{#if data.adeli}
	<div class="flex p-1">
		<div class="w-9" />
		<div>
			N° ADELI: {data.adeli}
		</div>
	</div>
{/if}

