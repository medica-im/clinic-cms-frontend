<script>
	import Select from 'svelte-select';
    import { afterUpdate, onMount, beforeUpdate } from 'svelte';
	import { occupations, selectOccupations } from '$lib/store/workforceStore';
    import LL from '$i18n/i18n-svelte';
    import CircularProgress from '@smui/circular-progress';
	let optionIdentifier = 'name';
	let labelIdentifier = 'label';

    onMount(() => {
        selectOccupations.set($occupations.map(x => x.name));
	});

    function handleClear(event) {
    if (event.detail === null) {
    selectOccupations.set($occupations.map(x => x.name));
    }
  }


    function handleSelect(event) {
    console.log('selected item', event.detail);
    if (event.detail === null) {
        selectOccupations.set($occupations.map(x => x.name));
        return
    } else if (event.detail.length > 0) {
    selectOccupations.set(event.detail.map(x => x.name));
    }
    console.log('selectOccupations:', $selectOccupations);
  }
</script>

{#await occupations.load()}
<div style="display: flex; justify-content: center">
	<CircularProgress style="height: 32px; width: 32px;" indeterminate />
</div>
{:then} 
<Select {optionIdentifier} {labelIdentifier} items={$occupations} isMulti={true} on:select={handleSelect} on:clear={handleClear} placeholder="{$LL.ADDRESSBOOK.OCCUPATIONS.PLACEHOLDER()}"></Select>
{/await}


