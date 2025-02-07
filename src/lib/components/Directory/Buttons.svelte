<script lang="ts">
	import Entries from './Entries.svelte';
	export let data;
	export let displayEntries;

	const getUrl = (value: any[]) => {
		const types = `["${value[0].types[0].uid}"]`;
		const encodedTypes = encodeURIComponent(JSON.stringify(types));
		const encodedFacility = `${value[0].facility.uid}`;
		return '/annuaire' + `?types=${encodedTypes}` + `&facility=${encodedFacility}`;
	};
	const entryClass = () => {
		if (displayEntries) {
			return 'flex flex-col';
		} else {
			return '';
		}
	};
</script>

<div class="py-6 space-y-2 gap-2 {entryClass()}">
	{#each [...data] as [key, value]}
	<div>
		<a href={getUrl(value)} class="btn variant-ghost-primary btn-sm"
			><span class="">
				{value.length}
				{key}
			</span></a
		>
	</div>
		{#if displayEntries}
			<Entries data={value} />
		{/if}
	{/each}
</div>
