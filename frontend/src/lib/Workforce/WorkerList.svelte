<script>
	import { FormFeedback } from 'sveltestrap';
	import { variables } from '$lib/utils/constants';

	export let workerData;
	function getUrl(url) {
		if (!url) {
			return `${variables.BASE_URI}/media/profile_images/default_profile_picture_170x170.png`;
		}
		return variables.BASE_URI + url;
	}
</script>

<div class="col">
<div class="card mb-3 h-100" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="{getUrl(workerData.profile_picture_url.fb)}" class="img-fluid rounded-start" alt="profile">
      </div>
      <div class="col-md-8">
        <div class="card-body">
            <a class="card-title" href="/{workerData.slug}">{workerData.formatted_name}</a>
            <ul class="list-group list-group-flush">
                {#each workerData.occupations as occupation}
                    <li class="list-group-item">{occupation.label}</li>
                    {#if occupation.specialty}
                        <li class="list-group-item">Spécialité: {occupation.specialty.label}</li>
                    {/if}
                {/each}
            </ul>
        </div>
      </div>
    </div>
  </div>
</div>
