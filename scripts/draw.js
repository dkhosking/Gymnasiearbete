const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
import {g, canvasWidth, canvasHeight, dec} from "./constants.js"


  function drawAcceleration(projectile, cords,k,a, color) {
    ctx.strokeStyle = color
    k = k/5
    // Draw the arrows.
    ctx.translate(cords.x, cords.y);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(projectile.vx*k, 0);

    ctx.moveTo(0, 0);
    ctx.lineTo(0, (projectile.vy -(g*cords.t)*a)*k);

    ctx.translate(-(cords.x), -(cords.y));

    ctx.stroke();
    ctx.closePath();
}
function drawText(text, x, y, k) {

  

  ctx.font = "20px serif";
  ctx.save()


  ctx.moveTo( x, y);


  ctx.translate((x-((ctx.measureText(text).width / 2))), y +10)
  ctx.scale(-1,1)

  ctx.rotate(Math.PI)
  ctx.fillText(text, 0,0);

  ctx.textAlign = "center"
  ctx.restore()
}

function drawArc(projectile, k) {
  ctx.beginPath();

  ctx.moveTo(0, projectile.yMax*k);
  ctx.lineTo(canvasWidth, projectile.yMax*k)
  ctx.strokeStyle = "Gray"


  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo((projectile.xMax()/2)*k, (projectile.yMax*2)*k, projectile.xMax()*k, 0);
  ctx.stroke();
}





  
  function drawProjectile(projectile, cords,k) {
    ctx.clearRect(0, 0, canvasWidth,  canvasHeight);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(cords.x, cords.y, 5, 0, Math.PI * 2);
    ctx.fill();
}
  
  


export  { drawProjectile, drawAcceleration, drawArc, drawText}