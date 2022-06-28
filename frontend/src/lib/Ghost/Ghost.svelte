<script lang=ts>
	import { useQuery } from '@sveltestack/svelte-query';
	import { variables } from '$lib/utils/constants';
    import { facilitiesData, fetchFacilities } from '$lib/store/facilityStore';
    import { onMount } from 'svelte';
    const key = variables.GHOST_API_KEY;
	const apiUrl = `https://msp-vedene.fr/blog/ghost/api/v3/content/posts/?key=${key}&fields=title,url,custom_excerpt,feature_image,feature_image_alt,published_at&limit=2`;

    onMount(async () => {
		const fd = await fetchFacilities();
        if (fd) {
		console.log(fd.language);
        }
	});

	const queryResult = useQuery('ghostLatestPosts', async () => {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status)
        }
        return response.json();
    })

    function formatDate(datetime: string) {
        const locale = $facilitiesData.language || 'en';
        console.log(`locale: ${locale}`);
        const event = new Date(datetime);
        return event.toLocaleDateString(locale)
    }
</script>

{#if $queryResult.isLoading}
	<span>Loading...</span>
{:else if $queryResult.isError}
	<span>Error: {$queryResult.error.message}</span>
{:else}
    <h2>Blog</h2>
	<ul class="list-group list-group-flush">
		{#each $queryResult.data.posts as post}
        <a href="{post.url}" class="list-group-item">
                <div class="card">
                    <div class="card-header">
                      </div>
                    <img src="{post.feature_image}" class="card-img-top" alt="post.feature_image_alt">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-between">
                      <h5 class="card-title">{post.title}</h5>
                      <small>{formatDate(post.published_at)}</small>
                    </div>
                      {#if post.custom_excerpt}
                      <p class="card-text">{post.custom_excerpt}</p>
                      {/if}
                    </div>
                  </div>
                </a>
		{/each}
	</ul>
{/if}