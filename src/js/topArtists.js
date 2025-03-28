import {displayTopArtists} from "./profile.js";

// Делаем внешний вид страницы с полным списком топ артистов профиля
function pageArtists(){
    document.querySelector(".secti-el").innerHTML = `
    <div class="profile">
        <div class="profile-top-artists">
            <div class="profile-top-artists-head">
                <div class="profile-top-artists-head-title">
                    <div class="title">Топ исполнителей этого месяца</div>
                    <div class="subtitle">Видны только тебе</div>
                </div>
            </div>
            <div style="flex-wrap: wrap; width: 100%; gap:5.5px;" class="profile-top-artists-main">
                
            </div>
        </div>
    </div>
    `;
    displayTopArtists();
}

// Выводим нашу страницу по нажать на кнопку 'Показать все'
export function openPageArtists(){
    const elements = document.getElementsByClassName("show-all");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", async(e) => {
            pageArtists();
        })
    }
}