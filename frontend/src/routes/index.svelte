<script lang="ts">
	import { userData } from '$lib/store/userStore';
	import { facilitiesData } from '$lib/store/facilityStore';
	import { fly } from 'svelte/transition';
	import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle
    } from 'sveltestrap';
    import LL from '$i18n/i18n-svelte'
</script>

<svelte:head>
	<title>Santé Vedène</title>
</svelte:head>

<section in:fly={{ y: -100, duration: 500, delay: 500 }} out:fly={{ duration: 500 }}>
	<Card class="mb-3" style="width: 18rem;">
		<CardHeader>
		  <CardTitle>Maison de santé pluriprofessionnelle de Vedène</CardTitle>
		  <img src="svelte-welcome.webp" class="card-img-top" alt="welcome">
		</CardHeader>
		<CardBody>
		  <CardSubtitle>{$LL.WELCOME()} {#if $userData.username}
			<span style="text-transform: capitalize;">{$userData.username},</span>
		{/if}!</CardSubtitle>
		  <CardText>
			Site web en cours de développement.<br>
			<ul>
			{#each $facilitiesData as facility}
			<li>{facility.id}</li>
			<li>{facility.formatted_name}</li>
			{/each}
		</ul>
		  </CardText>
		  <Button>Bouton peu utile</Button>
		</CardBody>
		<CardFooter>Site développé par <a href="https://medecinelibre.com">medecinelibre.com</a></CardFooter>
	  </Card>
</section>
