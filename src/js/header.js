"use strict";

const profileAvatar = document.querySelector(".header-profile-avatar");
const itemHelp = document.querySelector(".help");
let id
profileAvatar.addEventListener("mouseover",()=>{
    id = setTimeout(()=>{itemHelp.style.display = "flex";},700);
});

profileAvatar.addEventListener("mouseout",()=>{
    itemHelp.style.display = "none";
    clearTimeout(id);
});