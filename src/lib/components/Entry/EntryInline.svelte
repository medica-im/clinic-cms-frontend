<script lang="ts">
    import { page } from '$app/stores';
    import { Avatar } from '@skeletonlabs/skeleton';
    import { faUser } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    export let data;

    function entryUrl(entry) {
		return `/${entry.slug}?origin=${encodeURIComponent($page.url.pathname)}`;
	}
</script>

<a href={entryUrl(data)} class="anchor">
    <div class="flex flex-wrap gap-2 items-center">
<Avatar src="{data.profile_picture_url.lt}" width="w-10">
    <Fa icon={faUser} />
</Avatar>
<div>{data?.formatted_name}, {data?.occupations[0].label}</div>
</div>
</a>