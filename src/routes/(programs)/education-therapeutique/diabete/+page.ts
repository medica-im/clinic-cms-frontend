import type { PageLoad } from './$types';
import { getEntryPromises } from '$lib/components/Entry/entry.ts';
import type { FreeEntry } from '$lib/components/Entry/interface.ts';

const team: string[] = [
    "alexis-bernal",
    "audrey-francisod",
    "faustine-bulme",
    "pierre-andre-bonnet"
];

const freeTeam: FreeEntry[] = [
    {
        name: "Magali Nogrette",
        occupation: "podologue",
        avatar: "/images/intervenants/magali-nogrette.jpg",
        url: "https://mrs-avignon.fr/les-praticiens/#podologue"
    },
    {
        name: "Morgane Picaud",
        occupation: "pharmacienne"
    },
    {
        name: "Ophéline Brunet",
        occupation: "pharmacienne"
    }
];

export const load: PageLoad = async ({ fetch }) => {
    return {
        team: await Promise.all([...getEntryPromises(team, fetch)]),
        freeTeam: freeTeam
    };
}