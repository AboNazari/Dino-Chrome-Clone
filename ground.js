import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const groundElems = document.querySelectorAll("[data-ground]");
const Speed = 0.5;

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300);
}

export function ground(delta) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * Speed * -1);
    if (getCustomProperty(ground, "--left") <= -300) {
      setCustomProperty(ground, "--left", 300);
    }
  });
}
