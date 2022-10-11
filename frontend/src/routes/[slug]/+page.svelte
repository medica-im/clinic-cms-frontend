<script context="module">
	import { get } from 'svelte/store';
	import { variables } from '$lib/utils/constants';

	export async function load({ params, fetch }) {
		const { slug } = params;
		const { url } = fetch;
		console.log(`slug:${slug}`);
		console.log(`url:${url}`);
		let directory_slug;
		if (slug === undefined) {
			directory_slug = url;
		} else {
			directory_slug = slug;
		}
		return { props: { directory_slug: directory_slug } };
	}
</script>

<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { onMount } from 'svelte';
	import WorkerPageCached from '$lib/Workforce/WorkerPageCached.svelte';
	import { workerData, workerSlug } from '$lib/store/workforceStore';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	const queryClient = new QueryClient();
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
	<QueryClientProvider client={queryClient}>
		<WorkerPageCached slug={data.slug} />
	</QueryClientProvider>
</main>
