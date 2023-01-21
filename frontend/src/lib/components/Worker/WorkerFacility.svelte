<script lang="ts">
    import { Svg } from '@smui/common';
	import { Icon } from '@smui/icon-button';
    import { mdiMapMarkerOutline } from '@mdi/js';
	export let facility;
</script>

<a href="/contact#{facility.facility__name}_anchor" class="card-link">
	<Icon component={Svg} width="24" height="24" viewBox="0 0 24 24">
		<path fill="currentColor" d={mdiMapMarkerOutline} />
	</Icon>
	{facility.facility__contact__formatted_name}</a
>
