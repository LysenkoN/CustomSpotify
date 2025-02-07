"use strict";

const profileAvatar = document.querySelector(".header-profile-avatar");
const homeBtn = document.querySelector(".header-search-btn-home");
const itemHelpHome = document.querySelector(".help-home");
const itemHelpProfile = document.querySelector(".help-profile");
let id
profileAvatar.addEventListener("mouseover",()=>{
    id = setTimeout(()=>{itemHelpProfile.style.display = "flex";},700);
});

profileAvatar.addEventListener("mouseout",()=>{
    itemHelpProfile.style.display = "none";
    clearTimeout(id);
});

 homeBtn.addEventListener("mouseover",()=>{
     id = setTimeout(()=>{itemHelpHome.style.display = "flex";},700);
 });

 homeBtn.addEventListener("mouseout",()=>{
    itemHelpHome.style.display = "none";
    clearTimeout(id);
});