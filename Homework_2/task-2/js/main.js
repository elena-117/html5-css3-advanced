window.addEventListener('load', init, false);

function init() {
   let canvas = document.getElementById("canvas");
   let context = canvas.getContext("2d");

   context.shadowColor = 'rgba(255, 0, 0, .8)';
   context.shadowBlur = 4;
   context.shadowOffsetX = 4;
   context.shadowOffsetY = 4;

   let imgLeaf = new Image();
   imgLeaf.onload = function () {
      context.drawImage(imgLeaf, 220, 145, 160, 160);
   };
   imgLeaf.src = "img/leaf.png";

   context.strokeStyle = 'black';
   context.strokeRect(100, 100, 400, 250);

   context.fillStyle = 'red';
   context.fillRect(100, 100, 100, 250);

   context.fillStyle = 'white';
   context.fillRect(200, 100, 200, 250);

   context.fillStyle = 'red';
   context.fillRect(400, 100, 100, 250);

}