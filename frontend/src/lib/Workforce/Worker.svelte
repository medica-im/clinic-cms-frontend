<script>
	import { variables } from '$lib/utils/constants';
	import WorkerFacility from '$lib/components/Worker/WorkerFacility.svelte';
	export let workerData;
	export let currentOccupationName;

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
				<a href="/{workerData.slug}">
					<img
						src={getUrl(workerData.profile_picture_url.fb)}
						class="img-fluid rounded-start"
						alt="profile"
					/>
				</a>
			</div>
			<div class="col-md-8">
				<div class="card-body">
					<a href="/{workerData.slug}">
						<h5 class="card-title">
							{workerData.formatted_name}
						</h5>
					</a>
					<ul class="list-group list-group-flush">
						{#each workerData.occupations as occupation}
							{#if occupation.name == currentOccupationName}
								<li class="list-group-item">
									<div class="card">
										<div class="card-body">
											{#if occupation.specialty}
												<h5 class="card-title">
													{occupation.specialty.label}
												</h5>
												{#each occupation.specialty.facilities as facility}
													<WorkerFacility {facility} />
												{/each}
											{:else}
												<h5 class="card-title">
													{occupation.label}
												</h5>
												{#each occupation.facilities as facility}
													<WorkerFacility {facility} />
												{/each}
											{/if}
										</div>
									</div>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
