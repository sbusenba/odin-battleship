const ship = require('./ship');

const gameboard = () => {
  const shipsToPlace = [
    { name: 'carrier', length: 5, quantity: 1 },
    { name: 'battleship', length: 4, quantity: 1 },
    { name: 'destroyer', length: 3, quantity: 1 },
    { name: 'submarine', length: 3, quantity: 1 },
    { name: 'patrol boat', length: 2, quantity: 1 },
  ];
  const ships = [];
  const directions = ['north', 'south', 'east', 'west'];
  const attacks = [];
  const board = [['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']];

  const allSunk = () => {
    let allShipsSunk = true;
    ships.forEach((battleShip) => {
      if (!battleShip.isSunk()) {
        console.log(battleShip);
        allShipsSunk = false;
      }
    });
    return allShipsSunk;
  };
  const onBoard = (battleShip) => {
    let onBoardFlag = true;
    battleShip.parts.forEach((part) => {
      if ((part.x < 0) || (part.y < 0) || (part.x >= 10) || (part.y >= 10)) {
        onBoardFlag = false;
      }
    });
    return onBoardFlag;
  };
  const unObstructed = (battleShip) => {
    let unObstructedFlag = true;
    battleShip.parts.forEach((part) => {
      if (board[part.x][part.y] !== '') {
        unObstructedFlag = false;
      }
    });
    return unObstructedFlag;
  };

  const placeShip = (x, y, facing, length) => {
    const battleShip = ship(x, y, facing, length);
    if (onBoard(battleShip) && unObstructed(battleShip)) {
      ships.push(battleShip);
      battleShip.parts.forEach((part) => {
        board[part.x][part.y] = 'occupied';
      });

      return battleShip;
    } if (!onBoard(battleShip)) {
      return 'fail';
    } if (!unObstructed(battleShip)) {
      return 'fail';
    }
    return 'fail';
  };

  const placeAllShips = () => {
    shipsToPlace.forEach((shipToPlace) => {
      for (let i = 0; i < shipToPlace.quantity; i += 1) {
        let placed = 'fail';
        while ((placed === 'fail')) {
          const placeX = Math.floor(Math.random() * 10);
          const placeY = Math.floor(Math.random() * 10);
          const facing = directions[Math.floor(Math.random() * 4)];
          placed = placeShip(placeX, placeY, facing, shipToPlace.length);
        }
      }
    });
  };

  const receiveAttack = (attackX, attackY) => {
    let result = 'miss';
    attacks.forEach((attack) => {
      if ((attack.attackX === attackX) && (attack.attackY === attackY)) {
        result = 'duplicate';
      }

      return result;
    });

    if (result !== 'duplicate') {
      ships.forEach((attackedShip) => {
        if (attackedShip.hit(attackX, attackY)) {
          result = 'hit';
        }
      });
      board[attackX][attackY] = result;
    }
    attacks.push({ attackX, attackY, result });
    return result;
  };
  const queueAttack = (attackX, attackY) => {
    let result = 'miss';
    attacks.forEach((attack) => {
      if ((attack.attackX === attackX) && (attack.attackY === attackY)) {
        result = 'duplicate';
      }
    });

    if (result !== 'duplicate') {
      attacks.push({ attackX, attackY, result: 'queued' });
    }
  };
  const applyQueuedAttacks = () => {
    attacks.forEach((attack) => {
      if (attack.result === 'queued') {
        let result = 'miss';
        ships.forEach((attackedShip) => {
          if (attackedShip.hit(attack.attackX, attack.attackY)) {
            result = 'hit';
          }
        });
        board[attack.attackX][attack.attackY] = result;
      }
    });
  };

  return {
    ships,
    attacks,
    placeShip,
    receiveAttack,
    allSunk,
    board,
    placeAllShips,
    queueAttack,
    applyQueuedAttacks,
  };
};

module.exports = gameboard;
