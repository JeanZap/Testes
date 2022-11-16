function geometricArea(a, b, c) {
  return (
    Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2
  );
}

function checkPointInside(a, b, c, p) {
  const triangleArea = geometricArea(a, b, c);
  const areaPAB = geometricArea(p, a, b);
  const areaPBC = geometricArea(p, b, c);
  const areaPAC = geometricArea(p, a, c);

  console.log(
    triangleArea,
    areaPAB + areaPAC + areaPBC,
    areaPAB,
    areaPAC,
    areaPBC
  );
  return triangleArea === areaPAB + areaPAC + areaPBC;
}

function moduleTwoPoints(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function pointsBelong(x1, y1, x2, y2, x3, y3, xp, yp, xq, yq) {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x: x3, y: y3 };
  const p = { x: xp, y: yp };
  const q = { x: xq, y: yq };

  const moduleAB = moduleTwoPoints(a, b);
  const moduleBC = moduleTwoPoints(b, c);
  const moduleAC = moduleTwoPoints(a, c);

  const firstConstraint = moduleAB + moduleBC > moduleAC;
  const secondConstraint = moduleBC + moduleAC > moduleAB;
  const thirdConstraint = moduleAB + moduleAC > moduleBC;

  const fitsConstraints =
    firstConstraint && secondConstraint && thirdConstraint;

  if (!fitsConstraints) {
    return 0;
  }

  const pInside = checkPointInside(a, b, c, p);
  const qInside = checkPointInside(a, b, c, q);

  if (pInside && qInside) {
    return 3;
  } else if (pInside) {
    return 1;
  } else if (qInside) {
    return 2;
  } else {
    return 4;
  }
}

function main() {
  const result = pointsBelong(3, 1, 7, 1, 5, 5, 5, 2, 6, 3);

  console.log(result);
}

main();
