<script>
	import Select from 'svelte-select';
    import { afterUpdate, onMount, beforeUpdate } from 'svelte';
	import { occupations, selectOccupations } from '$lib/store/workforceStore.ts';
    import LL from '$i18n/i18n-svelte';
    console.log('selectOccupations:', $selectOccupations);
    console.log('occupations:', $occupations);
	let optionIdentifier = 'name';
	let labelIdentifier = 'label';

    onMount(() => {
        selectOccupations.set($occupations.map(x => x.name));
	});

    function handleClear(event) {
    console.log('selected item', event.detail);
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
<!--
<ul>
	{#each $occupations as occupation}
		<li>type: {typeof occupation} object: {occupation} name: {occupation.name}</li>
	{/each}
</ul>
-->
<Select {optionIdentifier} {labelIdentifier} items={$occupations} isMulti={true} on:select={handleSelect} on:clear={handleClear} placeholder="{$LL.ADDRESSBOOK.OCCUPATIONS.PLACEHOLDER()}"></Select>
