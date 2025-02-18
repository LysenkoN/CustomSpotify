let mediatekaSearch = document.getElementById("mediateka_search");
let mediatekaInput = document.getElementById("mediateka_input");
let mediatekaInputBlock = document.getElementById("mediateka-input-container");
let listenToBlock = document.getElementsByClassName("search_listenedto")[0];
let mediaAdd = document.getElementById("media_add");
let mediaAddBlock = document.getElementsByClassName("media-add-block")[0];
let body = document.getElementsByTagName('body')[0];


mediatekaSearch.addEventListener("click",()=> {
    if (listenToBlock.classList.contains("active")) {
        mediatekaInputBlock.style.display="none";
        listenToBlock.classList.remove('active')
    }
    else {
        mediatekaInputBlock.style.display="inline-block";
        listenToBlock.classList.add('active')
    }
})

mediaAdd.addEventListener("click", (e)=> {
    e.stopPropagation();
    if (mediaAddBlock.classList.contains('active')) {
        mediaAddBlock.classList.remove('active');
    } 
    else {
        mediaAddBlock.classList.add('active');
    }
})

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

body.addEventListener("click", (e)=> {
    let target = e.target;
    let parent = findAncestor(target, 'media-add-block');
    if (!parent && mediaAddBlock.classList.contains('active')) {
        mediaAddBlock.classList.remove('active')
    }
})