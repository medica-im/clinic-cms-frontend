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

<div class="card shadow-lg grid grid-cols-1 p-2 md:p-4 space-y-4 items-start">
    <div class="col-span-2 p-2">
        <img src={img} class="max-h-64 bg-black/50" alt={alt} />
    </div>
    <div class="p-2 space-y-2">
        <h6>{date}</h6>
        <h3>{title}</h3>
        <article>
            <p>{excerpt}</p>
        </article>
    <!-- Footer -->
        <a href={url} class="btn variant-filled-primary" data-sveltekit-preload-data="hover">
            <span><Fa icon={faReadme} /></span><span>{$LL.BLOG.READMORE()}</span>
        </a>
    </div>
</div>
