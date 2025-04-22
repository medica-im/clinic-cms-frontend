import { asyncReadable } from '@square/svelte-store';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import type { OpenGraph } from '$lib/interfaces/openGraph.interface';
import type { CustomError } from '$lib/interfaces/error.interface';

export const openGraphStore= asyncReadable(
	{} as OpenGraph,
	async () => {
		const url = `${variables.BASE_API_URI}/opengraph/`;
        try {
		const [response, err]: [OpenGraph, CustomError] = await handleRequestsWithPermissions(fetch, url);
			if (response) {
				return response;
			} else if (err) {
				console.error(JSON.stringify(err));
			}
		} catch(err) {
            console.error(JSON.stringify(err));
        }
    }
);