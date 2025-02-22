const createPlaylist = document.getElementsByClassName ("media-add-contanier")[0];

function createPlaylist(userName){
    document.querySelector(".secti-el").innerHTML = `
        <div class="playlist_block">
            <div class="playlist-data">
                <div id="pictureBlock" class="playlist-data-picture"></div>
                <div class="Laylist-data-block">
                    <span> Плейлист </span>
                    <span class="my-playlist"> Мой плейлист № </span>
                </div>
            </div>
                // <div class="profile-data-info">
                //     <p class="profile-item">Профиль</p>
                //     <p class="profile-name">${userName}</p>
                //     <!-- <p class="profile-sub-info">3 открытых плейлиста</p> -->
                // </div>
            // </div>
        </div>
`;
// avatarProfile();
}
createPlaylist.addEventListener("click", ()=> {
    createPlaylist();
})