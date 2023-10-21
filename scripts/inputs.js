import { getElementById } from "./constants.js"
function inputs() {
    this.voInput = getElementById("voInput").value,
    this.angleInput =getElementById("angleInput").value * (Math.PI / 180)
  }

export  {inputs}