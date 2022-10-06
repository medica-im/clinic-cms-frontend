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
	export let directory_slug;
    import { getWorkforceDataCached, workerTitle, workerSlug } from '$lib/store/workforceStore';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'

    const queryClient = new QueryClient()
	let wfd = [];
	$: workerSlug.set(data.slug);
    //$workerSlug = directory_slug;

onMount(async () => { 
 wfd = await getWorkforceDataCached();
 })

</script>

<svelte:head>
   <title>{$workerTitle}</title>
</svelte:head>

<main>
	<QueryClientProvider client={queryClient}>

		<WorkerPageCached slug={data.slug} />
		 
		  </QueryClientProvider>
</main>
