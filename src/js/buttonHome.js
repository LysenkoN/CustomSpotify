
const homeSvg = document.querySelector(".header-search-btn-home-svg");

// Функция для заливки кнопки Дом
export function homeFill(){
    homeSvg.style.fill = "#fff";
    homeSvg.style.stroke = "#transparent";
}

// Функция для закраски бортов кнопки Дом
export function homeStroke(){
    homeSvg.style.fill = "transparent";
    homeSvg.style.stroke = "var(--text-subdued)";
}