import type { PageLoad } from './$types';
import { variables } from '$lib/utils/constants';

let facilityJson;

export const load: PageLoad = async ({ fetch, params }) => {
    const slug = params.slug;
    const url = `${variables.BASE_API_URI}/facilities/${slug}`;
try {
    const response = await fetch(url);
  if (response.ok) {
    facilityJson = await response.json();
  } else {
    if (response.status === 404) throw new Error('404, Not found');
    if (response.status === 500) throw new Error('500, internal server error');
    throw new Error(response.status);
  }
} catch (error) {
  console.error('Fetch', error);
}

    return {
        facility: facilityJson
    };
}