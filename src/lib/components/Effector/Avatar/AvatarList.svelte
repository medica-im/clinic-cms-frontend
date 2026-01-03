<script lang="ts">
	import LL from '$i18n/i18n-svelte.ts';
	import { variables } from '$lib/utils/constants';
	//import * as m from "$msgs";
	//import type { EntryFull } from '$lib/store/directoryStoreInterface';
	//import type { Entry } from '$lib/store/directoryStoreInterface';
	type Entry = any;
	type EntryFull = any;

	export let data: EntryFull|Entry;

	/*if (import.meta.env.VITE_DEV == 'true') {
		console.log(JSON.stringify(data));
	}*/

	function getUrl(data: EntryFull|Entry) {
			return `${variables.BASE_URI}${data.profile_picture_url?.fb || data.profile_picture_url?.lt || data.profile_picture_url?.raw || "/media/profile_images/default_profile_picture.png"}`;
	}
</script>

    <img
        src={getUrl(data)}
        alt="{$LL.ADDRESSBOOK_A11Y_PROFILE_PIC_OF()}  {data.name}"
        class="w-44 h-44 shrink-0 rounded-none lg:rounded-l-lg"
    />