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
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                zIndex: -1
            }).setZIndex(-1).addTo(map);
            leaflet.marker([geoData.latitude, geoData.longitude]).addTo(map)
        }
    });
</script>

<main class="z-auto">
    <div id="{geoData.name}" class="map z-auto"></div>
</main>

<style>
    @import 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
    main .map {
        height: 400px;
        z-index: -10;
    }
    .leaflet-bottom {z-index: 0 !important;}
    .leaflet-top {z-index: 0 !important;}
    .leaflet-pane { z-index: 0 !important; }
</style>