<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import LL from '$i18n/i18n-svelte';
	import { workerTitleFormattedName } from '$lib/helpers/stringHelpers';

	export let data;

	/*if (import.meta.env.VITE_DEV == 'true') {
		console.log(JSON.stringify(data));
	}*/

	function getUrl(data) {
		if (data?.avatar && data?.avatar?.lt) {
			return variables.BASE_URI + data.avatar.lt;
		} else if (data?.avatar && data?.avatar?.fb) {
			return variables.BASE_URI + data.avatar.fb;
		}
         else {
			return `${variables.BASE_URI}/media/profile_images/default_profile_picture.png`;
		}
	}
</script>

    <img
        src={getUrl(data)}
        alt="{$LL.ADDRESSBOOK.A11Y.PROFILE_PIC_OF()}  {workerTitleFormattedName(data)}"
        class="w-44 h-44 rounded-lg"
    />