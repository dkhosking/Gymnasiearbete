const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
import {g, canvasWidth, canvasHeight, truncate} from "./constants.js"



function drawText(text, x, y, k, color) {
  ctx.fillStyle = color

  

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

function drawAcceleration(projectile, cords,k,a, color, txt) {
  ctx.strokeStyle = color

  let y = projectile.cVy
  let x = projectile.cVx

  k = k/5

  const Xline = x*k
  const Yline = y*k
  // Draw the arrows.
  ctx.translate(cords.x, cords.y);
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Xline, 0);

  ctx.moveTo(0, 0);
  ctx.lineTo(0, ((Yline)))

  drawText(truncate(y)+ txt, -50, Yline, k, color) 

  drawText(truncate(x)+ txt,Xline, 0, k, color) 

  ctx.translate(-(cords.x), -(cords.y));

  ctx.stroke();
  ctx.closePath();
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