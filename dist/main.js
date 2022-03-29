/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/battleshipdisplay.js":
/*!**********************************!*\
  !*** ./src/battleshipdisplay.js ***!
  \**********************************/
/***/ ((module) => {

eval("const battleShipDisplay = () => {\n  const render = (gameboard, status) => {\n    const board = document.createElement('div');\n    board.classList.add('gameboard');\n    gameboard.board.forEach((point, indexX) => {\n      const row = document.createElement('div');\n      row.classList.add('row');\n      gameboard.board[indexX].forEach((grid, indexY) => {\n        const cell = document.createElement('div');\n        cell.setAttribute('data-x', indexX);\n        cell.setAttribute('data-y', indexY);\n        cell.classList.add('cell');\n        if (grid === 'hit') {\n          cell.classList.add('hit');\n        } else if (grid === 'miss') {\n          cell.classList.add('miss');\n        } else if ((grid === 'occupied') && (status === 'friendly')) {\n          cell.classList.add('ship');\n        }\n        row.appendChild(cell);\n      });\n      board.appendChild(row);\n    });\n    return board;\n  };\n  return { render };\n};\n\nmodule.exports = battleShipDisplay;\n\n\n//# sourceURL=webpack://odin-battleship/./src/battleshipdisplay.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nconst gameboard = () => {\n  const ships = [];\n  const attacks = [];\n  const board = [['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', ''],\n    ['', '', '', '', '', '', '', '', '', '']];\n  const allSunk = () => {\n    let allShipsSunk = true;\n    ships.forEach((battleShip) => {\n      if (!battleShip.isSunk()) {\n        allShipsSunk = false;\n      }\n    });\n    return allShipsSunk;\n  };\n  const onBoard = (battleShip) => {\n    let onBoardFlag = true;\n    battleShip.parts.forEach((part) => {\n      if ((part.x < 0) || (part.y < 0) || (part.x >= 10) || (part.y >= 10)) {\n        onBoardFlag = false;\n      }\n    });\n    return onBoardFlag;\n  };\n  const unObstructed = (battleShip) => {\n    let unObstructedFlag = true;\n    battleShip.parts.forEach((part) => {\n      if (board[part.x][part.y] !== '') {\n        unObstructedFlag = false;\n      }\n    });\n    return unObstructedFlag;\n  };\n\n  const placeShip = (x, y, facing, length) => {\n    const battleShip = ship(x, y, facing, length);\n    if (onBoard(battleShip) && unObstructed(battleShip)) {\n      ships.push(battleShip);\n      battleShip.parts.forEach((part) => {\n        board[part.x][part.y] = 'occupied';\n      });\n\n      return battleShip;\n    } if (!onBoard(battleShip)) {\n      return 'off board';\n    } if (!unObstructed(battleShip)) {\n      return 'obstructed';\n    }\n    return 'fail';\n  };\n\n  const receiveAttack = (attackX, attackY) => {\n    let result = 'miss';\n    attacks.forEach((attack) => {\n      console.log(`${attack.attackX} & ${attackX}, ${attack.attackY} & ${attackY}`);\n      if ((attack.attackX === attackX) && (attack.attackY === attackY)) {\n        result = 'duplicate';\n        console.log('*Duplicate*');\n      }\n      console.log(attack);\n      return result;\n    });\n\n    if (result !== 'duplicate') {\n      ships.forEach((attackedShip) => {\n        if (attackedShip.hit(attackX, attackY)) {\n          result = 'hit';\n        }\n      });\n      board[attackX][attackY] = result;\n    }\n    attacks.push({ attackX, attackY, result });\n    return result;\n  };\n  return {\n    ships, attacks, placeShip, receiveAttack, allSunk, board,\n  };\n};\n\nmodule.exports = gameboard;\n\n\n//# sourceURL=webpack://odin-battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst battleShipDisplay = __webpack_require__(/*! ./battleshipdisplay */ \"./src/battleshipdisplay.js\");\n\n// setup\n\nlet winner = null;\nconst display = battleShipDisplay();\nconst player1 = player('Player 1');\nconst player2 = player('Computer');\nlet currentPlayer = player1;\nlet opponent = player2;\nconst board1 = document.getElementById('board1');\nconst board2 = document.getElementById('board2');\nplayer1.board.placeShip(1, 1, 'north', 4);\nplayer2.board.placeShip(1, 1, 'north', 4);\nconsole.log('ships placed');\nboard1.appendChild(display.render(player1.board, 'friendly'));\nboard2.appendChild(display.render(player2.board, 'enemy'));\n// each player places ships\n// current player takes shot\ncurrentPlayer.makeMove(opponent.board);\n// display update board\n// board1.appendChild(display.render(player1.board, 'friendly'));\n// board2.appendChild(display.render(player2.board, 'enemy'));\n// check for winners\nif (player1.board.allSunk === true) {\n  winner = player2;\n} else if (player2.board.allSunk === true) {\n  winner = player1;\n}\n\n// switch players\nif (winner === null) {\n  if (currentPlayer === player1) {\n    currentPlayer = player2;\n    opponent = player1;\n  } else if (currentPlayer === player2) {\n    currentPlayer = player1;\n    opponent = player2;\n  }\n}\nconsole.log(`${currentPlayer} Wins!`);\n\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\nconst player = (playerName) => {\n  const board = gameboard();\n  const name = playerName;\n  let guesses = [];\n  let result;\n  const makeMove = (opponentBoard) => {\n    let attackX; let attackY;\n\n    if (guesses === 'null') {\n      attackX = Math.floor(Math.random() * 10);\n      attackY = Math.floor(Math.random() * 10);\n      result = opponentBoard.makeMove(attackX, attackY);\n    } else if (guesses[0] === true) {\n      const guess = guesses.pop();\n      attackX = guess.attackX;\n      attackY = guess.attackY;\n      result = opponentBoard.makeMove(attackX, attackY);\n    }\n    if (result === ('hit')) {\n      guesses = [];\n      if (attackX > 0) {\n        guesses.push(attackX - 1, attackY);\n      }\n      if (attackY > 0) {\n        guesses.push(attackX, attackY - 1);\n      }\n      if (attackX < 9) {\n        guesses.push(attackX + 1, attackY);\n      }\n      if (attackY < 9) {\n        guesses.push(attackX, attackY + 1);\n      }\n    }\n  };\n  const placeShips = () => {\n\n  };\n  return {\n    name, board, makeMove, placeShips,\n  };\n};\n\nmodule.exports = player;\n\n\n//# sourceURL=webpack://odin-battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("const ship = (x, y, facing, shipLength) => {\n  const length = shipLength; let xFactor; let yFactor;\n  const parts = new Array(0);\n  switch (facing) {\n    case 'north':\n      xFactor = 1;\n      yFactor = 0;\n      break;\n    case 'south':\n      xFactor = -1;\n      yFactor = 0;\n      break;\n    case 'east':\n      xFactor = 0;\n      yFactor = 1;\n      break;\n    case 'west':\n      xFactor = 0;\n      yFactor = -10;\n      break;\n    default:\n      break;\n  }\n\n  for (let i = 0; i < length; i += 1) {\n    parts.push({\n      x: x + i * xFactor,\n      y: y + i * yFactor,\n      hit: false,\n    });\n  }\n  const hit = (xPos, yPos) => {\n    let gotHit = false;\n    parts.forEach((part) => {\n      if ((part.x === xPos) && (part.y === yPos)) {\n        part.hit = true;\n        gotHit = true;\n      }\n    });\n    return gotHit;\n  };\n\n  const isSunk = () => {\n    let sunk = true;\n    for (let i = 0; i < length; i += 1) {\n      if (parts[i].hit === false) sunk = false;\n    }\n    return sunk;\n  };\n\n  return {\n    x, y, facing, length, parts, hit, isSunk,\n  };\n};\n\nmodule.exports = ship;\n\n\n//# sourceURL=webpack://odin-battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;