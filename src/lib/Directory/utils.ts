import { term, selectCommunes, selectCommunesValue, selectCategories, selCatVal, selectSituation, selectSituationValue, addressFeature, inputAddress, selectFacility, selectFacilityValue } from '$lib/store/directoryStore';

export function resetDirectory() {
    term.set("");
    selectCommunes.set([]);
    selectCommunesValue.set(null);
    selectCategories.set([]);
    selCatVal.set(null);
    selectSituation.set("");
    selectSituationValue.set(null);
    addressFeature.set({});
    inputAddress.set("");
    selectFacility.set("");
    selectFacilityValue.set(null);
}