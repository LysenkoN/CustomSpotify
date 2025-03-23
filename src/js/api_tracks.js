import { clientId, getAccessToken, redirect_uri } from './settings';

export async function getUsersSavedTracks() {
    const accessToken = getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/me/tracks`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getUsersSavedTracks();
    }
}

export async function saveTrackForCurrentUser(trackId) {
    const accessToken = getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/me/tracks`, {
        method: "PUT", headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({'ids': [trackId]})
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await saveTrackForCurrentUser(trackId);
    }
}

export async function removeUsersSavedTracks(trackId) {
    const accessToken = getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/me/tracks`, {
        method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({'ids': [trackId]})
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await removeUsersSavedTracks(trackId);
    }
}