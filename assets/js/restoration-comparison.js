// Get references to the buttons and audio elements


const beforeBtnR = document.getElementById("before-btn-restorationcomparison");
const afterBtnR = document.getElementById("after-btn-restorationcomparison");
const audioPlayerBeforeR = document.getElementById("audio-player-before-restorationcomparison");
const audioPlayerAfterR = document.getElementById("audio-player-after-restorationcomparison");
var isBeforeR = true;

var beforeRestorationTxt = "Audio - Damaged";
var afterRestorationTxt = "Audio - Restored";
if (window.location.href.includes('/?lang=es')) {
  beforeRestorationTxt = "Audio - Dañado";
  afterRestorationTxt = "Audio - Restaurado";
}

playPauseButtonR = $("#play-pause-button-restorationcomparison");
const iR = playPauseButtonR.find("i");
albumNameR = $("#album-name-restorationcomparison");
albumNameR.text(beforeRestorationTxt);

trackTimeR = $("#track-time-restorationcomparison");
trackTimeR.addClass("active");


tTimeR = $("#track-length-restorationcomparison");
tTimeR.text("00:00");

tProgressR = $("#current-time-restorationcomparison");
tProgressR.text("00:00");

sAreaR = $("#s-area-restorationcomparison");
seekBarR = $("#seek-bar-restorationcomparison");
sHoverR = $("#s-hover-restorationcomparison");
insTimeR = $("#ins-time-restorationcomparison");

seekLocR = 0;
seekTR = 0;
isPlayActiveR = false;

function updateCurrTimeR() {
  nTime = new Date();
  nTime = nTime.getTime();

  var curMinutes = Math.floor(audioPlayerBeforeR.currentTime / 60);
  var curSeconds = Math.floor(audioPlayerBeforeR.currentTime - curMinutes * 60);

  var durMinutes = Math.floor(audioPlayerBeforeR.duration / 60);
  var durSeconds = Math.floor(audioPlayerBeforeR.duration - durMinutes * 60);

  var playProgress = (audioPlayerBeforeR.currentTime / audioPlayerBeforeR.duration) * 100;
  if (!isBeforeR) {
    curMinutes = Math.floor(audioPlayerAfterR.currentTime / 60);
    curSeconds = Math.floor(audioPlayerAfterR.currentTime - curMinutes * 60);
    durMinutes = Math.floor(audioPlayerAfterR.duration / 60);
    durSeconds = Math.floor(audioPlayerAfterR.duration - durMinutes * 60);
    playProgress = (audioPlayerAfterR.currentTime / audioPlayerAfterR.duration) * 100;
  }


  if (curMinutes < 10) curMinutes = "0" + curMinutes;
  if (curSeconds < 10) curSeconds = "0" + curSeconds;

  if (durMinutes < 10) durMinutes = "0" + durMinutes;
  if (durSeconds < 10) durSeconds = "0" + durSeconds;

  if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
  else tProgressR.text(curMinutes + ":" + curSeconds);

  if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
  else tTimeR.text(durMinutes + ":" + durSeconds);

  if (
    isNaN(curMinutes) ||
    isNaN(curSeconds) ||
    isNaN(durMinutes) ||
    isNaN(durSeconds)
  )
    trackTimeR.removeClass("active");
  else trackTimeR.addClass("active");

  seekBarR.width(playProgress + "%");

  if (playProgress == 100) {

    //this.i.attr("class", "fa fa-play");
    seekBar.width(0);
    tProgress.text("00:00");
    //clearInterval(buffInterval);
  }
  
}

function playFromClickedPosR() {
  
  if (isBeforeR) {
    audioPlayerBeforeR.currentTime = seekLocR;
  }else{
    audioPlayerAfterR.currentTime = seekLocR;
  }
  
  seekBarR.width(seekTR);
  hideHoverR();

}
function hideHoverR() {
  sHoverR.width(0);
  insTimeR.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
  
}

function showHoverR(event) {

  var seekBarPos = sAreaR.offset();
  seekTR = event.clientX - seekBarPos.left;
  seekLocR = audioPlayerBeforeR.duration * (seekTR / sAreaR.outerWidth());
  if(!isBeforeR){
    seekLocR = audioPlayerAfterR.duration * (seekTR / sAreaR.outerWidth());
  }
  sHoverR.width(seekTR);

  var cM = seekLocR / 60;



  var ctMinutes = Math.floor(cM);
  var ctSeconds = Math.floor(seekLocR - ctMinutes * 60);

  if (ctMinutes < 0 || ctSeconds < 0) return;

  if (ctMinutes < 0 || ctSeconds < 0) return;

  if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
  if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

  if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTimeR.text("--:--");
  else insTimeR.text(ctMinutes + ":" + ctSeconds);

  insTimeR.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);

  
}

function playPauseR() {

  if (!audioPlayerBefore.paused || !audioPlayerAfter.paused){
    playPause();
  }
  
  if(!myMusicPlayer.isPaused()){
    myMusicPlayer.playPause();
  }

  setTimeout(() => {
    if(isBeforeR){
      if (audioPlayerBeforeR.paused) {
        isPlayActiveR = true;
        iR.attr("class", "fas fa-pause");
        audioPlayerBeforeR.play();
  
      } else {
        isPlayActiveR = false;
        iR.attr("class", "fas fa-play");
        audioPlayerBeforeR.pause();
      }
    }else{
      if (audioPlayerAfterR.paused) {
        isPlayActiveR = true;
        iR.attr("class", "fas fa-pause");
        audioPlayerAfterR.play();
  
      } else {
        isPlayActiveR = false;
        iR.attr("class", "fas fa-play");
        audioPlayerAfterR.pause();
      }
    }
    

  }, 300);
}

playPauseButtonR.on("click", () => playPauseR());


const showHoverHandlerR = (event) => {
  showHoverR(event);
};


$(audioPlayerBeforeR).on("timeupdate", () => updateCurrTimeR());
$(audioPlayerAfterR).on("timeupdate", () => updateCurrTimeR());

sAreaR.on("mousemove", showHoverHandlerR);
sAreaR.on("mouseout", () => hideHoverR());
sAreaR.on("click", () => playFromClickedPosR());

setTimeout(() => {
  if (audioPlayerBeforeR) {
    audioPlayerBeforeR.setAttribute("preload", "auto");
  }
  if (audioPlayerBeforeR) {
    audioPlayerAfterR.setAttribute("preload", "auto");
  }
  tTimeR.text("00:50");
}, 5000);


// Store the current time mark when a button is clicked
let currentTimeR = 0;

// Add click event listeners to the buttons
beforeBtnR.addEventListener("click", function () {

  //pause other players
  audioPlayerBefore.pause();
  audioPlayerAfter.pause();
  iA.attr("class", "fas fa-play");

  isBeforeR = true;
  iR.attr("class", "fas fa-pause");
  albumNameR.text(beforeRestorationTxt);



  if (audioPlayerAfterR.currentTime > 0) {
    currentTimeR = audioPlayerAfterR.currentTime;
  } else {
    currentTimeR = audioPlayerBeforeR.currentTime;
  }

  // Load and play the audio from the new source
  audioPlayerBeforeR.currentTime = currentTimeR;
  audioPlayerAfterR.currentTime = currentTimeR;

  audioPlayerAfterR.pause();
  audioPlayerBeforeR.play();



  if (audioPlayerBeforeR.paused) {
    audioPlayerBeforeR.play();
  }

  
});

afterBtnR.addEventListener("click", function () {
  //pause other players
  audioPlayerBefore.pause();
  audioPlayerAfter.pause();
  iA.attr("class", "fas fa-play");

  //
  isBeforeR = false;
  iR.attr("class", "fas fa-pause");
  albumNameR.text(afterRestorationTxt);


  

  if (audioPlayerBeforeR.currentTime > 0) {
    currentTimeR = audioPlayerBeforeR.currentTime;
  } else {
    currentTimeR = audioPlayerAfterR.currentTime;
  }

  // Load and play the audio from the new source
  audioPlayerBeforeR.currentTime = currentTimeR;
  audioPlayerAfterR.currentTime = currentTimeR;

  audioPlayerBeforeR.pause();
  audioPlayerAfterR.play();


  if (audioPlayerAfterR.paused) {
    audioPlayerAfterR.play();
  }



});


/*



























// restoration //////////////////////////////////////////////////////////////////////////////////////////////////////

// Get references to the buttons and audio elements
const beforeBtnRestoration = document.getElementById("before-btn-restorationcomparison");
const afterBtnRestoration = document.getElementById("after-btn-restorationcomparison");
const audioPlayerBeforeRestoration = document.getElementById("audio-player-before-restorationcomparison");
const audioPlayerAfterRestoration = document.getElementById("audio-player-after-restorationcomparison");

setTimeout(() => {
  if (audioPlayerBefore) {
    audioPlayerBeforeRestoration.setAttribute("preload", "auto");
  }
  if (audioPlayerBefore) {
    audioPlayerAfterRestoration.setAttribute("preload", "auto");
  }
}, 5000);

// Store the current time mark when a button is clicked
let currentTimeRestoration = 0;

// Add click event listeners to the buttons
beforeBtnRestoration.addEventListener("click", function () {
  audioPlayerBefore.pause();
  audioPlayerAfter.pause();

  if (audioPlayerBeforeRestoration.classList.contains("hide-object")) {
    audioPlayerBeforeRestoration.classList.remove("hide-object");
    audioPlayerAfterRestoration.classList.add("hide-object");
    if (audioPlayerAfterRestoration.currentTime > audioPlayerBeforeRestoration.currentTime) {
      currentTime = audioPlayerAfterRestoration.currentTime;
    } else {
      currentTime = audioPlayerBeforeRestoration.currentTime;
    }

    // Load and play the audio from the new source
    audioPlayerBeforeRestoration.currentTime = currentTime;
    audioPlayerAfterRestoration.currentTime = currentTime;

    audioPlayerAfterRestoration.pause();
    audioPlayerBeforeRestoration.play();

  }

  if (audioPlayerBeforeRestoration.paused) {
    audioPlayerBeforeRestoration.play();
  }


});

afterBtnRestoration.addEventListener("click", function () {
  audioPlayerBefore.pause();
  audioPlayerAfter.pause();

  if (audioPlayerAfterRestoration.classList.contains("hide-object")) {
    audioPlayerAfterRestoration.classList.remove("hide-object");
    audioPlayerBeforeRestoration.classList.add("hide-object");
    if (audioPlayerBeforeRestoration.currentTime > audioPlayerAfterRestoration.currentTime) {
      currentTime = audioPlayerBeforeRestoration.currentTime;
    } else {
      currentTime = audioPlayerAfterRestoration.currentTime;
    }

    // Load and play the audio from the new source
    audioPlayerBeforeRestoration.currentTime = currentTime;
    audioPlayerAfterRestoration.currentTime = currentTime;

    audioPlayerBeforeRestoration.pause();

    audioPlayerAfterRestoration.play();

  }

  if (audioPlayerAfterRestoration.paused) {
    audioPlayerAfterRestoration.play();
  }



});
*/