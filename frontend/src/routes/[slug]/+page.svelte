<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import LL from '$i18n/i18n-svelte';
	import { facilityStore } from '$lib/store/facilityStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';

	/** @type {import('./$types').PageData} */
	export let data;
	import { Content, Grid, Row, Column, ToastNotification } from 'carbon-components-svelte';
	import WorkerPage from '$lib/Workforce/WorkerPage.svelte';
	import { workerData, workerSlug } from '$lib/store/workforceStore';

	$: workerSlug.set(data.slug);
</script>

<svelte:head>
	<title>
		{$workerData} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<a href="/annuaire" class="btn bg-primary-500" data-sveltekit-preload-data="hover">
	<span><Fa icon={faCircleArrowLeft} /></span>
	<span><Fa icon={faAddressBook} /></span><span>{$LL.ADDRESSBOOK.GOTOADDRESSBOOK()}</span>
</a>
<WorkerPage userData={data.userData} />
