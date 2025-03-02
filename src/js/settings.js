export const clientId = "2730524e59464ae4a386af5d8114892a";
export const scopes = 'playlist-modify-public user-read-private user-read-email user-top-read user-follow-read';
export const site_url = "http://localhost:8888";
export const redirect_uri = `${site_url}/callback`;
export const accessTokenVar = 'accessToken';
export const refreshTokenVar = 'refreshToken';

export function getAccessToken() {
    return localStorage.getItem(accessTokenVar);
}