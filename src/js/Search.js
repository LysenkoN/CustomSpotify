import {searchAPI} from "./api_search.js";
import {homeStroke} from "./buttonHome.js";
import {topArtists} from "./profile.js";
import {playTrack} from "./player.js";
import {getHrefArtistToSearch} from "./api_artists.js";

const searchInput = document.getElementsByClassName("header-search-input")[0];
const searchInputButton = document.getElementsByClassName("svg-search")[0];

// Получаем ответ на запос по поиску
async function getSearch() {
    try{
        const data = await searchAPI(searchInput.value)
        searchtml(data);
        getHrefArtistToSearch(data.artists);
    }catch(error){
        console.error("Ошибка загрузки топ-артистов:", error);
    }
}

searchInput.addEventListener("input", getSearch);
searchInput.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        getSearch();
    }
});
searchInputButton.addEventListener("click", getSearch);


// Выводим на страницу результат поиска
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
    spawnItemTrack(data, 4); // Показываем на странице первые 4 трека 
    document.getElementsByClassName("track-serch-title")[0].addEventListener("click", ()=>{openPageTracks(data, data.tracks.items.length)});
    topArtists(data.artists.items, ".search-artists-main"); // Показываем на странице ряд артистов
    document.getElementsByClassName("search-artists-title")[0].addEventListener("click", ()=>{openPageArtists(data)});
}

// Перевод милисекунд в минуты и секунды
const msToS = (ms) => Math.floor(ms / 1000);
const sToM = (s) => Math.floor(s / 60);
const seconds = (min,sec) =>{
    const resultMin = min * 60;
    return sec - resultMin;
}
// Функция для оброботки секунд которые меньше 10 (добовляем в начало нолик )) )
function secondThatLessThanTen(min, sec){
    if(seconds(min, sec) >= 10){
        return seconds(min, sec);
    }else{
        return `0${seconds(min, sec)}`
    }
}

// Получаем всех артистов треков
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

// Добовляем на страницу треки
function spawnItemTrack(data, count){
    for(let i = 0; i < count; i+=1){
        const htmlItem = `
                    <div data-track-id="${i}" class="track-serch-block-item">
                        <div class="track-serch-block-item-info-track">
                            <div class="track-serch-block-item-info-track-picture">
                                <img style="width: 40px; height: 40px;" class="info-track-image" src="${data.tracks.items[i].album.images[2].url}" alt="#"></img>
                            </div>
                            <div class="track-serch-block-item-info-track-names">
                                <div class="info-track-trackName">${data.tracks.items[i].name}</div>
                                <div class="info-track-artistName">${getArtistsTrack(data.tracks.items[i].artists)}</div>
                            </div>
                        </div>
                        <div class="track-serch-block-item-time">${sToM(msToS(data.tracks.items[i].duration_ms))}:${secondThatLessThanTen(sToM(msToS(data.tracks.items[i].duration_ms)), msToS(data.tracks.items[i].duration_ms))}</div>
                    </div>
        `;
        document.getElementsByClassName("track-serch-block")[0].innerHTML += htmlItem;
    }

    getItemsToPlaySearchTrack(data, count);
}

// Возможность открыть полную страницу с исполнителями
function openPageArtists(data){
    document.querySelector(".secti-el").innerHTML = `
    <div class="search-artists">
        <div class="search-artists-title">Исполнители</div>
        <div style="flex-wrap: wrap; width: 100%; gap:5.5px;" class="search-artists-main"></div>
    </div>
`;
topArtists(data.artists.items, ".search-artists-main");
}

// Возможность открыть полную страницу с треками
function openPageTracks(data, count){
    document.querySelector(".secti-el").innerHTML = `
            <div style="width:100%;" class="track-serch">
                <div class="track-serch-block"></div>
            </div>
    `;
    spawnItemInPageTracks(data, count);
}

// Добовляем на страницу треки с небольшими изменениями
function spawnItemInPageTracks(data, count){
    for(let i = 0; i < count; i+=1){
        const htmlItem = `
                    <div data-track-id="${i}" class="track-serch-block-item">
                        <div class="track-serch-block-item-info-track">
                            <?xml version="1.0" ?><svg class="button-play" height="18" viewBox="0 0 48 48" width="18" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M-838-2232H562v3600H-838z" fill="none"/><path d="M16 10v28l22-14z"/><path d="M0 0h48v48H0z" fill="none"/></svg>
                            <p class="counter-tracks">${i+1}</p>
                            <div class="track-serch-block-item-info-track-picture">
                                <img style="width: 40px; height: 40px;" class="info-track-image" src="${data.tracks.items[i].album.images[2].url}" alt="#"></img>
                            </div>
                            <div class="track-serch-block-item-info-track-names">
                                <div class="info-track-trackName">${data.tracks.items[i].name}</div>
                                <div class="info-track-artistName">${getArtistsTrack(data.tracks.items[i].artists)}</div>
                            </div>
                        </div>
                        <div class="track-serch-block-item-time">${sToM(msToS(data.tracks.items[i].duration_ms))}:${secondThatLessThanTen(sToM(msToS(data.tracks.items[i].duration_ms)), msToS(data.tracks.items[i].duration_ms))}</div>
                    </div>
        `;
        document.getElementsByClassName("track-serch-block")[0].innerHTML += htmlItem;
    }


    getItemsToPlaySearchTrack(data, count);
}


//функции для проигревания треков
function playSearchTrack(data, count, id){
    const arr = [];

    for(let i = 0; i < count; i+=1){
        arr.push(data.tracks.items[i].uri);
    }

    playTrack(arr, id);
}
function getItemsToPlaySearchTrack(data, count){
    const buttonPlay = document.querySelectorAll(".track-serch-block-item");
    for(let i = 0; buttonPlay.length > i; i += 1){
        buttonPlay[i].addEventListener("click", (ev)=>{
            playSearchTrack(data, count, ev.target.getAttribute("data-track-id"));
        });
    }
}