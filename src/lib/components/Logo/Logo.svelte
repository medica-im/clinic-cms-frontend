<script lang="ts">
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import logo_light from '$lib/assets/images/logo_light.png';
	import logo_dark from '$lib/assets/images/logo_dark.png';    
    export let data: number = 96;
</script>

<img src={$modeCurrent ? logo_light : logo_dark} class="w-{data}" alt="logo de la maison de santé Saint-Esprit Santé représentant la facade blanche stylisée du bâtiment du numéro un de la place Pereire à Bayonne" />
