<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faMobileScreen,
		faPhone,
		faFax,
		faMapLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import Distance from './Distance.svelte';
	export let data;
</script>

<ul class="list">
	{#if data.building}
		<li>{data.building}</li>
	{/if}
	<li>{data.street || 'MISSING ADDRESS FIELD: STREET'}</li>
	{#if data.geographical_complement}
		<li>({data.geographical_complement})</li>
	{/if}
	<li>
		<div class="flex">
			<div>{data.zip || 'MISSING ADDRESS FIELD: ZIP'}</div>
            <div>&nbsp;</div>
			<div><b>{data.city || 'MISSING ADDRESS FIELD: CITY'}</b></div>
		</div>
	</li>
	{#if data.latitude && data.longitude}
		<li>
			<div class="flex space-x-4">
				<div>
					<a
						href="https://www.openstreetmap.org/#map={data.zoom ||
							19}/{data.latitude}/{data.longitude}"><Fa icon={faMapLocationDot} size="lg" /></a
					>
				</div>
				<div>
					<Distance uid={data.facility_uid} />
				</div>
			</div>
		</li>
	{/if}
</ul>
