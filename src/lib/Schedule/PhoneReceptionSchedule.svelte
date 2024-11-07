<script lang="ts">
import { dateTime } from '$lib/store/dateTimeStore.ts';
import secretary from '$lib/assets/images/parcours/secretary.png';
import { Avatar } from '@skeletonlabs/skeleton';
import Fa from 'svelte-fa';
import {
		faMobileScreen,
		faPhone,
		faFax,
		faMapLocationDot,
		faLocationDot
	} from '@fortawesome/free-solid-svg-icons';
import Phones from '$components/Directory/Phones.svelte';
import { isServiceAvailable } from '$lib/Schedule/available.ts';
import { publicHolidays } from '$lib/store/publicHolidaysStore.ts';
import { loadAll } from '@square/svelte-store';

export let data;
</script>

<div class="card overflow-hidden">
  <header class="card-header">
    <h3 class="h3">Accueil téléphonique</h3>
  </header>
  <div class="p-4 space-y-4">
    <Phones data={data.contact.phonenumbers}/>
    <div class="flex flex-wrap">
        <div class="whitespace-pre-wrap">L'accueil téléphonique du secrétariat est&nbsp;</div>
          {#await loadAll([dateTime, publicHolidays])}
          <div class="placeholder w-12 animate-pulse self-end" />
          {:then}
          <div>
          {isServiceAvailable("phoneAppointment", $dateTime, $publicHolidays) ? "ouvert":"fermé"}</div>
          {/await}.
        </div>
  </div>
  <hr class="opacity-50" />
  <footer class="p-4 flex justify-start items-center space-x-4">
    <Avatar src={secretary} width="w-8" />
    <div class="flex-auto flex justify-between items-center">
      <h6 class="font-bold" data-toc-ignore>Secrétariat</h6>
      <small>{$dateTime.toLocaleString()}</small>
    </div>
  </footer>
</div>


