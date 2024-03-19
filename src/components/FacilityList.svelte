<script lang="ts">
	export let data;
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { faMapPin } from '@fortawesome/free-solid-svg-icons';

	function section(name: string): void {
		facility = name;
	}
</script>
<div class="logo-cloud grid-cols-1 xl:grid-cols-2 gap-1">
{#each data as f}
	{#if f.name}
		<a href="#{f.name}_anchor" class="logo-item text-center"
			>{f.name}</a
		>
	{/if}
{/each}
</div>