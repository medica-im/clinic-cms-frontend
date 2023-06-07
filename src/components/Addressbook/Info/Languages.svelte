<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	export let data: [string];
</script>

{#if data.length < 2}{capitalizeFirstLetter($LL.ADDRESSBOOK.SPOKEN_LANGUAGE())}{:else}{capitalizeFirstLetter($LL.ADDRESSBOOK.SPOKEN_LANGUAGES())}{/if}:
{#each data as language, i}
	{#if i == 0}{' '}{language}{:else}{' '}{language}{/if}{#if i < data.length - 2},{:else if i == data.length - 2}{' '}{$LL.AND()}{:else}.{/if}
{/each}
