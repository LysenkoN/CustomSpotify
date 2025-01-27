import { getAccessToken } from './settings';
import { refreshToken } from './api_access';

export async function createPlayList(name, description, is_public) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const accessToken = getAccessToken();
    const params = new URLSearchParams();

    const result = await fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({'name': name, 'description': description, 'public': is_public})
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await createPlayList(name, description, is_public);
    }
}