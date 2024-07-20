<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Fa from 'svelte-fa';
	import {
		faReadme
	} from '@fortawesome/free-brands-svg-icons';
	export let title = 'Title';
	export let date = '01/01/1970';
	export let excerpt = 'Incipit...';
	export let img = '/img_avatar2.png';
	export let url = 'https://example.com';
    export let alt = 'alt description';
</script>

<a href={url} class="block card card-hover rounded-lg hover:shadow-lg grid grid-cols-1 p-4 space-y-2 items-start w-auto lg:w-80 lg:h-96">
        <img src={img} class="w-full lg:max-h-52 bg-black/50" alt={alt} />
        <h6 class="h6">{date}</h6>
        <h4 class="h4">{title}</h4>
        <p>{excerpt}</p>
    </a>
