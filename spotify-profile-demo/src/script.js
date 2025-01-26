const clientId = "2730524e59464ae4a386af5d8114892a";
const params = new URLSearchParams(window.location.search);
const site_url = "http://localhost:8888";
const redirect_uri = `${site_url}/callback`;
let code = params.get("code");
let accessToken = undefined;

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    accessToken = localStorage.getItem('accessToken'); 
    if (!accessToken) {
        accessToken = await getAccessToken(clientId, code);
        console.log(accessToken)
        localStorage.setItem('accessToken', accessToken)
    }
    const profile = await fetchProfile(accessToken);
    populateUI(profile);

    // Test API integrations are below
    const test_releases = await getNewReleases(clientId, 20, 0);
    console.log(test_releases);
    const test_album_id = test_releases.albums.items[0].id;
    const test_album = await getAlbum(test_album_id);
    console.log(test_album);
    const test_track_id = test_album.tracks[0].id;
    
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirect_uri);
    params.append("scope", "user-read-private user-read-email");
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

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirect_uri);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
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


export async function refreshToken(clientId) {
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.accessToken);
    if (response.refreshToken) {
      localStorage.setItem('refresh_token', response.refreshToken);
    }
}


// Test API integrations are below

async function getNewReleases(clientId, limit, offset) {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("redirect_uri", redirect_uri);

    const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}&offset=${offset}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    return await result.json();
}

async function getAlbum(albumId) {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("redirect_uri", redirect_uri);

    const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    return await result.json();
}