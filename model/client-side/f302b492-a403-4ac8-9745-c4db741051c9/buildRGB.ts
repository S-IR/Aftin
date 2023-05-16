type RGBValues = {
  r: number;
  g: number;
  b: number;
}[];

export const buildRgb = (imageData: ImageData[`data`]): RGBValues => {
  const rgbValues = [];
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
};

export const findBiggestColorRange = (rgbValues: RGBValues) => {
  //we declare the minimum valus here at the start to be the max 255 or 0 in order for them to be slowly increased / decreaseed if there is a pixel that has a bigger / smaller value than them
  let rMin = 255;
  let gMin = 255;
  let bMin = 255;

  let rMax = 0;
  let gMax = 0;
  let bMax = 0;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
};

export const ColorQuantization = (
  rgbValues: RGBValues,
  depth: number
): RGBValues => {
  const MAX_DEPTH = 4;

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...ColorQuantization(rgbValues.slice(0, mid), depth + 1),
    ...ColorQuantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r: number, g: number, b: number) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
export const rgbArrayToHex = (
  colorArray: Array<{ r: number; g: number; b: number }>
): string[] => {
  let hexArray: string[] = [];
  colorArray.forEach((color) => {
    const hexColor = rgbToHex(color.r, color.g, color.b);
    hexArray.push(hexColor);
  });
  return hexArray;
};
