import type { PageLoad } from './$types';
import { getEntryPromises, getEntry } from '$lib/components/Entry/entry.ts';

const team: string[] = [
    "maison-de-sante-pluriprofessionnelle-chateauneuf-de-gadagne/medecin-generaliste/charlotte-goolaerts",
    "pharmacie-des-felibres/pharmacien/sara-discours-mombelli",
    "cabinet-paramedical-1/infirmiere/fanny-putti-aymard",
    "maison-de-sante-pluriprofessionnelle-chateauneuf-de-gadagne/infirmiere/aurelie-ferriz",
    "cabinet-paramedical-1/kinesitherapeute/sonia-sauget",
    "monniot-reusser-virginie-ei/infirmiere/virginie-reusser",
    "cabinet-manon-deloche/dieteticien/manon-deloche",
];


export const load: PageLoad = async ({ fetch }) => {
    return {
        team: await Promise.all([...getEntryPromises(team, fetch)]),
        contact: await getEntry('maison-de-sante-pluriprofessionnelle-chateauneuf-de-gadagne/coordinateur/virginie-reusser', fetch)
    };
}