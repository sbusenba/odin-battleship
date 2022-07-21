const ship = (x, y, facing, shipLength,shipName) => {
  const length = shipLength; let xFactor; let yFactor;
  let isSunkFlag = false;
  const name = shipName;
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
      yFactor = -1;
      break;
    case 'west':
      xFactor = 0;
      yFactor = 1;
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
      if ((part.x === xPos) && (part.y === yPos)&&(part.hit === false)) {
        part.hit = true;
        gotHit = true;
      }
    });
    isSunk();
    return gotHit;
  };

  const isSunk = () => {
    let sunk = true;
    for (let i = 0; i < length; i += 1) {
      if (parts[i].hit === false) sunk = false;
    }
    if ((sunk === true) && (isSunkFlag=== false)){
      isSunkFlag = true;
      let coms = document.querySelector('.coms')
      let sunkMessage = document.createElement('p')
      sunkMessage.style.color = 'red';
      sunkMessage.innerText = name + " sunk!"
      coms.appendChild(sunkMessage)
    }
    return sunk;
  };

  return {
    x, y, facing, length, parts, hit, isSunk, name,
  };
};

module.exports = ship;
