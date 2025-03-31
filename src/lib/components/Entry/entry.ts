import { variables } from '$lib/utils/constants';

type Fetch = {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}

export async function getEntry(entryUrl: string, fetch: Fetch) {
    try {
        const response = await fetch(`${variables.BASE_API_URI}/fulleffector/${entryUrl}/`)

        if (response.status !== 200 && !response.ok) {
            throw new Error(`${response.status}: Unable to fetch resource`)
        }

        const json = await response.json()
        return json
    } catch (error) {
        if (error instanceof Error) {
            console.error('[request failed]', error.message)
        } else {
            throw error;
        }
    }
}

export function getEntryPromises(entries: string[], fetch: Fetch) {
    const entryPromises = [];
    for (const entryUrl of entries) {
        entryPromises.push(getEntry(entryUrl, fetch));
    }
    return entryPromises;
};
