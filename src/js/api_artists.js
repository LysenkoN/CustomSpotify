import { clientId, getAccessToken, redirect_uri } from './settings';
import { refreshToken } from './api_access';
import { fetchTopArtists } from "./api_user_top.js";


export async function getArtist(artistId) {
    const accessToken = getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getArtist(artistId);
    }
}


export async function getHrefArtist(){
    const data = await fetchTopArtists();
    document.querySelectorAll(".profile-top-artists-main-item").forEach(item => {
        item.addEventListener("click", async (event) => {
            const index = [...document.querySelectorAll(".profile-top-artists-main-item")].indexOf(event.currentTarget);
            
            if (data.items[index]) {
                try{
                    console.log(await fetchArtists(data.items[index].href));
                }catch(error){
                    console.error(`Ошибка: ${error}`);
                }
            }
        });
    })
}

export async function fetchArtists(hrefArtists) {
    let accessToken = getAccessToken();
    const result = await fetch(`${hrefArtists}`, {
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

export async function getArtistPopularTracks(artistId) {
    const accessToken = getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (result.ok) {
        return result.json();
    } else if (result.status === 401) {
        await refreshToken();
        return await getArtistPopularTracks(artistId);
    }
}
