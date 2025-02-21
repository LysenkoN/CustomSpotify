import {profileAvatar, profile} from "./header.js";
import {homeStroke} from "./buttonHome.js";
import {fetchTopArtists} from "./api_user_top.js"

async function displayTopArtists() {
    try {
        const data = await fetchTopArtists();
        if (!data?.items || data.items.length === 0) {
            console.warn("Нет данных о топ-артистах.");
            return;
        }
        topArtists(data.items);
        console.log("Топ-артисты:", data.items);
    } catch (error) {
        console.error("Ошибка загрузки топ-артистов:", error);
    }
}

// Функция для альтернативы аватарки
function avatarProfile(){
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
function topArtists(arr){
    for(let i = 0; arr.length > i; i+=1){
        console.log(arr[i]);

        const column = document.createElement("div");
        const columnImgBlock = document.createElement("div");
        const columnImg = document.createElement("img");
        const columnInfo = document.createElement("div");
        const columnInfoName = document.createElement("div");
        const columnInfoSubtitle = document.createElement("div");

        column.classList.add("profile-top-artists-main-item");
        columnImgBlock.classList.add("profile-top-artists-main-item-img");
        columnImg.style.width = "172px";
        columnImg.style.height = "172px";
        columnImg.style.borderRadius = "50%";
        columnImg.src = arr[i].images[0].url;
        columnInfo.classList.add("profile-top-artists-main-item-info");
        columnInfoName.classList.add("profile-top-artists-main-item-info-name");
        columnInfoName.textContent = arr[i].name;
        columnInfoSubtitle.classList.add("profile-top-artists-main-item-info-subtitle");
        columnInfoSubtitle.textContent = "Исполнитель";

        document.querySelector(".profile-top-artists-main").append(column);
        column.append(columnImgBlock);
        columnImgBlock.append(columnImg);
        column.append(columnInfo);
        columnInfo.append(columnInfoName);
        columnInfo.append(columnInfoSubtitle);
    }
}

//Заменяем елементы на страницу профиля
function pageProfile(userName){
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
avatarProfile();
displayTopArtists();
}

profileAvatar.addEventListener("click" ,()=>{
    pageProfile(profile.display_name,);
    homeStroke();
});