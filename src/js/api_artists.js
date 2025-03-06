import { getAccessToken } from './settings';
import { refreshToken } from './api_access';
import { fetchTopArtists } from "./api_user_top.js";
const data = await fetchTopArtists();

export function getHrefArtist(){
    document.querySelectorAll(".profile-top-artists-main-item").forEach(item => {
        item.addEventListener("click", (event) => {
            const index = [...document.querySelectorAll(".profile-top-artists-main-item")].indexOf(event.currentTarget);
            
            if (data.items[index]) {
                const hrefArtists = data.items[index].href;
                const dataArtists = fetchArtists(hrefArtists);
                console.log(dataArtists);
            } else {
                console.error("Ошибка: Артист не найден в data.items");
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