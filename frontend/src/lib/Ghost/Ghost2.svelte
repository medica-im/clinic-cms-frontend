<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { variables } from '$lib/utils/constants';
	import { locale } from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import facilityStore from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	export let data;
	const { posts } = data;

	function formatDate(datetime: string, locale) {
		const event = new Date(datetime);
		return event.toLocaleDateString(locale);
	}
</script>

	<div class="card">
		<h5 class="card-header">
			Blog
		</h5>
	<ul class="list-group list-group-flush">
		{#each posts as post}
			<a href={post.url} class="list-group-item">
				<div class="card">
					<img src={post.feature_image} class="card-img-top" alt="post.feature_image_alt" />
					<div class="card-body">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="card-title">{post.title}</h5>
							<small>{formatDate(post.published_at, $language)}</small>
						</div>
						{#if post.custom_excerpt}
							<p class="card-text">{post.custom_excerpt}</p>
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</ul>
	</div>
