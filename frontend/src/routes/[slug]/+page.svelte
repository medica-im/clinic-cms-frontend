<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import WorkerPage from '$lib/Workforce/WorkerPage.svelte';
	import { workerData, workerSlug } from '$lib/store/workforceStore';

	$: workerSlug.set(data.slug);
</script>

<svelte:head>
	{#await workerData.load()}
		<title />
	{:then}
		<title>{$workerData}</title>
	{/await}
</svelte:head>

<main>
		<WorkerPage userData={data.userData} />
</main>
