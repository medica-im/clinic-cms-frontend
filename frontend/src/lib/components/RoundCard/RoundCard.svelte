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

<div class="card card-hover overflow-hidden">
    <!-- Header -->
    <header>
        <img src={img} class="bg-black/50 w-full" alt={alt} />
    </header>
    <!-- Body -->
    <div class="p-4 space-y-4">
        <h6 class="text-primary-500">{date}</h6>
        <h3>{title}</h3>
        <article>
            <p>{excerpt}</p>
        </article>
    </div>
    <hr />
    <!-- Footer -->
    <footer class="p-4 flex justify-start items-center space-x-4">
        <a href={url} class="btn bg-primary-500" data-sveltekit-preload-data="hover">
            <span><Fa icon={faReadme} /></span><span>{$LL.BLOG.READMORE()}</span>
        </a>
    </footer>
</div>
