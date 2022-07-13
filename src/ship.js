const ship = (x, y, facing, shipLength) => {
  const length = shipLength; let xFactor; let yFactor;
  const parts = new Array(0);
  switch (facing) {
    case 'north':
      xFactor = 1;
      yFactor = 0;
      break;
    case 'south':
      xFactor = -1;
      yFactor = 0;
      break;
    case 'east':
      xFactor = 0;
      yFactor = 1;
      break;
    case 'west':
      xFactor = 0;
      yFactor = -1;
      break;
    default:
      break;
  }

  for (let i = 0; i < length; i += 1) {
    parts.push({
      x: x + i * xFactor,
      y: y + i * yFactor,
      hit: false,
    });
  }
  const hit = (xPos, yPos) => {
    let gotHit = false;
    parts.forEach((part) => {
      if ((part.x === xPos) && (part.y === yPos)) {
        part.hit = true;
        gotHit = true;
      }
    });
    return gotHit;
  };

  const isSunk = () => {
    let sunk = true;
    for (let i = 0; i < length; i += 1) {
      if (parts[i].hit === false) sunk = false;
    }
    return sunk;
  };

  return {
    x, y, facing, length, parts, hit, isSunk,
  };
};

module.exports = ship;
