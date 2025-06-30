<script lang="ts">
	import Fa from 'svelte-fa';
	import { faSms } from '@fortawesome/free-solid-svg-icons';
	export let data;
</script>

<div class="flex items-center space-x-2"><Fa icon={faSms} size="sm" /><a class="anchor" href="sms:{data}">{data}</a></div>