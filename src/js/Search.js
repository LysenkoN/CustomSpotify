import {searchAPI} from "./api_search.js";

const searchInput = document.getElementsByClassName("header-search-input")[0];
searchInput.addEventListener("change", async ()=>{
    try{
    console.log(await searchAPI(searchInput.value));
    }catch(error){
        console.error("Ошибка загрузки топ-артистов:", error);
    }
});