export const getGhostData = async (fetch: any, key: string) => {
    const apiUrl = `https://msp-vedene.fr/blog/ghost/api/v3/content/posts/?key=${key}&fields=title,url,custom_excerpt,feature_image,feature_image_alt,published_at&limit=2`;
    try {
        const response = await fetch(apiUrl);
        if (response?.ok) {
            const articles = await response.json();
            console.log(articles);
            return articles;
        } else {
            const error = `HTTP Response Code: ${response?.status}`;
            console.error(error)
            throw new Error(error);
        }
    } catch (error) {
        return error;
    }
}