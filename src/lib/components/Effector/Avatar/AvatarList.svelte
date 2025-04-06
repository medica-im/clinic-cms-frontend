<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import * as m from "$msgs";	import { workerTitleFormattedName } from '$lib/helpers/stringHelpers';

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
        alt="{m.ADDRESSBOOK_A11Y_PROFILE_PIC_OF()}  {workerTitleFormattedName(data)}"
        class="w-44 h-44 shrink-0 rounded-none rounded-tl-lg lg:rounded-l-lg"
    />