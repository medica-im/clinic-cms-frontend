<script>
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import { faGlobe } from '@fortawesome/free-solid-svg-icons';
	import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

	export let appointments;
</script>
<div class="flex items-center p-1">
	<div class="w-9"><Fa icon={faCalendarCheck} /></div>
	<div>
		<h3>{$LL.ADDRESSBOOK.APPOINTMENT.LABEL()}</h3>
	</div>
</div>
<div class="flex items-center p-1">
	<div class="w-9" />
	<div>
		<ul>
			{#each appointments as appointment}
				<li>
					{#if appointment.type == 'url'}
						<a href={appointment.url} rel="external" class="btn variant-ghost-secondary">
							<span><Fa icon={faGlobe} /></span><span>{$LL.WEBSITE()}</span></a
						>
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