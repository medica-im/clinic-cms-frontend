<script lang="ts">
import TimeLine from '$lib/components/Timeline/TimeLine.svelte';
export let data;
</script>

<TimeLine data={data.timeline} />