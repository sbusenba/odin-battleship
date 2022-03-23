/* eslint-disable no-undef */
const ship = require('./ship');

test('returns Ship object', () => {
  expect(ship(0, 0, 'north', 4)).toBeTruthy();
});

test('returns Ship object of correct length', () => {
  expect(ship(0, 0, 'north', 4).length).toBe(4);
});

test('returns Ship object correct facing', () => {
  expect(ship(0, 0, 'north', 4).x).toBe(0);
  expect(ship(0, 0, 'north', 4).y).toBe(0);
});

test('returns true on hit', () => {
  expect(ship(0, 0, 'north', 4).hit(0, 0)).toBe(true);
});

describe('ship with hits gets hit', () => {
  let testShip;
  beforeEach(() => {
    testShip = ship(0, 0, 'north', 4);
    testShip.hit(0, 0);
    testShip.hit(0, 1);
    testShip.hit(0, 2);
    testShip.hit(0, 3);
    return testShip;
  });

  test('sinks when hit x 4', () => {
    expect(testShip.isSunk()).toBe(true);
  });
});
