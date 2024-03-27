import { variables } from '$lib/utils/constants';

export const getGhostData = async (fetch: any, key: string, count: number) => {
    const apiUrl = `${variables.BLOG_URI}/ghost/api/content/posts/?key=${key}&fields=title,url,custom_excerpt,feature_image,feature_image_alt,published_at&limit=${count}`;
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