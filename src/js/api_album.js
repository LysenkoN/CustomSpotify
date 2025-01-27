import { clientId, getAccessToken, redirect_uri } from './settings';

export async function getAlbum(albumId) {
    const params = new URLSearchParams();
    const accessToken = getAccessToken();
    params.append("client_id", clientId);
    params.append("redirect_uri", redirect_uri);

    const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getAlbum(albumId);
    }
}

export async function getNewReleases(limit, offset) {
    const params = new URLSearchParams();
    const accessToken = getAccessToken();
    params.append("client_id", clientId);
    params.append("redirect_uri", redirect_uri);

    const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}&offset=${offset}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getNewReleases(limit, offset);
    }
}

