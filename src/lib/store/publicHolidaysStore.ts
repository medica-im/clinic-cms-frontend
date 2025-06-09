import { organizationStore } from '$lib/store/facilityStore.ts';
import { asyncDerived } from '@square/svelte-store';
import publicHolidaysJson from '$lib/assets/json/metropole.json';

export const publicHolidays = asyncDerived(
	(organizationStore),
	async ($organizationStore) => {
        const zone = $organizationStore.contact.address.public_holidays_zone;
        const year = new Date().getFullYear();
        const url = `https://calendrier.api.gouv.fr/jours-feries/${zone}/${year}.json`;
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
