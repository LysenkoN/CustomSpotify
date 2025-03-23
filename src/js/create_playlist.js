import { addTrackToPlayList, getUserPlayLists, createPlayList, deleteTrackFromPlayList, getPlayListItems, getPlayList } from "./api_playlist";
import { searchAPI } from "./api_search";
import { getArtist } from "./api_artists";
import { getArtistPopularTracks } from "./api_artists";
import {mediaAddBlock, drawMyPlayLists} from "./left_panel";
import {playTrack} from './player.js';
const drawPlayListBtn = document.getElementsByClassName("media-add-contanier")[0];
let user_profile = JSON.parse(localStorage.getItem('profile'));
let playlist_id = null;

const timeDict = {
    'seconds': ['секунду', 'секунды', 'секунд'],
    'minutes': ['минуту', 'минуты', 'минут'],
    'hours': ['час', 'часа', 'часов'],
    'days': ['день', 'дня', 'дней'],
    'weeks': ['неделю', 'недели', 'недель'],
    'months': ['месяц', 'месяца', 'месяцев'],
    'years': ['год', 'года', 'лет'],
}

async function getNewPlaylistName() {
    const result = await getUserPlayLists(1);
    return `Мой плейлист ${result.total+1}`;
}

async function deleteTrack(playlist, track_uri) {
    console.log(playlist)
    await deleteTrackFromPlayList(playlist, track_uri);
    playlist = await getPlayList(playlist.id);
    drawPlaylistTracks(playlist);
}



async function drawPlaylistTracks(playlist) {
    let tracksHTML = '';
    let num = 0;
    playlist.tracks.items.forEach(track => {
        console.log(track)
        let artist_names = [];
        track.track.artists.forEach(a => {
            artist_names.push(a.name)
        })
        num += 1;
        tracksHTML += `
        <div class="drawtracksplaylist_contanier">
                <div class="number_icon">${num}</div><div class="play_icon"><svg class='play_icon_svg' data-src=${track.track.uri} fill="white" xmlns="http://www.w3.org/2000/svg" 
	 width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
<path d="M8,43.7V8.3c0-1,1.3-1.7,2.2-0.9l33.2,17.3c0.8,0.6,0.8,1.9,0,2.5L10.2,44.7C9.3,45.4,8,44.8,8,43.7z"/>
</svg></div>
                <!--This is a comment. Comments are not displayed in the browser-->
                <div class="name_line name-line-block">
                    <div class="icon-artist2"><img src=${track.track.album.images[2].url}></div>
                    <div class="track_artist_block">
                        <div class="name_track2">${track.track.name}</div>
                        <div class="name_artist2">${artist_names.join(', ')}</div>
                    </div>          
                </div>
                <!--This is a comment. Comments are not displayed in the browser-->
                  <span class="album_track_name album_line">${track.track.album.name}</span>
                  <!--This is a comment. Comments are not displayed in the browser-->
                  <span class="date_added_track date_line">${parseTime(track.added_at)}</span>
                  <!--This is a comment. Comments are not displayed in the browser-->
                  <span class="duration_time_track duration_line">${getDuration(track.track.duration_ms)}</span>
                  <span class="delete_track_from_list" data-track_uri="${track.track.uri}"><svg class="bin" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25V3.75ZM22.5 5.25C22.9142 5.25 23.25 4.91421 23.25 4.5C23.25 4.08579 22.9142 3.75 22.5 3.75V5.25ZM1.5 5.25H22.5V3.75H1.5V5.25Z" fill="#71717A"/>
<path d="M9.75 1.5V0.75V1.5ZM8.25 3H7.5H8.25ZM7.5 4.5C7.5 4.91421 7.83579 5.25 8.25 5.25C8.66421 5.25 9 4.91421 9 4.5H7.5ZM15 4.5C15 4.91421 15.3358 5.25 15.75 5.25C16.1642 5.25 16.5 4.91421 16.5 4.5H15ZM15.75 3H16.5H15.75ZM14.25 0.75H9.75V2.25H14.25V0.75ZM9.75 0.75C9.15326 0.75 8.58097 0.987053 8.15901 1.40901L9.21967 2.46967C9.36032 2.32902 9.55109 2.25 9.75 2.25V0.75ZM8.15901 1.40901C7.73705 1.83097 7.5 2.40326 7.5 3H9C9 2.80109 9.07902 2.61032 9.21967 2.46967L8.15901 1.40901ZM7.5 3V4.5H9V3H7.5ZM16.5 4.5V3H15V4.5H16.5ZM16.5 3C16.5 2.40326 16.2629 1.83097 15.841 1.40901L14.7803 2.46967C14.921 2.61032 15 2.80109 15 3H16.5ZM15.841 1.40901C15.419 0.987053 14.8467 0.75 14.25 0.75V2.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967L15.841 1.40901Z" fill="#71717A"/>
<path d="M9 17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25H9ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75H10.5ZM10.5 17.25V9.75H9V17.25H10.5Z" fill="#71717A"/>
<path d="M13.5 17.25C13.5 17.6642 13.8358 18 14.25 18C14.6642 18 15 17.6642 15 17.25H13.5ZM15 9.75C15 9.33579 14.6642 9 14.25 9C13.8358 9 13.5 9.33579 13.5 9.75H15ZM15 17.25V9.75H13.5V17.25H15Z" fill="#71717A"/>
<path d="M18.865 21.124L18.1176 21.0617L18.1176 21.062L18.865 21.124ZM17.37 22.5L17.3701 21.75H17.37V22.5ZM6.631 22.5V21.75H6.63093L6.631 22.5ZM5.136 21.124L5.88343 21.062L5.88341 21.0617L5.136 21.124ZM4.49741 4.43769C4.46299 4.0249 4.10047 3.71818 3.68769 3.75259C3.2749 3.78701 2.96818 4.14953 3.00259 4.56231L4.49741 4.43769ZM20.9974 4.56227C21.0318 4.14949 20.7251 3.78698 20.3123 3.75259C19.8995 3.7182 19.537 4.02495 19.5026 4.43773L20.9974 4.56227ZM18.1176 21.062C18.102 21.2495 18.0165 21.4244 17.878 21.5518L18.8939 22.6555C19.3093 22.2732 19.5658 21.7486 19.6124 21.186L18.1176 21.062ZM17.878 21.5518C17.7396 21.6793 17.5583 21.75 17.3701 21.75L17.3699 23.25C17.9345 23.25 18.4785 23.0379 18.8939 22.6555L17.878 21.5518ZM17.37 21.75H6.631V23.25H17.37V21.75ZM6.63093 21.75C6.44274 21.75 6.26142 21.6793 6.12295 21.5518L5.10713 22.6555C5.52253 23.0379 6.06649 23.25 6.63107 23.25L6.63093 21.75ZM6.12295 21.5518C5.98449 21.4244 5.89899 21.2495 5.88343 21.062L4.38857 21.186C4.43524 21.7486 4.69172 22.2732 5.10713 22.6555L6.12295 21.5518ZM5.88341 21.0617L4.49741 4.43769L3.00259 4.56231L4.38859 21.1863L5.88341 21.0617ZM19.5026 4.43773L18.1176 21.0617L19.6124 21.1863L20.9974 4.56227L19.5026 4.43773Z" fill="#71717A"/>
</svg></span>

                
        </div> 
        `
    })
    document.getElementById('tracks_artists_album_block').innerHTML = tracksHTML;
    // Here must be listener on the different events with tracks
    Array.from(document.getElementsByClassName("delete_track_from_list")).forEach(elm => {
        elm.addEventListener("click", ()=> {
            let track_uri = elm.getAttribute("data-track_uri");
            console.log(track_uri)
            deleteTrack(playlist, track_uri)
        })
    })
    Array.from(document.getElementsByClassName('play_icon_svg')).forEach(elm => {
        elm.addEventListener('click', ()=> {
            initPlaylist(elm);
        })
    })
}

function initPlaylist(elm) {
    let allSrcs = [];
    Array.from(document.getElementsByClassName('play_icon_svg')).forEach(e => {allSrcs.push(e.getAttribute('data-src'))});
    let src = elm.getAttribute('data-src');
    console.log(allSrcs)
    playTrack(allSrcs, allSrcs.indexOf(src))
}


async function drawTmpPlayList(playlist, user_profile){
    console.log(playlist)
    document.getElementsByClassName("secti-el")[0].innerHTML = `
        <div class="playlist_block">
            <div class="playlist-data">
                <div id="pictureBlock" class="playlist-data-picture"></div>
                <div class="playlist-data-block">
                    <span> Плейлист </span>
                    <span class="my-playlist">${playlist.name}</span>
                    <div class="profile-img-username">
                        <img src=${user_profile.images[1].url}>
                        <span>${user_profile.display_name}</span>
                    </div>        
                </div> 
            </div>
        </div>
        <div id="playlist_tracks">
        </div>
        <div class="play_this_playlist_block">
            <div class="play_this_playlist_button"></div>
        </div>
        <br>
        <div class="header_tracklists_line">
            <span class="number_icon">#</span><!----><span class="name_line">Название</span><!----><span class="album_line">Альбом</span><!----><span class="date_line">Дата добавления</span><!---->
        </div>
        <hr>
        <div id="tracks_artists_album_block" class="tracks_artists_album_block">
        </div>
        <div class="search-items-block">
            <span>Давай добавим что-нибудь в твой плейлист</span>
            <input placeholder="Поиск треков" id="search_tracks">
            <div id="search-artist-list-block"></div>
            <div id="search-track-list-block"></div>
            <div id="search-album-list-block"></div>
        </div>
    `;
    drawPlaylistTracks(playlist);
}


// async function drawEmptyPlayList(playlist, user_profile){
//     document.getElementsByClassName("secti-el")[0].innerHTML = `
//         <div id="search_playlist_block" class="playlist_block">
//             <div class="playlist-data">
//                 <div id="pictureBlock" class="playlist-data-picture"></div>
//                 <div class="playlist-data-block">
//                     <span> Плейлист </span>
//                     <span class="my-playlist">${playlist.name}</span>
//                     <div class="profile-img-username">
//                         <img src=${user_profile.images[1].url}>
//                         <span>${user_profile.display_name}</span>
//                     </div>        
//                 </div> 
//             </div>
//         </div>
//         <div id="playlist_tracks">
//         </div>
//         <div class="search-items-block">
//             <span>Давай добавим что-нибудь в твой плейлист</span>
//             <input placeholder="Поиск треков" id="search_tracks">
//             <div id="search-artist-list-block"></div>
//             <div id="search-track-list-block"></div>
//             <div id="search-album-list-block"></div>
//         </div>
//     `;  
// }

function timePlurality (num, timeType) {
    let remaind = num % 10;
    if (remaind === 1 && num !== 11) {
        return timeDict[timeType][0]
    }
    if ([2,3,4].includes(remaind) && (num < 5 || num > 20)) {
        return timeDict[timeType][1]
    }
    return timeDict[timeType][2]
}

function parseTime(strTime) {
    let trackAdded =  Date.parse(strTime);
    let now = Date.now();
    let miliseconds = now - trackAdded;
    let seconds = Math.floor(miliseconds / 1000);
    if(seconds < 60) {
        return `${seconds} ${timePlurality(seconds, 'seconds')} назад`
    } 
    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} ${timePlurality(minutes, 'minutes')} назад`
    }
    let hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ${timePlurality(hours, 'hours')} назад`
    }
    let days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} ${timePlurality(days, 'days')} назад`
    }
    let weeks = Math.floor(days / 7);
    if (weeks < 5) {
        return `${weeks} ${timePlurality(weeks, 'weeks')} назад`
    }
    let months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} ${timePlurality(months, 'months')} назад`
    }
    let years = Math.floor(days / 365);
    return `${years} ${timePlurality(years, 'years')} назад`

}
function getDuration(duration_ms){
    console.log(duration_ms)
    let seconds = Math.floor(duration_ms / 1000);
    let secondsToHTML = seconds % 60;
    if (secondsToHTML < 10) {
        secondsToHTML = `0${secondsToHTML}`
    }
    return `${Math.floor(seconds / 60)}:${secondsToHTML}`


}
// function drawNonEmptyPlayList(playlist, user_profile) {
//     let tracksHTML = '';
//     let d= '';
//     let num = 0;
//     playlist.tracks.items.forEach(track => {
//         console.log(track)
//         let artist_names = [];
//         track.track.artists.forEach(a => {
//             artist_names.push(a.name)
//         })
//         num += 1;
//         tracksHTML += `
//         <div class="drawtracksplaylist_contanier">
//                 <div class="number_icon">${num}</div>
//                 <!--This is a comment. Comments are not displayed in the browser-->
//                 <div class="name_line name-line-block">
//                     <div class="icon-artist2"><img src=${track.track.album.images[2].url}></div>
//                     <div class="track_artist_block">
//                         <div class="name_track2">${track.track.name}</div>
//                         <div class="name_artist2">${artist_names.join(', ')}</div>
//                     </div>          
//                 </div>
//                 <!--This is a comment. Comments are not displayed in the browser-->
//                   <span class="album_track_name album_line">${track.track.album.name}</span>
//                   <!--This is a comment. Comments are not displayed in the browser-->
//                   <span class="date_added_track date_line">${parseTime(track.added_at)}</span>
//                   <!--This is a comment. Comments are not displayed in the browser-->
//                   <span class="duration_time_track duration_line">${getDuration(track.duration_ms)}</span>  
                
//         </div> 
//         `
//     })
//     document.getElementsByClassName("secti-el")[0].innerHTML = `
//         <div class="playlist_block">
//             <div class="playlist-data">
//                 <div id="pictureBlock" class="playlist-data-picture"></div>
//                 <div class="playlist-data-block">
//                     <span> Плейлист </span>
//                     <span class="my-playlist">${playlist.name}</span>
//                     <div class="profile-img-username">
//                         <img src=${user_profile.images[1].url}>
//                         <span>${user_profile.display_name}</span>
//                     </div>        
//                 </div> 
//             </div>
//         </div>
//         <div id="playlist_tracks">
//         </div>
//         <div class="play_this_playlist_block">
//             <div class="play_this_playlist_button"></div>
//         </div>
//         <br>
//         <div class="header_tracklists_line">
//             <span class="number_icon">#</span><!----><span class="name_line">Название</span><!----><span class="album_line">Альбом</span><!----><span class="date_line">Дата добавления</span><!----><span class="duration_line">◷</span>
//         </div>
//         <hr>
//         <div class="tracks_artists_album_block">
     
//                ${tracksHTML}
        
    
//         </div>
        
//         `
// }

function searchLogic(playlist) {
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
                                <div class="name_track1">${item.artists[0].name}</div>    
                            </div>
                            <div class="album_name">${item.album.name}</div>
                            <div class="add_track_wrap"><button class="add_track" data-track_id="${item.uri}">Добавить</button></div>
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
                await addTrackToPlayList(playlist_id, e.target.getAttribute('data-track_id'));
                playlist = await getPlayList(playlist_id);
                drawPlaylistTracks(playlist);
            })
        }
    })
}

export async function drawPlaylist(id){
    playlist_id = id;
    let playlist_name = '';
    let playlist = null;
    if (playlist_id) {
        playlist = await getPlayList(playlist_id);
        playlist_name = playlist.name;
    }
    else {
        playlist_name = await getNewPlaylistName();
        playlist = await createPlayList(playlist_name, '', true);
        playlist_id = playlist.id;
        drawMyPlayLists();
    }
    console.log(playlist)

    await drawTmpPlayList(playlist, user_profile);
    searchLogic(playlist);

    // if (playlist.tracks.items.length) {
    //     drawNonEmptyPlayList(playlist, user_profile)
    // }
    // else {
    //     await drawEmptyPlayList(playlist, user_profile);
    //     searchLogic();
    // }  
    // refreshPage();
}
// async function refreshPlaylistTracks() {
//     let items = await getPlayListItems(playlist_id);
//     console.log(items)
//     let playlist_tracks = document.getElementById('playlist_tracks');
//     playlist_tracks.innerHTML = '';
//     result.items.forEach(item => {
//         if (item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
//             console.log('track', item)
//             playlist_tracks.innerHTML += `

//             `
                
//         }
//     })
// }

drawPlayListBtn.addEventListener("click", (e)=> {
    e.stopImmediatePropagation();
    drawPlaylist();
    mediaAddBlock.classList.remove('active');
})

export async function drawArtistPage(artistId) {
    let artist_data = await getArtist(artistId);
    let artist_popular_track_list = await getArtistPopularTracks(artistId);
    let tracksHTML = '';
    let ind = 0;
    artist_popular_track_list.tracks.forEach(track => {
        console.log(track);
        ind ++;
        tracksHTML += `
        <div class="track_block">
        <span class="track_num">${ind}</span><span class="track_play"><svg  class='play_icon_svg' data-src=${track.uri} fill="white" xmlns="http://www.w3.org/2000/svg" 
	 width="20px" height="20px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
<path d="M8,43.7V8.3c0-1,1.3-1.7,2.2-0.9l33.2,17.3c0.8,0.6,0.8,1.9,0,2.5L10.2,44.7C9.3,45.4,8,44.8,8,43.7z"/>
</svg></span>
        <div class="track_img"><img src="${track.album.images[2].url}"></div>
        <span class="track_name">${track.name}</span>
        <span class="popularity">${track.popularity}</span>
        <span class="track_duration">${getDuration(track.duration_ms)}</span>
        </div>
        `;
    })
    document.getElementsByClassName("secti-el")[0].innerHTML = `
        <div class="artist_block">
            <div class="artist-data">

                <div class="artist-data-block">
                    <div class="verify-block">
                        <span>
                            <svg class="verify_icon" data-encore-id="verifiedBadge" role="img" aria-hidden="false" class="e-9640-icon encore-announcement-set b0NcxAbHvRbqgs2S8QDg" viewBox="0 0 24 24" style="--encore-icon-fill: var(--background-base, #ffffff); --encore-icon-height: var(--encore-graphic-size-informative-base); --encore-icon-width: var(--encore-graphic-size-informative-base); position: relative; background-image: linear-gradient(var(--text-base), var(--text-base)); background-size: 50% 50%; background-position: center center; background-repeat: no-repeat;"><title>Verified account</title><path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"></path></svg>
                        </span>
                        <span class="verify_user"> Подтвержденный исполнитель </span>
                    </div>
                    <div class="artist-image-name-block">
                        <div class="artist-data-picture"><img class="artist_image" src="${artist_data.images[2].url}"></div>
                        <span class="artist-name">${artist_data.name}</span>  
                     </div>  
                    <span class="followers">${artist_data.followers.total} followers</span>          
                </div> 
            </div>
            <div class="play_this_playlist_block">
                <div class="play_this_playlist_button"></div>
            </div>
            <span class="popular_tracks">Популярные треки</span>
            <div class="popular_tracks_list_block">
                ${tracksHTML}
            </div>
        </div>
    `
    Array.from(document.getElementsByClassName('play_icon_svg')).forEach(elm => {
        elm.addEventListener('click', ()=> {
            initPlaylist(elm);
        })
    })
    
    }