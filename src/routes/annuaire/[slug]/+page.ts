import { get } from '@square/svelte-store';
import type { PageLoad } from './$types';
import {
    workforceDataCached,
    occupations,
    occupationsCardinal,
    filteredOccupationsCardinal,
    selectOccupations,
    workforceOccupation,
    slugAddressbook,
    keyAddressbook } from '$lib/store/workforceStore';
import type { LeafletMap } from '@locationlabuo/leaflet-sveltified';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { locale } from '$i18n/i18n-svelte';
import { variables } from '$lib/utils/constants';
import type { Workforce } from '$lib/interfaces/workforce.interface';
import { isAuth } from '$lib/store/authStore';

async function getWorkforce() {
    const cacheName = "wfd";

    let lang = get(locale) ?? variables.DEFAULT_LANGUAGE;
const workforceUrl = `${variables.BASE_API_URI}/workforce/user/?lang=${lang}`;
			const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
			if (response) {
				let data = response as Workforce;
				console.log(`data.length: ${data.length}`);
				return data;
			} else if (err) {
				console.error(err);
			}
        }
    
export const load: PageLoad = async ({ params }) => {
    slugAddressbook.set(params.slug);
    console.log(`slugAddressbook: ${get(slugAddressbook)}`);
    let keyOccupation = await keyAddressbook.load();
    console.log(`keyOccupation: ${keyOccupation}`);
    selectOccupations.set([keyOccupation]);
    return {
        slug: params.slug,
        key: keyOccupation,
        workforceDataCached: await getWorkforce(),
        selectedOccupationsCardinal: await filteredOccupationsCardinal.load()

    };
}