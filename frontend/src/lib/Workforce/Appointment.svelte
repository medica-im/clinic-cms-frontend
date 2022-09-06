<script>
	import LL from '$i18n/i18n-svelte';
	import { NavLink } from 'sveltestrap';
	export let appointments;
</script>

{$LL.ADDRESSBOOK.APPOINTMENT.LABEL()}
<ul class="list-group list-group">
	{#each appointments as appointment}
		<li class="list-group-item d-flex justify-content-between align-items-start">
			{#if appointment.type == 'url'}
				<a href={appointment.url}>Site web</a>
			{:else if appointment.type == 'phone'}
				<a href="tel:{appointment.phone}">{appointment.phone}</a>
			{:else if appointment.type == 'app'}
				{appointment.app.name}
				<ul class="list-group list-group">
					{#each appointment.app.links as link}
						<li class="list-group-item d-flex justify-content-between align-items-start">
							<a href={link.url}><img src={link.store.image} alt="{link.store.name} logo" /></a>
						</li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ul>
