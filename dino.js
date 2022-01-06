import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

// Dino Element
const dinoElem = document.querySelector("[data-dino]");

// Dino Constants
const GRAVITY = 0.015;
const JUMP_SPEED = 0.45;
const DinoFrameCount = 2;
const FrameTime = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  yVelocity = 0;
  currentFrameTime = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  // document.removeEventListener("keydown", doJump);
  document.addEventListener("keydown", doJump);
}
export function updateDino(delta, speedScale) {
  handleJump(delta);
  handleRun(delta, speedScale);
}

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

function handleJump(delta) {
  if (!isJumping) return;
  console.log(delta);
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
  console.log(yVelocity);
}

function doJump(e) {
  console.log("jump");
  if (e.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
}
