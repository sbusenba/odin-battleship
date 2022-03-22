const ship = (shipLength) => {
  const x = 0; const y = 0; let facing; const length = shipLength; let xFactor; let yFactor;
  facing = 'north';
  const parts = new Array(0);
  switch (facing) {
    case 'north':
      xFactor = 0;
      yFactor = 1;
      break;
    case 'south':
      xFactor = 0;
      yFactor = -1;
      break;
    case 'east':
      xFactor = 1;
      yFactor = 0;
      break;
    case 'west':
      xFactor = -1;
      yFactor = 0;
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
  const hit = (pos) => {
    if (parts[pos].hit !== true) {
      parts[pos].hit = true;
      return true;
    }
    return 'illegal move';
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
