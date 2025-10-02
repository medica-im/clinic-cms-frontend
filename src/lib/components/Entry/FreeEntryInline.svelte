<script lang="ts">
    import { page } from '$app/stores';
    import { Avatar } from '@skeletonlabs/skeleton';
    import { faUser } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    import type { FreeEntry } from '$lib/components/Entry/interface.ts';

    export let data: FreeEntry;
</script>

<a href={data?.url} class={data?.url ? 'anchor':''}>
    <div class="flex flex-wrap gap-2 items-center">
<Avatar src={data?.avatar || '/media/profile_images/default_profile_picture.png'} width="w-10">
    <Fa icon={faUser} />
</Avatar>
<div>{data?.name}, {data?.occupation}</div>
</div>
</a>