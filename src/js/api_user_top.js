import { getAccessToken } from './settings';
import { refreshToken } from './api_access';

export async function fetchTopArtists() {
    let accessToken = getAccessToken();
    const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await fetchTopArtists();
    } else {
        throw new Error(`Failed to fetch top artists: ${result.status}`);
    }
}
localStorage.setItem("topArtists", JSON.stringify(await fetchTopArtists()));