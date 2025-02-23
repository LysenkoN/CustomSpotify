import { addTrackToPlayList, getUserPlayLists, createPlayList, getPlayListItems, getPlayList } from "./api_playlist";
import { searchAPI } from "./api_search";
const drawPlayListBtn = document.getElementsByClassName("media-add-contanier")[0];
let user_profile = JSON.parse(localStorage.getItem('profile'));
let playlist_id = null;

export async function drawPlaylist(id){
    playlist_id = id;
    let playlist_name = '';
    if (playlist_id) {
        let playlist = await getPlayList(playlist_id);
        playlist_name = playlist.name;
    }
    document.getElementsByClassName("secti-el")[0].innerHTML = `
        <div class="playlist_block">
            <div class="playlist-data">
                <div id="pictureBlock" class="playlist-data-picture"></div>
                <div class="playlist-data-block">
                    <span> Плейлист </span>
                    <span class="my-playlist">${playlist_name}</span>
                    <div class="profile-img-username">
                        <img src=${user_profile.images[1].url}>
                        <span>${user_profile.display_name}</span>
                    </div>        
                </div> 
            </div>
        </div>
        <div id="playlist_tracks">
        </div>
        <div class="search-items-block">
            <span>Давай добавим что-нибудь в твой плейлист</span>
            <input placeholder="Поиск треков" id="search_tracks">
            <div id="search-artist-list-block"></div>
            <div id="search-track-list-block"></div>
            <div id="search-album-list-block"></div>
        </div>
`;  
    refreshPage();
    let search_tracks = document.getElementById('search_tracks');
    search_tracks.addEventListener('keyup', async(e)=> {
        let text = e.target.value;
        let artists_block = document.getElementById('search-artist-list-block');
        let tracks_block = document.getElementById('search-track-list-block');
        let albums_block = document.getElementById('search-album-list-block');
        artists_block.innerHTML = '';
        tracks_block.innerHTML = '';
        albums_block.innerHTML = '';
        if (text) {
            const result = await searchAPI(text);
            // result.artists.items.forEach(item => {
            //     if (item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
            //         artists_block.innerHTML += 
            //             `<div class="drawlist">
            //                 <div class="icon-artist"><img src=${item.images[2].url}></div>
            //                 <div class="drawplaylist_contanier">
            //                     <div class="name_artist1">${item.name}</div>
            //                     <div class="name_track1">Исполнитель</div> 
            //                 </div>
            //             </div>`
                    
            //     }
            // })
            result.tracks.items.forEach(item => {
                if (item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                    console.log('track', item)
                    tracks_block.innerHTML += 
                        `<div class="drawlist">
                            <div class="icon-artist"><img src=${item.album.images[2].url}></div>
                            <div class="drawplaylist_contanier">
                                <div class="name_artist1">${item.name}</div>
                                <div class="name_track1">Исполнитель</div>
                                <button class="add_track" data-track_id="${item.uri}">Добавить</button> 
                            </div>
                        </div>`
                }
            })
            // result.albums.items.forEach(item => {
            //     if (item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
            //         console.log('album', item)
            //         tracks_block.innerHTML += 
            //             `<div class="drawlist">
            //                 <div class="icon-artist"><img src=${item.images[2].url}></div>
            //                 <div class="drawplaylist_contanier">
            //                     <div class="name_artist1">${item.name}</div>
            //                     <div class="name_track1">Исполнитель</div> 
            //                 </div>
            //             </div>`
            //     }
            // })
        }
        let elements = document.getElementsByClassName('add_track');
        console.log(elements)

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", async(e) => {
                if (!playlist_id) {
                    const result = await getUserPlayLists(1);
                    console.log(result)
                    let name = `Мой плейлист ${result.total+1}`;
                    const playlist = await createPlayList(name, '', true);
                    playlist_id = playlist.id;
                }
                let res = await addTrackToPlayList(playlist_id, e.target.getAttribute('data-track_id'));
                refreshPage();
            })
        }
    })
}
async function refreshPage() {
    let items = await getPlayListItems(playlist_id);
    console.log(items)
    let playlist_tracks = document.getElementById('playlist_tracks');
    playlist_tracks.innerHTML = '';
    // result.items.forEach(item => {
    //     if (item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
    //         console.log('track', item)
    //         playlist_tracks.innerHTML += 
    //             !!!DO HTML HERE!!!
    //     }
    // })

}
drawPlayListBtn.addEventListener("click", ()=> {
    drawPlaylist();
    mediaAddBlock.classList.remove('active');
})
