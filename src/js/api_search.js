import { getAccessToken } from './settings';
import { refreshToken } from './api_access';

export async function searchAPI(text) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const accessToken = getAccessToken();
    const params = new URLSearchParams();

    const result = await fetch(`https://api.spotify.com/v1/search?limit=10&type=track,artist,album&q=artist%20${text}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await searchAPI(text);
    }
}