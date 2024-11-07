import { facilityStore } from '$lib/store/facilityStore.ts';
import { asyncDerived } from '@square/svelte-store';
import publicHolidaysJson from '$lib/assets/json/metropole.json';

export const publicHolidays = asyncDerived(
	(facilityStore),
	async ($facilityStore) => {
        const zone = $facilityStore.contact.address.public_holidays_zone;
        const year = new Date().getFullYear();
        const url = `https://calendrier.api.gouv.fr/jours-feries/${zone}/${year}.json`;
    console.log(url);
    const response = await fetch(url);
    if ( response.ok ) {
    const data = await response.json();
    return data;
    } else {
        console.error(response.status);
        if (zone === "metropole") {
            return publicHolidaysJson;
        }
    }
    });
