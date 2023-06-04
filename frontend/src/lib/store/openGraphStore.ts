import { writable, derived, readable, get, asyncReadable, asyncWritable, asyncDerived } from '@square/svelte-store';
import type { OpenGraph } from '$lib/interfaces/openGraph.interface';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

export const openGraphStore= asyncReadable(
	{},
	async () => {
		const url = `${variables.BASE_API_URI}/opengraph/`;
        try {
		const [response, err] = await handleRequestsWithPermissions(fetch, url);
			if (response) {
				let data: OpenGraph = response;
				return data;
			} else if (err) {
				console.error(JSON.stringify(err));
			}
		} catch(err) {
            console.error(JSON.stringify(err));
            return {};
        }
    }
);