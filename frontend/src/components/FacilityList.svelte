<script>
	export let organizationData;
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers'

</script>

<div class="card">
	<!--img class="card-img-top" src="..." alt="Card image cap" /-->
	<div class="card-body">
		<h5 class="card-title">{capitalizeFirstLetter(organizationData.formatted_name, $language)}</h5>
		<!--p class="card-text">
			Some quick example text to build on the card title and make up the bulk of the card's content.
		</p-->
	</div>
	<ul class="list-group list-group-flush">
		{#each organizationData.facility as facility}
			{#if facility.contact}
				<li class="list-group-item">
					<a href="#{facility.name}_anchor">{facility.contact.formatted_name}</a>
				</li>
			{/if}
		{/each}
	</ul>
</div>
