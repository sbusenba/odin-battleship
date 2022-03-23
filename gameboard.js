const ship = require('./ship');

const gameboard = () => {
  const ships = [];
  const attacks = [];
  const placeShip = (x, y, facing, length) => {
    const battleShip = ship(x, y, facing, length);
    ships.push(battleShip);
    return battleShip;
  };

  const receiveAttack = (attackX, attackY) => {
    let result = 'miss';
    if (attacks.includes({ attackX, attackY })) {
      return 'Repeat Attack';
    }
    ships.forEach((attackedShip) => {
      if (attackedShip.hit(attackX, attackY)) {
        result = 'hit';
      }
    });

    return result;
  };
  return {
    ships, attacks, placeShip, receiveAttack,
  };
};

module.exports = gameboard;
