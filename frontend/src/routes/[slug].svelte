<script context="module">
	//import { page } from '$app/stores';
	//let slug = $page.params.slug;
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
    import LL from '$i18n/i18n-svelte';
	import { afterUpdate, onMount } from 'svelte';
	import WorkerPageCached from '$lib/Workforce/WorkerPageCached.svelte';
	import { dataset_dev } from 'svelte/internal';
	import CircularProgress from '@smui/circular-progress';
    import IconButton  from '@smui/icon-button';
	export let directory_slug;
	import { tick } from 'svelte';
	import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
    import { workforceData, workforceDataCached, getWorkforceDataCached, workerTitle, workerSlug } from '$lib/store/workforceStore';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'

    const queryClient = new QueryClient()
	let wfd = [];

    $workerSlug = directory_slug;

onMount(async () => { 
 wfd = await getWorkforceDataCached();
 })


	async function promise(worker) {
		let id = worker.id;
		console.log(`id:${id}`);
		let apiUrl = `${variables.BASE_API_URI}/workforce/${id}/`;
		const [response, error] = await handleRequestsWithPermissions(fetch, apiUrl);
		if (response) {
			console.log(`workerData: ${JSON.stringify(response)}`);
			return response;
		} else {
			throw new Error(error);
		}
	}


</script>

<svelte:head>
   <title>{$workerTitle}</title>
</svelte:head>

<main>
	<QueryClientProvider client={queryClient}>

		<WorkerPageCached slug={directory_slug} />
		 
		  </QueryClientProvider>
</main>
