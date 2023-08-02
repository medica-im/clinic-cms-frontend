import { variables } from '$lib/utils/constants';

export const getEffectors = async (fetch: any) => {
    const apiUrl = `${variables.BASE_API_URI}/effectors`;
    try {
        const response = await fetch(apiUrl);
        if (response?.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = `HTTP Response Code: ${response?.status}`;
            console.error(error)
            throw new Error(error);
        }
    } catch (error) {
        return null;
    }
}