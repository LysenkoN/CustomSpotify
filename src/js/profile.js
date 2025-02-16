import {profileAvatar, profile} from "./header.js"

function pageProfile(userName, userAvatar){
    document.querySelector(".secti-el").innerHTML = `
        <div class="profile-header">
            <div class="profile-data">
                <div style="background-image: url(${userAvatar});" class="profile-data-avatar">
                </div>
                <div class="profile-data-info">
                    <p class="profile-item">Профиль</p>
                    <p class="profile-name">${userName}</p>
                    <!-- <p class="profile-sub-info">3 открытых плейлиста</p> -->
                </div>
            </div>
        </div>
`;
}

profileAvatar.addEventListener("click",pageProfile(profile.display_name, profile.images[0].url));