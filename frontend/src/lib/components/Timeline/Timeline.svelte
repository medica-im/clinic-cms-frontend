<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { variables } from '$lib/utils/constants';

    const BASE_URI = variables.BASE_URI;
	export let data: any;

	console.log(`Timeline data:${JSON.stringify(data)}`);

	function processJson(d: Array<any>) {
		let events = d[1].value;
		events.forEach(function (event: any) {
			let count = 3;
			['start_date', 'end_date'].forEach(function (key) {
				['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'].forEach(function (
					subkey
				) {
					if (event[key][subkey] === null) {
						event[key][subkey] = '';
						if (key == 'end_date' && ['year', 'month', 'day'].includes(subkey)) {
							count--;
						}
					}
				});
			});
			if (!count) {
				delete event.end_date;
			}
		});

		let p = {
			title: d[0].value,
			events: events
		};
		console.log(JSON.stringify(p));
		return p;
	}

	onMount(async () => {
		if (browser) {
			let timeline = await new Promise((resolve) => {
		let additionalOptions = {
            script_path: '/timeline3/js/',
            language: 'fr'
        }
		let processedData = processJson(data);
		//const res = await fetch(`/tutorial/api/album`);
		//photos = await res.json();
		let tl = new TL.Timeline('timeline-embed', processedData);
	})}
	});
</script>

<svelte:head>
	<!--link rel="stylesheet" href="{BASE_URI}/timeline3/css/timeline.css"-->
	<link title="timeline-styles" rel="stylesheet" 
              href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
	<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>

	<!--script src="{BASE_URI}/timeline3/js/timeline.js"></script-->
</svelte:head>

<main>
	<div id="timeline-embed" style="width: 100%; height: 600px" />
</main>
