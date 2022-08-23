"use strict";

const img = document.querySelector(".catImg");

let start = null;
let count = 0;

function falling(timestamp) {
  if (!start) start = timestamp;
  const progress = timestamp - start;
  const topString = img.style.top;
  img.style.top = parseInt(topString || 0, 10) + 2 + "px";

  if (progress < 2000) {
    window.requestAnimationFrame(falling);
  }
}

window.requestAnimationFrame(falling);
