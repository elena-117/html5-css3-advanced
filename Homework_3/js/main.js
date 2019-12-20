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

  v.addEventListener("ended", () => {
    playBtn.src = "img/controls/play.png";
    playBtn.title = "Воспроизведение";
  });

  for (let i = 0; i < vSrcLink.length; i++) {
    vSrcLink[i].addEventListener("click", () => {
      if (vSrcLink[i] != null) {
        v.poster = `img/poster/${i + 1}.jpg`;
        vSrc1.src = `video/${i + 1}/${i + 1}.mp4`;
        vSrc2.src = `video/${i + 1}/${i + 1}.ogv`;
        vSrc3.src = `video/${i + 1}/${i + 1}.webm`;

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
    e => {
      if (v.paused) {
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
    () => {
      v.pause();
      v.currentTime = 0;
      playBtn.src = "img/controls/play.png";
      playBtn.title = "Воспроизведение";
    },
    false
  );

  backwardBtn.addEventListener(
    "click",
    () => {
      v.currentTime -= 10;
    },
    false
  );

  forwardsBtn.addEventListener(
    "click",
    () => {
      v.currentTime += 10;
    },
    false
  );

  reduceVolumeBtn.addEventListener(
    "click",
    () => {
      v.volume -= 0.1;
    },
    false
  );

  volumeUpBtn.addEventListener(
    "click",
    () => {
      v.volume += 0.1;
    },
    false
  );

  maximizeBtn.addEventListener(
    "click",
    () => {
      if (v.requestFullscreen) {
        v.requestFullscreen();
      } else if (v.mozRequestFullScreen) {
        v.mozRequestFullScreen();
      } else if (v.webkitRequestFullscreen) {
        v.webkitRequestFullscreen();
      }
    },
    false
  );

  v.addEventListener(
    "timeupdate",
    () => {
      if (v.duration) {
        curTimeText.innerHTML = `${parseInt(v.currentTime)} / ${parseInt(
          v.duration
        )}`;
      } else {
        curTimeText.innerHTML = `${parseInt(v.currentTime)} / -/-`;
      }

      getTime = parseFloat(v.currentTime);

      let info = {};
      info.curTime = getTime;
      info.src1 = getSrc1;
      info.src2 = getSrc2;
      info.src3 = getSrc3;

      localStorage.setItem("infoV", JSON.stringify(info));
    },
    false
  );

  if (getTime != 0) {
    updInfo = JSON.parse(localStorage.getItem("infoV"));
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
}
