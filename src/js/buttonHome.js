import { homeBtn } from "./header.js";


export function homeFill(){
    homeBtn.style.fill = "#fff";
    homeBtn.style.stroke = "#transparent";
}

export function homeStroke(){
    homeBtn.style.fill = "transparent";
    homeBtn.style.stroke = "#fff";
}