<script lang="ts">
	import Fa from 'svelte-fa';
	import { faArrowRight, faXmark, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

	export let link: boolean ;

	interface HeatwaveAlert {
		start_time: string | null;
		end_time: string | null;
		risk_code: string | null;
	}
	let visible: boolean = true;
	let alert: HeatwaveAlert | null;

	async function getHeatwaveAlert() {
		const url = `https://sante-gadagne.fr/api/v1/heatwave/warning/84/`;
		if (import.meta.env.VITE_DEV == 'true') {
			console.log(url);
		}
		const result = await fetch(
			url,
			{
				mode: 'cors',
			}
		);
		if (result.ok) {
			alert = (await result.json()) as HeatwaveAlert;
		} else {
			if (import.meta.env.VITE_DEV == 'true') {
				console.log(result);
			}
			alert = null;
		}
		return alert;
	}

	interface Risk {
		name: string;
		color: string;
	}
	interface RiskDict {
		[key: number]: Risk;
	}
	const risk: RiskDict = {
		1: {
			name: 'vert',
			color: 'green'
		},
		2: {
			name: 'jaune',
			color: '#f9ff00'
		},
		3: {
			name: 'orange',
			color: '#f7a401'
		},
		4: {
			name: 'rouge',
			color: 'red'
		}
	};

	const riskColor = (alert: HeatwaveAlert) => {
		const key = Number(alert.risk_code);
		return risk[key as keyof RiskDict].color;
	};
	const riskName = (alert: HeatwaveAlert) => {
		const key = Number(alert.risk_code);
		return risk[key as keyof RiskDict].name;
	};

	const isActive = (alert: HeatwaveAlert) => {
		if (!alert.start_time || !alert.end_time || !alert.risk_code) {
			return false;
		}
		const stopEventDate = new Date(alert.end_time);
		return new Date().getTime() < stopEventDate.getTime();
	};
	const formatDate = (date_iso: string) => {
		const date = new Date(date_iso);
		return new Intl.DateTimeFormat('fr-FR', {
			dateStyle: 'full',
			timeStyle: 'short',
			timeZone: 'Europe/Paris'
		}).format(date);
	};
</script>

{#await getHeatwaveAlert()}
	{#if import.meta.env.VITE_DEV == 'true'}
		<p>Loading alert...</p>
	{/if}
{:then alert}
	{#if alert && alert.start_time && alert.end_time && alert.risk_code && isActive(alert) && visible}
			<div class="flex flex-wrap p-4 m-6 border-4" style="border-color:{riskColor(alert)}">
				<!-- Message -->
				<div class="grid cols-1 gap-4 p-4">
					
					<h3 class="h3 flex align-items-center space-x-2">
					<span class="align-middle"><Fa icon={faTemperatureHigh} color={riskColor(alert)} /></span><span>
 Vigilance {riskName(alert)} canicule</span>
					</h3>
					<p>
						Vigilance météorologique canicule Vaucluse émise par Météo France le {formatDate(
							alert.start_time
						)} valable jusqu'au {formatDate(alert.end_time)}.
					</p>
				</div>
				<!-- Actions -->
				<div
					class="p-4 flex flex-wrap lg:flex-nowrap gap-4 align-center place-content-center"
				>
					{#if link}<a href="/prevention/canicule" class="btn variant-ghost">
							<span><Fa icon={faArrowRight} /></span>
							<span>Fiche prévention canicule</span>
						</a>
					{/if}
					<button on:click={() => (visible = false)} class="btn variant-ghost"><span
						><Fa icon={faXmark} /></span
					></button>
				</div>
			</div>
	{/if}
{:catch error}
	{#if import.meta.env.VITE_DEV == 'true'}
		<p>Error loading heatwave alert: {error.message}</p>
	{/if}
{/await}