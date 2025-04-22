<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMobileScreen, faPhone, faFax } from '@fortawesome/free-solid-svg-icons';
	export let data;

    const iconDict: object = {
        "M": faMobileScreen,
        "MW": faMobileScreen,
        "W": faPhone,
        "F": faFax
    };

    function getIcon(type: string) {
        return iconDict[type as keyof object];
    }
</script>

<div class="flex content-start space-x-2 items-center">
<div class="flex-initial"><span class="w-4"><Fa icon={getIcon(data.type)} size="sm" /></span></div>
<a class="unstyled underline underline-offset-4" href="tel:{data.phone}">
<div class="flex-initial">{data.phone}</div>
</a>
</div>