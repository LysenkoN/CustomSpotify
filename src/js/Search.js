import {searchAPI} from "./api_search.js";
import {homeStroke} from "./buttonHome.js";

const searchInput = document.getElementsByClassName("header-search-input")[0];
searchInput.addEventListener("change", async ()=>{
    try{
        const data = await searchAPI(searchInput.value)
        searchtml(data);
        console.log(data);
    }catch(error){
        console.error("Ошибка загрузки топ-артистов:", error);
    }
});

const msToS = (ms) => ms / 60000;

function searchtml(data){
    document.querySelector(".secti-el").innerHTML = `
        <div class="search">
        <div class="artist-track">
            <div class="artist-serch">
                <div class="artist-serch-title">Лучший результат</div>
                <div class="artist-serch-block">
                    <img class="artist-serch-block-picture" src="${data.artists.items[0].images[1].url}" alt="#">
                    <div class="artist-serch-block-info">
                        <h2 class="artist-serch-block-name">${data.artists.items[0].name}</h2>
                        <p class="artist-serch-block-text">Исполнитель</p>
                    </div>
                </div>
            </div>
            <div class="track-serch">
                <div class="track-serch-title">Треки</div>
                <div class="track-serch-block">
                    <div class="track-serch-block-item">
                        <div class="track-serch-block-item-info-track">
                            <div class="track-serch-block-item-info-track-picture">
                                <img style="width: 40px; height: 40px;" class="info-track-image" src="${data.tracks.items[0].album.images[2].url}" alt="#"></img>
                            </div>
                            <div class="track-serch-block-item-info-track-names">
                                <div class="info-track-trackName">${data.tracks.items[0].name}</div>
                                <div class="info-track-artistName">${data.tracks.items[0].artists[0].name}, ${data.tracks.items[0].artists[1].name}</div>
                            </div>
                        </div>
                        <div class="track-serch-block-item-time">${msToS(data.tracks.items[0].duration_ms)}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    homeStroke();
}