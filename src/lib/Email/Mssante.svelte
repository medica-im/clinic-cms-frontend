<script lang="ts">
	import MssanteLogo from './MssanteLogo.svelte';
	//import Update from "$lib/Web/Email/Update.svelte";
	//import Delete from "$lib/Web/Email/Delete.svelte";
	import type { Email } from '$lib/interfaces/email.interface';

	let { data, editMode } : { data: Email; editMode: boolean } = $props();


	const mss = "MSSanté";
</script>

<div class="flex content-start space-x-4 items-center">
	<div class="flex-initial break-words overflow-hidden">
		<div class="btn btn-sm !bg-transparent p-0 align-middle">
			<span class="w-4"><MssanteLogo /></span>
			<span class="hidden 2xl:inline-block">{mss}</span>
		</div>
	</div>
	<a class="unstyled underline underline-offset-4" href="mailto:{data.email}">
		<div class="w-56 md:w-full flex-initial break-words overflow-hidden">{data.email}</div>
	</a>
	<!--{#if editMode}
	<Update {data} /> <Delete {data} />
	{/if}-->
</div>
