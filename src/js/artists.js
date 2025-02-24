import {displayTopArtists} from "./profile.js";

function pageArtists(){
    document.querySelector(".secti-el").innerHTML = `
    <div class="profile-top-artists">
            <div class="profile-top-artists-head">
                <div class="profile-top-artists-head-title">
                    <div class="title">Топ исполнителей этого месяца</div>
                    <div class="subtitle">Видны только тебе</div>
                </div>
            </div>
            <div style="flex-wrap: wrap;" class="profile-top-artists-main">
                <div class="profile-top-artists-main-item"></div>
            </div>
        </div>
    `;
    displayTopArtists();
}

export function openPageArtists(){
    document.querySelector(".show-all").addEventListener("click", ()=>{
        pageArtists();
    });
}