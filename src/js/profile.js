import {profileAvatar, profile} from "./header.js"

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

//Заменяем елементы на страницу профиля
function pageProfile(userName){
    document.querySelector(".secti-el").innerHTML = `
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
`;
avatarProfile();
}

profileAvatar.addEventListener("click" ,()=>{
    pageProfile(profile.display_name,);
});