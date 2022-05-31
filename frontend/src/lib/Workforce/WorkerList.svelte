<script>
    export let workerData;
</script>

<a href="/{workerData.slug}">{workerData.formatted_name}</a>
<ul>
{#each workerData.occupations as occupation}
    <li>{occupation.label}</li>
    {#if occupation.specialty}
    <li>Spécialité: {occupation.specialty.label}</li>
    {/if}
{/each}
</ul>