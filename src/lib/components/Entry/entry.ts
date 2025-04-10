import { workerData } from '$lib/Workforce/rest.ts';

type Fetch = {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}

export async function getEntry(slug: string, fetch: Fetch) {
    console.log(`getEntry: ${slug}`);
    const data = await workerData({ fetch, slug });
    console.log(data);
    return data;
}

export function getEntryPromises(entries: string[], fetch: Fetch) {
    const entryPromises = [];
    console.log(entries);
    for (const entryUrl of entries) {
        console.log(entryUrl);
        entryPromises.push(getEntry(entryUrl, fetch));
    }
    return entryPromises;
};
