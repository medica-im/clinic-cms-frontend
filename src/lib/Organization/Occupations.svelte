<script lang="ts">
	export let data: any;

	const getTypesParam = (uid: string) => {
		const quotedUid: string[] = [uid];
		const encodedParam = encodeURIComponent(JSON.stringify(quotedUid));
		return encodedParam;
	};
</script>

<div class="space-x-2">
	{#each [...data] as [key, value]}
		<a
			href={`/annuaire/${value.slug}?types=${getTypesParam(value.uid)}`}
			class="btn variant-ghost-primary btn-sm m-2"
			><span class="">
				{value.count}
				{key}
			</span></a
		>
	{/each}
</div>
