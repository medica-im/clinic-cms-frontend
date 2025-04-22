<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faMobileScreen,
		faPhone,
		faFax,
		faMapLocationDot,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
	import Distance from './Distance.svelte';
	export let data;
</script>

<div>
	<ul class="list">
		{#if data.building}
			<li>{data.building}</li>
		{/if}
		{#if data.street}
		<li>{data.street}</li>
		{/if}
		{#if data.geographical_complement}
			<li>({data.geographical_complement})</li>
		{/if}
		<li>
			<div class="flex">
				{#if data.zip}
				<div>{data.zip || 'MISSING ADDRESS FIELD: ZIP'}</div>
				<div>&nbsp;</div>
				{/if}
				<div><b>{data.city || 'MISSING ADDRESS FIELD: CITY'}</b></div>
			</div>
		</li>
		{#if data.latitude && data.longitude}
			<li>
				<div>
					<Distance uid={data.facility_uid} />
				</div>
			</li>
			<li>
				<div class="flex space-x-4">
					<div>
						<a
							href="https://www.openstreetmap.org/#map={data.zoom ||
								19}/{data.latitude}/{data.longitude}"
							class="unstyled"
						>
							<button type="button" class="btn variant-ghost-secondary btn-sm">
								<span><Fa icon={faMapLocationDot} size="xs" /></span><span>OSM</span></button
							>
						</a>
					</div>
				</div>
				<div class="flex space-x-4">
					<div>
						<a
							href="http://www.google.com/maps/place/{data.latitude},{data.longitude}"
							class="unstyled"
						>
							<button type="button" class="btn variant-ghost-secondary btn-sm">
								<span><Fa icon={faLocationDot} size="xs" /></span><span>Google Maps</span>
							</button>
						</a>
					</div>
				</div>
			</li>
		{/if}
	</ul>
</div>
