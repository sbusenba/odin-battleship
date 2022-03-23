const { test, expect } = require('@jest/globals');

const gameboard = require('./gameboard');

test('returns gameboard', () => {
  expect(gameboard()).toBeTruthy();
});

test('gameboard can add ship', () => {
  expect(gameboard().placeShip(0, 0, 'north', 3)).toBeTruthy();
});

describe('board with ship placed', () => {
  const testGameboard = gameboard();
  testGameboard.placeShip(3, 0, 'north', 4);
  testGameboard.placeShip(0, 0, 'north', 4);
  console.log(testGameboard);
  test('gameboard can correctly record a hit', () => {
    expect(testGameboard.receiveAttack(0, 0)).toBe('hit');
  });
  test('gameboard returns miss on miss', () => {
    expect(testGameboard.receiveAttack(1, 0)).toBe('miss');
  });
  test('gameboard places multiple ships', () => {
    expect(testGameboard.placeShip(2, 0, 'north', 4)).toBeTruthy();
  });
});
