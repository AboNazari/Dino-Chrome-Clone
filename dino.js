import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

// Dino Element
const dinoElem = document.querySelector("[data-dino]");

// Dino Constants
const GRAVITY = 0.0015;
const JUMP_SPEED = 0.45;
const DinoFrameCount = 2;
const FrameTime = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

// setup dino and eventlisteners
export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

// update dino: jump & run handler
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

// run handler
function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = "./images/dino-run-1.png";
    return;
  }

  if (currentFrameTime >= FrameTime) {
    dinoFrame = (dinoFrame + 1) % DinoFrameCount;
    dinoElem.src = `./images/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FrameTime;
  }
  currentFrameTime += delta * speedScale;
}

// jump handler and adjusting it to GRAVITY and delta
function handleJump(delta) {
  // if (!isJumping) return;
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);
  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}

// set isJumping and listen to space click
function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
}

// export dino rects
export function getDinoRects() {
  return dinoElem.getBoundingClientRect();
}

// change img for lose
export function setDinoLose() {
  dinoElem.src = "./images/dino-lose.png";
}
