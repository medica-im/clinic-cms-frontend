import { getContext, setContext } from 'svelte';
import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import type { Writable } from '@square/svelte-store';
import type { LimitCategoriesStore, AddressFeature, CurrentOrgStore, CommunesValueStore, Type } from '$lib/store/directoryStoreInterface';

export function setTerm() {
	let term = writable<string>("");
	setContext('term', term)
}

export function getTerm() {
	return getContext<Writable<string>>('term')
}

export function setSelectCategories() {
    let selectCategories: Writable<string[]> = writable([]);
    setContext('selectCategories', selectCategories)
}
export function getSelectCategories() {
    return getContext<Writable<string[]>>('selectCategories')
}

export function setLimitCategories() {
    let limitCategories: LimitCategoriesStore = writable([]);
    setContext('limitCategories', limitCategories);
}

export function getLimitCategories() {
    return getContext<Writable<string[]>>('limitCategories');
}

export function setSelectCommunes() {
    let selectCommunes: Writable<string[]> = writable([]);
    setContext('selectCommunes', selectCommunes)
}

export function getSelectCommunes() {
    return getContext<Writable<string[]>>('selectCommunes');
}

export function setSelectCommunesValue() {
    let selectCommunesValue = writable(null);
    setContext('selectCommunesValue', selectCommunesValue);
}

export function getSelectCommunesValue() {
    return getContext<CommunesValueStore>('selectCommunesValue');
}

export function setSelCatVal() {
    let selCatVal: Writable<string|null> = writable(null);
    setContext('selCatVal', selCatVal);
}

export function getSelCatVal() {
    return getContext<Writable<string|null>>('selCatVal');
}

export function setSelectSituation() {
    let selectSituation: Writable<string> = writable("");
    setContext('selectSituation', selectSituation);
}

export function getSelectSituation() {
    return getContext<Writable<string>>('selectSituation');
}

export function setSelectSituationValue() {
    let selectSituationValue: Writable<string|null> = writable(null);
    setContext('selectSituationValue', selectSituationValue);
}

export function getSelectSituationValue() {
    return getContext('selectSituationValue');
}

export function setAddressFeature() {
    let addressFeature: Writable<AddressFeature> = writable({});
    setContext('addressFeature', addressFeature);
}

export function getAddressFeature() {
    return getContext<Writable<AddressFeature>>('addressFeature');
}

export function setInputAddress() {
    let inputAddress: Writable<string> = writable("");
    setContext('inputAddress', inputAddress);
}

export function getInputAddress() {
    return getContext('inputAddress');
}

export function setSelectFacility() {
    let selectFacility: Writable<string> = writable("");
    setContext('selectFacility', selectFacility);
}

export function getSelectFacility() {
    return getContext<Writable<string>>('selectFacility');
}

export function setSelectFacilityValue() {
    let selectFacilityValue: Writable<string|null> = writable(null);
    setContext('selectFacilityValue', selectFacilityValue);
}

export function getSelectFacilityValue() {
    return getContext<Writable<string | null>>('selectFacilityValue');
}

export function setCurrentOrg() {
    let currentOrg: CurrentOrgStore = writable(true);
    setContext('currentOrg', currentOrg);
}

export function getCurrentOrg(): CurrentOrgStore {
    return getContext('currentOrg');
}

export function setDirectoryRedirect() {
    let directoryRedirect: Writable<boolean> = writable(true);
    setContext('directoryRedirect', directoryRedirect);
}

export function getDirectoryRedirect(): Writable<boolean> {
    return getContext('directoryRedirect');
}