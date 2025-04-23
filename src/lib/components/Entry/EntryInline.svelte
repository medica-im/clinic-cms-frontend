<script lang="ts">
    import { page } from '$app/state';
    import { Avatar } from '@skeletonlabs/skeleton';
    import { faUser } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    import type { FullEffector } from '$lib/store/directoryStoreInterface';

    export let data: FullEffector;

    function entryUrl(entry: FullEffector) {
		let typeSlug = entry.effector_type.slug;
		let facilitySlug = entry.facility.slug;
		let nameSlug = entry.slug;
		return `/${facilitySlug}/${typeSlug}/${nameSlug}?origin=${encodeURIComponent(page.url.pathname)}`;
	}
</script>

<a href={entryUrl(data)} class="anchor">
    <div class="flex flex-wrap gap-2 items-center">
<Avatar src="{data.avatar.fb}" width="w-10">
    <Fa icon={faUser} />
</Avatar>
<div>{data?.name}, {data?.effector_type.label}</div>
</div>
</a>