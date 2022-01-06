import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const groundElems = document.querySelectorAll("[data-ground]");
const Speed = 0.05;

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300);
}

export function updateGround(delta, SpeedScale) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * Speed * SpeedScale * -1);
    if (getCustomProperty(ground, "--left") <= -300) {
      setCustomProperty(ground, "--left", 300);
    }
  });
}
