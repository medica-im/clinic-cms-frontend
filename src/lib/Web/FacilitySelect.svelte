<script lang="ts">
	import { reactiveQueryArgs } from '$lib/utils/utils.svelte';
	import Select from 'svelte-select';
	import { useQueryClient, createQuery } from '@tanstack/svelte-query';
  import type { CreateQueryResult } from '@tanstack/svelte-query';
	import type { Commune, DepartmentOfFrance, Facility } from '$lib/interfaces/v2/facility.ts';
	import { getCommunesByDpt, getDepartments, getFacilities } from './data';

	let { value = $bindable(), commune = $bindable(), facilityCount = $bindable() }: { value: {label: string, value: string} | undefined, commune: {label: string, value: string} | undefined; facilityCount: number } = $props();
	let department: any = $state();
	let departmentCode: string | null = $derived(department?.value);
	let communes: CreateQueryResult<Commune[], Error> | undefined = $state();
    //let commune: any = $state();
    
	const facilities = createQuery<Facility[], Error>({
		queryKey: ['facilities'],
		queryFn: () => getFacilities()
	});

    const facilityStore = createQuery(
		reactiveQueryArgs(() => ({
			queryKey: ['facilities'],
		  queryFn: () => getFacilities()
		}))
	);

	let { error, isLoading, isRefetching, data } = $derived($facilityStore);

	$effect(()=>{
		if (data) {
            facilityCount = data.filter((e) => (department ? e.commune.department.code == department.value : true)).filter((e) => (commune ? e.commune.uid == commune.value : true)).length
		}
	});

	const departments = createQuery<DepartmentOfFrance[], Error>({
		queryKey: ['departments'],
		queryFn: () => getDepartments()
	});

	$effect(() => {
		if (departmentCode) {
			communes = createQuery<Commune[]>({
				queryKey: ['post', departmentCode],
				queryFn: () => getCommunesByDpt(departmentCode)
			});
		}
	});

	const getName = (facility: Facility) => {
		if (facility.name) {
			return facility.name;
		} else if (facility.effectors) {
			const count = facility.effectors.length;
			const effectors = `${facility.effectors.join(', ')}`;
			return `${count} effecteur${count > 1 ? 's' : ''}: ${effectors}`;
		} else {
			return facility.uid;
		}
	};
	const getLabel = (facility: Facility) => {
		return `[${facility.commune.department.name}] - [${facility.commune.name_fr}] - ${getName(facility)}`;
	};

	function compareFnFacility(a: Facility, b: Facility) {
		const dpt = a.commune.department.name.localeCompare(b.commune.department.name);
		if (dpt == 0) {
			return a.commune.name_fr.localeCompare(b.commune.name_fr);
		} else {
			return dpt;
		}
	}
  
  function compareFnCommune(a: Commune, b: Commune) {
		return a.name_fr.localeCompare(b.name_fr);
	}

	const getDepartmentItems = (departments: DepartmentOfFrance[]) => {
    departments.sort((a:DepartmentOfFrance,b:DepartmentOfFrance)=> a.name.localeCompare(b.name));
		return departments.map((e) => {
			return { value: e.code, label: e.name };
		});
	};

	const getFacilityItems = (facilities: Facility[], department: any, commune: any) => {
		facilities.sort(compareFnFacility);
		return facilities
			.filter((e) => (department ? e.commune.department.code == department.value : true)).filter((e) => (commune ? e.commune.uid == commune.value : true))
			.map((e) => {
				return { value: e.uid, label: getLabel(e) };
			});
	};

  const getFacilityCount = (facilities: Facility[]) => {
    return facilities ? getFacilityItems(facilities, department, commune).length : 0;
  }

  const facilityLabel = (facilities: Facility[]) => {
    return `Établissement${getFacilityCount(facilities)>1 ? 's': ''}: ${getFacilityCount(facilities)}`
  }

const getCommuneItems = (communes: Commune[]|undefined) => {
  if (!communes) {
    return
  }
		communes.sort(compareFnCommune);
		return communes.map((e) => {
				return { value: e.uid, label: e.name_fr };
			});
	};
</script>

<div class="p-4">
	<div class="grid grid-cols-1 gap-4 variant-ghost p-4">
		<p>Département</p>
		{#if $departments.status === 'pending'}
			<span>Loading...</span>
		{:else if $departments.status === 'error'}
			<span>Error: {$departments.error.message}</span>
		{:else}
			<Select items={getDepartmentItems($departments.data)} bind:value={department} />
		{/if}
	</div>
  <div class="grid grid-cols-1 gap-4 variant-ghost p-4">
		<p>Commune</p>
		{#if !departmentCode || $communes?.status === 'pending'}
			<span>Loading...</span>
		{:else if $communes?.status === 'error'}
			<span>Error: {$communes?.error.message}</span>
		{:else}
			<Select items={getCommuneItems($communes?.data)} bind:value={commune} />
		{/if}
	</div>
  <div class="grid grid-cols-1 gap-4 variant-ghost p-4">
	{#if $facilities.status === 'pending'}
		<span>Loading...</span>
	{:else if $facilities.status === 'error'}
		<span>Error: {$facilities.error.message}</span>
	{:else}
    <p>{facilityLabel($facilities.data)}</p>
		<Select items={getFacilityItems($facilities.data, department, commune)} bind:value />
	{/if}
  </div>
</div>
