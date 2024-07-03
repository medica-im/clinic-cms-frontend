<script lang="ts">
import { distanceEffectors } from '$lib/store/directoryStore.ts';
import { PUBLIC_LOCALE } from '$env/static/public';

export let uid: string;

let locale = PUBLIC_LOCALE || 'en-US';

function humanize(d) {
const result = {unit: 'km', smallUnit: 'm', factor: 1000, smallBorder: 0.900}
  const formatter = new Intl.NumberFormat(locale, { maximumSignificantDigits: 2 })
  if (d < result.smallBorder) {
    let distance = d * result.factor
    if (distance < 40) return `< 50 ${result.smallUnit}`

    distance = Math.round(distance / 50) * 50
    return `${formatter.format(distance)} ${result.smallUnit}`
  }

  return `${formatter.format(d)} ${result.unit}`
}
</script>

{#await distanceEffectors.load() then}
{#if $distanceEffectors?.hasOwnProperty(uid)}
<!--li>{($distanceEffectors[uid]/1000).toFixed(3)} km</li-->
{humanize($distanceEffectors[uid]/1000)}
{/if}
{/await}