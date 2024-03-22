<script lang="ts">
	import { Svg } from '@smui/common';
	import { Icon } from '@smui/icon-button';
	import { mdiMapMarkerOutline } from '@mdi/js';
	import type { Facility } from '$lib/interfaces/facility.interface';
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import {
		faGlobe,
		faCircleNodes,
		faPhone,
		faCalendarCheck,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	export let data: Facility;
</script>

<a href="/sites/{data.slug}" class="unstyled underline underline-offset-4 flex gap-2">
	<!--span class="badge-icon"
		><Icon component={Svg} width="24" height="24" viewBox="0 0 24 24">
			<path fill="currentColor" d={mdiMapMarkerOutline} />
		</Icon>
	</span-->
	<span>
		<Fa icon={faLocationDot}/>
	</span>
	<span>
		{data.name}
	</span>
</a>
