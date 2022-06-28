<script>
	import { afterUpdate, onMount } from 'svelte';
	import { workforceData, filteredWorkforceData, occupations } from '$lib/store/workforceStore';
  import Search from '$lib/Search.svelte';
  import Occupations from '$lib/Occupations.svelte';
  import WorkerList from '$lib/Workforce/WorkerList.svelte';
  import Select from 'svelte-select';
import Actions from '@smui/card/src/Actions.svelte';
	console.log(workforceData);

  const groupBy = (item) => item.occupations[0].label;
  const optionIdentifier = 'slug'
  const labelIdentifier = 'formatted_name';
</script>

<main>
  <Occupations></Occupations>
  <!--Select {optionIdentifier} {labelIdentifier} items={$workforceData} {groupBy}
  ></Select-->
  <Search></Search>
  {#each $occupations as o}
  {#if $filteredWorkforceData.map(function (currentElement) {
		return currentElement.occupations.flat()
	}
	).flat().map(x => x.name).includes(o.name)}
  <h3>{o.label}</h3>
    <ul>
    {#each $filteredWorkforceData as worker}
    {#each worker.occupations as occupation}
    {#if occupation.name == o.name}
    <li>
      <WorkerList  workerData={worker}/>
    </li>
    {/if}
    {/each}
    {/each}
    </ul>
    {/if}
  {/each}
</main>