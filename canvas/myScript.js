const btn = document.querySelector(".btn");
paper.install(window);

// window.onload = function () {
//   canvas();
// };

btn.onclick = () => {
  canvas();
};

function canvas() {
  const imgs = Array.from(document.getElementsByTagName("img"));
  const canvasArr = [];
  const ctxArr = [];
  const btnArr = [];
  imgs.forEach((img, index) => {
    makeCanvas(img, canvasArr, index, ctxArr);
    makeBtn(img, btnArr, index, canvasArr);
  });
  for (let i = 0; i < canvasArr.length; i++) {
    canvasArr[i].style.filter = "saturate(0)";
  }
}

const levels = {
  10: { count: 10, width: 3 },
  20: { count: 20, width: 6 },
  40: { count: 40, width: 12 },
};

let level = levels["10"];

const draw = (img, id) => {
  paper.setup(id);
  const raster = new Raster({
    source: img.src,
    position: view.center,
  });
  const bound = img.getBoundingClientRect();
  raster.size = new Size(bound.width, bound.height);

  /* define shape */

  const bluePath = new Path.Circle(new Point(20, 20), 2);
  bluePath.strokeColor = "black";
  const blueSimbole = new Symbol(bluePath);

  const redPath = new Path(
    new Point(8, 0),
    new Point(4, 8),
    new Point(12, 8),
    new Point(8, 0)
    // new Point(3, 3),
    // new Point(5, 5)
  );
  redPath.strokeColor = "black";
  const redSimbole = new Symbol(redPath);

  const greenPath = new Path(
    new Point(2, 2),
    new Point(2, 0),
    new Point(2, 4),
    new Point(2, 2),
    new Point(0, 2),
    new Point(4, 2)
  );
  greenPath.strokeColor = "black";

  const greenSimbole = new Symbol(greenPath);

  var circle = new Path.Circle(new Point(0, 3), 1);
  circle.fillColor = "green";
  var circle = new Path.Circle(new Point(3, 0), 1);
  circle.fillColor = "green";
  var circle = new Path.Circle(new Point(20, 0), 1);
  circle.fillColor = "red";
  var circle = new Path.Circle(new Point(0, 20), 1);
  circle.fillColor = "red";

  for (let i = 0; i < img.clientWidth; i += level.count) {
    for (let j = 0; j < img.clientHeight; j += level.count) {
      const circle = new Path.Circle(new Point(i, j), 1);
      circle.fillColor = "white";
      const hex = getHexColor(raster, i, j);

      let { h, s, l } = hexToHSL(hex);
      console.log(`H is ${(h, s)}`);
      let color = matchColor(h, s);
      console.log(`Color is ${color}`);
      drawColor(color, i, j);

      // let { mainR, mainG, mainB } = getMainColor(R, G, B);
      // const sum = mainR + mainG + mainB;
      // const percentR = getPercent(mainR, sum);
      // const percentG = getPercent(mainG, sum);
      // const percentB = getPercent(mainB, sum);
      // const { numberR, numberG, numberB } = getNumber(
      //   percentR,
      //   percentG,
      //   percentB
      // );
      // const numberArray = [];
      // inputArray(numberArray, numberR, numberG, numberB);
      // for (let k = 5; k < 20; k += 10) {
      //   for (let l = 5; l < 20; l += 10) {
      //     drawSimbole(
      //       numberArray,
      //       redSimbole,
      //       greenSimbole,
      //       blueSimbole,
      //       i,
      //       j,
      //       k,
      //       l
      //     );
      //   }
      // }
    }
  }
};

function hexToHSL(hex) {
  hex = hex.replace(/#/g, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }
  var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
  if (!result) {
    return null;
  }
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return {
    h,
    s,
    l,
  };
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(360 * h);

  return { h, s, l };
}

function drawColor(color, i, j) {
  /* define shape */
  let center = level.count / 2;
  /* R */
  const rPath = new Path(
    new Point(center, center - level.width),
    new Point(center - level.width, center + level.width),
    new Point(center + level.width, center + level.width),
    new Point(center, center - level.width)
    // new Point(3, 3),
    // new Point(5, 5)
  );
  rPath.strokeColor = "black";
  const rSimbole = new Symbol(rPath);

  /* YR */
  const yrPath = new Path(
    new Point(center - level.width, center - level.width),
    new Point(center + level.width, center - level.width),
    new Point(center, center + level.width),
    new Point(center - level.width, center - level.width)
  );
  yrPath.strokeColor = "black";
  const yrSimbole = new Symbol(yrPath);

  /* Y */
  const yPath = new Path(
    new Point(center, center - level.width),
    new Point(center, center),
    new Point(center - level.width, center + level.width),
    new Point(center, center),
    new Point(center + level.width, center + level.width)
  );
  yPath.strokeColor = "black";
  const ySimbole = new Symbol(yPath);

  /* GY */
  const gyPath = new Path(
    new Point(center, center - level.width),
    new Point(center, center + level.width),
    new Point(center, center),
    new Point(center - level.width, center),
    new Point(center + level.width, center)
  );
  gyPath.strokeColor = "black";
  const gySimbole = new Symbol(gyPath);

  /* G */
  const gPath = new Path.Rectangle(new Point(center, center), level.width * 2);
  gPath.strokeColor = "black";
  const gSimbole = new Symbol(gPath);

  /* BG */
  const bgPath = new Path(
    new Point(center - level.width, center - level.width),
    new Point(center + level.width, center + level.width),
    new Point(center, center),
    new Point(center - level.width, center + level.width),
    new Point(center + level.width, center - level.width)
  );
  bgPath.strokeColor = "black";
  const bgSimbole = new Symbol(bgPath);

  /* B */
  const bPath = new Path.Circle(new Point(center, center), level.width);
  bPath.strokeColor = "black";
  const bSimbole = new Symbol(bPath);

  /* PB */
  const pbPath = new CompoundPath({
    children: [
      new Path.Circle(new Point(center, center), level.width - 3),

      new Path.Circle(new Point(center, center), level.width),
    ],
    strokeColor: "black",
  });
  const pbSimbole = new Symbol(pbPath);

  /* P */
  const pPath = new Path.Star({
    center: new Point(center, center),
    points: 5,
    radius1: level.width - 3,
    radius2: level.width,
    strokeColor: "black",
  });
  const pSimbole = new Symbol(pPath);

  /* RP */
  const rpPath = new Path.Star({
    center: new Point(center, center),
    points: 8,
    radius1: level.width - 3,
    radius2: level.width,
    strokeColor: "black",
  });
  const rpSimbole = new Symbol(rpPath);

  switch (color) {
    case "R":
      rSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "YR":
      yrSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "Y":
      ySimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "GY":
      gySimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "G":
      gSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "BG":
      bgSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "B":
      bSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "PB":
      pbSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "P":
      pSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    case "RP":
      rpSimbole.place(new Point(i + level.count / 2, j + level.count / 2));
      break;
    default:
      return;
  }
}

function getHexColor(raster, i, j) {
  console.log(`i, j : ${i}, ${j}`);
  let hex = null;
  const color = raster.getAverageColor(
    new Rectangle(i, j, level.count, level.count)
  );
  if (color === null) {
    hex = "#ffffff";
  } else {
    hex = color.toCSS(true);
  }
  console.log(color);

  console.log(raster);
  // const imgData = raster.getImageData(
  //   new Rectangle(i, j, level.count, level.count)
  // );
  // let length = imgData.data.length;
  // let count = 0;
  // let R = 0;
  // let G = 0;
  // let B = 0;
  // for (let k = 0; k < length; k += 4) {
  //   R += imgData.data[k];
  //   G += imgData.data[k + 1];
  //   B += imgData.data[k + 2];
  //   count++;
  // }
  // console.log(raster);
  // console.log(imgData);

  // R = Math.floor(R / count);
  // G = Math.floor(G / count);
  // B = Math.floor(B / count);

  return hex;
}

function getMainColor(R, G, B) {
  const array = [R, G, B];
  const minValue = Math.min(R, G, B);

  let mainR = R - minValue;
  let mainG = G - minValue;
  let mainB = B - minValue;
  return {
    mainR,
    mainG,
    mainB,
  };
}

function getPercent(main, sum) {
  const percent = (main / sum) * 100;
  if (isNaN(percent)) {
    return 0;
  }

  return Math.round(percent);
}

function getNumber(percentR, percentG, percentB) {
  const numberR = Math.round(4 * (percentR / 100));
  const numberG = Math.round(4 * (percentG / 100));
  const numberB = Math.round(4 * (percentB / 100));

  return {
    numberR,
    numberG,
    numberB,
  };
}

function inputArray(numberArray, numberR, numberG, numberB) {
  for (let i = 0; i < numberR; i++) {
    numberArray.push(0);
  }
  for (let i = 0; i < numberG; i++) {
    numberArray.push(1);
  }
  for (let i = 0; i < numberB; i++) {
    numberArray.push(2);
  }
}

function drawSimbole(
  numberArray,
  redSimbole,
  greenSimbole,
  blueSimbole,
  i,
  j,
  k,
  l
) {
  if (Array.isArray(numberArray) && numberArray.length === 0) {
    return;
  }

  if (numberArray[0] === 0) {
    numberArray.shift();
    return redSimbole.place(new Point(i + l, j + k));
  }
  if (numberArray[0] === 1) {
    numberArray.shift();
    return greenSimbole.place(new Point(i + l, j + k));
  }
  if (numberArray[0] === 2) {
    numberArray.shift();
    return blueSimbole.place(new Point(i + l, j + k));
  }
}

function makeCanvas(img, canvasArr, index, ctxArr) {
  const dpr = window.devicePixelRatio;
  const imgBound = img.getBoundingClientRect();
  const imgWidth = imgBound.width;
  const imgHeight = imgBound.height;

  canvasArr.push(document.createElement("canvas"));
  canvasArr[index].style.width = imgWidth + "px";
  canvasArr[index].style.height = imgHeight + "px";
  canvasArr[index].style.position = "absolute";
  canvasArr[index].id = index;
  canvasArr[index].style.zIndex = "1";
  ctxArr.push(canvasArr[index].getContext("2d"));
  canvasArr[index].style.position = "absolute";
  canvasArr[index].style.top = imgBound.top + "px";
  canvasArr[index].style.left = imgBound.left + "px";
  canvasArr[index].width = dpr * imgBound.width;
  canvasArr[index].height = dpr * imgBound.height;
  document.body.appendChild(canvasArr[index]);

  ctxArr[index].scale(dpr, dpr);

  draw(img, canvasArr[index].id);
}

function makeBtn(img, btnArr, index, canvasArr) {
  const imgBound = img.getBoundingClientRect();
  const imgTop = imgBound.top;
  const imgLeft = imgBound.left;
  const canvas = canvasArr[index];
  btnArr.push(document.createElement("button"));
  btnArr[index].addEventListener("click", () => {
    canvas.classList.toggle("hidden");
  });
  btnArr[index].style.width = 20 + "px";
  btnArr[index].style.height = 20 + "px";
  btnArr[index].style.position = "absolute";
  btnArr[index].style.zIndex = "2";
  btnArr[index].style.top = imgTop + 10 + "px";
  btnArr[index].style.left = imgLeft + 10 + "px";
  document.body.appendChild(btnArr[index]);
}

function matchColor(h, s) {
  if (s < 5) {
    return;
  } else if (18 < h && h <= 54) {
    return "YR";
  } else if (54 < h && h <= 90) {
    return "Y";
  } else if (90 < h && h <= 126) {
    return "GY";
  } else if (126 < h && h <= 162) {
    return "G";
  } else if (162 < h && h <= 198) {
    return "BG";
  } else if (198 < h && h <= 234) {
    return "B";
  } else if (234 < h && h <= 270) {
    return "PB";
  } else if (270 < h && h <= 306) {
    return "P";
  } else if (306 < h && h <= 342) {
    return "RP";
  } else {
    return "R";
  }
}
