<script lang="ts">
	import { phoneTypes } from './phone.ts';
	//import { getEditMode } from '$lib/components/Directory/context.ts';
    //import UpdatePhone from '$lib/Web/Phone/UpdatePhone.svelte';
	//import DeletePhone from '$lib/Web/Phone/DeletePhone.svelte';
	import Fa from 'svelte-fa';
	import { faMobileScreen, faPhone, faFax, faHeadset } from '@fortawesome/free-solid-svg-icons';
	import type { Phone } from '$lib/interfaces/phone.interface.ts';
	let { data, editMode }:{data: Phone; editMode?: boolean} = $props();

	const iconDict: object = {
		M: faMobileScreen,
		MW: faMobileScreen,
		W: faPhone,
		F: faFax,
		AS: faHeadset
	};

	function getIcon(type: string) {
		return iconDict[type as keyof object];
	}
</script>

<div class="flex content-start space-x-4 items-center">
	<div class="flex-initial">
		<span class="w-4" aria-label={phoneTypes[data.type]}><Fa icon={getIcon(data.type)} size="sm" /></span>
	</div>
	<a class="unstyled underline underline-offset-4" aria-describedby="phonetype" href="tel:{data.phone}">
		<div class="flex-initial">{data.phone}</div>
	</a>
	<!--{#if editMode}
    <UpdatePhone {data}/> <DeletePhone {data} />
	{/if}-->
</div>