export const clientId = "2730524e59464ae4a386af5d8114892a";
export const site_url = "http://localhost:8888";
export const redirect_uri = `${site_url}/callback`;
export const accessTokenVar = 'accessToken';
export const refreshTokenVar = 'refreshToken';

export function getAccessToken() {
    return localStorage.getItem(accessTokenVar);
}