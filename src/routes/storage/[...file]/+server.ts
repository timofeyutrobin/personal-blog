import { PUBLIC_BLOB_BASE_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function GET({ params, fetch }) {
    const raw = params.file ?? '';

    if (!raw || raw.includes('..') || raw.startsWith('/')) {
        throw error(400, 'Invalid file path');
    }

    const url = new URL(raw.replace(/^\/+/, ''), PUBLIC_BLOB_BASE_URL);

    const response = await fetch(url);

    if (!response.ok) {
        throw error(response.status, 'File not found');
    }

    const headers = new Headers(response.headers);

    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(response.body, {
        status: response.status,
        headers
    });
}
