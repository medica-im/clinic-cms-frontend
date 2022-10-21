import { writable, derived, readable, get, asyncReadable, asyncWritable, asyncDerived } from '@square/svelte-store';
import type { TwitterCard } from '$lib/interfaces/openGraph.interface';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

export const twitterCardStore= asyncReadable(
	{},
	async () => {
		const url = `${variables.BASE_API_URI}/opengraph/twitter`;
        try {
		const [response, err] = await handleRequestsWithPermissions(fetch, url);
			if (response) {
				let data: TwitterCard = response;
				return data;
			} else if (err) {
				console.log(err);
			}
		} catch(err) {
            console.error(err);
            return {};
        }
    },
	true
);