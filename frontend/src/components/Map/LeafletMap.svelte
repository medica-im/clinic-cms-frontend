<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import type { Map } from 'leaflet';
    import "leaflet/dist/images/marker-shadow.png";

    export let geoData;

    let map: Map;

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');
            map = leaflet.map(geoData.name).setView([geoData.latitude, geoData.longitude], geoData.zoom);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            leaflet.marker([geoData.latitude, geoData.longitude]).addTo(map)
        }
    });
</script>

<main>
    <div id="{geoData.name}" class="map"></div>
</main>

<style>
    @import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    main .map {
        height: 400px;
    }
</style>