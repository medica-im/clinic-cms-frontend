<script lang="ts">
	export let organizationData;
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { faMapPin } from '@fortawesome/free-solid-svg-icons';
	let facility = organizationData.facility[0].name;

	function section(name: string): void {
		facility = name;
	}
</script>
<div class="logo-cloud grid-cols-1 xl:grid-cols-2 gap-1">
{#each organizationData.facility as f}
	{#if f.contact}
		<a href="#{f.name}_anchor" class="logo-item text-center"
			>{f.contact.formatted_name}</a
		>
	{/if}
{/each}
</div>