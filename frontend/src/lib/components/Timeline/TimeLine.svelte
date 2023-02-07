<script lang="ts">
	import { onMount } from 'svelte';
    import { Timeline } from '@medecinelibre/timelinejs/src/js/timeline/Timeline.mjs';

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
        let dataJsn=processJson(data);
		tl = new Timeline('timeline-embed', dataJsn);
	})	
</script>

<svelte:head>
    <link rel='stylesheet' href='/timeline3/css/timeline.css'>
</svelte:head>
<main>
	<div id="timeline-embed" style="width: 100%; height: 700px" />
</main>
