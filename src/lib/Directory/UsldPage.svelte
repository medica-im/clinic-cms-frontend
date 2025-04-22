<script lang="ts">
	import EffectorContact from './EffectorContact.svelte';
	export let effector: any;
	let data = effector.careHome;
	let count = 0;
	const dictionary = {
		usld_permanent_bed: {
			S: `${count} lit permanent`,
			P: `${count} lits permanents`
		}
	};

	function label(k) {
		let count = data[k];
		const dictionary = {
			usld_permanent_bed: {
				S: `${count} lit permanent`,
				P: `${count} lits permanents`
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
		<li>
			<div class="card">
				<h4 class="h4">Hébergement</h4>
				<div class="card p-2">
					<h5 class="h5">USLD</h5>
					{#if Object.keys(data).includes('usld_permanent_bed')}
						{label('usld_permanent_bed')}
					{/if}
				</div>
			</div>
		</li>
	</ul>
</div>
