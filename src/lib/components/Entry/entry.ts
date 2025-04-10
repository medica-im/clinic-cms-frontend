import { workerData } from '$lib/Workforce/rest.ts';

type Fetch = {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}

export async function getEntry(slug: string, fetch: Fetch) {
    const data = await workerData({ fetch, slug });
    return data;
}

export function getEntryPromises(entries: string[], fetch: Fetch) {
    const entryPromises = [];
    for (const entryUrl of entries) {
        entryPromises.push(getEntry(entryUrl, fetch));
    }
    return entryPromises;
};
