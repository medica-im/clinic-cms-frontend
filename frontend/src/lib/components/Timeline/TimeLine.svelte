<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import '@knight-lab/timelinejs/dist/css/timeline.css';

	export let data: any;
    let Timeline;
	let tl;
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
		return p;
	}

	onMount(async () => {
		if (browser) {
        const TL = await import("@knight-lab/timelinejs/src/js/timeline/Timeline.mjs");
		tl = new TL.Timeline('timeline-embed', processJson(data));
		}
	})	
</script>

<main>
	<div id="timeline-embed" style="width: 100%; height: 600px" />
</main>
