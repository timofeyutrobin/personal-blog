import { SUPABASE_STORAGE_PHOTOS_URL, SUPABASE_STORAGE_COVERS_URL, SUPABASE_STORAGE_SITE_URL } from '$env/static/private';

export async function load() {
    return {
        photosUrlPrefix: SUPABASE_STORAGE_PHOTOS_URL,
        coversUrlPrefix: SUPABASE_STORAGE_COVERS_URL,
        siteUrlPrefix: SUPABASE_STORAGE_SITE_URL
    };
};
