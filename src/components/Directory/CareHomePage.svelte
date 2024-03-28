<script lang="ts">
	import EffectorContact from './EffectorContact.svelte';
	export let effector: any;
	let data = effector.careHome;
	let count = 0;
	const dictionary = {
		regular_permanent_bed: {
			S: `${count} lit permanent`,
			P: `${count} lits permanents`
		},
		regular_temporary_bed: {
			S: `${count} lit temporaire`,
			P: `${count} lits temporaires`
		},
		alzheimer_permanent_bed: {
			S: `${count} lit Alzheimer permanent`,
			P: `${count} lits Alzheimer permanents`
		},
		alzheimer_temporary_bed: {
			S: `${count} lit Alzheimer temporaire`,
			P: `${count} lits Alzheimer temporaires`
		},
		uhr_permanent_bed: {
			S: `${count} lit UHR permanent`,
			P: `${count} lits UHR permanents`
		},
		uvpha_permanent_bed: {
			S: `${count} lit UVPHA permanent`,
			P: `${count} lits UVPHA permanents`
		},
		day_care: {
			S: `${count} place d'accueil de jour`,
			P: `${count} places d'accueil de jour`
		}
	};

	function label(k) {
		let count = data[k];
		const dictionary = {
			regular_permanent_bed: {
				S: `${count} lit permanent`,
				P: `${count} lits permanents`
			},
			regular_temporary_bed: {
				S: `${count} lit temporaire`,
				P: `${count} lits temporaires`
			},
			alzheimer_permanent_bed: {
				S: `${count} lit Alzheimer permanent`,
				P: `${count} lits Alzheimer permanents`
			},
			alzheimer_temporary_bed: {
				S: `${count} lit Alzheimer temporaire`,
				P: `${count} lits Alzheimer temporaires`
			},
			uhr_permanent_bed: {
				S: `${count} lit UHR permanent`,
				P: `${count} lits UHR permanents`
			},
			uvpha_permanent_bed: {
				S: `${count} lit UVPHA permanent`,
				P: `${count} lits UVPHA permanent`
			},
			day_care: {
				S: `${count} place d'accueil de jour`,
				P: `${count} places d'accueil de jour`
			}
		};
		if (count > 1) {
			return dictionary[k]['P'];
		} else {
			return dictionary[k]['S'];
		}
	}
</script>

<div class="card p-4 m-4">
	<h3 class="h3">{effector.name}</h3>
	<ul class="list">
		<EffectorContact {effector} />
		<!--
		{#each Object.keys(effector.careHome) as k}
			{#if Object.keys(dictionary).includes(k)}
				{@const count = effector.careHome[k]}
				<li>
					{label(k, count)}
				</li>
			{/if}
		{/each}
		-->
		<li>
			<ul class="list">
				<li>
					<div class="card">
						<h4 class="h4">Hébergement</h4>
						<ul class="list">
							{#if Object.keys(data).includes('regular_permanent_bed') || Object.keys(data).includes('regular_temporary_bed')}
								<li>
									<div class="card p-2">
										<h5 class="h5">Standard</h5>
										<ul class="list">
											{#if Object.keys(data).includes("regular_permanent_bed")}
											<li>{label("regular_permanent_bed")}</li>
											{/if}
											{#if Object.keys(data).includes("regular_temporary_bed")}
											<li>{label("regular_temporary_bed")}</li>
											{/if}
										</ul>
									</div>
									</li>
									<li>
									<div class="card p-2">
										<h5 class="h5">Alzheimer</h5>
										<ul class="list">
											{#if Object.keys(data).includes("alzheimer_permanent_bed")}
											<li>{label("alzheimer_permanent_bed")}</li>
											{/if}
											{#if Object.keys(data).includes("alzheimer_temporary_bed")}
											<li>{label("alzheimer_temporary_bed")}</li>
											{/if}
										</ul>
									</div>
								</li>
								<li>
									<div class="card p-2">
										<h5 class="h5">UHR</h5>
										<ul class="list">
											{#if Object.keys(data).includes("uhr_permanent_bed")}
											<li>{label("uhr_permanent_bed")}</li>
											{/if}
										</ul>
									</div>
								</li>
								<li>
									<div class="card p-2">
										<h5 class="h5">UVPHA</h5>
										<ul class="list">
											{#if Object.keys(data).includes("uvpha_permanent_bed")}
											<li>{label("uvpha_permanent_bed")}</li>
											{/if}
										</ul>
									</div>
								</li>
							{/if}
						</ul>
					</div>
				</li>
				<li>
					<div class="card">
						<h4 class="h4">Accueil de jour</h4>
						{#if Object.keys(data).includes("day_care")}
											{label("day_care")}
											{/if}
					</div>
				</li>
			</ul>
		</li>
	</ul>
</div>
