let embedController = null;
let next_play = false;
let allSrcs = [];
let ind = 0;


export function playTrack(tracks, cur_index) {
    allSrcs = tracks;
    ind = cur_index;
    play();
}


function play() {
    if (embedController) {
        embedController.loadUri(allSrcs[ind]);
        embedController.play();
    }
    else {
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            let options = {
                width: '100%',
                height: '100',
                uri: allSrcs[ind]
              };
            const callback = (EmbedController) => {
                EmbedController.loadUri(allSrcs[ind]);
                EmbedController.play();
                EmbedController.addListener('playback_update', e => {
                    if (e.data && !e.data.isPaused && e.data.position !== 0) {
                        next_play = true;
                    }
                    if (e.data && e.data.isPaused && e.data.position === 0 && next_play) {
                        ind ++;
                        if (ind >= allSrcs.length) {
                            ind = 0;
                        }
                        next_play = false;
                        play();
                    }
                });
                embedController = EmbedController;
            };
            IFrameAPI.createController(element, options, callback);
        };
    }
}