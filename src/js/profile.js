import {profileAvatar} from "./header.js";
import {homeStroke} from "./buttonHome.js";
import {fetchTopArtists} from './api_user_top.js';
import { openPageArtists } from "./topArtists.js";
import { getHrefArtist } from "./api_artists.js";

export async function displayTopArtists() {
    try {
        const data = await fetchTopArtists();
        if (!data?.items || data.items.length === 0) {
            document.querySelector(".profile-top-artists").remove();
        }
        else {
            topArtists(data.items, ".profile-top-artists-main");
            getHrefArtist();
        }
    } catch (error) {
        console.error("Ошибка загрузки топ-артистов:", error);
    }
}

// Функция для альтернативы аватарки
export function avatarProfile(){
    let profile = JSON.parse(localStorage.getItem('profile'));
    let avatarImg = document.getElementById('avatarImg');
    if(profile.images.length !== 0){
        avatarImg.src = profile.images[0].url;
    }else{
        avatarImg.style.display = "none";
        avatarBlock.style.backgroundColor = "var(--decorative-subdued)";

        const avatarIcon = document.createElement("div");
        avatarIcon.innerHTML=`<?xml version="1.0" ?>
        <svg height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg">
        // <title/>
        // <path d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z" style="fill:none;stroke:var(--essential-subdued);stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
        // <path d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z" style="fill:none;stroke:var(--essential-subdued);stroke-miterlimit:10;stroke-width:32px"/>
        // </svg>`;
        avatarBlock.append(avatarIcon);
    }
}

// Функция для заполнения полей для топ артистов
export function topArtists(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        const artist = arr[i];

        const imageUrl = artist.images && artist.images.length > 0 ? artist.images[0].url : './src/img/human.png';

        const itemProfile = `
            <div style="width:200px;" class="profile-top-artists-main-item">
                <div class="profile-top-artists-main-item-img">
                    <img style="width: 173px; height: 173px; border-radius: 50%;" src="${imageUrl}" alt="">
                </div>
                <div class="profile-top-artists-main-item-info">
                    <div class="profile-top-artists-main-item-info-name">${artist.name}</div>
                    <div class="profile-top-artists-main-item-info-subtitle">Исполнитель</div>
                </div>
            </div>
        `;
        document.querySelector(item).innerHTML += itemProfile;
    }
}


//Заменяем елементы на страницу профиля
function pageProfile(){
    let userName = JSON.parse(localStorage.getItem('profile')).display_name;
    document.querySelector(".secti-el").innerHTML = `
    <div class="profile">
        <div class="profile-header">
            <div class="profile-data">
                <div id="avatarBlock" class="profile-data-avatar">
                <img id="avatarImg" class="profile-data-avatar-img" src="">
                </div>
                <div class="profile-data-info">
                    <p class="profile-item">Профиль</p>
                    <p class="profile-name">${userName}</p>
                    <!-- <p class="profile-sub-info">3 открытых плейлиста</p> -->
                </div>
            </div>
        </div>
        <div class="profile-top-artists">
            <div class="profile-top-artists-head">
                <div class="profile-top-artists-head-title">
                    <div class="title">Топ исполнителей этого месяца</div>
                    <div class="subtitle">Видны только тебе</div>
                </div>
                <div class="show-all">Показать все</div>
            </div>
            <div class="profile-top-artists-main">
            
            </div>
        </div>
    </div>    
`;
openPageArtists();
}

profileAvatar.addEventListener("click" ,()=>{
    displayTopArtists();
    pageProfile();
    avatarProfile();
    homeStroke();
});