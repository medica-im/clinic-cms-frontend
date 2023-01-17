<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Timeline } from '@knight-lab/timelinejs';

	export let data: JSON;

	console.log(`Timeline data:${JSON.stringify(data)}`);

	function processJson(d: Array<any>) {
		let events = d[1].value;
		events.forEach(function (event) {
			let count = 3;
			['start_date', 'end_date'].forEach(function (key) {
				['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'].forEach(function (
					subkey
				) {
					console.log(event[key][subkey]);
					if (event[key][subkey] === null) {
						event[key][subkey] = '';
						if (key == 'end_date' && ['year', 'month', 'day'].includes(subkey)) {
							console.log(count--);
						}
					}
				});
			});
			if (!count) {
				delete event.end_date;
			}
		});

		let p: Object = {
			title: d[0].value,
			events: events
		};
		console.log(JSON.stringify(p));
		return p;
	}

	const TEST_CONFIG = {
		title: {
			media: {
				url: 'http://www.germuska.com/salzburg-album/full/2QVB_022.jpg',
				caption: 'The secret passage at Schloss Leopoldskron, Salzburg, Austria',
				credit: 'Joe Germuska'
			},
			text: {
				headline: 'TimelineJS Media Types',
				text: '<p>TimelineJS supports many media types. This provides a simple way to test them all. This page tests a simple image on a remote server.</p>'
			}
		},
		events: [
			{
				id: 'youtube',
				media: {
					url: 'https://www.youtube.com/watch?v=pi2v1m6gmD8&t=5m21s',
					caption: "the Monkey section of David Van Tieghem's <em>Ear Drums</em>"
				},
				start_date: {
					year: '1901'
				},
				text: {
					headline: 'YouTube Videos',
					text: "<p>if Timeline finds a URL that starts with 'youtube.com' or 'youtu.be', it will try to use it to embed a YouTube video. The <em>protocol</em> part of the URL (e.g. <em>https://</em>) is technically optional.</p><p>You can start at a specific point in the video using the <code>t=#m#s</code> parameter: see <a href='http://youtubetime.com/'>http://youtubetime.com/</a></p>"
				}
			},
			{
				id: 'vimeo',
				media: {
					url: 'http://vimeo.com/20839673',
					caption: '<em>Phat Tai</em>, a story of Vietnamese fishermen on the Gulf Coast.',
					credit: 'Joe York/Southern Foodways Alliance'
				},
				start_date: {
					year: '1902'
				},
				text: {
					headline: 'Vimeo',
					text: 'To embed a Vimeo video, just copy the URL of the Vimeo.com page which shows the video.'
				}
			}
		]
	};

	onMount(async () => {
		if (browser) {
			let timeline = await new Promise((resolve) => {
				let tl = new Timeline('timeline-embed', processJson(data));
				//tl.on('dataloaded', () => resolve(tl));
			});
		}
	});
</script>

<main>
	<div id="timeline-embed" style="width: 100%; height: 600px" />
</main>

<style>
	@import '@knight-lab/timelinejs/dist/css/timeline.css';
</style>
