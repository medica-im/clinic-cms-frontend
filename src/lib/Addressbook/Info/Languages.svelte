<script lang="ts">
	import * as m from "$msgs";	import Fa from 'svelte-fa';
	import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	export let data: [string];
</script>

{#if data.length < 2}{capitalizeFirstLetter(m.ADDRESSBOOK_SPOKEN_LANGUAGE())}{:else}{capitalizeFirstLetter(m.ADDRESSBOOK_SPOKEN_LANGUAGES())}{/if}:
{#each data as language, i}
	{#if i == 0}{' '}{language}{:else}{' '}{language}{/if}{#if i < data.length - 2},{:else if i == data.length - 2}{' '}{m.AND()}{:else}.{/if}
{/each}
