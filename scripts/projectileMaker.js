import {g, canvasWidth, canvasHeight} from "./constants.js"

function projectileMaker(Vo, angle) {
    this.vo = Vo 

    this.vy = Vo * Math.sin(angle);
    this.vx = Vo * Math.cos(angle)
    this.yMax = (Math.pow(Vo, 2) * Math.pow(Math.sin(angle), 2)) / (2 * g),
    this.xMax = function() {
      return (2*Vo * Math.cos(angle) * Math.sqrt(2 * this.yMax / g))
    },
    this.home = function() {
      let Yhome = (canvasHeight/this.yMax) 
      let xHome = canvasWidth/this.xMax() 
      console.log(xHome, Yhome)
      if ( xHome>Yhome) {
        return Yhome - 0.05*Yhome
      }

      return xHome
    }
  }

export {projectileMaker}