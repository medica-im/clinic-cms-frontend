<script>
	import { afterUpdate, onMount } from 'svelte';
	import { workforceData, fetchWorkforce } from '$lib/store/workforceStore';
  import WorkerList from '$lib/Workforce/WorkerList.svelte';
	console.log(workforceData);
    onMount(async () => {
		if ($workforceData.length < 1) {
			await fetchWorkforce();
            console.log(workforceData);
            console.log(typeof(workforceData));
		}
	});
</script>

<main>
    <ul>
    {#each $workforceData as worker}
    <li>
      <WorkerList workerData={worker}/>
    </li>
    {/each}
    </ul>
</main>