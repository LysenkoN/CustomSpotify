import { clientId, redirect_uri, accessTokenVar, refreshTokenVar } from './settings';

export async function getAccessTokenAPI(code) {
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

    return await result.json();
}

export async function refreshToken() {
    const refreshToken = localStorage.getItem(refreshTokenVar);
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        // scope: "playlist-modify-public"
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem(accessTokenVar, response.access_token);
    if (response.refresh_token) {
      localStorage.setItem(refreshTokenVar, response.refresh_token);
    }
}