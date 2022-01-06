const WORLD_HEIGHT = 30;
const WORLD_WIDTH = 100;
const worldEl = document.querySelector("[data-world]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);

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
