export async function load({ params, url }) {
    let redirect = url.searchParams.get('redirect');
    return { redirect: redirect};
}