import { ui } from "./ui.js";

let localData = null;

export function changeLocaleData(value) {
  localData = value;
  ui(localData);
}
