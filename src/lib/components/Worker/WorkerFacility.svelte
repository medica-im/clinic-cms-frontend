<script lang="ts">
	import { Svg } from '@smui/common';
	import { Icon } from '@smui/icon-button';
	import { mdiMapMarkerOutline } from '@mdi/js';
	export let facility;
</script>

<a href="/sites#{facility.facility__name}_anchor" class="flex gap-2">
		<span class="badge-icon"><Icon component={Svg} width="24" height="24" viewBox="0 0 24 24">
			<path fill="currentColor" d={mdiMapMarkerOutline} />
		</Icon>
		</span>
		<span>
		{facility.facility__contact__formatted_name}
	</span>
</a>
