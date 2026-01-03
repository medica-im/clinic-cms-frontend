import type { PageLoad } from './$types';
import { getEntryPromises } from '$lib/components/Entry/entry.ts';

const team: string[] = [
    "audrey-francisod",
    "aude-piquerez"
];

export const load: PageLoad = async ({ fetch }) => {
    return {
        team: await Promise.all([...getEntryPromises(team, fetch)])
    };
}