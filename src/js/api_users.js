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

export async function followPlaylist(playlist_id, is_public) {
    let accessToken = getAccessToken();
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/followers`, {
        method: "PUT", headers: { Authorization: `Bearer ${accessToken}` },
        body: new URLSearchParams({
            "public": is_public
        }),
    })
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await followPlaylist(playlist_id, is_public);
    }
}

export async function unfollowPlaylist(playlist_id) {
    let accessToken = getAccessToken();
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/followers`, {
        method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await unfollowPlaylist(playlist_id);
    }
}

export async function getFollowedArtists(after, limit) {
    let accessToken = getAccessToken();
    let additional_params = '';
    if (after) {
        additional_params += `&after=${after}`
    }
    if (limit) {
        additional_params += `&limit=${limit}`
    }
    const result = await fetch(`https://api.spotify.com/v1/me/following?type=artist${additional_params}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getFollowedArtists(after, limit);
    }
}

export async function followArtistOrUser(type, ids) {
    let accessToken = getAccessToken();
    const result = await fetch(`https://api.spotify.com/v1/me/following?type=${type}`, {
        method: "PUT", headers: { Authorization: `Bearer ${accessToken}` },
        body: new URLSearchParams({
            "ids": ids
        }),
    })
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await followArtistOrUser(type, ids);
    }
}

export async function unfollowArtistOrUser(type, ids) {
    let accessToken = getAccessToken();
    const result = await fetch(`https://api.spotify.com/v1/me/following?type=${type}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` },
        body: new URLSearchParams({
            "ids": ids
        }),
    })
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await unfollowArtistOrUser(type, ids);
    }
}