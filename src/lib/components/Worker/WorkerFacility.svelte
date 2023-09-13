<script lang="ts">
	import Fa from 'svelte-fa';
	import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
	export let facility;
</script>

<a href="/sites#{facility.facility__name}_anchor" class="flex gap-2">
		<span class="badge-icon"><Fa icon={faLocationDot}/>
		</span>
		<span>
		{facility.facility__contact__formatted_name}
	</span>
</a>
