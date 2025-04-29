<script lang="ts">
	import * as m from "$msgs";	import { userData } from '$lib/store/userStore';

	export let formattedNameDefiniteArticle;
</script>

<h1 class="h1">
	{m.HOME_WELCOME()}
	{formattedNameDefiniteArticle}{#if $userData && $userData.username}&ensp;<span style="text-transform: capitalize; display:inline-block;">{$userData.username}</span>{/if}&#8239;!
</h1>
