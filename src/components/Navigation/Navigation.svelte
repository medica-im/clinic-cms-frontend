<script lang="ts">
import * as m from "$msgs";
import Fa from 'svelte-fa';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { getLocale } from "$prgld/runtime.js";
import { language } from '$lib/store/languageStore';
import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
export let geoData;
</script>

<a href="google.navigation:q={geoData.latitude},{geoData.longitude}" class="btn variant-filled">
<span><Fa icon={faRoute} /></span>
<span>{capitalizeFirstLetter(m.DIRECTION() ,getLocale())}</span>
</a>