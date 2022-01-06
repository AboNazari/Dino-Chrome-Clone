import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino } from "./dino.js";

// the constants
const WORLD_HEIGHT = 30;
const WORLD_WIDTH = 100;
const SPEED_SCALE = 1.2;

// the dom elements
const worldEl = document.querySelector("[data-world]");
const startEl = document.querySelector("[data-start]");
const scoreElem = document.querySelector("[data-score]");
const body = document.querySelector("body");

// initializers
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart);

// Update Loop: to update postion of very element on the screen based on the time frame recieved from the monitor
let lastTime;
let score = 0;
// let waitTime;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  lastTime = time;

  // calling the ground loop
  updateGround(delta, SPEED_SCALE);

  // calling Dino move
  updateDino(delta, SPEED_SCALE);

  window.requestAnimationFrame(update);

  // calling Update score
  updateScore(delta);
  scoreElem.textContent = score;

  // background color change
  // waitTime = time;
  // if (waitTime > 10000) {
  //   body.style.backgroundColor = "black";
  // } else if (waitTime > 20000) {
  //   body.style.backgroundColor = "green";
  // }
}

// start the key via a key press
function handleStart() {
  lastTime = null;
  setupGround();
  setupDino();
  window.requestAnimationFrame(update);
  startEl.classList.add("hide");
}

// updating the score based on the delta
function updateScore(delta) {
  return (score += Math.floor(delta * 0.06));
}

//  setting the scale of the page on resize action
function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldEl.style.height = `${worldToPixelScale * WORLD_HEIGHT}px`;
  worldEl.style.width = `${worldToPixelScale * WORLD_WIDTH}px`;
}
