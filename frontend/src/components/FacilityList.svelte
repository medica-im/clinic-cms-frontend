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

{#each organizationData.facility as f}
	{#if f.contact}
		<a href="#{f.name}_anchor"
			><span
				class="chip m-2 p-2 {facility === f.name ? 'variant-filled' : 'variant-filled'}"
				on:click={() => {
					section(f.name);
				}}
				on:keypress
			>
				<!--{#if facility === f.name}<span><Fa icon={faMapPin} /></span>{/if}-->
				<span>{f.contact.formatted_name}</span>
			</span></a
		>
	{/if}
{/each}
