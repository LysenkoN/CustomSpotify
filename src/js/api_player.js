import { getAccessToken } from './settings';
import { refreshToken } from './api_access';

export async function addItemToPlaybackQueue(uri) {
    const accessToken = getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await addItemToPlaybackQueue(uri);
    }
}