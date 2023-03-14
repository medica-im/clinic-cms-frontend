<script>
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa'
    import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
    import { faGlobe, faBlog } from '@fortawesome/free-solid-svg-icons';

	export let appointments;
</script>

<div class="card p-2 space-y-2">
<header><h4 class="text-secondary-500">{$LL.ADDRESSBOOK.APPOINTMENT.LABEL()}</h4></header>
<div>
<ul class="list">
	{#each appointments as appointment}
		<li>
			{#if appointment.type == 'url'}
				<a href={appointment.url} rel="external" class="btn variant-filled-secondary">
					<span><Fa icon={faGlobe} /></span><span>{$LL.WEBSITE()}</span></a>
			{:else if appointment.type == 'phone'}
				<a href="tel:{appointment.phone}">{appointment.phone}</a>
			{:else if appointment.type == 'app'}
				{appointment.app.name}
				<ul class="list">
					{#each appointment.app.links as link}
						<li>
							<a href={link.url}><img src={link.store.image} alt="{link.store.name} logo" /></a>
						</li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ul>
</div>
</div>