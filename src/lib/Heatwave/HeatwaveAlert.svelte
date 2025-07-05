<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import Fa from 'svelte-fa';
	import {
		faArrowRight,
		faXmark,
		faTemperatureHigh
	} from '@fortawesome/free-solid-svg-icons';

    let { link }: { link: boolean } = $props();
	
interface HeatwaveAlert  {
	start_time: string|null,
    end_time: string|null,
	risk_code: string|null
}
let visible: boolean = $state(true);
let alert: HeatwaveAlert;

async function getHeatwaveAlert() {
	const url=`${variables.BASE_API_URI}/heatwave/warning/84/`
	console.log(url);
    const result = await fetch(url);
    const alert = await result.json() as HeatwaveAlert
	console.log(`${JSON.stringify(alert)}`);
    return alert;
}

    interface Risk { name: string, color: string};
	interface RiskDict {
		[key: number]: Risk;
	}
    const risk: RiskDict = {
		1: {
			name:"vert",
			color: "green",
		},
		2: {
			name:"jaune",
			color: "#f9ff00",
		},
		3: {
			name: "orange",
			color: "#f7a401"
		},
		4: {
        name: "rouge",
		color: "red"
		}
	};
	
	const riskColor = (alert: HeatwaveAlert)=>{
		const key = Number(alert.risk_code);
		return risk[key as keyof RiskDict].color;
	};
	const riskName = (alert: HeatwaveAlert)=>{
		const key = Number(alert.risk_code);
		return risk[key as keyof RiskDict].name;
	};

	const isActive = (alert: HeatwaveAlert) => {
		if (!alert.start_time || !alert.end_time || !alert.risk_code) {
			return false;
		}
		const stopEventDate = new Date(alert.end_time);
		return (new Date().getTime() < stopEventDate.getTime());
	}
	const formatDate = (date_iso: string)=>{
		const date = new Date(date_iso);
        return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
	timeStyle: "short",
    timeZone: 'Europe/Paris'
}).format(date);
	}
</script>

{#await getHeatwaveAlert()}
  <p>Loading alert...</p>
{:then alert}
{alert.start_time}
{#if alert.start_time && alert.end_time && alert.risk_code && isActive(alert) && visible}
<div class="py-8 lg:py-10">
		<aside class="alert variant-ghost-warning">
			<!-- Icon -->
			<div class="hidden lg:block">
			<Fa icon={faTemperatureHigh} color={riskColor(alert)} size="3x" />
		</div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3"><span class="inline-block lg:hidden px-2"><Fa icon={faTemperatureHigh} color={riskColor(alert)}/></span>
				Vigilance {riskName(alert)} canicule </h3>
				<p>Vigilance météorologique canicule Vaucluse émise par Météo France le {formatDate(alert.start_time)} valable jusqu'au {formatDate(alert.end_time)}.</p>
			</div>
			<!-- Actions -->
			<div class="flex flex-wrap lg:flex-nowrap alert-actions gap-4 align-center place-content-center">
				{#if link}<a href="/prevention/canicule" class="btn variant-ghost"><span><Fa icon={faArrowRight}/></span><span>Fiche prévention canicule</span></a>{/if}
			<button onclick={()=>visible=false} class="btn variant-ghost"><span><Fa icon={faXmark}/></span></div>
		</aside>
</div>
{/if}
{:catch error}
  <p>Error loading heatwave alert: {error.message}</p>
{/await}  

