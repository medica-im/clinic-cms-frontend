<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { userData } from '$lib/store/userStore';

	export let formattedNameDefiniteArticle;
</script>

<h1 class="h1">
	{$LL.HOME.WELCOME()}
	{formattedNameDefiniteArticle}{#if $userData && $userData.username}&ensp;<span style="text-transform: capitalize; display:inline-block;">{$userData.username}</span>{/if}!
</h1>
