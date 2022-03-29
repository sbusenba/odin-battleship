const { test, expect } = require('@jest/globals');

const gameboard = require('./gameboard');

test('returns gameboard', () => {
  expect(gameboard()).toBeTruthy();
});

test('gameboard can add ship', () => {
  expect(gameboard().placeShip(0, 0, 'north', 3)).toBeTruthy();
});

describe('board with 2 ships placed', () => {
  const testGameboard = gameboard();
  testGameboard.placeShip(3, 0, 'north', 4);
  testGameboard.placeShip(0, 0, 'north', 4);
  testGameboard.receiveAttack(0, 0);
  console.log(testGameboard);

  test('gameboard can correctly record a hit', () => {
    expect(testGameboard.receiveAttack(0, 1)).toBe('hit');
  });
  test('gameboard detects duplicate attack', () => {
    console.log('attack #2');
    expect(testGameboard.receiveAttack(0, 0)).toBe('duplicate');
  });

  test('gameboard returns miss on miss', () => {
    expect(testGameboard.receiveAttack(1, 0)).toBe('miss');
  });
  test('gameboard places multiple ships', () => {
    expect(testGameboard.placeShip(2, 0, 'north', 4)).toBeTruthy();
  });
  test('allSunk() returns false when ships arent sunk', () => {
    expect(testGameboard.allSunk()).toBe(false);
  });
  test('detects obstruction when placing ship', () => {
    expect(testGameboard.placeShip(3, 0, 'north', 4)).toBe('obstructed');
  });
  test('detects off Board when placing ship', () => {
    expect(testGameboard.placeShip(3, 0, 'south', 4)).toBe('off board');
  });
});

describe('board with ship placed', () => {
  const testGameboard = gameboard();
  testGameboard.placeShip(3, 0, 'north', 4);
  testGameboard.receiveAttack(3, 0);
  testGameboard.receiveAttack(3, 1);
  testGameboard.receiveAttack(3, 2);
  testGameboard.receiveAttack(3, 3);
  console.log(testGameboard);
  test('allSunk() returns true when ships are sunk', () => {
    expect(testGameboard.allSunk()).toBe(true);
  });
});
