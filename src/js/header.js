"use strict";

const profileAvatar = document.querySelector(".header-profile-avatar");
const homeBtn = document.querySelector(".header-search-btn-home");
const itemHelpHome = document.querySelector(".help-home");
const itemHelpProfile = document.querySelector(".help-profile");
const logo = document.querySelector(".header-logo-img");
const itemHelpLogo = document.querySelector(".help-header-logo-img");
const search = document.querySelector(".svg-search");
const itemHelpSearch = document.querySelector(".help-svg-search");

let id

function visible(value){
    id = setTimeout(()=>{value.style.display = "flex";},700);
}

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