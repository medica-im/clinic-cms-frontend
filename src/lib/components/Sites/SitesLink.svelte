<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import Fa from 'svelte-fa';
	import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<a href="/sites" class="btn variant-filled">
		<span class="badge variant-filled-primary"> <Fa icon={faArrowRight} /></span>
		<span class="whitespace-normal text-left">
			{$LL.SITES.ALL()}
		</span>
</a>