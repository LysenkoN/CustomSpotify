import { clientId, getAccessToken, redirect_uri } from './settings';

export async function getArtist(artistId) {
    const accessToken = getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getArtist(artistId);
    }
}