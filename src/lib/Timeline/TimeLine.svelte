<script lang="ts">
	import { onMount } from 'svelte';
	//import '@knight-lab/timelinejs/dist/css/timeline.css';
	//import { variables } from '$lib/utils/constants';

	//export let data: any;

	//const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;

	let tl;

    let data = {
    "title": {
        "media": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/CMB_Timeline300_no_WMAP.jpg/1280px-CMB_Timeline300_no_WMAP.jpg",
            "caption": "Timeline of the universe.",
            "credit": "NASA with modifications by Cherkash <a href=\"https://en.wikipedia.org/wiki/File:CMB_Timeline300_no_WMAP.jpg\">via Wikipedia</a>"
        },
        "text": {
            "headline": "Cosmological Scale Timeline",
            "text": "A test case for looking at how TimelineJS handles dates beyond those supported by the JS Date class"
        },
        "background": {
            "color": "papayawhip"
        }
    },
    "events": [{
            "media": {
                "url": "https://en.wikipedia.org/wiki/Big_Bang"
            },
            "start_date": {
                "year": "-13800000000"
            },
            "text": {
                "headline": "The Big Bang",
                "text": "As far back as we can go"
            },
            "background": {
                "color": "#F45B69"
            }
        },
        {
            "start_date": {
                "year": "-13799630000"
            },
            "text": {
                "headline": "The Dark Ages and large-scale structure emergence",
                "text": "I guess this image shows things that are 13.1 billion years old? Not sure I followed tbh."
            },
            "background": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Webb%27s_First_Deep_Field.jpg"
            }
        },
        {
            "start_date": {
                "year": "-12800000000"
            },
            "text": {
                "headline": "The universe as it appears today"
            },
            "background": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Webb%27s_First_Deep_Field.jpg"
            }
        },
        {
            "start_date": {
                "year": "-4600000000"
            },
            "text": {
                "headline": "The formation of the Solar System"
            },
            "background": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/The_Mysterious_Case_of_the_Disappearing_Dust.jpg/1280px-The_Mysterious_Case_of_the_Disappearing_Dust.jpg"
            }
        },
        {
            "start_date": {
                "year": "-538800000"
            },

            "end_date": {
                "year": "-251902000"
            },
            "text": {
                "headline": "Paleozoic era"
            },
            "background": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/4/49/Trilobite_Heinrich_Harder.jpg"
            }
        },
        {
            "media": {
                "url": "https://commons.wikimedia.org/wiki/File:Ape_skeletons.png",
                "caption": "The hominoids are descendants of a common ancestor.",
                "credit": "<a href=\"https://en.wikipedia.org/wiki/Human_evolution\">Wikipedia</a>"
            },
            "start_date": {
                "year": "-315000"
            },
            "text": {
                "headline": "approximate date of appearance of Homo sapiens"
            },
            "background": {
                "color": "white"
            }
        },
        {
            "media": {
                "url": "https://commons.wikimedia.org/wiki/File:0854_Ein_Krug_aus_Bronocice,_3.550_v._Chr..JPG",
                "caption": "Bronocice pot",
                "credit": "<a href=\"https://en.wikipedia.org/wiki/Bronocice_pot\">Wikipedia</a>"
            },
            "start_date": {
                "year": "-3500"
            },
            "text": {
                "headline": "oldest known depiction of a wheeled vehicle"
            },
            "background": {
                "color": "black"
            }
        }
    ]
}

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
			//let dataJsn = processJson(data);
			tl = new TL.Timeline('timeline-embed', data);
		};
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />
	<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
</svelte:head>

<div id="timeline-embed" style="width: 100%; height: 600px" />