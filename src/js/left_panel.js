import { getUserPlayLists } from "./api_playlist";
import { getFollowedArtists } from "./api_users";
import { drawPlaylist, drawArtistPage } from "./create_playlist";

let mediatekaSearch = document.getElementById("mediateka_search");
let mediatekaInput = document.getElementById("mediateka_input");
let mediatekaInputBlock = document.getElementById("mediateka-input-container");
let listenToBlock = document.getElementsByClassName("search_listenedto")[0];
let mediaAdd = document.getElementById("media_add");
export let mediaAddBlock = document.getElementsByClassName("media-add-block")[0];
let body = document.getElementsByTagName('body')[0];
let playlistBlock = document.getElementById('playlist-block');
let followedArtistsBlock = document.getElementById('followed-artists-block');


mediatekaSearch.addEventListener("click",()=> {
    if (listenToBlock.classList.contains("active")) {
        mediatekaInputBlock.style.display="none";
        listenToBlock.classList.remove('active')
    }
    else {
        mediatekaInputBlock.style.display="inline-block";
        listenToBlock.classList.add('active')
    }
})

mediaAdd.addEventListener("click", (e)=> {
    e.stopImmediatePropagation();
    if (mediaAddBlock.classList.contains('active')) {
        mediaAddBlock.classList.remove('active');
    } 
    else {
        mediaAddBlock.classList.add('active');
    }
})

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

body.addEventListener("click", (e)=> {
    let target = e.target;
    let parent = findAncestor(target, 'media-add-block');
    if (!parent && mediaAddBlock.classList.contains('active')) {
        mediaAddBlock.classList.remove('active')
    }
})

export async function drawSavedTracks() {
    
}

export async function drawMyPlayLists() {
    const result = await getUserPlayLists(50);
    console.log(result);
    playlistBlock.innerHTML = '';
    result.items.forEach(item => {
        let img = item.images ? `<img class="left-block-playlists-img" src="${item.images[0].url}">` : '<div class="icon"></div>';
        playlistBlock.innerHTML += 
            `<div class="playlist_list" data-playlist_id="${item.id}">
                ${img}
                <div class="playlist_contanier">
                    <div class="name_artist">${item.name}</div>
                    <div class="role_artist">${item.owner.display_name}</div> 
                </div>
            </div>`
    })

    let elements = document.getElementsByClassName('playlist_list');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", async(e) => {
            let target = e.target;
            let parent = findAncestor(target, 'playlist_list');
            if (parent) {
                drawPlaylist(parent.getAttribute("data-playlist_id"));
            }
        })
    }
}

export async function drawFollowedArtists() {
    const result = await getFollowedArtists(null, 10);
    console.log(result);
    followedArtistsBlock.innerHTML = '';
    result.artists.items.forEach(item => {
        let img = item.images ? `<img class="left-block-followed-artists-img" src="${item.images[0].url}">` : '<div class="icon1"></div>';
        followedArtistsBlock.innerHTML += 
            `<div id="followed_artist_list" class="followed-artists-list" data-followed_id="${item.id}">
                ${img}
                <div class="followed-artists-contanier">
                    <div class="name_artist">${item.name}</div>
                    <div class="role_artist">Исполнитель</div> 
                </div>
            </div>`
    })

    let elements = document.getElementsByClassName('followed-artists-list');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", async(e) => {
            let target = e.target;
            let parent = findAncestor(target, 'followed-artists-list');
            if (parent) {
                drawArtistPage(parent.getAttribute("data-followed_id"));
            }
        })
    }
}