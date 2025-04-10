import type { PageLoad } from './$types';
import { getEntryPromises } from '$lib/components/Entry/entry.ts';

const team: string[] = [
    "aude-piquerez",
    "faustine-bulme",
    "caroline-hanesse",
    "pierre-andre-bonnet"
];

export const load: PageLoad = async ({ fetch }) => {
    return {
        team: await Promise.all([...getEntryPromises(team, fetch)])
    };
}