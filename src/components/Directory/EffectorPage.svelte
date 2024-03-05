<script lang="ts">
	import EffectorContact from './EffectorContact.svelte';
	import { page } from '$app/stores';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	export let effector: any;
</script>


<svelte:head>
<title>
	{effector.name} - {capitalizeFirstLetter($page.data.facility.formatted_name, $language)}
</title>
</svelte:head>

<div class="lg:flex m-auto font-serif m-4 p-4 gap-8">
	<div class="space-y-2">
		<h1 class="h2">{effector.name}</h1>
		<ul class="py-4 space-y-4">
			<EffectorContact {effector} />
		</ul>
	</div>
</div>
