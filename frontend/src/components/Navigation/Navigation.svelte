<script lang="ts">
import LL from '$i18n/i18n-svelte';
import Fa from 'svelte-fa';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { language } from '$lib/store/languageStore';
import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
export let geoData;
</script>

<a href="google.navigation:q={geoData.latitude},{geoData.longitude}" class="btn variant-filled">
<span><Fa icon={faRoute} /></span>
<span>{capitalizeFirstLetter($LL.DIRECTION(), $language)}</span>
</a>