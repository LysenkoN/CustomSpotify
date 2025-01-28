import { getAccessToken } from './settings';
import { refreshToken } from './api_access'

export async function fetchProfile() {
    let accessToken = getAccessToken();
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    })
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await fetchProfile();
    }
}