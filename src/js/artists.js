import {displayTopArtists} from "./profile.js";

function pageArtists(){
    document.querySelector(".secti-el").innerHTML = `
    <div class="profile-top-artists">
            <div class="profile-top-artists-head">
                <div class="profile-top-artists-head-title">
                    <div class="title">Топ исполнителей этого месяца</div>
                    <div class="subtitle">Видны только тебе</div>
                </div>
                <div class="show-all">Показать все</div>
            </div>
            <div class="profile-top-artists-main">
                <div class="profile-top-artists-main-item"></div>
            </div>
        </div>
    `;
    displayTopArtists();
}

document.querySelector(".show-all").addEventListener("click", ()=>{
    pageArtists();
})