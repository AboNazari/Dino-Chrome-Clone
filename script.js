import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRects, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

// the constants
const WORLD_HEIGHT = 40;
const WORLD_WIDTH = 100;
const SPEED_SCALE_INCREASE = 0.00001;

// the dom elements
const worldEl = document.querySelector("[data-world]");
const startEl = document.querySelector("[data-start]");
const scoreElem = document.querySelector("[data-score]");

// initializers
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

// Update Loop: to update postion of very element on the screen based on the time frame recieved from the monitor
let lastTime;
let score;
let speedScale;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  // calling the ground loop
  updateGround(delta, speedScale);

  // calling Dino move
  updateDino(delta, speedScale);

  // update speedScale
  updateSpeedScale(delta);
  // update cactus
  updateCactus(delta, speedScale);

  // calling Update score
  updateScore(delta);
  // check lose
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

// start the key via a key press
function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startEl.classList.add("hide");
  window.requestAnimationFrame(update);
}

// check lose
function checkLose() {
  const dinoRect = getDinoRects();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

// check collision
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

// handle lose
function handleLose() {
  setDinoLose();

  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startEl.classList.remove("hide");
  }, 100);
}
// update speed scale
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

// updating the score based on the delta
function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
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
