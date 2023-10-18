
const getElementById = function (a) {return document.getElementById(a)};
let g = 9.82;

let setG = function (val) {if (!(isNaN(val)) && val != "") {g = val}}
const canvas = getElementById("canvas");
const ctx = canvas.getContext("2d");
const dec = 2
let truncate = function (a) {return a.toFixed(dec)};

const startButton = getElementById("startButton");
const resetButton = getElementById("resetButton")
const pauseButton = getElementById("pauseBtn")
const homeButton = getElementById("homeBtn")
const halfSpeed = getElementById("halfSpeed")
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;


export {getElementById, g, canvas, ctx, startButton, resetButton, pauseButton, homeButton, halfSpeed,canvasWidth,canvasHeight,dec, setG, truncate};