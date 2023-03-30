<script lang="ts">
	import { onMount } from 'svelte';
	import { variables } from '$lib/utils/constants';

	export let data: any;

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

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js';
		document.head.append(script);

		script.onload = function () {
			let dataJsn = processJson(data);
			tl = new TL.Timeline('timeline-embed', dataJsn);
		};
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />
	<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
</svelte:head>

<div id="timeline-embed" style="width: 100%; height: 600px" />
