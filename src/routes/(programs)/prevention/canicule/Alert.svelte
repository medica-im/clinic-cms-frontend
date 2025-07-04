<script lang="ts">
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import {
		faArrowRight,
		faXmark,
		faTemperatureHigh
	} from '@fortawesome/free-solid-svg-icons';
	import { env } from '$env/dynamic/public';

    const riskCode: number = env.PUBLIC_HEATWAVE_RISK_LEVEL_CODE ? Number(env.PUBLIC_HEATWAVE_RISK_LEVEL_CODE) : 0;
	interface Risk { name: string, color: string};
	interface RiskDict {
		[key: number]: Risk;
	}
    const risk: RiskDict = {
		0: {
			name:"vert",
			color: "green",
		},
		1: {
			name:"jaune",
			color: "#f9ff00",
		},
		2: {
			name: "orange",
			color: "#f7a401"
		},
		3: {
        name: "rouge",
		color: "red"
		}
	};
	const riskName = risk[riskCode as keyof RiskDict].name;
	const riskColor = risk[riskCode as keyof RiskDict].color;
	const start: string = env.PUBLIC_HEATWAVE_START_EVENT_DATE ? env.PUBLIC_HEATWAVE_START_EVENT_DATE : "0";
	const stop: string = env.PUBLIC_HEATWAVE_STOP_EVENT_DATE ? env.PUBLIC_HEATWAVE_STOP_EVENT_DATE : "0";
	const startEventDate = new Date(start);
	const stopEventDate = new Date(stop);
	let visible: boolean = (new Date().getTime() < stopEventDate.getTime()) && riskCode > 0;
let startStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
	timeStyle: "short",
    timeZone: 'Europe/Paris'
}).format(startEventDate);
let endStr = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
	timeStyle: "short",
    timeZone: 'Europe/Paris'
}).format(stopEventDate);
</script>

{#if browser && visible}
<div class="py-8 lg:py-10">
		<aside class="alert variant-ghost-warning">
			<!-- Icon -->
			<div class="hidden lg:block">
			<Fa icon={faTemperatureHigh} color={riskColor} size="3x" />
		</div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3"><span class="inline-block lg:hidden px-2"><Fa icon={faTemperatureHigh} color={riskColor}/></span>
				Vigilance {riskName} canicule </h3>
				<p>Vigilance météorologique canicule Vaucluse émise par Météo France le {startStr} valable jusqu'au {endStr}.</p>
			</div>
			<!-- Actions -->
			<div class="flex flex-wrap lg:flex-nowrap alert-actions gap-4 align-center place-content-center"><a href="/prevention/canicule" class="btn variant-ghost"><span><Fa icon={faArrowRight}/></span><span>Fiche prévention canicule</span></a>
			<button on:click={()=>visible=false} class="btn variant-ghost"><span><Fa icon={faXmark}/></span></div>
		</aside>
</div>
{/if}