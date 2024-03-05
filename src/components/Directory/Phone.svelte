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
<div class="flex-initial"><span clas="w-4"><Fa icon={getIcon(data.type)} /></span></div>
<a href="tel:{data.phone}">
<div class="flex-initial">{data.phone}</div>
</a>
</div>