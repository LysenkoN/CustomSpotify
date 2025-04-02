import { homeFill } from "./buttonHome.js";

// Подсказки при навереднии на елемент
export const profileAvatar = document.querySelector(".header-profile-avatar");
const homeBtn = document.querySelector(".header-search-btn-home");
const itemHelpHome = document.querySelector(".help-home");
const itemHelpProfile = document.querySelector(".help-profile");
const logo = document.querySelector(".header-logo-img");
const itemHelpLogo = document.querySelector(".help-header-logo-img");
const search = document.querySelector(".svg-search");
const itemHelpSearch = document.querySelector(".help-svg-search");

// Функция чтобы делать подсказку видимой
let id
function visible(value){
    id = setTimeout(()=>{value.style.display = "flex";},700);
}

// Функция чтобы делать подсказку невидимой
function unvisible(value){
    value.style.display = "none";
    clearTimeout(id);
}

function addHelp(item, value){
    item.addEventListener("mouseover",()=>{visible(value)});
    item.addEventListener("mouseout",()=>{unvisible(value)});
}
addHelp(profileAvatar,itemHelpProfile);
addHelp(homeBtn,itemHelpHome);
addHelp(logo,itemHelpLogo);
addHelp(search,itemHelpSearch);

// Записываем данные user
export function userInformation(){
    let profile = JSON.parse(localStorage.getItem('profile'));
    if(profile.images.length !== 0){ //Делаем проверку на наличие аватарки
        document.querySelector(".header-profile-avatar-img").src = profile.images[0].url; // Выводим ее в отведенное место
     }else{
        document.querySelector(".header-profile-avatar-img").style.display = "none";
        // Создаем елемен который будет заменять нашу аватарку
        const avatar = document.createElement("div");
        avatar.classList.add("header-profile-avatar-img");
        avatar.textContent = profile.display_name[0];
        avatar.style.backgroundColor = "var(--text-positive)";
        profileAvatar.append(avatar);
    }
    document.querySelector(".help-profile").textContent = profile.display_name; //Записываем имя user в подсказку
}

//Делаем по нажатию на кнопку home открытие главной странице
 function pageHome(){
    document.querySelector(".secti-el").innerHTML =`
                <div class="high-div">
                    <div class="class-elemts">
                        <div class="element-bunny"> <!--! Block-playlist -->
                            <div class="img-input-class">
                                <img class="picture-track-high-div" src="./src/img/Spotify_Primary_Logo_RGB_White.png" alt="picture">
                            </div>
                            <strong>
                                <p class="text-track-high-div">Улюблені пісні</p>
                            </strong>
                            <img class="button-player-bunny" src="./src/img/main/player-button-green-black.png" alt="">
                        </div>
                    </div>
                </div>
    `;

 }
homeBtn.addEventListener("click", ()=>{
    pageHome();
    homeFill();
});