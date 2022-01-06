export function getCustomProperty(elem, prop) {
  return Math.floor(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}
export function setCustomProperty(elem, prop, value) {
  return elem.style.setProperty(prop, value);
}
export function incrementCustomProperty(elem, prop, inc) {
  return setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
