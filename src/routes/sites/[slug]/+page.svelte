<script lang="ts">
    import FacilityCard from '$components/Facility/FacilityCard.svelte';
    export let data;
</script>

<FacilityCard facility={data.facility}/>
<!--{JSON.stringify(data.facility)}-->