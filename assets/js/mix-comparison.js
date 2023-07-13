// Get references to the buttons and audio elements
const beforeBtn = document.getElementById("before-btn-mixcomparison");
const afterBtn = document.getElementById("after-btn-mixcomparison");
const audioPlayerBefore = document.getElementById("audio-player-before-mixcomparison");
const audioPlayerAfter = document.getElementById("audio-player-after-mixcomparison");

setTimeout(() => {
  if (audioPlayerBefore) {
    audioPlayerBefore.setAttribute("preload", "auto");
  }
  if (audioPlayerBefore) {
    audioPlayerAfter.setAttribute("preload", "auto");
  }
}, 5000);

// Store the current time mark when a button is clicked
let currentTime = 0;

// Add click event listeners to the buttons
beforeBtn.addEventListener("click", function () {
  audioPlayerBeforeRestoration.pause();
  audioPlayerAfterRestoration.pause();
  if (audioPlayerBefore.classList.contains("hide-object")) {
    audioPlayerBefore.classList.remove("hide-object");
    audioPlayerAfter.classList.add("hide-object");
    if (audioPlayerAfter.currentTime > audioPlayerBefore.currentTime) {
      currentTime = audioPlayerAfter.currentTime;
    } else {
      currentTime = audioPlayerBefore.currentTime;
    }

    // Load and play the audio from the new source
    audioPlayerBefore.currentTime = currentTime;
    audioPlayerAfter.currentTime = currentTime;

    audioPlayerAfter.pause();
    audioPlayerBefore.play();

  }

  if(audioPlayerBefore.paused){
    audioPlayerBefore.play();
  }


});

afterBtn.addEventListener("click", function () {
  audioPlayerBeforeRestoration.pause();
  audioPlayerAfterRestoration.pause();
  if (audioPlayerAfter.classList.contains("hide-object")) {
    audioPlayerAfter.classList.remove("hide-object");
    audioPlayerBefore.classList.add("hide-object");
    if (audioPlayerBefore.currentTime > audioPlayerAfter.currentTime) {
      currentTime = audioPlayerBefore.currentTime;
    } else {
      currentTime = audioPlayerAfter.currentTime;
    }

    // Load and play the audio from the new source
    audioPlayerBefore.currentTime = currentTime;
    audioPlayerAfter.currentTime = currentTime;

    audioPlayerBefore.pause();
    audioPlayerAfter.play();

  }

  if(audioPlayerAfter.paused){
    audioPlayerAfter.play();
  }



});




// restoration

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

  if(audioPlayerBeforeRestoration.paused){
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

  if(audioPlayerAfterRestoration.paused){
    audioPlayerAfterRestoration.play();
  }



});
