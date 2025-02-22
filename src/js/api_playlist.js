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

export async function addTrackToPlayList(playlist_id, uri) {
    const accessToken = getAccessToken();
    const params = new URLSearchParams();

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({'uris': [uri]})
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await addTrackToPlayList(playlist_id, uri);
    }
}

export async function getUserPlayLists(limit) {
    const accessToken = getAccessToken();
    const params = new URLSearchParams();
    const profile = JSON.parse(localStorage.getItem('profile'));

    const result = await fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists?limit=${limit}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getUserPlayLists(limit);
    }
}

export async function getPlayListItems(playlist_id) {
    const accessToken = getAccessToken();
    const params = new URLSearchParams();

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getPlayListItems(playlist_id);
    }
}

export async function getPlayList(playlist_id) {
    const accessToken = getAccessToken();
    const params = new URLSearchParams();

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getPlayList(playlist_id);
    }
}