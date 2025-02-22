
const homeSvg = document.querySelector(".header-search-btn-home-svg");

export function homeFill(){
    homeSvg.style.fill = "#fff";
    homeSvg.style.stroke = "#transparent";
}

export function homeStroke(){
    homeSvg.style.fill = "transparent";
    homeSvg.style.stroke = "var(--text-subdued)";
}