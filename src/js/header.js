
// Подсказки при навереднии на елемент
export const profileAvatar = document.querySelector(".header-profile-avatar");
export const homeBtn = document.querySelector(".header-search-btn-home");
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
profileAvatar.addEventListener("mouseover",()=>{visible(itemHelpProfile)});
profileAvatar.addEventListener("mouseout",()=>{unvisible(itemHelpProfile)});


homeBtn.addEventListener("mouseover",()=>{visible(itemHelpHome)});
homeBtn.addEventListener("mouseout",()=>{unvisible(itemHelpHome)});

logo.addEventListener("mouseover",()=>{visible(itemHelpLogo)});
logo.addEventListener("mouseout",()=>{unvisible(itemHelpLogo)});

search.addEventListener("mouseover",()=>{visible(itemHelpSearch)});
search.addEventListener("mouseout",()=>{unvisible(itemHelpSearch)});

const colorsAvatar = ["#ed2c3f", "#1ed760", "#ffa42b"]; //Задаем масив трьех разных цветов
let colorRandomIndex = Math.floor(Math.random()*colorsAvatar.length);



// Записываем данные user
export const profile = JSON.parse(localStorage.getItem('profile'));
function userInformation(){
    
    if(profile.images.length !== 0){ //Делаем проверку на наличие аватарки
        document.querySelector(".header-profile-avatar-img").src = profile.images[0].url; // Выводим ее в отведенное место
     }else{
        document.querySelector(".header-profile-avatar-img").style.display = "none";
        // Создаем елемен который будет заменять нашу аватарку
        const avatar = document.createElement("div");
        avatar.classList.add("header-profile-avatar-img");
        avatar.textContent = profile.display_name[0];
        avatar.style.backgroundColor = colorsAvatar[colorRandomIndex];
        profileAvatar.append(avatar);
    }
    document.querySelector(".help-profile").textContent = profile.display_name; //Записываем имя user в подсказку
}
userInformation();

//Делаем по нажатию на кнопку home открытие главной странице
// function pageHome(){
//     document.querySelector(".secti-el").innerHTML =
//     console.log(document.querySelector(".secti-el").childNodes);

// }
// homeBtn.addEventListener("click", ()=>{pageHome()});