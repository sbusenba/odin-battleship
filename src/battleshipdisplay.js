const battleShipDisplay = () => {
  const render = (gameboard, status) => {
    const board = document.createElement('div');
    board.classList.add('gameboard');
    gameboard.board.forEach((point, indexX) => {
      const row = document.createElement('div');
      row.classList.add('row');
      gameboard.board[indexX].forEach((grid, indexY) => {
        const cell = document.createElement('div');
        cell.setAttribute('data-x', indexX);
        cell.setAttribute('data-y', indexY);
        cell.classList.add('cell');
        if (grid === 'hit') {
          cell.classList.add('hit');
        } else if (grid === 'miss') {
          cell.classList.add('miss');
        } else if ((grid === 'occupied') && (status === 'friendly')) {
          cell.classList.add('ship');
        }
        row.appendChild(cell);
      });
      board.appendChild(row);
    });
    return board;
  };
  return { render };
};

module.exports = battleShipDisplay;
