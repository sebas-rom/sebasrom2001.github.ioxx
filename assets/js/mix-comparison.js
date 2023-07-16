// Get references to the buttons and audio elements

const beforeBtn = document.getElementById("before-btn-mixcomparison");
const afterBtn = document.getElementById("after-btn-mixcomparison");
const audioPlayerBefore = document.getElementById("audio-player-before-mixcomparison");
const audioPlayerAfter = document.getElementById("audio-player-after-mixcomparison");
var isBefore = true;

var beforeMixTxt = "Music - Unmixed";
var afterMixTxt = "Music - Mixed";
if (window.location.href.includes('/?lang=es')) {
  beforeMixTxt = "Música - Sin Mezclar";
  afterMixTxt = "Música - Mezclado";
}

playPauseButton = $("#play-pause-button-mix-comp");
const iA = playPauseButton.find("i");

const iA2 = $("#icon-play-pause-button-mix-comp");

albumName = $("#album-name-mix-comp");
albumName.text(beforeMixTxt);

trackTime = $("#track-time-mix-comp");
trackTime.addClass("active");

tTime = $("#track-length-mix-comp");
tTime.text("00:00");

tProgress = $("#current-time-mix-comp");
tProgress.text("00:00");

sArea = $("#s-area-mix-comp");
seekBar = $("#seek-bar-mix-comp");
sHover = $("#s-hover-mix-comp");
insTime = $("#ins-time-mix-comp");

seekLoc = 0;
seekT = 0;
isPlayActive = false;

function updateCurrTime() {
  nTime = new Date();
  nTime = nTime.getTime();

  var curMinutes = Math.floor(audioPlayerBefore.currentTime / 60);
  var curSeconds = Math.floor(audioPlayerBefore.currentTime - curMinutes * 60);

  var durMinutes = Math.floor(audioPlayerBefore.duration / 60);
  var durSeconds = Math.floor(audioPlayerBefore.duration - durMinutes * 60);

  var playProgress = (audioPlayerBefore.currentTime / audioPlayerBefore.duration) * 100;
  if (!isBefore) {
    curMinutes = Math.floor(audioPlayerAfter.currentTime / 60);
    curSeconds = Math.floor(audioPlayerAfter.currentTime - curMinutes * 60);
    durMinutes = Math.floor(audioPlayerAfter.duration / 60);
    durSeconds = Math.floor(audioPlayerAfter.duration - durMinutes * 60);
    playProgress = (audioPlayerAfter.currentTime / audioPlayerAfter.duration) * 100;
  }


  if (curMinutes < 10) curMinutes = "0" + curMinutes;
  if (curSeconds < 10) curSeconds = "0" + curSeconds;

  if (durMinutes < 10) durMinutes = "0" + durMinutes;
  if (durSeconds < 10) durSeconds = "0" + durSeconds;

  if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
  else tProgress.text(curMinutes + ":" + curSeconds);

  if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
  else tTime.text(durMinutes + ":" + durSeconds);

  if (
    isNaN(curMinutes) ||
    isNaN(curSeconds) ||
    isNaN(durMinutes) ||
    isNaN(durSeconds)
  )
    trackTime.removeClass("active");
  else trackTime.addClass("active");

  seekBar.width(playProgress + "%");

  if (playProgress == 100) {

    //this.i.attr("class", "fa fa-play");
    seekBar.width(0);
    tProgress.text("00:00");
    //clearInterval(buffInterval);
  }
}
function playFromClickedPos() {
  
  if (isBefore) {
    audioPlayerBefore.currentTime = seekLoc;
  }else{
    audioPlayerAfter.currentTime = seekLoc;
  }
  
  seekBar.width(seekT);
  hideHover();

}
function hideHover() {
  sHover.width(0);
  insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
}
function showHover(event) {

  var seekBarPos = sArea.offset();
  seekT = event.clientX - seekBarPos.left;
  seekLoc = audioPlayerBefore.duration * (seekT / sArea.outerWidth());
  if(!isBefore){
    seekLoc = audioPlayerAfter.duration * (seekT / sArea.outerWidth());
  }
  sHover.width(seekT);

  var cM = seekLoc / 60;



  var ctMinutes = Math.floor(cM);
  var ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

  if (ctMinutes < 0 || ctSeconds < 0) return;

  if (ctMinutes < 0 || ctSeconds < 0) return;

  if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
  if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

  if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
  else insTime.text(ctMinutes + ":" + ctSeconds);

  insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);


}

function playPause() {

  if (!audioPlayerBeforeR.paused ||!audioPlayerAfterR.paused ){
    playPauseR();
  }

  if(!myMusicPlayer.isPaused()){
    myMusicPlayer.playPause();
  }

  setTimeout(() => {
    if(isBefore){
      if (audioPlayerBefore.paused) {
        isPlayActive = true;
        iA.attr("class", "fas fa-pause");
       
        audioPlayerBefore.play();
  
      } else {
        iAsPlayActive = false;
        iA.attr("class", "fas fa-play");
        
        audioPlayerBefore.pause();
      }
    }else{
      if (audioPlayerAfter.paused) {
        isPlayActive = true;
        iA.attr("class", "fas fa-pause");
        audioPlayerAfter.play();
  
      } else {
        isPlayActive = false;
        iA.attr("class", "fas fa-play");
        audioPlayerAfter.pause();
      }
    }


  }, 300);
  
}

playPauseButton.on("click", () => playPause());
const showHoverHandler = (event) => {
  showHover(event);
};

$(audioPlayerBefore).on("timeupdate", () => updateCurrTime());
$(audioPlayerAfter).on("timeupdate", () => updateCurrTime());

sArea.on("mousemove", showHoverHandler);
sArea.on("mouseout", () => hideHover());
sArea.on("click", () => playFromClickedPos());


setTimeout(() => {
  if (audioPlayerBefore) {
    audioPlayerBefore.setAttribute("preload", "auto");
  }
  if (audioPlayerBefore) {
    audioPlayerAfter.setAttribute("preload", "auto");
  }
  tTime.text("01:23");
}, 5000);

// Store the current time mark when a button is clicked
let currentTime = 0;

// Add click event listeners to the buttons
beforeBtn.addEventListener("click", function () {
  //pause other players
  audioPlayerBeforeR.pause();
  audioPlayerAfterR.pause();
  iR.attr("class", "fas fa-play");

  isBefore = true;
  iA.attr("class", "fas fa-pause");
  albumName.text(beforeMixTxt);



  if (audioPlayerAfter.currentTime > 0) {
    currentTime = audioPlayerAfter.currentTime;
  } else {
    currentTime = audioPlayerBefore.currentTime;
  }

  // Load and play the audio from the new source
  audioPlayerBefore.currentTime = currentTime;
  audioPlayerAfter.currentTime = currentTime;

  audioPlayerAfter.pause();
  audioPlayerBefore.play();



  if (audioPlayerBefore.paused) {
    audioPlayerBefore.play();
  }


});

afterBtn.addEventListener("click", function () {
  //pause other players
  audioPlayerBeforeR.pause();
  audioPlayerAfterR.pause();
  iR.attr("class", "fas fa-play");

  //
  isBefore = false;
  iA.attr("class", "fas fa-pause");
  albumName.text(afterMixTxt);

  if (audioPlayerBefore.currentTime > 0) {
    currentTime = audioPlayerBefore.currentTime;
  } else {
    currentTime = audioPlayerAfter.currentTime;
  }

  // Load and play the audio from the new source
  audioPlayerBefore.currentTime = currentTime;
  audioPlayerAfter.currentTime = currentTime;

  audioPlayerBefore.pause();
  audioPlayerAfter.play();


  if (audioPlayerAfter.paused) {
    audioPlayerAfter.play();
  }



});









