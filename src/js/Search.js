import {searchAPI} from "./api_search.js";
import {homeStroke} from "./buttonHome.js";
import {topArtists} from "./profile.js";

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
                </div>
            </div>
        </div>
        <div class="search-artists">
            <div class="search-artists-title">Исполнители</div>
            <div class="search-artists-main"></div>
        </div>
    </div>
    `;
    homeStroke();
    spawnItemTrack(data);
    topArtists(data.artists.items, ".search-artists-main");
    document.getElementsByClassName("search-artists-title")[0].addEventListener("click", ()=>{openPageArtists(data)});
}

const msToS = (ms) => Math.floor(ms / 1000);
const sToM = (s) => Math.floor(s / 60);
const seconds = (min,sec) =>{
    const resultMin = min * 60;
    return sec - resultMin;
}

function getArtistsTrack(artistsArr) {
    let result = [];
    for (let i = 0; i < artistsArr.length; i++) {
        result.push(artistsArr[i].name);
    }

    if(result.length !== 1){
        return result.join(",");
    }else{
        return result[0];
    }
}


function spawnItemTrack(data){
    for(let i = 0; i < 4; i+=1){
        const htmlItem = `
                    <div class="track-serch-block-item">
                        <div class="track-serch-block-item-info-track">
                            <div class="track-serch-block-item-info-track-picture">
                                <img style="width: 40px; height: 40px;" class="info-track-image" src="${data.tracks.items[i].album.images[2].url}" alt="#"></img>
                            </div>
                            <div class="track-serch-block-item-info-track-names">
                                <div class="info-track-trackName">${data.tracks.items[i].name}</div>
                                <div class="info-track-artistName">${getArtistsTrack(data.tracks.items[i].artists)}</div>
                            </div>
                        </div>
                        <div class="track-serch-block-item-time">${sToM(msToS(data.tracks.items[i].duration_ms))}:${seconds(sToM(msToS(data.tracks.items[i].duration_ms)), msToS(data.tracks.items[i].duration_ms))}</div>
                    </div>
        `;
        document.getElementsByClassName("track-serch-block")[0].innerHTML += htmlItem;
    }
}

function openPageArtists(data){
    document.querySelector(".secti-el").innerHTML = `
    <div class="search-artists">
        <div class="search-artists-title">Исполнители</div>
        <div style="flex-wrap: wrap; width: 100%; gap:5.5px;" class="search-artists-main"></div>
    </div>
`;
topArtists(data.artists.items, ".search-artists-main");
}