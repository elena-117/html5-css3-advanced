window.addEventListener("load", init, false);

function init() {
  const btn = document.querySelector(".button");

  btn.addEventListener(
    "mousedown",
    () => {
      btn.style.boxShadow = "none";
    },
    false
  );

  btn.addEventListener(
    "mouseup",
    () => {
      btn.style.boxShadow = "inset 0px -5px 0px 0px rgba(0, 0, 0, 0.15)";
    },
    false
  );
}