window.addEventListener("load", init, false);

function init() {
  const v = document.querySelector(".video");
  const vSrcLink = document.querySelectorAll(".vSrcLink");
  const vSrc1 = document.querySelector(".vSrc1");
  const vSrc2 = document.querySelector(".vSrc2");
  const vSrc3 = document.querySelector(".vSrc3");
  const playBtn = document.querySelector(".playBtn");
  const stopBtn = document.querySelector(".stopBtn");
  const backwardBtn = document.querySelector(".backwardBtn");
  const forwardsBtn = document.querySelector(".forwardsBtn");
  const volumeUpBtn = document.querySelector(".volumeUpBtn");
  const curTimeText = document.querySelector(".curTimeText");
  const reduceVolumeBtn = document.querySelector(".reduceVolumeBtn");
  const maximizeBtn = document.querySelector(".maximizeBtn");

  let getTime, getSrc1, getSrc2, getSrc3, updInfo;

  v.addEventListener("ended", function() {
    playBtn.src = "img/controls/play.png";
    playBtn.title = "Воспроизведение";
  });

  for (let i = 0; i < vSrcLink.length; i++) {
    vSrcLink[i].addEventListener("click", function(e) {
      if (vSrcLink[i] != null) {
        v.poster = `img/poster/${i + 1}.jpg`;
        vSrc1.src = `video/${i + 1}/${i + 1}.mp4`;
        vSrc2.src = `video/${i + 1}/${i + 1}.ogv`;
        vSrc3.src = `video/${i + 1}/${i + 1}.webm`;

        getSrc1 = vSrc1.src;
        getSrc2 = vSrc2.src;
        getSrc3 = vSrc3.src;

        if ((playBtn.src = "img/controls/pause.png")) {
          playBtn.src = "img/controls/play.png";
          playBtn.title = "Воспроизведение";
        }
      }
      v.load();
    });
  }

  playBtn.addEventListener(
    "click",
    function(e) {
      if (v.paused) {
        if (getTime != 0) {
          updInfo = JSON.parse(localStorage.getItem("infoV"));
          // console.log(updInfo);
          for (const prop in updInfo) {
            console.log(`${prop}: ${updInfo[prop]}`);
            if (prop === "curTime") {
              v.currentTime = updInfo[prop];
            }
            if (prop === "src1") {
              vSrc1.src = updInfo[prop];
            }
            if (prop === "src2") {
              vSrc2.src = updInfo[prop];
            }
            if (prop === "src3") {
              vSrc3.src = updInfo[prop];
            }
          }
          v.load();
        }

        getSrc1 = vSrc1.getAttribute("src");
        getSrc2 = vSrc2.getAttribute("src");
        getSrc3 = vSrc3.getAttribute("src");

        v.play();
        e.target.src = "img/controls/pause.png";
        e.target.title = "Пауза";
      } else {
        v.pause();
        e.target.src = "img/controls/play.png";
        e.target.title = "Воспроизведение";
      }
    },
    false
  );

  stopBtn.addEventListener(
    "click",
    function() {
      v.pause();
      v.currentTime = 0;
      playBtn.src = "img/controls/play.png";
      playBtn.title = "Воспроизведение";
    },
    false
  );

  backwardBtn.addEventListener(
    "click",
    function() {
      v.currentTime -= 10;
    },
    false
  );

  forwardsBtn.addEventListener(
    "click",
    function() {
      v.currentTime += 10;
    },
    false
  );

  reduceVolumeBtn.addEventListener(
    "click",
    function() {
      v.volume -= 0.1;
    },
    false
  );

  volumeUpBtn.addEventListener(
    "click",
    function() {
      v.volume += 0.1;
    },
    false
  );

  maximizeBtn.addEventListener(
    "click",
    function() {
      let vid = document.querySelector(".video");
      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      } else if (vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen();
      } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
      }
    },
    false
  );

  v.addEventListener(
    "timeupdate",
    function(e) {
      curTimeText.innerHTML = `${parseInt(v.currentTime)} / ${parseInt(
        v.duration
      )}`;

      getTime = parseFloat(e.target.currentTime);

      let info = {};
      info.curTime = getTime;
      info.src1 = getSrc1;
      info.src2 = getSrc2;
      info.src3 = getSrc3;
      info.poster = v.getAttribute("poster");

      localStorage.setItem("infoV", JSON.stringify(info));
    },
    false
  );

  if (getTime != 0) {
    updInfo = JSON.parse(localStorage.getItem("infoV"));
    for (const prop in updInfo)
      if (prop === "poster") {
        v.poster = updInfo[prop];
      }
  }
}
