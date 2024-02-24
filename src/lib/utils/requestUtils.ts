import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Token, UserResponse } from '$lib/interfaces/user.interface';
import type { CustomError } from '$lib/interfaces/error.interface';
import { notificationData } from '$lib/store/notificationStore';
import { userData } from '$lib/store/userStore';
import { variables } from '$lib/utils/constants';
import { formatText } from '$lib/formats/formatString';
import type { Workforce } from '$lib/interfaces/workforce.interface';
import { get } from 'svelte/store';
import { locales } from '$i18n/i18n-util';
import { language } from '$lib/store/languageStore';
import { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types'
import LL from '$i18n/i18n-svelte';
import { toggleAuth } from '$lib/store/authStore';

export const browserGet = (key: string): string | undefined => {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return item;
		}
	}
	return null;
};

export const browserSet = (key: string, value: string): void => {
	if (browser) {
		localStorage.setItem(key, value);
	}
};

export const post = async (
	fetch,
	url: string,
	body: unknown
): Promise<[object, Array<CustomError>]> => {
	try {
		const headers = {};
		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(body);
			const token = browserGet('refreshToken');
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}
			const res = await fetch(url, {
				method: 'POST',
				body,
				headers
			});
			const response = await res.json();
			if (response.errors) {
				const errors: Array<CustomError> = [];
				for (const p in response.errors) {
					errors.push({ error: response.errors[p] });
				}
				return [{}, errors];
			}
			return [response, []];
		}
	} catch (error) {
		console.error(`Error outside: ${error}`);
		const errors: Array<CustomError> = [{ error: 'An unknown error occurred.' }, { error: error }];
		return [{}, errors];
	}
};

export const getCurrentUser = async (
	fetch,
	refreshUrl: string,
	userUrl: string
): Promise<[object, Array<CustomError>]> => {
	const jsonRes = await fetch(refreshUrl, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh: `${browserGet('refreshToken')}`
		})
	});
	const accessRefresh: Token = await jsonRes.json();
	if (accessRefresh.access) {
		const res = await fetch(userUrl, {
			headers: {
				Authorization: `Bearer ${accessRefresh.access}`
			}
		});
		if (res.status === 400) {
			const data = await res.json();
			const error = data.user.error[0];
			return [{}, error];
		}
		const response = await res.json();
		return [response.user, []];
	} else {
		return [{}, [{ error: 'Refresh token is invalid...' }]];
	}
};

function removeRefreshToken() {
	localStorage.removeItem('refreshToken');
}

export const emptyLocaleStorage = () => {
	const itemsToDelete: string[] = [];
	let storedItemsRoot = ["facility_", "wfd_", "wfo_", "workforceDict_"];
	locales.forEach(
		(locale) => {
			let items = storedItemsRoot.map((value) => value + locale)
			itemsToDelete.push(...items);
		}
	);
	itemsToDelete.forEach(
		(value) => localStorage.removeItem(value)
	);
};

export const logOutUser = async (): Promise<void> => {
	const res = await fetch(`${variables.BASE_API_URI}/accounts/token/refresh/`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh: `${browserGet('refreshToken')}`
		})
	});
	const accessRefresh = await res.json();
	const jres = await fetch(`${variables.BASE_API_URI}/accounts/logout/`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${accessRefresh.access}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh: `${browserGet('refreshToken')}`
		})
	});
	if (jres.status !== 204) {
		const data = await jres.json();
		//const error = data.user?.error[0];
		//throw { id: error.id, message: error };
		console.error(data);
	}
	userData.set({});
	removeRefreshToken();
	emptyLocaleStorage();
	toggleAuth();
	notificationData.update(() => get(LL).LOGIN.LOGOUT());
	await goto('/accounts/login');
};

export const handlePostRequestsWithPermissions = async (
	fetch,
	targetUrl: string,
	body: unknown,
	method = 'POST'
): Promise<[any, Array<CustomError>]> => {
	const res = await fetch(`${variables.BASE_API_URI}/accounts/token/refresh/`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh: `${browserGet('refreshToken')}`
		})
	});
	const accessRefresh = await res.json();
	let fetchDict;
	if (method == 'GET') {
		fetchDict = {
			method: method,
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${accessRefresh.access}`,
				'Content-Type': 'application/json'
			},
		}
	} else {
		fetchDict = {
			method: method,
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${accessRefresh.access}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}
	}
	const jres = await fetch(targetUrl, fetchDict);
	if (method === 'PATCH') {
		if (jres.status !== 200) {
			const data = await jres.json();
			console.error(`Data: ${data}`);
			const errs = data.errors;
			console.error(errs);
			return [{}, errs];
		}
		return [await jres.json(), []];
	} else if (method === 'GET') {
		if (jres.status !== 200) {
			const data = await jres.json();
			console.error(`Data: ${data}`);
			const errs = data.errors;
			console.error(errs);
			return [{}, errs];
		}
		return [await jres.json(), []];
	} else if (method === 'POST') {
		if (jres.status !== 201) {
			const data = await jres.json();
			console.error(`Data: ${data}`);
			const errs = data.errors;
			console.error(errs);
			return [{}, errs];
		}
		return [jres.json(), []];
	}
};

export const handleRequestsWithPermissions = async (
	fetch,
	targetUrl: string): Promise<[{}, CustomError]> => {
	let refreshToken;
	if (browser) {
		refreshToken = browserGet('refreshToken')
	}
	let accessRefresh;
	if (refreshToken) {
		accessRefresh = await fetch(`${variables.BASE_API_URI}/accounts/token/refresh/`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				refresh: `${browserGet('refreshToken')}`
			})
		}).then(function (response: Promise<any>) {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		}).catch(function (err: Error) {
			console.warn(`Could not get new token. error: ${err}`);
		}
		)
	}
	let fetchDict;
	if (accessRefresh) {
		fetchDict = {
			method: 'GET',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${accessRefresh.access}`,
				'Content-Type': 'application/json',
			},
		};
	} else {
		fetchDict = {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		};
	}
	try {
		const jres = await fetch(targetUrl, fetchDict);
		if (jres.status !== 200) {
			const data = await jres.json();
			console.error(`Error ${jres.status} data: ${JSON.stringify(data)}`);
			return [{}, data];
		}
		return [await jres.json(), {} as CustomError];
	} catch (error) {
		console.error(error);
		return [{}, error as CustomError]
	}
};

export const UpdateField = async (
	fieldName: string,
	fieldValue: string,
	url: string
): Promise<[object, Array<CustomError>]> => {
	const userObject: UserResponse = { user: {} };
	let formData: UserResponse | any;
	if (url.includes('/user/')) {
		formData = userObject;
		formData['user'][`${fieldName}`] = fieldValue;
	} else {
		formData[`${fieldName}`] = fieldValue;
	}

	const [response, err] = await handlePostRequestsWithPermissions(fetch, url, formData, 'PATCH');
	if (err.length > 0) {
		console.error(err);
		return [{}, err];
	}
	notificationData.update(() => `${formatText(fieldName)} has been updated successfully.`);
	return [response, []];
};
