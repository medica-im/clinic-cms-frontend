<script lang="ts">
	import * as m from "$msgs";
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Fa from 'svelte-fa';
	import { faGlobe, faBlog } from '@fortawesome/free-solid-svg-icons';
	import type { Website as WebsiteType } from '$lib/interfaces/website.interface';

	export let data: WebsiteType;

	function removeHttp(url) {
		return url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
	}
</script>

{#if data?.type == 'Blog'}
	<a href={data.website} rel="external" class="btn variant-ghost-secondary">
		<span><Fa icon={faBlog} /></span><span>Blog</span>
	</a>
{:else}
	
		<div class="flex content-start space-x-2 items-center">
			<div class="flex-initial break-words overflow-hidden">
				<div class="btn btn-sm !bg-transparent p-0 align-middle">
					<span class="w-4"><Fa icon={faGlobe} /></span>
					<span class="hidden 2xl:inline-block"
						>{capitalizeFirstLetter(m.WEBSITE(), $language)}</span
					>
				</div>
			</div>
            <a
		class="unstyled underline underline-offset-4"
		href={data.website}
		title={removeHttp(data.website)}
		target="_blank"
		rel="external"
	>
			<div class="w-64 md:w-full flex-initial break-words overflow-hidden">{removeHttp(data.website)}</div>
            </a>
		</div>
{/if}
