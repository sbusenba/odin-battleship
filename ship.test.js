const ship = require('./ship');

test('returns Ship object', () => {
  expect(ship(4).length).toBe(4);
});

test('returns true on hit', () => {
  expect(ship(4).hit(1)).toBe(true);
});

describe('ship with hits gets hit', () => {
  let testShip;
  beforeEach(() => {
    testShip = ship(4);
    testShip.hit(0);
    testShip.hit(1);
    testShip.hit(2);
    testShip.hit(3);
    return testShip;
  });

  test('sinks when hit x 4', () => {
    expect(testShip.isSunk()).toBe(true);
  });
});
