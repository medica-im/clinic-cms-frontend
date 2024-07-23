<script lang="ts">
	export let title = 'Title';
	export let date = '01/01/1970';
	export let excerpt = 'Incipit...';
	export let img = '/img_avatar2.png';
	export let url = 'https://example.com';
    export let alt = 'alt description';
</script>

<a href={url} class="block card card-hover rounded-lg hover:shadow-lg p-4 space-y-3 lg:w-80">
    <img src={img} class="lg:h-64 bg-black/50" alt={alt} />
    <h6 class="h6">{date}</h6>
    <h4 class="h4">{title}</h4>
    <p>{excerpt}</p>
</a>