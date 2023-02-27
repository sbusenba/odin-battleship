const battleShipDisplay = () => {
  const render = (gameboard, status, queueAttack,dropShip) => {
    const board = document.createElement('div');
    board.classList.add('gameboard');
    gameboard.board.forEach((point, indexX) => {
      const row = document.createElement('div');
      row.classList.add('row');
      gameboard.board[indexX].forEach((grid, indexY) => {
        const cell = document.createElement('div');
        cell.setAttribute('draggable', false);
        cell.addEventListener('dragenter',(e)=>{e.preventDefault()})
        cell.addEventListener('dragover',(e)=>{e.preventDefault()})
        cell.addEventListener('drop',dropShip)
        cell.setAttribute('data-x', indexX);
        cell.setAttribute('data-y', indexY);
        cell.classList.add('cell');
      
        if (status === 'enemy') {
          cell.addEventListener('click', queueAttack);
        }
        const marker = document.createElement('div');
        marker.classList.add('marker');
        if (grid === 'hit') {
          cell.appendChild(marker);
          cell.classList.add('hit');
        } else if (grid === 'miss') {
          cell.appendChild(marker);
          cell.classList.add('miss');
        } else if ((grid === 'occupied') && (status === 'friendly')) {
          cell.classList.add('ship');
        } else if (grid === 'queued') {
          cell.appendChild(marker);
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
