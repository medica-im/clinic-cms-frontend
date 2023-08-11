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

<span><Fa icon={getIcon(data.type)}/></span>
<span><a href="tel:{data.phone}">{data.phone}</a></span>