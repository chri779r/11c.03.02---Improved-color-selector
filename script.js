"use strict";

document.querySelector("#colorpicker").addEventListener("input", init);

function init() {
  const input = document.querySelector("#colorpicker").value;
  console.log(input);
  let rgbObject = hextorgb(input);
  console.log(rgbObject);

  let rgbShow = convert(rgbObject);
  const theShow = rgbToCss(rgbObject);
  let finalHex = toHex(rgbObject);
  let finalHsl = toHls(rgbObject);
  console.log(finalHex);

  for (let index = 1; index <= 5; index++) {
    showRgb(rgbShow, index);
    changeBack(theShow, index);
    showHex(finalHex, index);
    showHsl(finalHsl, index);
  }
}

function showRgb(rgb, index) {
  document.querySelector(`#colorinfo${index} .rgb .value`).textContent = rgb;
}

function showHex(hexcode, index) {
  document.querySelector(`#colorinfo${index} .hexcode .value`).textContent = hexcode;
}

function showHsl(hsl, index) {
  document.querySelector(`#colorinfo${index} .hsl .value`).textContent = hsl;
}

function changeBack(change, index) {
  document.querySelector(`#colorinfo${index} .colorbox`).style.backgroundColor = change;
}

randomBackground();

function randomBackground() {
  const theColor = randomColor();
  const theString = rgbToCss(theColor);
  document.querySelector(".colorbox").style.backgroundColor = theString;
}
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}
function rgbToCss(theColor) {
  const finalString = "rgb(" + theColor.r.toString() + ", " + theColor.g.toString() + ", " + theColor.b.toString() + ")";
  console.log(finalString);
  return finalString;
}

function hextorgb(hex) {
  const toR = hex.substring(1, 3);
  const toG = hex.substring(3, 5);
  const toB = hex.substring(5, 7);

  const r = Number.parseInt(toR, 16);
  const g = Number.parseInt(toG, 16);
  const b = Number.parseInt(toB, 16);

  console.log("RGB : " + r + g + b);
  return { r, g, b };
}

function toHex(rgbObject) {
  const hexR = rgbObject.r.toString(16).padStart(2, "0");
  const hexG = rgbObject.g.toString(16).padStart(2, "0");
  const hexB = rgbObject.b.toString(16).padStart(2, "0");

  const hex = "#" + hexR + hexG + hexB;
  console.log(hex);
  return hex;
}

function convert(rgbObject) {
  const colorBox = "(" + rgbObject.r + ", " + rgbObject.g + ", " + rgbObject.b + ")";

  const rFirstIndex = colorBox.indexOf("(");
  const rSecondIndex = colorBox.indexOf(",");
  const gSecondIndex = colorBox.lastIndexOf(",");
  const bSecondIndex = colorBox.lastIndexOf(")");

  const r = colorBox.substring(rFirstIndex + 1, rSecondIndex);
  const g = colorBox.substring(rSecondIndex + 2, gSecondIndex);
  const b = colorBox.substring(gSecondIndex + 2, bSecondIndex);
  return `RGB: (${r}, ${g}, ${b})`;
}

function toHls(rgbObject) {
  let r = rgbObject.r;
  let g = rgbObject.g;
  let b = rgbObject.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return "hsl(" + h.toFixed() + "%," + s.toFixed() + "%," + l.toFixed() + "%)";
}
