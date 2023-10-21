import { drawProjectile, drawAcceleration, drawArc, drawText, canon} from "./draw.js";
import { projectileMaker } from "./projectileMaker.js";
import { cordSet } from "./cordSet.js";
import { inputs } from "./inputs.js";
import {getElementById, g, ctx, startButton, pauseButton, homeButton, halfSpeed,canvasWidth,canvasHeight, dec, setG, truncate} from "./constants.js"

 

let run = true

// Calculate the device pixel ratio using the width and height of the canvas.
const devicePixelRatio = (canvasWidth / canvasHeight);

// Define the projectile's initial velocity and angle
let Vo = 10; // Initial velocity in m/s
let angleRad =  45 

let  angle = angleRad * (Math.PI / 180)// Angle in degrees
// Define the gravity constant

getElementById("g").innerHTML = g + "m/s^2";


let projectile = new projectileMaker(Vo, angle)
console.log(projectile)
let k = projectile.home()

let timestep =1
getElementById("angleInput").value = 45 
getElementById("voInput").value = 10 


let inputValues = new inputs()

let cords = new cordSet()

function reset() {
  // Reset the simulation state
  cords = new cordSet()
  inputValues = new inputs()

  setG(getElementById("gravInput").value)



  let VoInput = inputValues.voInput

  angle = inputValues.angleInput  


  
  if  (!(((Math.sin(angle) >= 0) && (Math.cos(angle) > 0))) || (Math.sin(angle) === 1)) {
    projectile = null
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "Blue";
    drawText("Ange vinkel med defintionsmäng 90°-0°", 400, 400, 1)
    
    return 
  }
    

  if (VoInput > 0) {Vo = VoInput} 


  projectile = new projectileMaker(Vo, angle)

  k = projectile.home()
  

  startButton.reset;
}


getElementById("cordinates").innerHTML =`(X:${cords.x} Y: ${cords.y}m)`
// Draw the projectile


canon()

// Update the projectile's position
function update() {
  




  homeButton.addEventListener("click", function() {
  k = projectile.home()
});



  halfSpeed.addEventListener("click", function() {

    if (timestep === 1) {
      timestep= 1/4
    }else {timestep = 1}

  });


  if (run){
    cords.t += (0.01)*timestep; // Time step in second
  }



  const vp = (projectile.vy - (g* cords.t))
  projectile.cVy = (projectile.vy - (g* cords.t))
  projectile.cVx = projectile.vx

  let ms = "m/s"

  



  cords.x = (projectile.vx *  cords.t) *k
  cords.y = (projectile.vy *  cords.t - 0.5 * g * Math.pow(cords.t, 2))*k


  getElementById.innerHTML = "Ymax " +  truncate(projectile.yMax)

  getElementById("hpText").innerHTML = "Vx: " + truncate(projectile.vx) + ms;
  getElementById("vpText").innerHTML = "Vy: " + truncate(projectile.cVy) + ms;
  getElementById("time").innerHTML ="Tid: " + truncate(cords.t) +"s";

  getElementById("cordinates").innerHTML =`(X:${ truncate((cords.x/k))} Y: ${truncate((cords.y/k))}m)`

  // add distance


  




  // If the projectile hits the ground, stop the simulation
  switch (true) {
    case  cords.x/k > projectile.xMax():
      reset()
      return;
  }

  // Calculate the power components.

  drawProjectile(projectile, cords,k);
  

  drawArc(projectile, k)
  let text = function (txt, value) {return txt+ " " + truncate(value) + " m"}
  let YmaxText = text("Ymax:", projectile.yMax )
  let xMaxText = text("Xmax:", projectile.xMax() )
  drawText(xMaxText, (projectile.xMax()/2)*k, 0, k)

  drawText(YmaxText, 65, projectile.yMax*k, k)


let gAxis = new projectileMaker(0, 0)
gAxis.cVy = -g

  
  if (getElementById("aCheck").checked) { drawAcceleration(gAxis, cords,k, 0, "blue", "m/s^2")}
  if (getElementById("hCheck").checked) {drawAcceleration(projectile, cords,k,1, "green", "m/s")}





  // Request the next animation frame
  
  requestAnimationFrame(update);
  

}




addEventListener("wheel", (event) => {
  k += event.deltaY * -0.0001*k
  console.log(k)


});
startButton.addEventListener("click", function() {
  if (cords.t > 0) {reset(); return}
  reset()
  if (projectile != null) {
    update();
  }

});

pauseButton.addEventListener("click", function() {
  if (run == false) {
    run = true
    return
    
  }
  run = false
});



// my suffering had a purpose