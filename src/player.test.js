const player = require('./player');

test('returns player object', () => {
  expect(player('Player 1')).toBeTruthy();
});

test('player has a board', () => {
  expect(player('Player 1').board).toBeTruthy();
});

test('player`s board can place ships', () => {
  expect(player('Player 1').board.placeShip(1, 1, 'north', 3)).toBeTruthy();
});
