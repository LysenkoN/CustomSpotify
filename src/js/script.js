import { clientId, redirect_uri, scopes, accessTokenVar, refreshTokenVar } from './settings';
import { getAccessTokenAPI } from './api_access';
import { getAlbum, getNewReleases } from './api_album';
import { createPlayList } from './api_playlist';
import { fetchProfile } from './api_users';

const params = new URLSearchParams(window.location.search);
let code = params.get("code");
let accessToken = undefined;

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    accessToken = localStorage.getItem(accessTokenVar); 
    if (!accessToken || accessToken === 'undefined') {
        let result = await getAccessTokenAPI(code);
        accessToken = result.access_token;
        localStorage.setItem(accessTokenVar, accessToken);
        localStorage.setItem(refreshTokenVar, result.refresh_token)
    }
    const profile = await fetchProfile();
    console.log(profile);
    localStorage.setItem('profile', JSON.stringify(profile));
    populateUI(profile);

    // Test API integrations are below
    // const test_releases = await getNewReleases(20, 0);
    // console.log(test_releases);
    // const test_album_id = test_releases.albums.items[0].id;
    // const test_album = await getAlbum(test_album_id);
    // console.log(test_album);
    // const test_track_id = test_album.tracks.items[0].id;
    // const new_playlist = await createPlayList('test_playlist', '', true);
    // console.log(new_playlist);
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirect_uri);
    params.append("scope", scopes);
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}