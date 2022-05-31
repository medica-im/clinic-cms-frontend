<script context="module">
    //import { page } from '$app/stores';
    //let slug = $page.params.slug;
    export async function load({ params, fetch}) {
		const { slug } = params;
        const { url } = fetch;
        console.log(`slug:${slug}`);
        console.log(`url:${slug}`);
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
    import { afterUpdate, onMount } from 'svelte';
	import { workforceData, fetchWorkforce } from '$lib/store/workforceStore';
    import WorkerPage from '$lib/Workforce/WorkerPage.svelte';
    import { dataset_dev } from 'svelte/internal';
    import CircularProgress from '@smui/circular-progress';
    export let directory_slug;

    let workerData;
    async function lazyLoading() {
		if ($workforceData.length < 1) {
			await fetchWorkforce();
            console.log(workforceData);
            console.log(typeof(workforceData));
		}
        const workerData = $workforceData.find(element => element.slug == directory_slug);
        if ( workerData === undefined ) {
            throw new Error(`La page ${directory_slug} n'existe pas.`);
        }
        console.log(`workerData:${workerData.formatted_name}`);
        return workerData;
	};
</script>

{#await lazyLoading()}
<div style="display: flex; justify-content: center">
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
</div>
{:then data}
<WorkerPage workerData={data}/>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}