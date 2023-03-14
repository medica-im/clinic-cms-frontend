<script>
	export let organizationData;
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';

</script>
		<h4>{capitalizeFirstLetter(organizationData.formatted_name, $language)}</h4>
		<ul class="list">
		{#each organizationData.facility as facility}

			{#if facility.contact}
			<li>
			<span class="flex-auto"><a href="#{facility.name}_anchor">{facility.contact.formatted_name}</a></span>
				</li>
			{/if}

		{/each}
	</ul>
