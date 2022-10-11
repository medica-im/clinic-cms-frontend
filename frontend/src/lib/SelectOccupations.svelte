<script>
	import Select from 'svelte-select';
    import { afterUpdate, onMount, beforeUpdate } from 'svelte';
	import { occupations, selectOccupations } from '$lib/store/workforceStore';
    import LL from '$i18n/i18n-svelte';
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
    if (event.detail === null) {
        selectOccupations.set($occupations.map(x => x.name));
        return
    } else if (event.detail.length > 0) {
    selectOccupations.set(event.detail.map(x => x.name));
    }
  }
</script>

{#await occupations.load()}
<div class="spinner-border" role="status">
    <span class="visually-hidden">{$LL.LOADING()}</span>
</div>
{:then} 
<Select class="form-select" aria-label="Default select example" {optionIdentifier} {labelIdentifier} items={$occupations} isMulti={true} on:select={handleSelect} on:clear={handleClear} placeholder="{$LL.ADDRESSBOOK.OCCUPATIONS.PLACEHOLDER()}"></Select>
{/await}


