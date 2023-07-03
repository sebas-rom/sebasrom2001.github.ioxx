
var myMusicPlayer;
$(function () {
  myMusicPlayer = new MusicPlayer();
});

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}

async function genereChanged() {
  let delayres = await delay(700);
  var targetDiv = document.getElementById("carousel-music-genre").getElementsByClassName("active")[0];
  //alert(targetDiv.textContent);

  myMusicPlayer.changeGenre(targetDiv.textContent);
}


class MusicPlayer {

  changeGenre(newGenre) {
    this.currIndex = -1;
    this.albums = [
      "a1",
      "b2",
      "c3",
      "d4",
      "e5"
    ];
    this.trackNames = [
      "Skylike - Dawn",
      "Alex Skrindo - Me & You",
      "Kaaze - Electro Boy",
      "Jordan Schor - Home",
      "Martin Garrix - Proxy"
    ];
    this.trackUrl = [
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3"
    ];

    this.buffInterval = null;
    this.tFlag = false;
    this.trackNumber = 0;
    this.currIndex = 0;
    this.seekLoc = 0;
    this.seekT = 0;
    this.bTime = 0;

    this.createMusicPlayer();
    //alert(newGenre);
    this.initPlayer();

  }
  constructor() {
    this.firstTime = true;
    this.isPlayActive = false;
    this.playerTrack = $("#player-track");
    this.bgArtwork = $("#bg-artwork");
    this.bgArtworkUrl;

    this.albumName = $("#album-name");
    this.trackName = $("#track-name");
    this.albumArt = $("#album-art");
    this.sArea = $("#s-area");
    this.seekBar = $("#seek-bar");
    this.trackTime = $("#track-time");
    this.insTime = $("#ins-time");
    this.sHover = $("#s-hover");

    this.playPauseButton = $("#play-pause-button");

    this.i = this.playPauseButton.find("i");

    this.tProgress = $("#current-time");
    this.tTime = $("#track-length");

    this.nTime = 0;

    this.buffInterval = null;
    this.tFlag = false;
    this.playPreviousTrackButton = $("#play-previous");
    this.playNextTrackButton = $("#play-next");
    this.albumArtworks = [];



    this.trackNumber = 0;
    this.currIndex = -1;
    this.audio = new Audio();
    this.seekLoc = 0;
    this.seekT = 0;
    this.bTime = 0;

    this.albums = [
      "MyALB",
      "Me & You",
      "Electro Boy",
      "Home",
      "Proxy (Original Mix)"
    ];
    this.trackNames = [
      "Skylike - Dawn",
      "Alex Skrindo - Me & You",
      "Kaaze - Electro Boy",
      "Jordan Schor - Home",
      "Martin Garrix - Proxy"
    ];
    this.trackUrl = [
      "https://drive.google.com/u/0/uc?id=1l95smgZbXHPi5HEOCOqTZjSoZEUqaKIV&export=download",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3",
      "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3"
    ];

    this.createMusicPlayer();
    this.initPlayer();

  }

  createMusicPlayer() {

    this.trackNumber = this.trackUrl.length;
    for (let i = 0; i < this.trackUrl.length; i++) {
      this.albumArtworks.push("_" + (i + 1));
    }

  }

  playPause() {

    setTimeout(() => {

      if (this.audio.paused) {
        this.isPlayActive = true;
        this.playerTrack.addClass("active");
        this.albumArt.addClass("active");
        this.checkBuffering();
        this.i.attr("class", "fas fa-pause");
        this.audio.play();

      } else {
        this.isPlayActive = false;
        this.playerTrack.removeClass("active");
        this.albumArt.removeClass("active");
        clearInterval(this.buffInterval);
        this.albumArt.removeClass("buffering");
        this.i.attr("class", "fas fa-play");
        this.audio.pause();
      }

    }, 300);

  }

  showHover(event) {

    var seekBarPos = this.sArea.offset();
    this.seekT = event.clientX - seekBarPos.left;
    this.seekLoc = this.audio.duration * (this.seekT / this.sArea.outerWidth());

    this.sHover.width(this.seekT);

    var cM = this.seekLoc / 60;



    var ctMinutes = Math.floor(cM);
    var ctSeconds = Math.floor(this.seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) this.insTime.text("--:--");
    else this.insTime.text(ctMinutes + ":" + ctSeconds);

    this.insTime.css({ left: this.seekT, "margin-left": "-21px" }).fadeIn(0);


  }

  hideHover() {
    this.sHover.width(0);
    this.insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
  }

  playFromClickedPos() {

    this.audio.currentTime = this.seekLoc;
    this.seekBar.width(this.seekT);
    this.hideHover();
  }

  updateCurrTime() {
    this.nTime = new Date();
    this.nTime = this.nTime.getTime();

    if (!this.tFlag) {
      this.tFlag = true;
      this.trackTime.addClass("active");
    }

    var curMinutes = Math.floor(this.audio.currentTime / 60);
    var curSeconds = Math.floor(this.audio.currentTime - curMinutes * 60);

    var durMinutes = Math.floor(this.audio.duration / 60);
    var durSeconds = Math.floor(this.audio.duration - durMinutes * 60);

    var playProgress = (this.audio.currentTime / this.audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) this.tProgress.text("00:00");
    else this.tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) this.tTime.text("00:00");
    else this.tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      this.trackTime.removeClass("active");
    else this.trackTime.addClass("active");

    this.seekBar.width(playProgress + "%");

    if (playProgress == 100) {

      this.i.attr("class", "fa fa-play");
      this.seekBar.width(0);
      this.tProgress.text("00:00");
      this.albumArt.removeClass("buffering").removeClass("active");
      clearInterval(this.buffInterval);
    }
  }

  checkBuffering() {

    clearInterval(this.buffInterval);

    this.buffInterval = setInterval(() => {

      if (this.nTime == 0 || this.bTime - this.nTime > 1000) {
        this.albumArt.addClass("buffering");
      }
      else {
        this.albumArt.removeClass("buffering");
      }

      this.bTime = new Date();
      this.bTime = this.bTime.getTime();
    }, 100);
  }

  selectTrack(flag) {

    if (flag == 0 || flag == 1) {
      this.currIndex = this.currIndex + 1;
    }
    else {
      this.currIndex = this.currIndex - 1;
    }

    //flag 999 when reinitiating player after changing genre
    if (this.currIndex > (this.trackNumber - 1) || flag == 999) {

      this.currIndex = 0;
    }

    if (this.currIndex < 0) {
      this.currIndex = this.trackNumber - 1;
    }

    if (this.currIndex > -1) {

      if (flag == 0 || flag == 999 && this.audio.paused) this.i.attr("class", "fa fa-play");
      else {
        this.albumArt.removeClass("buffering");
        this.i.attr("class", "fa fa-pause");
      }


      this.seekBar.width(0);
      this.trackTime.removeClass("active");
      this.tProgress.text("00:00");
      this.tTime.text("00:00");

      var currAlbum = this.albums[this.currIndex];

      var currTrackName = this.trackNames[this.currIndex];
      var currArtwork = this.albumArtworks[this.currIndex];

      this.audio.src = this.trackUrl[this.currIndex];

      this.nTime = 0;
      this.bTime = new Date();
      this.bTime = this.bTime.getTime();


      if (flag != 0 && flag != 999) {

        this.audio.play();
        this.playerTrack.addClass("active");
        this.albumArt.addClass("active");

        clearInterval(this.buffInterval);
        this.checkBuffering();
      }

      if (flag == 999) {
        if (this.isPlayActive) {
          this.audio.play();
          this.playerTrack.addClass("active");
          this.albumArt.addClass("active");

          clearInterval(this.buffInterval);
          this.checkBuffering();
        }


      }

      this.albumName.text(currAlbum);
      this.trackName.text(currTrackName);
      this.albumArt.find("img.active").removeClass("active");
      $("#" + currArtwork).addClass("active");

      this.bgArtworkUrl = $("#" + currArtwork).attr("src");

      this.bgArtwork.css({ "background-image": "url(" + this.bgArtworkUrl + ")" });

    }

  }

  initPlayer() {

    if (this.firstTime) {
      this.selectTrack(0);
      this.audio.loop = false;
      this.playPauseButton.on("click", () => this.playPause());
      const showHoverHandler = (event) => {
        this.showHover(event);
      };
      this.sArea.on("mousemove", showHoverHandler);
      this.sArea.on("mouseout", () => this.hideHover());
      this.sArea.on("click", () => this.playFromClickedPos());
      $(this.audio).on("timeupdate", () => this.updateCurrTime());
      this.playPreviousTrackButton.on("click", () => {
        this.selectTrack(-1);
      });
      this.playNextTrackButton.on("click", () => {
        this.selectTrack(1);
      });
    }

    if (!this.firstTime) {
      this.selectTrack(999);
    }

    if (this.firstTime) {
      this.firstTime = false;
    }
  }



}