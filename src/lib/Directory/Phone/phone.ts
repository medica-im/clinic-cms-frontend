import LL from '$i18n/i18n-svelte';
import { get } from 'svelte/store';

export const phoneTypes = {
	M: get(LL).PHONE_TYPE.M(),
	MW: get(LL).PHONE_TYPE.MW(),
	W: get(LL).PHONE_TYPE.W(),
	F: get(LL).PHONE_TYPE.F(),
	AS: get(LL).PHONE_TYPE.AS()
};