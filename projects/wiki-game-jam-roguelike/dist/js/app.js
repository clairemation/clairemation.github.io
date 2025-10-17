/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/game/check-player-position-for-entrance.js":
/*!*******************************************************!*\
  !*** ./js/game/check-player-position-for-entrance.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkPlayerPositionForEntrance)
/* harmony export */ });
/* harmony import */ var _create_new_game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-new-game-state */ "./js/game/create-new-game-state.js");
/* harmony import */ var _setup_room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setup-room */ "./js/game/setup-room.js");



async function checkPlayerPositionForEntrance(gameState) {
  const entranceUpdates = {}
  if (isPlayerOnEntrance(gameState)) {
    if (!gameState.playerIsStillEntering) {
      entranceUpdates.title = gameState.entranceName;
      entranceUpdates.entranceName = gameState.title;

      const newGameState = (0,_create_new_game_state__WEBPACK_IMPORTED_MODULE_0__["default"])(gameState, entranceUpdates);
      // stopAndClear();
      const newRoomState = await (0,_setup_room__WEBPACK_IMPORTED_MODULE_1__["default"])(newGameState);
      return newRoomState;
    }
  } else {
    entranceUpdates.playerIsStillEntering = false;
    return entranceUpdates;
  }
}

function isPlayerOnEntrance(gameState)
{
  return gameState.maze[Math.floor(Math.max(gameState.playerGridX, 0))][Math.floor(Math.max(gameState.playerGridY, 0))].type === 'entrance';
}


/***/ }),

/***/ "./js/game/check-player-position-for-exit.js":
/*!***************************************************!*\
  !*** ./js/game/check-player-position-for-exit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkPlayerPositionForExit)
/* harmony export */ });
/* harmony import */ var _create_new_game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-new-game-state */ "./js/game/create-new-game-state.js");
/* harmony import */ var _setup_room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setup-room */ "./js/game/setup-room.js");



async function checkPlayerPositionForExit(gameState)
{
  const {playerIsOnExit, exitTitle} = isPlayerOnExit(gameState);
  if (playerIsOnExit)
  {
    const exitUpdates = {}

    exitUpdates.entranceName = gameState.title;
    exitUpdates.title = exitTitle;

    const newGameState = (0,_create_new_game_state__WEBPACK_IMPORTED_MODULE_0__["default"])(gameState, exitUpdates);
    const newRoomGameState = await (0,_setup_room__WEBPACK_IMPORTED_MODULE_1__["default"])(newGameState);
    return newRoomGameState;
  }
}

function isPlayerOnExit(gameState)
{
  const cell = gameState.maze[Math.floor(Math.max(gameState.playerGridX, 0))][Math.floor(Math.max(gameState.playerGridY, 0))];
  const playerIsOnExit = cell.type === "exit"
  const exitTitle = cell.title;
  return {playerIsOnExit, exitTitle};
}


/***/ }),

/***/ "./js/game/check-player-position-for-treasure.js":
/*!*******************************************************!*\
  !*** ./js/game/check-player-position-for-treasure.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkPlayerPositionForTreasure)
/* harmony export */ });
function checkPlayerPositionForTreasure(gameState) {
  const treasureAcquired = isPlayerOnTreasure(gameState);
  if (treasureAcquired) {
    const treasureUpdates = {};
    treasureUpdates.score = gameState.score + 1;
    treasureUpdates.acquiredTreasures = [...gameState.acquiredTreasures, `${gameState.title}: ${treasureAcquired}`]

    //todo: this is supposed to be immutable
    gameState.maze[Math.floor(gameState.playerGridX)][Math.floor(gameState.playerGridY)].type = "space";

    return treasureUpdates;
  }
}

function isPlayerOnTreasure(gameState)
{
  return (
    gameState.maze[Math.floor(Math.max(gameState.playerGridX, 0))][Math.floor(Math.max(gameState.playerGridY, 0))].type === 'treasure'
      ? gameState.maze[Math.floor(Math.max(gameState.playerGridX, 0))][Math.floor(Math.max(gameState.playerGridY, 0))].name
      : false
  );
}


/***/ }),

/***/ "./js/game/create-new-game-state.js":
/*!******************************************!*\
  !*** ./js/game/create-new-game-state.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createNewGameState)
/* harmony export */ });
function createNewGameState(gameState, newProperties)
{
  const newGameState = {...gameState, ...newProperties};
  Object.freeze(newGameState);
  return newGameState;
}


/***/ }),

/***/ "./js/game/helpers/wiki.js":
/*!*********************************!*\
  !*** ./js/game/helpers/wiki.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getRandomArticleName)
/* harmony export */ });
async function getRandomArticleName()
{
  const result = await fetch("https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&origin=*");
  const resultData = await result.json();
  const title = resultData.query.random[0].title
  return title;
}


/***/ }),

/***/ "./js/game/index.js":
/*!**************************!*\
  !*** ./js/game/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./js/game/render.js");
/* harmony import */ var _process_mouse_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./process-mouse-input */ "./js/game/process-mouse-input.js");
/* harmony import */ var _process_key_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./process-key-input */ "./js/game/process-key-input.js");
/* harmony import */ var _check_player_position_for_treasure__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./check-player-position-for-treasure */ "./js/game/check-player-position-for-treasure.js");
/* harmony import */ var _create_new_game_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-new-game-state */ "./js/game/create-new-game-state.js");
/* harmony import */ var _setup_room__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setup-room */ "./js/game/setup-room.js");
/* harmony import */ var _check_player_position_for_exit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./check-player-position-for-exit */ "./js/game/check-player-position-for-exit.js");
/* harmony import */ var _check_player_position_for_entrance__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./check-player-position-for-entrance */ "./js/game/check-player-position-for-entrance.js");
/* harmony import */ var _helpers_wiki__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/wiki */ "./js/game/helpers/wiki.js");
/* harmony import */ var _view_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view-constants */ "./js/game/view-constants.js");

const nmg = __webpack_require__(/*! node-maze-generator */ "./node_modules/node-maze-generator/index.js");










let animationFrame;

const shouldPopulateTreasures = gameState => !gameState.acquiredTreasures.find(entry => entry.room === title)

start();

async function start()
{
  const randomTitle = await (0,_helpers_wiki__WEBPACK_IMPORTED_MODULE_8__["default"])();

  const gameStateProperties = {
    acquiredTreasures: [],
    playerIsStillEntering: false,
    entranceName: randomTitle,
    maze: [],
    score: 0,
    title: randomTitle,
    playerDirectionX: 0,
    playerDirectionY: 0,
    playerSpeed: 0.05,
    playerGridX: 0,
    playerGridY: 0,
  }

  const gameState = (0,_create_new_game_state__WEBPACK_IMPORTED_MODULE_4__["default"])({}, gameStateProperties);
  const gameStateAfterSetup = await (0,_setup_room__WEBPACK_IMPORTED_MODULE_5__["default"])(gameState);
  loop(gameStateAfterSetup);
}

async function loop(gameState)
{
  try {
    const mouseUpdates = (0,_process_mouse_input__WEBPACK_IMPORTED_MODULE_1__["default"])(gameState);
    const keyUpdates = (0,_process_key_input__WEBPACK_IMPORTED_MODULE_2__["default"])(gameState);
    const positionUpdates = (0,_check_player_position_for_treasure__WEBPACK_IMPORTED_MODULE_3__["default"])(gameState)
      || await (0,_check_player_position_for_exit__WEBPACK_IMPORTED_MODULE_6__["default"])(gameState)
      || await (0,_check_player_position_for_entrance__WEBPACK_IMPORTED_MODULE_7__["default"])(gameState);

    const gameStateUpdates =
      {
        ...mouseUpdates,
        ...keyUpdates,
        ...positionUpdates
      };

    const newGameState = (0,_create_new_game_state__WEBPACK_IMPORTED_MODULE_4__["default"])(gameState, gameStateUpdates);

    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)(newGameState);

    animationFrame = requestAnimationFrame(() => loop(newGameState));
  }
  catch (error)
  {
    _view_constants__WEBPACK_IMPORTED_MODULE_9__.viewConstants.modalParent.classList.remove("hidden");
    _view_constants__WEBPACK_IMPORTED_MODULE_9__.viewConstants.treasureListParent.innerHTML = `
      ${gameState.acquiredTreasures.map(e => "<li>" + e + "</li>")}
    `
  }
}

function main() {}


/***/ }),

/***/ "./js/game/input.js":
/*!**************************!*\
  !*** ./js/game/input.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getKeyStatus: () => (/* binding */ getKeyStatus),
/* harmony export */   getMouseStatus: () => (/* binding */ getMouseStatus)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./js/game/render.js");


let keyStatus = {};
let mouseStatus = false;
let mouseGridPos = {x:0,y:0};
let mouseTarget;

function getKeyStatus(key)
{
  return keyStatus[key];
}

function getMouseStatus()
{
  return {mouseStatus, mouseGridPos, mouseTarget};
}

// function start()
// {
  addEventListener("keydown", onKeyDown);
  addEventListener("keyup", onKeyUp);
  addEventListener("mousedown", processMouseClick);
  addEventListener("mouseup", processMouseUp);
// }

function stop()
{
  keyStatus = {};
  removeEventListener("keydown", onKeyDown);
  removeEventListener("keyup", onKeyUp);
  removeEventListener("mousedown", processMouseClick);
  removeEventListener("mouseup", processMouseUp);
}

function onKeyDown(e)
{
  keyStatus[e.key] = true
}

function onKeyUp(e)
{
  keyStatus[e.key] = false;
}

function processMouseClick(e)
{
  try {
    mouseStatus = true;
    mouseGridPos = (0,_render__WEBPACK_IMPORTED_MODULE_0__.windowPosToGridPos)(e.clientX, e.clientY);
    mouseTarget = e.target;
  }
  catch (e)
  {
    console.error(e)
  }
}

function processMouseUp(e)
{
  mouseStatus = false;
  mouseTarget = null;
}


/***/ }),

/***/ "./js/game/maze-generator.js":
/*!***********************************!*\
  !*** ./js/game/maze-generator.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateMaze)
/* harmony export */ });
const nmg = __webpack_require__(/*! node-maze-generator */ "./node_modules/node-maze-generator/index.js");

function generateMaze(properties)
{
  const generator = new nmg.generators.maze({}, {width: properties.size, height: properties.size});
  const maze = generator.data.grid.cells[0].map(row =>
    row.map(cell => cell.blocked ? {type: "wall", x: cell.x, y: cell.y} : {type: "space", x: cell.x, y: cell.y})
  )
  openUpMazeInPlace(maze, properties.simplicity);

  const usableBorderTiles = getUsableBorderTiles(maze);

  createEntranceInPlace(maze, usableBorderTiles);
  createExitsInPlace(maze, properties.links, usableBorderTiles);
  // if (shouldPopulateTreasures(gameState))
  createTreasuresInPlace(maze, properties.treasures);

  return maze
}

function openUpMazeInPlace(maze, simplicity)
{
  for (let i = 0 ; i < maze.length ; i++)
  {
    for (let j = 0 ; j < maze[i].length ; j++)
    {
      const cell = maze[i][j];
      if (cell.type === "wall" && i > 0 && j > 0 && i < maze.length - 1 && j < maze.length - 1 && Math.random() < simplicity)
      {
        maze[i][j].type = "space";
      }
    }
  }
}

function getUsableBorderTiles(maze)
{
  const usableBorderTiles = []

  // top
  for (let i = 0 ; i < maze.length ; i++)
  {
    if (maze[i][0].type === "wall" && maze[i][1].type === "space")
      usableBorderTiles.push({x: i, y: 0});
  }

  // bottom
  for (let i = 0 ; i < maze.length ; i++)
  {
    if (maze[i][maze.length - 1].type === "wall" && maze[i][maze.length - 2].type === "space")
      usableBorderTiles.push({x: i, y: maze.length -1});
  }

  // left, minus top and bottom
  for (let i = 1 ; i < maze.length -1  ; i++)
  {
    if (maze[0][i].type === "wall" && maze[1][i].type === "space")
      usableBorderTiles.push({x: 0, y: i});
  }

  //right, minus top and bottom
  for (let i = 1 ; i < maze.length -1  ; i++)
  {
    if (maze[maze.length - 1][i] === "wall".type && maze[maze.length - 2][i].type === "space")
      usableBorderTiles.push({x: maze.length - 1, y: i});
  }

  return usableBorderTiles;
}

function createEntranceInPlace(maze, usableBorderTiles)
{
  const index = Math.max(0, Math.floor(Math.random() * usableBorderTiles.length - 1));

  const pos = usableBorderTiles[index];

  usableBorderTiles.splice(index, 1);

  maze[pos.x][pos.y].type = "entrance";
}

function createExitsInPlace(maze, links, usableBorderTiles)
{
  for (let i = 0 ; i < links.length && i < usableBorderTiles.length ; i++)
  {
    const index = Math.max(0, Math.floor(Math.random() * usableBorderTiles.length - 1));

    const pos = usableBorderTiles[index];

    usableBorderTiles.splice(index, 1);

    maze[pos.x][pos.y].type = "exit";
    maze[pos.x][pos.y].title = links[i];
  }
}

function createTreasuresInPlace(maze, citesNeeded)
{
  const emptySpaces = maze.flat().filter(cell => cell.type === "space");

  for (let i = 0 ; i < citesNeeded.length ; i++)
  {
    const rand = Math.floor((Math.random() * (emptySpaces.length - 1)));
    emptySpaces[rand].type = "treasure";
    emptySpaces[rand].name = citesNeeded[i];
    emptySpaces.splice(rand, 1);
  }
}


/***/ }),

/***/ "./js/game/process-key-input.js":
/*!**************************************!*\
  !*** ./js/game/process-key-input.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ processKeyInput)
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./js/game/input.js");


function processKeyInput(gameState)
{
  let playerDirectionX = 0, playerDirectionY = 0;

  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('w')) playerDirectionY--;
  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('a')) playerDirectionX--;
  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('s')) playerDirectionY++;
  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('d')) playerDirectionX++;

  let velocityX = playerDirectionX * gameState.playerSpeed;
  let velocityY = playerDirectionY * gameState.playerSpeed;

  let checkPoints = {
    upperLeft: {x: gameState.playerGridX + velocityX + 0.2, y: gameState.playerGridY +  velocityY + 0.2},
    upperRight: {x: gameState.playerGridX + velocityX + 0.8, y: gameState.playerGridY + velocityY + 0.2},
    lowerRight: {x: gameState.playerGridX + velocityX + 0.8, y: gameState.playerGridY + velocityY + 0.8},
    lowerLeft: {x: gameState.playerGridX + velocityX + 0.2, y: gameState.playerGridY + velocityY + 0.8},
  }

  if (velocityX < 0)
  {
    if (checkForWall(gameState, checkPoints.upperLeft) || checkForWall(gameState, checkPoints.lowerLeft))
    {
      velocityX = 0;
    }
  }

  else if (velocityX > 0)
  {
    if (checkForWall(gameState, checkPoints.upperRight) || checkForWall(gameState, checkPoints.lowerRight))
    {
      velocityX = 0;
    }
  }

  if (velocityY < 0)
  {
    if (checkForWall(gameState, checkPoints.upperLeft) || checkForWall(gameState, checkPoints.upperRight))
    {
      velocityY = 0;
    }
  }

  else if (velocityY > 0)
  {
    if (checkForWall(gameState, checkPoints.lowerLeft) || checkForWall(gameState, checkPoints.lowerRight))
    {
      velocityY = 0;
    }
  }

  return {playerGridX: gameState.playerGridX + velocityX, playerGridY: gameState.playerGridY + velocityY };
}

function checkForWall(gameState, positionVector)
{
  return positionVector.x < 0 || positionVector.x >= gameState.maze.length
    || positionVector.y < 0 || positionVector.y >= gameState.maze.length
    || gameState.maze[Math.floor(positionVector.x)][Math.floor(positionVector.y)].type === "wall";
}


/***/ }),

/***/ "./js/game/process-mouse-input.js":
/*!****************************************!*\
  !*** ./js/game/process-mouse-input.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ processMouseInput)
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./js/game/input.js");
/* harmony import */ var _view_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-constants */ "./js/game/view-constants.js");



function processMouseInput(gameState)
{
  let mouseUpdates = {};

  const {mouseStatus, mouseGridPos, mouseTarget} = (0,_input__WEBPACK_IMPORTED_MODULE_0__.getMouseStatus)();

  if (mouseTarget === _view_constants__WEBPACK_IMPORTED_MODULE_1__.viewConstants.scoreParent)
  {
    console.log(gameState);
  }
  else {
    if (mouseStatus && mouseGridPos.x >= 0 && mouseGridPos.y >= 0 && mouseGridPos.x < gameState.maze.length && mouseGridPos.y < gameState.maze.length) {
      const {name, type, title} = gameState.maze[mouseGridPos.x][mouseGridPos.y];
      if (type === "exit") {
        mouseUpdates.renderedInfo = title;
      } else if (type === "treasure") {
        mouseUpdates.renderedInfo = name;
      } else if (type === "entrance") {
        mouseUpdates.renderedInfo = gameState.entranceName;
      }
    }
  }

  return mouseUpdates;
}


/***/ }),

/***/ "./js/game/render.js":
/*!***************************!*\
  !*** ./js/game/render.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   renderInfo: () => (/* binding */ renderInfo),
/* harmony export */   windowPosToGridPos: () => (/* binding */ windowPosToGridPos)
/* harmony export */ });
/* harmony import */ var _view_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-constants */ "./js/game/view-constants.js");


const CELL_WIDTH = 60, CELL_HEIGHT = 60;
const WINDOW_WIDTH = 800, WINDOW_HEIGHT = 800;
const viewState = {
  windowX: 0,
  windowY: 0,
}

let priorGameState = {};

let ready = false;

let frameNum = 1;

const images = {
  "wall": new Image(),
  "chara1": new Image(),
  "chara2": new Image(),
  "entrance": new Image(),
  "exit": new Image(),
  "treasure": new Image()
}

loadAllImages();
setInterval(flipFrameNumber, 250);

async function loadAllImages()
{
  const imageNames = ["wall", "chara1", "chara2", "entrance", "exit", "treasure"];
  const imagePromises = [];
  for (let imageName of imageNames)
  {
    const image = images[imageName];
    imagePromises.push(new Promise((resolve) => image.addEventListener("load", resolve)))
    image.src = `./img/${imageName}.png`;
  }

  await Promise.all(imagePromises);
  ready = true;
}

function render(gameState)
{
  if (!ready) return;

  // if (gameState.playerGridX !== priorGameState.playerGridX
  // || gameState.playerGridY !== priorGameState.playerGridY)
  // {
    _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.ctx.clearRect(viewState.windowX, viewState.windowY, WINDOW_WIDTH, WINDOW_HEIGHT);
    viewState.windowX = gameState.playerGridX * CELL_WIDTH + CELL_WIDTH / 2 - WINDOW_WIDTH / 2;
    viewState.windowY = gameState.playerGridY * CELL_HEIGHT + CELL_HEIGHT / 2 - WINDOW_HEIGHT / 2;
    _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.ctx.setTransform(1, 0, 0, 1, -viewState.windowX, -viewState.windowY);
    renderMaze(gameState);
    renderPlayer(gameState);
  // }

  renderInfo(gameState);

  priorGameState = gameState;
}

function renderInfo(gameState)
{
  if (gameState.renderedInfo && gameState.renderedInfo !== priorGameState.renderedInfo)
    _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.linkInfoParent.innerText = gameState.renderedInfo;

  if (gameState.score !== priorGameState.score)
  {
    _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.scoreParent.innerText = gameState.score;
  }
}

function windowPosToGridPos(windowPosX, windowPosY)
{
  const gridPositionX = Math.floor((windowPosX - _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.canvas.clientLeft + viewState.windowX) / CELL_WIDTH);
  const gridPositionY = Math.floor((windowPosY - _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.canvas.clientTop + viewState.windowY) / CELL_HEIGHT)
  return ({x: gridPositionX, y: gridPositionY});
}

function renderPlayer(gameState)
{
  renderPlayerCell(gameState.playerGridX, gameState.playerGridY, "blue");
}

function renderMaze(gameState)
{
  for (let i = 0 ; i < gameState.maze.length ; i++) {
    for (let j = 0; j < gameState.maze[i].length; j++) {
      const cell = gameState.maze[i][j];
      if (cell.type !== "space")
      {
        renderCell(i, j, cell.type);
      }
    }
  }
}

function renderCell(x, y, cellType)
{
  _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.ctx.drawImage(images[cellType], 0, 0, 100, 100, x * CELL_WIDTH, y * CELL_WIDTH, CELL_WIDTH, CELL_HEIGHT);
}

function renderPlayerCell(x, y, color)
{

  if (frameNum === 1)
  {
    _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.ctx.drawImage(images.chara1, 0, 0, 100, 100, x * CELL_WIDTH, y * CELL_WIDTH, CELL_WIDTH, CELL_HEIGHT);
  }
  else
  {
    _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.ctx.drawImage(images.chara2, 100, 0, -100, 100, x * CELL_WIDTH, y * CELL_WIDTH, CELL_WIDTH, CELL_HEIGHT);
  }
}

function flipFrameNumber()
{
  frameNum = (frameNum + 1) % 2
}



/***/ }),

/***/ "./js/game/setup-room.js":
/*!*******************************!*\
  !*** ./js/game/setup-room.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupRoom)
/* harmony export */ });
/* harmony import */ var _create_new_game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-new-game-state */ "./js/game/create-new-game-state.js");
/* harmony import */ var _maze_generator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maze-generator.js */ "./js/game/maze-generator.js");


const {getArticleProperties} = __webpack_require__(/*! ../wiki-api/midlevelmanager.mjs */ "./js/wiki-api/midlevelmanager.mjs");

const {viewConstants} = __webpack_require__(/*! ./view-constants */ "./js/game/view-constants.js");

async function setupRoom(gameState)
{
  const articleProperties = await getArticleProperties(gameState.title);
  const mazeProperties = generateMazeProperties(gameState, articleProperties);
  const maze = (0,_maze_generator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(mazeProperties);
  const playerIsStillEntering = true;

  let x, y;
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze.length; j++) {
      if (maze[i][j].type === "entrance") {
        x = i;
        y = j;
        break;
      }
      if (x)
      {
        break;
      }
    }
  }

  const playerGridX = x, playerGridY = y;

  const newGameState = (0,_create_new_game_state__WEBPACK_IMPORTED_MODULE_0__["default"])(gameState,
    {
      maze,
      playerIsStillEntering,
      playerGridX,
      playerGridY
    });

  viewConstants.roomTitleParent.innerText = newGameState.title;

  return newGameState;
}

function generateMazeProperties(gameState, articleProperties)
{
  const size = Math.min(Math.max(articleProperties.wordCount / 400, 10), 15);
  const numberOfExits =  Math.min(Math.max(articleProperties.links.length / 10, 1), 10);

  return {
    title: gameState.title,
    size: size,
    simplicity: 1 / (Math.ceil(articleProperties.links.length) / 80),
    links: grabXRandomLinks(articleProperties.links, numberOfExits),
    treasures: [...articleProperties.citationsNeeded, ...articleProperties.clarificationsNeeded]
  }
}

function grabXRandomLinks(links, x)
{
  const linksCopy = [...links]
  const randomLinks = []

  for (let i = 0; i < x; i++)
  {
    const rand = Math.floor(Math.random() * (linksCopy.length - 1));
    randomLinks.push(linksCopy[rand]);
    linksCopy.splice(rand, 1);
  }

  return randomLinks;
}


/***/ }),

/***/ "./js/game/view-constants.js":
/*!***********************************!*\
  !*** ./js/game/view-constants.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   viewConstants: () => (/* binding */ viewConstants)
/* harmony export */ });
// todo: cache?
const viewConstants =
{
  scoreParent: document.querySelector('#score'),
  roomTitleParent: document.querySelector('#roomtitle'),
  linkInfoParent: document.querySelector('#linkinfo'),
  canvas: document.querySelector('canvas'),
  modalParent: document.querySelector('#modalbg'),
  treasureListParent: document.querySelector('#treasure-list'),
  ctx: document.querySelector('canvas').getContext('2d')
};


/***/ }),

/***/ "./js/wiki-api/midlevelmanager.mjs":
/*!*****************************************!*\
  !*** ./js/wiki-api/midlevelmanager.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getArticleProperties: () => (/* binding */ getArticleProperties)
/* harmony export */ });
/* harmony import */ var _wikiinterface_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wikiinterface.mjs */ "./js/wiki-api/wikiinterface.mjs");


async function getArticleProperties(articleName) {

  await _wikiinterface_mjs__WEBPACK_IMPORTED_MODULE_0__.afetchWikipediaArticle(articleName);
  return {
    wordCount: _wikiinterface_mjs__WEBPACK_IMPORTED_MODULE_0__.getWordCount(),
    links: _wikiinterface_mjs__WEBPACK_IMPORTED_MODULE_0__.getLinks(),
    citationsNeeded: _wikiinterface_mjs__WEBPACK_IMPORTED_MODULE_0__.getCitationsNeeded(),
    clarificationsNeeded: _wikiinterface_mjs__WEBPACK_IMPORTED_MODULE_0__.getClarificationsNeeded()
  }
}


/***/ }),

/***/ "./js/wiki-api/wikiinterface.mjs":
/*!***************************************!*\
  !*** ./js/wiki-api/wikiinterface.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afetchWikipediaArticle: () => (/* binding */ afetchWikipediaArticle),
/* harmony export */   dumpWikiArticle: () => (/* binding */ dumpWikiArticle),
/* harmony export */   fetchWikipediaArticle: () => (/* binding */ fetchWikipediaArticle),
/* harmony export */   getCitationsNeeded: () => (/* binding */ getCitationsNeeded),
/* harmony export */   getClarificationsNeeded: () => (/* binding */ getClarificationsNeeded),
/* harmony export */   getLinks: () => (/* binding */ getLinks),
/* harmony export */   getWordCount: () => (/* binding */ getWordCount),
/* harmony export */   loadWikiArticle: () => (/* binding */ loadWikiArticle)
/* harmony export */ });
const current_article = {
  li :[],
  cn :[],
  cl :[],
  refs :[],
  wc : 0,
  title : "None"
}

function cisplit(s,t){
  return s.split(new RegExp(RegExp.escape(t),"ig"))
}

function getWordCount(){return current_article.wc;}

function getLinks(){return current_article.li;}

function getCitationsNeeded(){return current_article.cn;}

function getClarificationsNeeded() {return current_article.cl;}


function reverse_trunc(str){
  const bstr=str
  const delim=bstr.slice(-1)
  if(delim[0] == "."){
    return bstr.split(/[;.\n]/).at(-2)+"."
  }else{
    return bstr.split(/[;.\n]/).at(-1)+"."
  }
}

function get_citation_neededs(article){
  const spl=article.split("{{cn")

  const citations = spl.map(reverse_trunc).slice(0,-1)
  return citations
}

function get_clarification_neededs(article){
  const spl=article.split("{{clarify")

//    console.log(spl[0])
  const citations = spl.map(reverse_trunc).slice(0,-1)
  return citations
}

function unbracket(l){
  return l.split("]]")[0];

}

function get_outgoing_links(article){
  const spl=article.split("[[").slice(1)
  const li=spl.map(unbracket).filter(link => (link.search(/[^a-zA-Z ]/) == -1))
  return li
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function get_wordcount(article){
  return countWords(article)
}

function get_cite_title(str){
  try {
    const a=str.split(new RegExp(RegExp.escape("title"),"ig"))[1].split("=")[1]
    const b=a.split("|")[0]
    return b;
  }catch{
    return "Dead Beef";
  }
}

function get_references(article){
  const spl=article.split(new RegExp(RegExp.escape("{{cite"),"ig")).slice(1)
  const abl=cisplit(article,"{{cite")
  return spl.map(get_cite_title);
}

async function afetchWikipediaArticle(title) {
  const b= await fetch(`https://en.wikipedia.org/w/rest.php/v1/page/`+title)
  const bdata= await b.json();
  current_article.cn=get_citation_neededs(bdata.source)
  current_article.cl=get_clarification_neededs(bdata.source)
  current_article.li=get_outgoing_links(bdata.source)
  current_article.wc=get_wordcount(bdata.source)
  current_article.title=title
  current_article.refs=get_references(bdata.source)
  console.log(current_article.title);
  return "hi"
}

async function aafetchWikipediaArticle(title) {
  const a=  afetchWikipediaArticle(title);
}

function fetchWikipediaArticle(title) {
  aafetchWikipediaArticle(title);
  console.log(title);
  console.log(current_article.title);
}

function dumpWikiArticle() {
  console.log(current_article.title)
  console.log(" cn:")
  console.log(current_article.cn)
  console.log(" cl:")
  console.log(current_article.cl)
  console.log(" li:")
  console.log(current_article.li)
  console.log(" wc:")
  console.log(current_article.wc)
  console.log(" refs:")
  console.log(current_article.refs)

}
function loadWikiArticle(name) {
  const f= fetchWikipediaArticle(name)
}


//console.log('asdf');
//await afetchWikipediaArticle("Bassoon");
//dumpWikiArticle()
//console.log(current_article.links)

//module.exports = { loadWikiArticle,dumpWikiArticle };


// TO RUN IN TERMINAL, TYPE
// node FILEPATH




/***/ }),

/***/ "./node_modules/node-maze-generator/index.js":
/*!***************************************************!*\
  !*** ./node_modules/node-maze-generator/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Generator = __webpack_require__(/*! ./src/generators/generator.js */ "./node_modules/node-maze-generator/src/generators/generator.js");
const MazeGenerator = __webpack_require__(/*! ./src/generators/maze.js */ "./node_modules/node-maze-generator/src/generators/maze.js");
const RoomGenerator = __webpack_require__(/*! ./src/generators/room.js */ "./node_modules/node-maze-generator/src/generators/room.js");
const StairGenerator = __webpack_require__(/*! ./src/generators/stairs.js */ "./node_modules/node-maze-generator/src/generators/stairs.js");
const Renderer = __webpack_require__(/*! ./src/renderer.js */ "./node_modules/node-maze-generator/src/renderer.js");
const Cell = __webpack_require__(/*! ./src/cell.js */ "./node_modules/node-maze-generator/src/cell.js");
const Grid = __webpack_require__(/*! ./src/grid.js */ "./node_modules/node-maze-generator/src/grid.js");
const Utils = __webpack_require__(/*! ./src/utils.js */ "./node_modules/node-maze-generator/src/utils.js");

module.exports = {
    generators: {
        generator: Generator,
        maze: MazeGenerator,
        room: RoomGenerator,
        stairs: StairGenerator
    },
    renderer: Renderer,
    cell: Cell,
    grid: Grid,
    utils: Utils
}

/***/ }),

/***/ "./node_modules/node-maze-generator/src/cell.js":
/*!******************************************************!*\
  !*** ./node_modules/node-maze-generator/src/cell.js ***!
  \******************************************************/
/***/ ((module) => {

class Cell {
    constructor(x, y, z, visited = false) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.blocked = true;
        this.visited = visited || false;
    }
}

module.exports = Cell;

/***/ }),

/***/ "./node_modules/node-maze-generator/src/generators/generator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/node-maze-generator/src/generators/generator.js ***!
  \**********************************************************************/
/***/ ((module) => {

class Generator {
    constructor(generators) {
        this.data = {};
        this.generators = generators.map(
            generator => {
                const gen = new generator.generator(this.data, generator.options);
                this.data = gen.data;
                return gen;
            }
        );
    }

    generate = () => this.generators.forEach(
        generator => generator.generate()
    );
}

module.exports = Generator;


/***/ }),

/***/ "./node_modules/node-maze-generator/src/generators/maze.js":
/*!*****************************************************************!*\
  !*** ./node_modules/node-maze-generator/src/generators/maze.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Grid = __webpack_require__(/*! ../grid.js */ "./node_modules/node-maze-generator/src/grid.js");
const {Random} = __webpack_require__(/*! ../utils */ "./node_modules/node-maze-generator/src/utils.js");

class MazeGenerator {
    /**
     * @class MazeGenerator
     * @classdesc The maze generator class is responsible for generating a grid of Cell objects and storing them.
     * @param {Object} data - The data object to use.
     * @param {Object} options - The options object to use.
     * @param {Number} options.width - The width of the grid.
     * @param {Number} options.height - The height of the grid.
     * @param {Array} options.floors - The total number of floors in the grid.
     * @param {Number} options.start_x - The x position of the starting cell.
     * @param {Number} options.start_y - The y position of the starting cell.
     * @param {Number} options.start_z - The z position of the starting cell.
     * @param {Cell} options.grid_class - The class used to generate a grid, contains cell data.
     * @param {Cell} options.cell_class - The class used to represent a cell on the grid.
     * @param {Array} options.neighbor_positions - The array of neighbor positions to use.
     */
    constructor(data, options) {
        this.data = data||{};
        this.options = options;
        this.neighbor_positions = options.neighbor_positions || [[0, -2], [0, 2], [-2, 0], [2, 0]];
        this.start_cell_coord = { x: 1, y: 1 };
        const GridClass = options.grid_class || Grid;
        this.data.grid = new GridClass({
            width: options.width,
            height: options.height,
            total_floors: options.floors,
            cell_class: options.cell_class,
            start_x: options.start_x,
            start_y: options.start_y,
            start_z: options.start_z,
            floors: []
        });
        this.generate();
    }

    /**
     * @function getNeighborCells
     * @param {Object} cell
     * @returns {*[Cell]}
     */
    getNeighborCells = (cell) => {
        let neighbor_cells = [];
        for (let i = 0; i < 4; i++) {
            let nx = cell.x + this.neighbor_positions[i][0];
            let ny = cell.y + this.neighbor_positions[i][1];
            let neighbor_cell = this.data.grid.getNeighborCell(nx, ny, cell.z);
            if (neighbor_cell && !neighbor_cell.visited && neighbor_cell.blocked) {
                neighbor_cells.push(neighbor_cell);
            }
        }
        return neighbor_cells;
    }

    /**
     * @function generate
     * @description Generate a maze using the growing tree algorithm.
     * @returns {void}
     */
    generate = () => {
        for (let z = 0; z < this.data.grid.total_floors; z++) {
            const x = this.start_cell_coord.x;
            const y = this.start_cell_coord.y;
            let get_cell = true;
            let prev_cells = [];
            let current_cell = this.data.grid.getCell(x, y, z);

            while (get_cell) {
                current_cell.visited = true;
                let neighbor_cells = this.getNeighborCells(current_cell);
                if (neighbor_cells.length > 0) {
                    let neighbor_cell = neighbor_cells[Random.range(0, neighbor_cells.length)];
                    // Set exits
                    let n_x = current_cell.x;
                    let n_y = current_cell.y;
                    if (neighbor_cell.x > current_cell.x) {
                        n_x += 1;
                    }
                    else if (neighbor_cell.x < current_cell.x) {
                        n_x -= 1;
                    }
                    if (neighbor_cell.y > current_cell.y) {
                        n_y += 1;
                    }
                    else if (neighbor_cell.y < current_cell.y) {
                        n_y -= 1;
                    }
                    let new_cell = this.data.grid.getCell(n_x, n_y, z);
                    new_cell.blocked = false;
                    current_cell.blocked = false;
                    prev_cells.push(current_cell);
                    current_cell = neighbor_cell;
                }
                else {
                    if (prev_cells.length > 0) {
                        current_cell = prev_cells.pop();
                    }
                    else {
                        get_cell = false;
                    }
                }
            }
        }
    }
}

module.exports = MazeGenerator;


/***/ }),

/***/ "./node_modules/node-maze-generator/src/generators/room.js":
/*!*****************************************************************!*\
  !*** ./node_modules/node-maze-generator/src/generators/room.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {Random} = __webpack_require__(/*! ../utils.js */ "./node_modules/node-maze-generator/src/utils.js");

class RoomGenerator {
    /**
     * @class RoomGenerator
     * @classdesc Generates rooms for a cells in a grid.
     * @param {Object} data - The data object to use.
     * @param {Object} options - The options object to use.
     * @param {Number} options.minRooms - The minimum number of rooms to generate.
     * @param {Number} options.maxRooms - The maximum number of rooms to generate.
     * @param {Number} options.minRoomWidth - The minimum width of a room.
     * @param {Number} options.minRoomHeight - The minimum height of a room.
     * @param {Number} options.maxRoomWidth - The maximum width of a room.
     * @param {Number} options.maxRoomHeight - The maximum height of a room.
     * @param {Number} options.totalRooms - The total number of rooms to generate.
     */
    constructor(data, options) {
        this.options = options
        this.data = data||{};
        this.data.rooms = [];
        const minRooms = parseInt(options.minRooms) || 1;
        const  maxRooms = parseInt(options.maxRooms) || 8;
        this.minRoomWidth = parseInt(options.minRoomWidth) || 1;
        this.minRoomHeight = parseInt(options.minRoomHeight) || 1;
        this.maxRoomWidth = parseInt(options.maxRoomWidth) || 8;
        this.maxRoomHeight = parseInt(options.maxRoomHeight) || 8;
        this.totalRooms = this.options.totalRooms || Random.range(minRooms, maxRooms);
        this.generate();
    }

    generate = () => {
        for (let z = 0; z < this.data.grid.total_floors; z++) {
            for (let i = 0; i < this.totalRooms; i++) {
                let roomWidth = Random.range(this.minRoomWidth, this.maxRoomWidth);
                let roomHeight = Random.range(this.minRoomHeight, this.maxRoomHeight);
                let room = {
                    x: Random.range(0, this.data.grid.width - roomWidth),
                    y: Random.range(0, this.data.grid.height - roomHeight),
                    width: roomWidth,
                    height: roomHeight
                };
                for (let y = room.y; y < room.y + room.height; y++) {
                    for (let x = room.x; x < room.x + room.width; x++) {
                        if (this.data.grid.isInNavigationBounds(x, y)) {
                            this.data.grid.unblockCell(x, y, z);
                        }
                    }
                }
                this.data.rooms.push(room);
            }
        }
    }
}

module.exports = RoomGenerator;


/***/ }),

/***/ "./node_modules/node-maze-generator/src/generators/stairs.js":
/*!*******************************************************************!*\
  !*** ./node_modules/node-maze-generator/src/generators/stairs.js ***!
  \*******************************************************************/
/***/ ((module) => {

/**
 * @class StairsGenerator
 * @classdesc Generates stairs for a cells in a grid.
 * @param {Object} data - The data object to use.
 * @param {Object} options - The options object to use.
 */
class StairsGenerator {
    constructor(data, options) {
        this.data = data||{};
        this.options = options||{ascending: false};
        this.max_stairs = options.max_stairs || 1;
        this.generate();
    }

    generate = () => {
        let total_stairs_by_floor = {};
        // Iterate over each floor in the grid
        for (let floor = 0; floor < this.data.grid.total_floors - 1; floor++) {
            // Repeat loop until we find a cell that satisfies the conditions
            let cell = null;
            while (true)
            {
                if (total_stairs_by_floor[floor] && total_stairs_by_floor[floor] >= this.max_stairs) {
                    break;
                }
                let previous_floor_cell = null;
                let next_floor_cell = null;

                // get a random cell from the current floor
                cell = this.data.grid.randomCell(floor);
                if (cell.blocked) {
                    continue;
                }

                // get the previous floor cell
                if (floor > 0) {
                    previous_floor_cell = this.data.grid.cells[floor - 1][cell.y][cell.x];
                    if (previous_floor_cell.blocked) {
                        previous_floor_cell = null;
                    }
                }

                // get the next floor cell
                next_floor_cell = this.data.grid.cells[floor + 1][cell.y][cell.x];
                if (next_floor_cell === null || next_floor_cell.blocked) {
                    continue;
                }

                // add stairs
                cell.stairs = {
                    next_floor: next_floor_cell,
                    direction: this.options.ascending ? 'up' : 'down'
                };
                if (next_floor_cell) next_floor_cell.stairs = {
                    previous_floor: cell,
                    direction: this.options.ascending ? 'down' : 'up'
                };
                total_stairs_by_floor[floor] = (total_stairs_by_floor[floor] || 0) + 1;
            }
        }
    }
}

module.exports = StairsGenerator;


/***/ }),

/***/ "./node_modules/node-maze-generator/src/grid.js":
/*!******************************************************!*\
  !*** ./node_modules/node-maze-generator/src/grid.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Cell = __webpack_require__(/*! ./cell */ "./node_modules/node-maze-generator/src/cell.js");
const {Random} = __webpack_require__(/*! ./utils */ "./node_modules/node-maze-generator/src/utils.js");
const MIN_WIDTH = 5;
const MIN_HEIGHT = 5;
const MIN_BOUNDARY = -1;
const MIN_NEIGHBOR_BOUNDARY = 0;
const MIN_FLOORS = 1;

/**
 * @class Grid
 * @description The grid class is responsible for generating, storing and manipulating a grid of Cell object instances.
 * @param {Object} options - The options object.
 * @param {Number} options.width - The width of the grid.
 * @param {Number} options.height - The height of the grid.
 * @param {Array} options.floors - The total number of floors in the grid.
 * @param {Number} options.start_x - The x position of the starting cell.
 * @param {Number} options.start_y - The y position of the starting cell.
 * @param {Number} options.start_z - The z position of the starting cell.
 * @param {Cell} options.cell_class - The class used to represent a cell on the grid.
 */
class Grid {
    /**
     * @function constructor
     * @description Generate a Grid object of given dimensions filled with Cell objects and floor data.
     * @param  {Object} options  Optional arguments for the Grid object.
     */
    constructor(options) {
        // Initialize all properties, and then the grid.
        this.width = parseInt(options.width) || MIN_WIDTH;
        this.height = parseInt(options.height) || MIN_HEIGHT;
        this.total_floors = parseInt(options.total_floors) || MIN_FLOORS;
        this.start_x = parseInt(options.start_x) || 0;
        this.start_y = parseInt(options.start_y) || 0;
        this.start_z = parseInt(options.start_z) || 0;
        this.CellClass = options.cell_class||Cell;
        this.currentFloor = options.currentFloor||0;
        if (this.width <= MIN_WIDTH) this.width = MIN_WIDTH;
        if (this.height <= MIN_HEIGHT) this.height = MIN_HEIGHT;
        if (this.start_x > this.width - 1) this.start_x = this.start_x - 1;
        if (this.start_y > this.height - 1) this.start_y = this.start_y - 1;
        if (this.start_z >= this.total_floors) this.start_z = this.total_floors - 1;
        this.floors = [];
        this.initialize();
    }

    /**
     * @function initialize
     * @description Iterates through each coordinate and creates a cell at that location.
     * @return {void}
     */
    initialize = () => {
        this.cells = [];
        for (let z = this.start_z; z < this.total_floors; z++) {
            this.floors[z] = {};  // set floor data to an empty object
            this.cells[z] = [];
            for (let y = this.start_y; y < this.height; y++) {
                this.cells[z][y] = [];
                for (let x = this.start_x; x < this.width; x++) {
                    this.cells[z][y][x] = new this.CellClass(x, y, z);
                }
            }
        }
    }

    /**
     * @function randomCell
     * @description Returns a random cell from the grid.
     * @param  {Number} z      The floor to get a cell from
     * @return {Object}        Cell object
     */
    randomCell = (z) => {
        const x = Random.range(MIN_NEIGHBOR_BOUNDARY, this.width - 2);
        const y = Random.range(MIN_NEIGHBOR_BOUNDARY, this.height - 2);
        return this.getCell(x, y, z);
    }

    /**
     * @function isInBounds
     * @description Checks if given coordinates are within the bounds of the grid.
     * @param  {Number} x    x-coordinate of the cell
     * @param  {Number} y    y-coordinate of the cell
     * @return {Boolean}     true if in bounds, false otherwise
     */
    isInBounds = (x, y) => (
        x < this.width
        && x > MIN_BOUNDARY
        && y < this.height
        && y > MIN_BOUNDARY
    );

    /**
     * @function isInNavigationBounds
     * @description Checks if given coordinates are within the bounds of the grid used for navigation.
     * @param  {Number} x    x-coordinate of the cell
     * @param  {Number} y    y-coordinate of the cell
     * @return {Boolean}     true if in bounds, false otherwise
     */
    isInNavigationBounds = (x, y) => (
        x < this.width - 1
        && x > MIN_NEIGHBOR_BOUNDARY
        && y < this.height - 1
        && y > MIN_NEIGHBOR_BOUNDARY
    );

    /**
     * @function getCell
     * @description Gets a cell from the grid.
     * @param  {Number} x   x-coordinate of the cell
     * @param  {Number} y   y-coordinate of the cell
     * @param  {Number} z   the floor of the cell
     * @return {Object}     Cell object if in bounds, null otherwise
     */
    getCell = (x, y, z) => this.isInBounds(x, y) ? this.cells[z][y][x] : null;

    /**
     * @function getNeighborCell
     * @description Gets a cell from the grid. Functions the same as getCell, but checks against navigation bounds.
     * @param  {Number} x   x-coordinate of the cell
     * @param  {Number} y   y-coordinate of the cell
     * @param  {Number} z   the floor of the cell
     * @return {Object}     Cell object if in bounds, null otherwise
     */
    getNeighborCell = (x, y, z) => this.isInNavigationBounds(x, y) ? this.cells[z][y][x] : null;

    /**
     * @function unblockCell
     * @description Unblocks a cell if it is in bounds.
     * @param {Number} x  x-coordinate of the cell
     * @param {Number} y  y-coordinate of the cell
     * @param {Number} z  the floor of the cell
     * @return {void}
     */
    unblockCell = (x, y, z) => {
        if (this.isInBounds(x, y)) {
            this.cells[z][y][x].blocked = false;
        }
    }
}

module.exports = Grid;

/***/ }),

/***/ "./node_modules/node-maze-generator/src/renderer.js":
/*!**********************************************************!*\
  !*** ./node_modules/node-maze-generator/src/renderer.js ***!
  \**********************************************************/
/***/ ((module) => {

class Renderer {
    constructor(generator) {
        for (let z = 0; z < generator.data.grid.total_floors; z++) {
            console.log(`Floor ${z}`);
            for (let y = 0; y < generator.data.grid.height; y++) {
                let row = '';
                for (let x = 0; x < generator.data.grid.width; x++) {
                    let cell = generator.data.grid.cells[z][y][x];
                    let f = cell.blocked ? '\u2588' : '\u2591';
                    if (cell.stairs) {
                        if (cell.stairs.direction === 'up') {
                            f = '\u25B2';
                        }
                        else {
                            f = '\u25BC';
                        }
                    }
                    row += f;
                }
                console.log(row);
            }
        }
    }
}

module.exports = Renderer;

/***/ }),

/***/ "./node_modules/node-maze-generator/src/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/node-maze-generator/src/utils.js ***!
  \*******************************************************/
/***/ ((module) => {

/**
 * @class Random
 * @description A static class for generating random numbers.
 */
class Random {
    _seed = null;
    static _instance = null;

    static get instance() {
        if (Random._instance === null) {
            Random._instance = new Random();
        }
        return Random._instance;
    }

    constructor(seed) {
        this._seed = seed || Math.random();
    }

    /**
     * @function Random.seed
     * Sets the seed for the random number generator
     * @param seed
     * @returns {*|number}
     */
    static seed = (seed) => {
        Random.instance._seed = seed;
        return Random.instance._seed;
    }

    /**
     * @function Random.next
     * Returns a random number
     * @returns {number}
     */
    static next() {
        let x = Math.sin(Random.instance._seed) * 10000;
        Random.instance._seed = x - Math.floor(x);
        return x - Math.floor(x);
    }

    /**
     * @function Random.range
     * Returns a random number between min and max
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static range = (min, max) => {
        return Math.floor(Random.next() * (max - min)) + min;
    }
}

module.exports = {
    Random: Random
};



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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/index.js */ "./js/game/index.js");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBOztBQUVBLHNCOzs7Ozs7Ozs7O0FDM0lBO0FBQ0E7QUFDQSx3QkFBd0Isc0NBQXNDO0FBQzlELGlDQUFpQyxFQUFFO0FBQ25DLDRCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQSxnQ0FBZ0MsK0JBQStCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDdkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05tQyIsInNvdXJjZXMiOlsid2VicGFjazovLyAvLi9qcy9nYW1lL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItZW50cmFuY2UuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvY2hlY2stcGxheWVyLXBvc2l0aW9uLWZvci1leGl0LmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItdHJlYXN1cmUuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvY3JlYXRlLW5ldy1nYW1lLXN0YXRlLmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL2hlbHBlcnMvd2lraS5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9pbnB1dC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9tYXplLWdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9wcm9jZXNzLWtleS1pbnB1dC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9wcm9jZXNzLW1vdXNlLWlucHV0LmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9zZXR1cC1yb29tLmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL3ZpZXctY29uc3RhbnRzLmpzIiwid2VicGFjazovLyAvLi9qcy93aWtpLWFwaS9taWRsZXZlbG1hbmFnZXIubWpzIiwid2VicGFjazovLyAvLi9qcy93aWtpLWFwaS93aWtpaW50ZXJmYWNlLm1qcyIsIndlYnBhY2s6Ly8gLy4vbm9kZV9tb2R1bGVzL25vZGUtbWF6ZS1nZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9jZWxsLmpzIiwid2VicGFjazovLyAvLi9ub2RlX21vZHVsZXMvbm9kZS1tYXplLWdlbmVyYXRvci9zcmMvZ2VuZXJhdG9ycy9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9nZW5lcmF0b3JzL21hemUuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9nZW5lcmF0b3JzL3Jvb20uanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9nZW5lcmF0b3JzL3N0YWlycy5qcyIsIndlYnBhY2s6Ly8gLy4vbm9kZV9tb2R1bGVzL25vZGUtbWF6ZS1nZW5lcmF0b3Ivc3JjL2dyaWQuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly8gLy4vbm9kZV9tb2R1bGVzL25vZGUtbWF6ZS1nZW5lcmF0b3Ivc3JjL3V0aWxzLmpzIiwid2VicGFjazovLyAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vIC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vIC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLyAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8gLy4vanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVOZXdHYW1lU3RhdGUgZnJvbSBcIi4vY3JlYXRlLW5ldy1nYW1lLXN0YXRlXCI7XG5pbXBvcnQgc2V0dXBSb29tIGZyb20gXCIuL3NldHVwLXJvb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY2hlY2tQbGF5ZXJQb3NpdGlvbkZvckVudHJhbmNlKGdhbWVTdGF0ZSkge1xuICBjb25zdCBlbnRyYW5jZVVwZGF0ZXMgPSB7fVxuICBpZiAoaXNQbGF5ZXJPbkVudHJhbmNlKGdhbWVTdGF0ZSkpIHtcbiAgICBpZiAoIWdhbWVTdGF0ZS5wbGF5ZXJJc1N0aWxsRW50ZXJpbmcpIHtcbiAgICAgIGVudHJhbmNlVXBkYXRlcy50aXRsZSA9IGdhbWVTdGF0ZS5lbnRyYW5jZU5hbWU7XG4gICAgICBlbnRyYW5jZVVwZGF0ZXMuZW50cmFuY2VOYW1lID0gZ2FtZVN0YXRlLnRpdGxlO1xuXG4gICAgICBjb25zdCBuZXdHYW1lU3RhdGUgPSBjcmVhdGVOZXdHYW1lU3RhdGUoZ2FtZVN0YXRlLCBlbnRyYW5jZVVwZGF0ZXMpO1xuICAgICAgLy8gc3RvcEFuZENsZWFyKCk7XG4gICAgICBjb25zdCBuZXdSb29tU3RhdGUgPSBhd2FpdCBzZXR1cFJvb20obmV3R2FtZVN0YXRlKTtcbiAgICAgIHJldHVybiBuZXdSb29tU3RhdGU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVudHJhbmNlVXBkYXRlcy5wbGF5ZXJJc1N0aWxsRW50ZXJpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gZW50cmFuY2VVcGRhdGVzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzUGxheWVyT25FbnRyYW5jZShnYW1lU3RhdGUpXG57XG4gIHJldHVybiBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCwgMCkpXVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSwgMCkpXS50eXBlID09PSAnZW50cmFuY2UnO1xufVxuIiwiaW1wb3J0IGNyZWF0ZU5ld0dhbWVTdGF0ZSBmcm9tIFwiLi9jcmVhdGUtbmV3LWdhbWUtc3RhdGVcIjtcbmltcG9ydCBzZXR1cFJvb20gZnJvbSBcIi4vc2V0dXAtcm9vbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBjaGVja1BsYXllclBvc2l0aW9uRm9yRXhpdChnYW1lU3RhdGUpXG57XG4gIGNvbnN0IHtwbGF5ZXJJc09uRXhpdCwgZXhpdFRpdGxlfSA9IGlzUGxheWVyT25FeGl0KGdhbWVTdGF0ZSk7XG4gIGlmIChwbGF5ZXJJc09uRXhpdClcbiAge1xuICAgIGNvbnN0IGV4aXRVcGRhdGVzID0ge31cblxuICAgIGV4aXRVcGRhdGVzLmVudHJhbmNlTmFtZSA9IGdhbWVTdGF0ZS50aXRsZTtcbiAgICBleGl0VXBkYXRlcy50aXRsZSA9IGV4aXRUaXRsZTtcblxuICAgIGNvbnN0IG5ld0dhbWVTdGF0ZSA9IGNyZWF0ZU5ld0dhbWVTdGF0ZShnYW1lU3RhdGUsIGV4aXRVcGRhdGVzKTtcbiAgICBjb25zdCBuZXdSb29tR2FtZVN0YXRlID0gYXdhaXQgc2V0dXBSb29tKG5ld0dhbWVTdGF0ZSk7XG4gICAgcmV0dXJuIG5ld1Jvb21HYW1lU3RhdGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQbGF5ZXJPbkV4aXQoZ2FtZVN0YXRlKVxue1xuICBjb25zdCBjZWxsID0gZ2FtZVN0YXRlLm1hemVbTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFgsIDApKV1bTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFksIDApKV07XG4gIGNvbnN0IHBsYXllcklzT25FeGl0ID0gY2VsbC50eXBlID09PSBcImV4aXRcIlxuICBjb25zdCBleGl0VGl0bGUgPSBjZWxsLnRpdGxlO1xuICByZXR1cm4ge3BsYXllcklzT25FeGl0LCBleGl0VGl0bGV9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tQbGF5ZXJQb3NpdGlvbkZvclRyZWFzdXJlKGdhbWVTdGF0ZSkge1xuICBjb25zdCB0cmVhc3VyZUFjcXVpcmVkID0gaXNQbGF5ZXJPblRyZWFzdXJlKGdhbWVTdGF0ZSk7XG4gIGlmICh0cmVhc3VyZUFjcXVpcmVkKSB7XG4gICAgY29uc3QgdHJlYXN1cmVVcGRhdGVzID0ge307XG4gICAgdHJlYXN1cmVVcGRhdGVzLnNjb3JlID0gZ2FtZVN0YXRlLnNjb3JlICsgMTtcbiAgICB0cmVhc3VyZVVwZGF0ZXMuYWNxdWlyZWRUcmVhc3VyZXMgPSBbLi4uZ2FtZVN0YXRlLmFjcXVpcmVkVHJlYXN1cmVzLCBgJHtnYW1lU3RhdGUudGl0bGV9OiAke3RyZWFzdXJlQWNxdWlyZWR9YF1cblxuICAgIC8vdG9kbzogdGhpcyBpcyBzdXBwb3NlZCB0byBiZSBpbW11dGFibGVcbiAgICBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCldW01hdGguZmxvb3IoZ2FtZVN0YXRlLnBsYXllckdyaWRZKV0udHlwZSA9IFwic3BhY2VcIjtcblxuICAgIHJldHVybiB0cmVhc3VyZVVwZGF0ZXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQbGF5ZXJPblRyZWFzdXJlKGdhbWVTdGF0ZSlcbntcbiAgcmV0dXJuIChcbiAgICBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCwgMCkpXVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSwgMCkpXS50eXBlID09PSAndHJlYXN1cmUnXG4gICAgICA/IGdhbWVTdGF0ZS5tYXplW01hdGguZmxvb3IoTWF0aC5tYXgoZ2FtZVN0YXRlLnBsYXllckdyaWRYLCAwKSldW01hdGguZmxvb3IoTWF0aC5tYXgoZ2FtZVN0YXRlLnBsYXllckdyaWRZLCAwKSldLm5hbWVcbiAgICAgIDogZmFsc2VcbiAgKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU5ld0dhbWVTdGF0ZShnYW1lU3RhdGUsIG5ld1Byb3BlcnRpZXMpXG57XG4gIGNvbnN0IG5ld0dhbWVTdGF0ZSA9IHsuLi5nYW1lU3RhdGUsIC4uLm5ld1Byb3BlcnRpZXN9O1xuICBPYmplY3QuZnJlZXplKG5ld0dhbWVTdGF0ZSk7XG4gIHJldHVybiBuZXdHYW1lU3RhdGU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRSYW5kb21BcnRpY2xlTmFtZSgpXG57XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3cvYXBpLnBocD9hY3Rpb249cXVlcnkmbGlzdD1yYW5kb20mZm9ybWF0PWpzb24mcm5uYW1lc3BhY2U9MCZybmxpbWl0PTEmb3JpZ2luPSpcIik7XG4gIGNvbnN0IHJlc3VsdERhdGEgPSBhd2FpdCByZXN1bHQuanNvbigpO1xuICBjb25zdCB0aXRsZSA9IHJlc3VsdERhdGEucXVlcnkucmFuZG9tWzBdLnRpdGxlXG4gIHJldHVybiB0aXRsZTtcbn1cbiIsImltcG9ydCB7cmVuZGVyfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmNvbnN0IG5tZyA9IHJlcXVpcmUoJ25vZGUtbWF6ZS1nZW5lcmF0b3InKTtcbmltcG9ydCBwcm9jZXNzTW91c2VJbnB1dCBmcm9tIFwiLi9wcm9jZXNzLW1vdXNlLWlucHV0XCI7XG5pbXBvcnQgcHJvY2Vzc0tleUlucHV0IGZyb20gXCIuL3Byb2Nlc3Mta2V5LWlucHV0XCI7XG5pbXBvcnQgY2hlY2tQbGF5ZXJQb3NpdGlvbkZvclRyZWFzdXJlIGZyb20gXCIuL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItdHJlYXN1cmVcIjtcbmltcG9ydCBjcmVhdGVOZXdHYW1lU3RhdGUgZnJvbSBcIi4vY3JlYXRlLW5ldy1nYW1lLXN0YXRlXCI7XG5pbXBvcnQgc2V0dXBSb29tIGZyb20gXCIuL3NldHVwLXJvb21cIjtcbmltcG9ydCBjaGVja1BsYXllclBvc2l0aW9uRm9yRXhpdCBmcm9tIFwiLi9jaGVjay1wbGF5ZXItcG9zaXRpb24tZm9yLWV4aXRcIjtcbmltcG9ydCBjaGVja1BsYXllclBvc2l0aW9uRm9yRW50cmFuY2UgZnJvbSBcIi4vY2hlY2stcGxheWVyLXBvc2l0aW9uLWZvci1lbnRyYW5jZVwiO1xuaW1wb3J0IGdldFJhbmRvbUFydGljbGVOYW1lIGZyb20gXCIuL2hlbHBlcnMvd2lraVwiO1xuaW1wb3J0IHt2aWV3Q29uc3RhbnRzfSBmcm9tIFwiLi92aWV3LWNvbnN0YW50c1wiO1xuXG5sZXQgYW5pbWF0aW9uRnJhbWU7XG5cbmNvbnN0IHNob3VsZFBvcHVsYXRlVHJlYXN1cmVzID0gZ2FtZVN0YXRlID0+ICFnYW1lU3RhdGUuYWNxdWlyZWRUcmVhc3VyZXMuZmluZChlbnRyeSA9PiBlbnRyeS5yb29tID09PSB0aXRsZSlcblxuc3RhcnQoKTtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKVxue1xuICBjb25zdCByYW5kb21UaXRsZSA9IGF3YWl0IGdldFJhbmRvbUFydGljbGVOYW1lKCk7XG5cbiAgY29uc3QgZ2FtZVN0YXRlUHJvcGVydGllcyA9IHtcbiAgICBhY3F1aXJlZFRyZWFzdXJlczogW10sXG4gICAgcGxheWVySXNTdGlsbEVudGVyaW5nOiBmYWxzZSxcbiAgICBlbnRyYW5jZU5hbWU6IHJhbmRvbVRpdGxlLFxuICAgIG1hemU6IFtdLFxuICAgIHNjb3JlOiAwLFxuICAgIHRpdGxlOiByYW5kb21UaXRsZSxcbiAgICBwbGF5ZXJEaXJlY3Rpb25YOiAwLFxuICAgIHBsYXllckRpcmVjdGlvblk6IDAsXG4gICAgcGxheWVyU3BlZWQ6IDAuMDUsXG4gICAgcGxheWVyR3JpZFg6IDAsXG4gICAgcGxheWVyR3JpZFk6IDAsXG4gIH1cblxuICBjb25zdCBnYW1lU3RhdGUgPSBjcmVhdGVOZXdHYW1lU3RhdGUoe30sIGdhbWVTdGF0ZVByb3BlcnRpZXMpO1xuICBjb25zdCBnYW1lU3RhdGVBZnRlclNldHVwID0gYXdhaXQgc2V0dXBSb29tKGdhbWVTdGF0ZSk7XG4gIGxvb3AoZ2FtZVN0YXRlQWZ0ZXJTZXR1cCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvb3AoZ2FtZVN0YXRlKVxue1xuICB0cnkge1xuICAgIGNvbnN0IG1vdXNlVXBkYXRlcyA9IHByb2Nlc3NNb3VzZUlucHV0KGdhbWVTdGF0ZSk7XG4gICAgY29uc3Qga2V5VXBkYXRlcyA9IHByb2Nlc3NLZXlJbnB1dChnYW1lU3RhdGUpO1xuICAgIGNvbnN0IHBvc2l0aW9uVXBkYXRlcyA9IGNoZWNrUGxheWVyUG9zaXRpb25Gb3JUcmVhc3VyZShnYW1lU3RhdGUpXG4gICAgICB8fCBhd2FpdCBjaGVja1BsYXllclBvc2l0aW9uRm9yRXhpdChnYW1lU3RhdGUpXG4gICAgICB8fCBhd2FpdCBjaGVja1BsYXllclBvc2l0aW9uRm9yRW50cmFuY2UoZ2FtZVN0YXRlKTtcblxuICAgIGNvbnN0IGdhbWVTdGF0ZVVwZGF0ZXMgPVxuICAgICAge1xuICAgICAgICAuLi5tb3VzZVVwZGF0ZXMsXG4gICAgICAgIC4uLmtleVVwZGF0ZXMsXG4gICAgICAgIC4uLnBvc2l0aW9uVXBkYXRlc1xuICAgICAgfTtcblxuICAgIGNvbnN0IG5ld0dhbWVTdGF0ZSA9IGNyZWF0ZU5ld0dhbWVTdGF0ZShnYW1lU3RhdGUsIGdhbWVTdGF0ZVVwZGF0ZXMpO1xuXG4gICAgcmVuZGVyKG5ld0dhbWVTdGF0ZSk7XG5cbiAgICBhbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBsb29wKG5ld0dhbWVTdGF0ZSkpO1xuICB9XG4gIGNhdGNoIChlcnJvcilcbiAge1xuICAgIHZpZXdDb25zdGFudHMubW9kYWxQYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB2aWV3Q29uc3RhbnRzLnRyZWFzdXJlTGlzdFBhcmVudC5pbm5lckhUTUwgPSBgXG4gICAgICAke2dhbWVTdGF0ZS5hY3F1aXJlZFRyZWFzdXJlcy5tYXAoZSA9PiBcIjxsaT5cIiArIGUgKyBcIjwvbGk+XCIpfVxuICAgIGBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWluKCkge31cbiIsImltcG9ydCB7d2luZG93UG9zVG9HcmlkUG9zfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxubGV0IGtleVN0YXR1cyA9IHt9O1xubGV0IG1vdXNlU3RhdHVzID0gZmFsc2U7XG5sZXQgbW91c2VHcmlkUG9zID0ge3g6MCx5OjB9O1xubGV0IG1vdXNlVGFyZ2V0O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5U3RhdHVzKGtleSlcbntcbiAgcmV0dXJuIGtleVN0YXR1c1trZXldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW91c2VTdGF0dXMoKVxue1xuICByZXR1cm4ge21vdXNlU3RhdHVzLCBtb3VzZUdyaWRQb3MsIG1vdXNlVGFyZ2V0fTtcbn1cblxuLy8gZnVuY3Rpb24gc3RhcnQoKVxuLy8ge1xuICBhZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICBhZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCk7XG4gIGFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcHJvY2Vzc01vdXNlQ2xpY2spO1xuICBhZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBwcm9jZXNzTW91c2VVcCk7XG4vLyB9XG5cbmZ1bmN0aW9uIHN0b3AoKVxue1xuICBrZXlTdGF0dXMgPSB7fTtcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5VXApO1xuICByZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHByb2Nlc3NNb3VzZUNsaWNrKTtcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgcHJvY2Vzc01vdXNlVXApO1xufVxuXG5mdW5jdGlvbiBvbktleURvd24oZSlcbntcbiAga2V5U3RhdHVzW2Uua2V5XSA9IHRydWVcbn1cblxuZnVuY3Rpb24gb25LZXlVcChlKVxue1xuICBrZXlTdGF0dXNbZS5rZXldID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NNb3VzZUNsaWNrKGUpXG57XG4gIHRyeSB7XG4gICAgbW91c2VTdGF0dXMgPSB0cnVlO1xuICAgIG1vdXNlR3JpZFBvcyA9IHdpbmRvd1Bvc1RvR3JpZFBvcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgbW91c2VUYXJnZXQgPSBlLnRhcmdldDtcbiAgfVxuICBjYXRjaCAoZSlcbiAge1xuICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzTW91c2VVcChlKVxue1xuICBtb3VzZVN0YXR1cyA9IGZhbHNlO1xuICBtb3VzZVRhcmdldCA9IG51bGw7XG59XG4iLCJjb25zdCBubWcgPSByZXF1aXJlKFwibm9kZS1tYXplLWdlbmVyYXRvclwiKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVNYXplKHByb3BlcnRpZXMpXG57XG4gIGNvbnN0IGdlbmVyYXRvciA9IG5ldyBubWcuZ2VuZXJhdG9ycy5tYXplKHt9LCB7d2lkdGg6IHByb3BlcnRpZXMuc2l6ZSwgaGVpZ2h0OiBwcm9wZXJ0aWVzLnNpemV9KTtcbiAgY29uc3QgbWF6ZSA9IGdlbmVyYXRvci5kYXRhLmdyaWQuY2VsbHNbMF0ubWFwKHJvdyA9PlxuICAgIHJvdy5tYXAoY2VsbCA9PiBjZWxsLmJsb2NrZWQgPyB7dHlwZTogXCJ3YWxsXCIsIHg6IGNlbGwueCwgeTogY2VsbC55fSA6IHt0eXBlOiBcInNwYWNlXCIsIHg6IGNlbGwueCwgeTogY2VsbC55fSlcbiAgKVxuICBvcGVuVXBNYXplSW5QbGFjZShtYXplLCBwcm9wZXJ0aWVzLnNpbXBsaWNpdHkpO1xuXG4gIGNvbnN0IHVzYWJsZUJvcmRlclRpbGVzID0gZ2V0VXNhYmxlQm9yZGVyVGlsZXMobWF6ZSk7XG5cbiAgY3JlYXRlRW50cmFuY2VJblBsYWNlKG1hemUsIHVzYWJsZUJvcmRlclRpbGVzKTtcbiAgY3JlYXRlRXhpdHNJblBsYWNlKG1hemUsIHByb3BlcnRpZXMubGlua3MsIHVzYWJsZUJvcmRlclRpbGVzKTtcbiAgLy8gaWYgKHNob3VsZFBvcHVsYXRlVHJlYXN1cmVzKGdhbWVTdGF0ZSkpXG4gIGNyZWF0ZVRyZWFzdXJlc0luUGxhY2UobWF6ZSwgcHJvcGVydGllcy50cmVhc3VyZXMpO1xuXG4gIHJldHVybiBtYXplXG59XG5cbmZ1bmN0aW9uIG9wZW5VcE1hemVJblBsYWNlKG1hemUsIHNpbXBsaWNpdHkpXG57XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IG1hemUubGVuZ3RoIDsgaSsrKVxuICB7XG4gICAgZm9yIChsZXQgaiA9IDAgOyBqIDwgbWF6ZVtpXS5sZW5ndGggOyBqKyspXG4gICAge1xuICAgICAgY29uc3QgY2VsbCA9IG1hemVbaV1bal07XG4gICAgICBpZiAoY2VsbC50eXBlID09PSBcIndhbGxcIiAmJiBpID4gMCAmJiBqID4gMCAmJiBpIDwgbWF6ZS5sZW5ndGggLSAxICYmIGogPCBtYXplLmxlbmd0aCAtIDEgJiYgTWF0aC5yYW5kb20oKSA8IHNpbXBsaWNpdHkpXG4gICAgICB7XG4gICAgICAgIG1hemVbaV1bal0udHlwZSA9IFwic3BhY2VcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VXNhYmxlQm9yZGVyVGlsZXMobWF6ZSlcbntcbiAgY29uc3QgdXNhYmxlQm9yZGVyVGlsZXMgPSBbXVxuXG4gIC8vIHRvcFxuICBmb3IgKGxldCBpID0gMCA7IGkgPCBtYXplLmxlbmd0aCA7IGkrKylcbiAge1xuICAgIGlmIChtYXplW2ldWzBdLnR5cGUgPT09IFwid2FsbFwiICYmIG1hemVbaV1bMV0udHlwZSA9PT0gXCJzcGFjZVwiKVxuICAgICAgdXNhYmxlQm9yZGVyVGlsZXMucHVzaCh7eDogaSwgeTogMH0pO1xuICB9XG5cbiAgLy8gYm90dG9tXG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IG1hemUubGVuZ3RoIDsgaSsrKVxuICB7XG4gICAgaWYgKG1hemVbaV1bbWF6ZS5sZW5ndGggLSAxXS50eXBlID09PSBcIndhbGxcIiAmJiBtYXplW2ldW21hemUubGVuZ3RoIC0gMl0udHlwZSA9PT0gXCJzcGFjZVwiKVxuICAgICAgdXNhYmxlQm9yZGVyVGlsZXMucHVzaCh7eDogaSwgeTogbWF6ZS5sZW5ndGggLTF9KTtcbiAgfVxuXG4gIC8vIGxlZnQsIG1pbnVzIHRvcCBhbmQgYm90dG9tXG4gIGZvciAobGV0IGkgPSAxIDsgaSA8IG1hemUubGVuZ3RoIC0xICA7IGkrKylcbiAge1xuICAgIGlmIChtYXplWzBdW2ldLnR5cGUgPT09IFwid2FsbFwiICYmIG1hemVbMV1baV0udHlwZSA9PT0gXCJzcGFjZVwiKVxuICAgICAgdXNhYmxlQm9yZGVyVGlsZXMucHVzaCh7eDogMCwgeTogaX0pO1xuICB9XG5cbiAgLy9yaWdodCwgbWludXMgdG9wIGFuZCBib3R0b21cbiAgZm9yIChsZXQgaSA9IDEgOyBpIDwgbWF6ZS5sZW5ndGggLTEgIDsgaSsrKVxuICB7XG4gICAgaWYgKG1hemVbbWF6ZS5sZW5ndGggLSAxXVtpXSA9PT0gXCJ3YWxsXCIudHlwZSAmJiBtYXplW21hemUubGVuZ3RoIC0gMl1baV0udHlwZSA9PT0gXCJzcGFjZVwiKVxuICAgICAgdXNhYmxlQm9yZGVyVGlsZXMucHVzaCh7eDogbWF6ZS5sZW5ndGggLSAxLCB5OiBpfSk7XG4gIH1cblxuICByZXR1cm4gdXNhYmxlQm9yZGVyVGlsZXM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudHJhbmNlSW5QbGFjZShtYXplLCB1c2FibGVCb3JkZXJUaWxlcylcbntcbiAgY29uc3QgaW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1c2FibGVCb3JkZXJUaWxlcy5sZW5ndGggLSAxKSk7XG5cbiAgY29uc3QgcG9zID0gdXNhYmxlQm9yZGVyVGlsZXNbaW5kZXhdO1xuXG4gIHVzYWJsZUJvcmRlclRpbGVzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgbWF6ZVtwb3MueF1bcG9zLnldLnR5cGUgPSBcImVudHJhbmNlXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV4aXRzSW5QbGFjZShtYXplLCBsaW5rcywgdXNhYmxlQm9yZGVyVGlsZXMpXG57XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGxpbmtzLmxlbmd0aCAmJiBpIDwgdXNhYmxlQm9yZGVyVGlsZXMubGVuZ3RoIDsgaSsrKVxuICB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1c2FibGVCb3JkZXJUaWxlcy5sZW5ndGggLSAxKSk7XG5cbiAgICBjb25zdCBwb3MgPSB1c2FibGVCb3JkZXJUaWxlc1tpbmRleF07XG5cbiAgICB1c2FibGVCb3JkZXJUaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgbWF6ZVtwb3MueF1bcG9zLnldLnR5cGUgPSBcImV4aXRcIjtcbiAgICBtYXplW3Bvcy54XVtwb3MueV0udGl0bGUgPSBsaW5rc1tpXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVUcmVhc3VyZXNJblBsYWNlKG1hemUsIGNpdGVzTmVlZGVkKVxue1xuICBjb25zdCBlbXB0eVNwYWNlcyA9IG1hemUuZmxhdCgpLmZpbHRlcihjZWxsID0+IGNlbGwudHlwZSA9PT0gXCJzcGFjZVwiKTtcblxuICBmb3IgKGxldCBpID0gMCA7IGkgPCBjaXRlc05lZWRlZC5sZW5ndGggOyBpKyspXG4gIHtcbiAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIChlbXB0eVNwYWNlcy5sZW5ndGggLSAxKSkpO1xuICAgIGVtcHR5U3BhY2VzW3JhbmRdLnR5cGUgPSBcInRyZWFzdXJlXCI7XG4gICAgZW1wdHlTcGFjZXNbcmFuZF0ubmFtZSA9IGNpdGVzTmVlZGVkW2ldO1xuICAgIGVtcHR5U3BhY2VzLnNwbGljZShyYW5kLCAxKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtnZXRLZXlTdGF0dXN9IGZyb20gXCIuL2lucHV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NLZXlJbnB1dChnYW1lU3RhdGUpXG57XG4gIGxldCBwbGF5ZXJEaXJlY3Rpb25YID0gMCwgcGxheWVyRGlyZWN0aW9uWSA9IDA7XG5cbiAgaWYgKGdldEtleVN0YXR1cygndycpKSBwbGF5ZXJEaXJlY3Rpb25ZLS07XG4gIGlmIChnZXRLZXlTdGF0dXMoJ2EnKSkgcGxheWVyRGlyZWN0aW9uWC0tO1xuICBpZiAoZ2V0S2V5U3RhdHVzKCdzJykpIHBsYXllckRpcmVjdGlvblkrKztcbiAgaWYgKGdldEtleVN0YXR1cygnZCcpKSBwbGF5ZXJEaXJlY3Rpb25YKys7XG5cbiAgbGV0IHZlbG9jaXR5WCA9IHBsYXllckRpcmVjdGlvblggKiBnYW1lU3RhdGUucGxheWVyU3BlZWQ7XG4gIGxldCB2ZWxvY2l0eVkgPSBwbGF5ZXJEaXJlY3Rpb25ZICogZ2FtZVN0YXRlLnBsYXllclNwZWVkO1xuXG4gIGxldCBjaGVja1BvaW50cyA9IHtcbiAgICB1cHBlckxlZnQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjIsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArICB2ZWxvY2l0eVkgKyAwLjJ9LFxuICAgIHVwcGVyUmlnaHQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjgsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSArIDAuMn0sXG4gICAgbG93ZXJSaWdodDoge3g6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIHZlbG9jaXR5WCArIDAuOCwgeTogZ2FtZVN0YXRlLnBsYXllckdyaWRZICsgdmVsb2NpdHlZICsgMC44fSxcbiAgICBsb3dlckxlZnQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjIsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSArIDAuOH0sXG4gIH1cblxuICBpZiAodmVsb2NpdHlYIDwgMClcbiAge1xuICAgIGlmIChjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy51cHBlckxlZnQpIHx8IGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLmxvd2VyTGVmdCkpXG4gICAge1xuICAgICAgdmVsb2NpdHlYID0gMDtcbiAgICB9XG4gIH1cblxuICBlbHNlIGlmICh2ZWxvY2l0eVggPiAwKVxuICB7XG4gICAgaWYgKGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLnVwcGVyUmlnaHQpIHx8IGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLmxvd2VyUmlnaHQpKVxuICAgIHtcbiAgICAgIHZlbG9jaXR5WCA9IDA7XG4gICAgfVxuICB9XG5cbiAgaWYgKHZlbG9jaXR5WSA8IDApXG4gIHtcbiAgICBpZiAoY2hlY2tGb3JXYWxsKGdhbWVTdGF0ZSwgY2hlY2tQb2ludHMudXBwZXJMZWZ0KSB8fCBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy51cHBlclJpZ2h0KSlcbiAgICB7XG4gICAgICB2ZWxvY2l0eVkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGVsc2UgaWYgKHZlbG9jaXR5WSA+IDApXG4gIHtcbiAgICBpZiAoY2hlY2tGb3JXYWxsKGdhbWVTdGF0ZSwgY2hlY2tQb2ludHMubG93ZXJMZWZ0KSB8fCBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy5sb3dlclJpZ2h0KSlcbiAgICB7XG4gICAgICB2ZWxvY2l0eVkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7cGxheWVyR3JpZFg6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIHZlbG9jaXR5WCwgcGxheWVyR3JpZFk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSB9O1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBwb3NpdGlvblZlY3RvcilcbntcbiAgcmV0dXJuIHBvc2l0aW9uVmVjdG9yLnggPCAwIHx8IHBvc2l0aW9uVmVjdG9yLnggPj0gZ2FtZVN0YXRlLm1hemUubGVuZ3RoXG4gICAgfHwgcG9zaXRpb25WZWN0b3IueSA8IDAgfHwgcG9zaXRpb25WZWN0b3IueSA+PSBnYW1lU3RhdGUubWF6ZS5sZW5ndGhcbiAgICB8fCBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKHBvc2l0aW9uVmVjdG9yLngpXVtNYXRoLmZsb29yKHBvc2l0aW9uVmVjdG9yLnkpXS50eXBlID09PSBcIndhbGxcIjtcbn1cbiIsImltcG9ydCB7Z2V0TW91c2VTdGF0dXN9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQge3ZpZXdDb25zdGFudHN9IGZyb20gXCIuL3ZpZXctY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NNb3VzZUlucHV0KGdhbWVTdGF0ZSlcbntcbiAgbGV0IG1vdXNlVXBkYXRlcyA9IHt9O1xuXG4gIGNvbnN0IHttb3VzZVN0YXR1cywgbW91c2VHcmlkUG9zLCBtb3VzZVRhcmdldH0gPSBnZXRNb3VzZVN0YXR1cygpO1xuXG4gIGlmIChtb3VzZVRhcmdldCA9PT0gdmlld0NvbnN0YW50cy5zY29yZVBhcmVudClcbiAge1xuICAgIGNvbnNvbGUubG9nKGdhbWVTdGF0ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKG1vdXNlU3RhdHVzICYmIG1vdXNlR3JpZFBvcy54ID49IDAgJiYgbW91c2VHcmlkUG9zLnkgPj0gMCAmJiBtb3VzZUdyaWRQb3MueCA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCAmJiBtb3VzZUdyaWRQb3MueSA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCkge1xuICAgICAgY29uc3Qge25hbWUsIHR5cGUsIHRpdGxlfSA9IGdhbWVTdGF0ZS5tYXplW21vdXNlR3JpZFBvcy54XVttb3VzZUdyaWRQb3MueV07XG4gICAgICBpZiAodHlwZSA9PT0gXCJleGl0XCIpIHtcbiAgICAgICAgbW91c2VVcGRhdGVzLnJlbmRlcmVkSW5mbyA9IHRpdGxlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcInRyZWFzdXJlXCIpIHtcbiAgICAgICAgbW91c2VVcGRhdGVzLnJlbmRlcmVkSW5mbyA9IG5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZW50cmFuY2VcIikge1xuICAgICAgICBtb3VzZVVwZGF0ZXMucmVuZGVyZWRJbmZvID0gZ2FtZVN0YXRlLmVudHJhbmNlTmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbW91c2VVcGRhdGVzO1xufVxuIiwiaW1wb3J0IHt2aWV3Q29uc3RhbnRzIGFzIGdhbWVTdGF0ZSwgdmlld0NvbnN0YW50c30gZnJvbSBcIi4vdmlldy1jb25zdGFudHNcIjtcblxuY29uc3QgQ0VMTF9XSURUSCA9IDYwLCBDRUxMX0hFSUdIVCA9IDYwO1xuY29uc3QgV0lORE9XX1dJRFRIID0gODAwLCBXSU5ET1dfSEVJR0hUID0gODAwO1xuY29uc3Qgdmlld1N0YXRlID0ge1xuICB3aW5kb3dYOiAwLFxuICB3aW5kb3dZOiAwLFxufVxuXG5sZXQgcHJpb3JHYW1lU3RhdGUgPSB7fTtcblxubGV0IHJlYWR5ID0gZmFsc2U7XG5cbmxldCBmcmFtZU51bSA9IDE7XG5cbmNvbnN0IGltYWdlcyA9IHtcbiAgXCJ3YWxsXCI6IG5ldyBJbWFnZSgpLFxuICBcImNoYXJhMVwiOiBuZXcgSW1hZ2UoKSxcbiAgXCJjaGFyYTJcIjogbmV3IEltYWdlKCksXG4gIFwiZW50cmFuY2VcIjogbmV3IEltYWdlKCksXG4gIFwiZXhpdFwiOiBuZXcgSW1hZ2UoKSxcbiAgXCJ0cmVhc3VyZVwiOiBuZXcgSW1hZ2UoKVxufVxuXG5sb2FkQWxsSW1hZ2VzKCk7XG5zZXRJbnRlcnZhbChmbGlwRnJhbWVOdW1iZXIsIDI1MCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRBbGxJbWFnZXMoKVxue1xuICBjb25zdCBpbWFnZU5hbWVzID0gW1wid2FsbFwiLCBcImNoYXJhMVwiLCBcImNoYXJhMlwiLCBcImVudHJhbmNlXCIsIFwiZXhpdFwiLCBcInRyZWFzdXJlXCJdO1xuICBjb25zdCBpbWFnZVByb21pc2VzID0gW107XG4gIGZvciAobGV0IGltYWdlTmFtZSBvZiBpbWFnZU5hbWVzKVxuICB7XG4gICAgY29uc3QgaW1hZ2UgPSBpbWFnZXNbaW1hZ2VOYW1lXTtcbiAgICBpbWFnZVByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlc29sdmUpKSlcbiAgICBpbWFnZS5zcmMgPSBgLi4vLi4vaW1nLyR7aW1hZ2VOYW1lfS5wbmdgO1xuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoaW1hZ2VQcm9taXNlcyk7XG4gIHJlYWR5ID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihnYW1lU3RhdGUpXG57XG4gIGlmICghcmVhZHkpIHJldHVybjtcblxuICAvLyBpZiAoZ2FtZVN0YXRlLnBsYXllckdyaWRYICE9PSBwcmlvckdhbWVTdGF0ZS5wbGF5ZXJHcmlkWFxuICAvLyB8fCBnYW1lU3RhdGUucGxheWVyR3JpZFkgIT09IHByaW9yR2FtZVN0YXRlLnBsYXllckdyaWRZKVxuICAvLyB7XG4gICAgdmlld0NvbnN0YW50cy5jdHguY2xlYXJSZWN0KHZpZXdTdGF0ZS53aW5kb3dYLCB2aWV3U3RhdGUud2luZG93WSwgV0lORE9XX1dJRFRILCBXSU5ET1dfSEVJR0hUKTtcbiAgICB2aWV3U3RhdGUud2luZG93WCA9IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCAqIENFTExfV0lEVEggKyBDRUxMX1dJRFRIIC8gMiAtIFdJTkRPV19XSURUSCAvIDI7XG4gICAgdmlld1N0YXRlLndpbmRvd1kgPSBnYW1lU3RhdGUucGxheWVyR3JpZFkgKiBDRUxMX0hFSUdIVCArIENFTExfSEVJR0hUIC8gMiAtIFdJTkRPV19IRUlHSFQgLyAyO1xuICAgIHZpZXdDb25zdGFudHMuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAtdmlld1N0YXRlLndpbmRvd1gsIC12aWV3U3RhdGUud2luZG93WSk7XG4gICAgcmVuZGVyTWF6ZShnYW1lU3RhdGUpO1xuICAgIHJlbmRlclBsYXllcihnYW1lU3RhdGUpO1xuICAvLyB9XG5cbiAgcmVuZGVySW5mbyhnYW1lU3RhdGUpO1xuXG4gIHByaW9yR2FtZVN0YXRlID0gZ2FtZVN0YXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySW5mbyhnYW1lU3RhdGUpXG57XG4gIGlmIChnYW1lU3RhdGUucmVuZGVyZWRJbmZvICYmIGdhbWVTdGF0ZS5yZW5kZXJlZEluZm8gIT09IHByaW9yR2FtZVN0YXRlLnJlbmRlcmVkSW5mbylcbiAgICB2aWV3Q29uc3RhbnRzLmxpbmtJbmZvUGFyZW50LmlubmVyVGV4dCA9IGdhbWVTdGF0ZS5yZW5kZXJlZEluZm87XG5cbiAgaWYgKGdhbWVTdGF0ZS5zY29yZSAhPT0gcHJpb3JHYW1lU3RhdGUuc2NvcmUpXG4gIHtcbiAgICB2aWV3Q29uc3RhbnRzLnNjb3JlUGFyZW50LmlubmVyVGV4dCA9IGdhbWVTdGF0ZS5zY29yZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93UG9zVG9HcmlkUG9zKHdpbmRvd1Bvc1gsIHdpbmRvd1Bvc1kpXG57XG4gIGNvbnN0IGdyaWRQb3NpdGlvblggPSBNYXRoLmZsb29yKCh3aW5kb3dQb3NYIC0gdmlld0NvbnN0YW50cy5jYW52YXMuY2xpZW50TGVmdCArIHZpZXdTdGF0ZS53aW5kb3dYKSAvIENFTExfV0lEVEgpO1xuICBjb25zdCBncmlkUG9zaXRpb25ZID0gTWF0aC5mbG9vcigod2luZG93UG9zWSAtIHZpZXdDb25zdGFudHMuY2FudmFzLmNsaWVudFRvcCArIHZpZXdTdGF0ZS53aW5kb3dZKSAvIENFTExfSEVJR0hUKVxuICByZXR1cm4gKHt4OiBncmlkUG9zaXRpb25YLCB5OiBncmlkUG9zaXRpb25ZfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclBsYXllcihnYW1lU3RhdGUpXG57XG4gIHJlbmRlclBsYXllckNlbGwoZ2FtZVN0YXRlLnBsYXllckdyaWRYLCBnYW1lU3RhdGUucGxheWVyR3JpZFksIFwiYmx1ZVwiKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTWF6ZShnYW1lU3RhdGUpXG57XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZVN0YXRlLm1hemVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBnYW1lU3RhdGUubWF6ZVtpXVtqXTtcbiAgICAgIGlmIChjZWxsLnR5cGUgIT09IFwic3BhY2VcIilcbiAgICAgIHtcbiAgICAgICAgcmVuZGVyQ2VsbChpLCBqLCBjZWxsLnR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDZWxsKHgsIHksIGNlbGxUeXBlKVxue1xuICB2aWV3Q29uc3RhbnRzLmN0eC5kcmF3SW1hZ2UoaW1hZ2VzW2NlbGxUeXBlXSwgMCwgMCwgMTAwLCAxMDAsIHggKiBDRUxMX1dJRFRILCB5ICogQ0VMTF9XSURUSCwgQ0VMTF9XSURUSCwgQ0VMTF9IRUlHSFQpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQbGF5ZXJDZWxsKHgsIHksIGNvbG9yKVxue1xuXG4gIGlmIChmcmFtZU51bSA9PT0gMSlcbiAge1xuICAgIHZpZXdDb25zdGFudHMuY3R4LmRyYXdJbWFnZShpbWFnZXMuY2hhcmExLCAwLCAwLCAxMDAsIDEwMCwgeCAqIENFTExfV0lEVEgsIHkgKiBDRUxMX1dJRFRILCBDRUxMX1dJRFRILCBDRUxMX0hFSUdIVCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgdmlld0NvbnN0YW50cy5jdHguZHJhd0ltYWdlKGltYWdlcy5jaGFyYTIsIDEwMCwgMCwgLTEwMCwgMTAwLCB4ICogQ0VMTF9XSURUSCwgeSAqIENFTExfV0lEVEgsIENFTExfV0lEVEgsIENFTExfSEVJR0hUKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmbGlwRnJhbWVOdW1iZXIoKVxue1xuICBmcmFtZU51bSA9IChmcmFtZU51bSArIDEpICUgMlxufVxuXG4iLCJpbXBvcnQgY3JlYXRlTmV3R2FtZVN0YXRlIGZyb20gXCIuL2NyZWF0ZS1uZXctZ2FtZS1zdGF0ZVwiO1xuXG5jb25zdCB7Z2V0QXJ0aWNsZVByb3BlcnRpZXN9ID0gcmVxdWlyZShcIi4uL3dpa2ktYXBpL21pZGxldmVsbWFuYWdlci5tanNcIik7XG5pbXBvcnQgZ2VuZXJhdGVNYXplIGZyb20gJy4vbWF6ZS1nZW5lcmF0b3IuanMnO1xuY29uc3Qge3ZpZXdDb25zdGFudHN9ID0gcmVxdWlyZShcIi4vdmlldy1jb25zdGFudHNcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNldHVwUm9vbShnYW1lU3RhdGUpXG57XG4gIGNvbnN0IGFydGljbGVQcm9wZXJ0aWVzID0gYXdhaXQgZ2V0QXJ0aWNsZVByb3BlcnRpZXMoZ2FtZVN0YXRlLnRpdGxlKTtcbiAgY29uc3QgbWF6ZVByb3BlcnRpZXMgPSBnZW5lcmF0ZU1hemVQcm9wZXJ0aWVzKGdhbWVTdGF0ZSwgYXJ0aWNsZVByb3BlcnRpZXMpO1xuICBjb25zdCBtYXplID0gZ2VuZXJhdGVNYXplKG1hemVQcm9wZXJ0aWVzKTtcbiAgY29uc3QgcGxheWVySXNTdGlsbEVudGVyaW5nID0gdHJ1ZTtcblxuICBsZXQgeCwgeTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXplLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXplLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAobWF6ZVtpXVtqXS50eXBlID09PSBcImVudHJhbmNlXCIpIHtcbiAgICAgICAgeCA9IGk7XG4gICAgICAgIHkgPSBqO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh4KVxuICAgICAge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGF5ZXJHcmlkWCA9IHgsIHBsYXllckdyaWRZID0geTtcblxuICBjb25zdCBuZXdHYW1lU3RhdGUgPSBjcmVhdGVOZXdHYW1lU3RhdGUoZ2FtZVN0YXRlLFxuICAgIHtcbiAgICAgIG1hemUsXG4gICAgICBwbGF5ZXJJc1N0aWxsRW50ZXJpbmcsXG4gICAgICBwbGF5ZXJHcmlkWCxcbiAgICAgIHBsYXllckdyaWRZXG4gICAgfSk7XG5cbiAgdmlld0NvbnN0YW50cy5yb29tVGl0bGVQYXJlbnQuaW5uZXJUZXh0ID0gbmV3R2FtZVN0YXRlLnRpdGxlO1xuXG4gIHJldHVybiBuZXdHYW1lU3RhdGU7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTWF6ZVByb3BlcnRpZXMoZ2FtZVN0YXRlLCBhcnRpY2xlUHJvcGVydGllcylcbntcbiAgY29uc3Qgc2l6ZSA9IE1hdGgubWluKE1hdGgubWF4KGFydGljbGVQcm9wZXJ0aWVzLndvcmRDb3VudCAvIDQwMCwgMTApLCAxNSk7XG4gIGNvbnN0IG51bWJlck9mRXhpdHMgPSAgTWF0aC5taW4oTWF0aC5tYXgoYXJ0aWNsZVByb3BlcnRpZXMubGlua3MubGVuZ3RoIC8gMTAsIDEpLCAxMCk7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogZ2FtZVN0YXRlLnRpdGxlLFxuICAgIHNpemU6IHNpemUsXG4gICAgc2ltcGxpY2l0eTogMSAvIChNYXRoLmNlaWwoYXJ0aWNsZVByb3BlcnRpZXMubGlua3MubGVuZ3RoKSAvIDgwKSxcbiAgICBsaW5rczogZ3JhYlhSYW5kb21MaW5rcyhhcnRpY2xlUHJvcGVydGllcy5saW5rcywgbnVtYmVyT2ZFeGl0cyksXG4gICAgdHJlYXN1cmVzOiBbLi4uYXJ0aWNsZVByb3BlcnRpZXMuY2l0YXRpb25zTmVlZGVkLCAuLi5hcnRpY2xlUHJvcGVydGllcy5jbGFyaWZpY2F0aW9uc05lZWRlZF1cbiAgfVxufVxuXG5mdW5jdGlvbiBncmFiWFJhbmRvbUxpbmtzKGxpbmtzLCB4KVxue1xuICBjb25zdCBsaW5rc0NvcHkgPSBbLi4ubGlua3NdXG4gIGNvbnN0IHJhbmRvbUxpbmtzID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHg7IGkrKylcbiAge1xuICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobGlua3NDb3B5Lmxlbmd0aCAtIDEpKTtcbiAgICByYW5kb21MaW5rcy5wdXNoKGxpbmtzQ29weVtyYW5kXSk7XG4gICAgbGlua3NDb3B5LnNwbGljZShyYW5kLCAxKTtcbiAgfVxuXG4gIHJldHVybiByYW5kb21MaW5rcztcbn1cbiIsIi8vIHRvZG86IGNhY2hlP1xuZXhwb3J0IGNvbnN0IHZpZXdDb25zdGFudHMgPVxue1xuICBzY29yZVBhcmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlJyksXG4gIHJvb21UaXRsZVBhcmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb210aXRsZScpLFxuICBsaW5rSW5mb1BhcmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpbmtpbmZvJyksXG4gIGNhbnZhczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyksXG4gIG1vZGFsUGFyZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWxiZycpLFxuICB0cmVhc3VyZUxpc3RQYXJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0cmVhc3VyZS1saXN0JyksXG4gIGN0eDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxufTtcbiIsImltcG9ydCAqIGFzIFdpa2kgZnJvbSAnLi93aWtpaW50ZXJmYWNlLm1qcydcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFydGljbGVQcm9wZXJ0aWVzKGFydGljbGVOYW1lKSB7XG5cbiAgYXdhaXQgV2lraS5hZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKGFydGljbGVOYW1lKTtcbiAgcmV0dXJuIHtcbiAgICB3b3JkQ291bnQ6IFdpa2kuZ2V0V29yZENvdW50KCksXG4gICAgbGlua3M6IFdpa2kuZ2V0TGlua3MoKSxcbiAgICBjaXRhdGlvbnNOZWVkZWQ6IFdpa2kuZ2V0Q2l0YXRpb25zTmVlZGVkKCksXG4gICAgY2xhcmlmaWNhdGlvbnNOZWVkZWQ6IFdpa2kuZ2V0Q2xhcmlmaWNhdGlvbnNOZWVkZWQoKVxuICB9XG59XG4iLCJjb25zdCBjdXJyZW50X2FydGljbGUgPSB7XG4gIGxpIDpbXSxcbiAgY24gOltdLFxuICBjbCA6W10sXG4gIHJlZnMgOltdLFxuICB3YyA6IDAsXG4gIHRpdGxlIDogXCJOb25lXCJcbn1cblxuZnVuY3Rpb24gY2lzcGxpdChzLHQpe1xuICByZXR1cm4gcy5zcGxpdChuZXcgUmVnRXhwKFJlZ0V4cC5lc2NhcGUodCksXCJpZ1wiKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmRDb3VudCgpe3JldHVybiBjdXJyZW50X2FydGljbGUud2M7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua3MoKXtyZXR1cm4gY3VycmVudF9hcnRpY2xlLmxpO31cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENpdGF0aW9uc05lZWRlZCgpe3JldHVybiBjdXJyZW50X2FydGljbGUuY247fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhcmlmaWNhdGlvbnNOZWVkZWQoKSB7cmV0dXJuIGN1cnJlbnRfYXJ0aWNsZS5jbDt9XG5cblxuZnVuY3Rpb24gcmV2ZXJzZV90cnVuYyhzdHIpe1xuICBjb25zdCBic3RyPXN0clxuICBjb25zdCBkZWxpbT1ic3RyLnNsaWNlKC0xKVxuICBpZihkZWxpbVswXSA9PSBcIi5cIil7XG4gICAgcmV0dXJuIGJzdHIuc3BsaXQoL1s7Llxcbl0vKS5hdCgtMikrXCIuXCJcbiAgfWVsc2V7XG4gICAgcmV0dXJuIGJzdHIuc3BsaXQoL1s7Llxcbl0vKS5hdCgtMSkrXCIuXCJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRfY2l0YXRpb25fbmVlZGVkcyhhcnRpY2xlKXtcbiAgY29uc3Qgc3BsPWFydGljbGUuc3BsaXQoXCJ7e2NuXCIpXG5cbiAgY29uc3QgY2l0YXRpb25zID0gc3BsLm1hcChyZXZlcnNlX3RydW5jKS5zbGljZSgwLC0xKVxuICByZXR1cm4gY2l0YXRpb25zXG59XG5cbmZ1bmN0aW9uIGdldF9jbGFyaWZpY2F0aW9uX25lZWRlZHMoYXJ0aWNsZSl7XG4gIGNvbnN0IHNwbD1hcnRpY2xlLnNwbGl0KFwie3tjbGFyaWZ5XCIpXG5cbi8vICAgIGNvbnNvbGUubG9nKHNwbFswXSlcbiAgY29uc3QgY2l0YXRpb25zID0gc3BsLm1hcChyZXZlcnNlX3RydW5jKS5zbGljZSgwLC0xKVxuICByZXR1cm4gY2l0YXRpb25zXG59XG5cbmZ1bmN0aW9uIHVuYnJhY2tldChsKXtcbiAgcmV0dXJuIGwuc3BsaXQoXCJdXVwiKVswXTtcblxufVxuXG5mdW5jdGlvbiBnZXRfb3V0Z29pbmdfbGlua3MoYXJ0aWNsZSl7XG4gIGNvbnN0IHNwbD1hcnRpY2xlLnNwbGl0KFwiW1tcIikuc2xpY2UoMSlcbiAgY29uc3QgbGk9c3BsLm1hcCh1bmJyYWNrZXQpLmZpbHRlcihsaW5rID0+IChsaW5rLnNlYXJjaCgvW15hLXpBLVogXS8pID09IC0xKSlcbiAgcmV0dXJuIGxpXG59XG5cbmZ1bmN0aW9uIGNvdW50V29yZHMoc3RyKSB7XG4gIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KC9cXHMrLykubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBnZXRfd29yZGNvdW50KGFydGljbGUpe1xuICByZXR1cm4gY291bnRXb3JkcyhhcnRpY2xlKVxufVxuXG5mdW5jdGlvbiBnZXRfY2l0ZV90aXRsZShzdHIpe1xuICB0cnkge1xuICAgIGNvbnN0IGE9c3RyLnNwbGl0KG5ldyBSZWdFeHAoUmVnRXhwLmVzY2FwZShcInRpdGxlXCIpLFwiaWdcIikpWzFdLnNwbGl0KFwiPVwiKVsxXVxuICAgIGNvbnN0IGI9YS5zcGxpdChcInxcIilbMF1cbiAgICByZXR1cm4gYjtcbiAgfWNhdGNoe1xuICAgIHJldHVybiBcIkRlYWQgQmVlZlwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldF9yZWZlcmVuY2VzKGFydGljbGUpe1xuICBjb25zdCBzcGw9YXJ0aWNsZS5zcGxpdChuZXcgUmVnRXhwKFJlZ0V4cC5lc2NhcGUoXCJ7e2NpdGVcIiksXCJpZ1wiKSkuc2xpY2UoMSlcbiAgY29uc3QgYWJsPWNpc3BsaXQoYXJ0aWNsZSxcInt7Y2l0ZVwiKVxuICByZXR1cm4gc3BsLm1hcChnZXRfY2l0ZV90aXRsZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKHRpdGxlKSB7XG4gIGNvbnN0IGI9IGF3YWl0IGZldGNoKGBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvdy9yZXN0LnBocC92MS9wYWdlL2ArdGl0bGUpXG4gIGNvbnN0IGJkYXRhPSBhd2FpdCBiLmpzb24oKTtcbiAgY3VycmVudF9hcnRpY2xlLmNuPWdldF9jaXRhdGlvbl9uZWVkZWRzKGJkYXRhLnNvdXJjZSlcbiAgY3VycmVudF9hcnRpY2xlLmNsPWdldF9jbGFyaWZpY2F0aW9uX25lZWRlZHMoYmRhdGEuc291cmNlKVxuICBjdXJyZW50X2FydGljbGUubGk9Z2V0X291dGdvaW5nX2xpbmtzKGJkYXRhLnNvdXJjZSlcbiAgY3VycmVudF9hcnRpY2xlLndjPWdldF93b3JkY291bnQoYmRhdGEuc291cmNlKVxuICBjdXJyZW50X2FydGljbGUudGl0bGU9dGl0bGVcbiAgY3VycmVudF9hcnRpY2xlLnJlZnM9Z2V0X3JlZmVyZW5jZXMoYmRhdGEuc291cmNlKVxuICBjb25zb2xlLmxvZyhjdXJyZW50X2FydGljbGUudGl0bGUpO1xuICByZXR1cm4gXCJoaVwiXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFhZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKHRpdGxlKSB7XG4gIGNvbnN0IGE9ICBhZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKHRpdGxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoV2lraXBlZGlhQXJ0aWNsZSh0aXRsZSkge1xuICBhYWZldGNoV2lraXBlZGlhQXJ0aWNsZSh0aXRsZSk7XG4gIGNvbnNvbGUubG9nKHRpdGxlKTtcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLnRpdGxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGR1bXBXaWtpQXJ0aWNsZSgpIHtcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLnRpdGxlKVxuICBjb25zb2xlLmxvZyhcIiBjbjpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLmNuKVxuICBjb25zb2xlLmxvZyhcIiBjbDpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLmNsKVxuICBjb25zb2xlLmxvZyhcIiBsaTpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLmxpKVxuICBjb25zb2xlLmxvZyhcIiB3YzpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLndjKVxuICBjb25zb2xlLmxvZyhcIiByZWZzOlwiKVxuICBjb25zb2xlLmxvZyhjdXJyZW50X2FydGljbGUucmVmcylcblxufVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRXaWtpQXJ0aWNsZShuYW1lKSB7XG4gIGNvbnN0IGY9IGZldGNoV2lraXBlZGlhQXJ0aWNsZShuYW1lKVxufVxuXG5cbi8vY29uc29sZS5sb2coJ2FzZGYnKTtcbi8vYXdhaXQgYWZldGNoV2lraXBlZGlhQXJ0aWNsZShcIkJhc3Nvb25cIik7XG4vL2R1bXBXaWtpQXJ0aWNsZSgpXG4vL2NvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS5saW5rcylcblxuLy9tb2R1bGUuZXhwb3J0cyA9IHsgbG9hZFdpa2lBcnRpY2xlLGR1bXBXaWtpQXJ0aWNsZSB9O1xuXG5cbi8vIFRPIFJVTiBJTiBURVJNSU5BTCwgVFlQRVxuLy8gbm9kZSBGSUxFUEFUSFxuXG5cbiIsImNvbnN0IEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vc3JjL2dlbmVyYXRvcnMvZ2VuZXJhdG9yLmpzJyk7XG5jb25zdCBNYXplR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9zcmMvZ2VuZXJhdG9ycy9tYXplLmpzJyk7XG5jb25zdCBSb29tR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9zcmMvZ2VuZXJhdG9ycy9yb29tLmpzJyk7XG5jb25zdCBTdGFpckdlbmVyYXRvciA9IHJlcXVpcmUoJy4vc3JjL2dlbmVyYXRvcnMvc3RhaXJzLmpzJyk7XG5jb25zdCBSZW5kZXJlciA9IHJlcXVpcmUoJy4vc3JjL3JlbmRlcmVyLmpzJyk7XG5jb25zdCBDZWxsID0gcmVxdWlyZSgnLi9zcmMvY2VsbC5qcycpO1xuY29uc3QgR3JpZCA9IHJlcXVpcmUoJy4vc3JjL2dyaWQuanMnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi9zcmMvdXRpbHMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdG9yczoge1xuICAgICAgICBnZW5lcmF0b3I6IEdlbmVyYXRvcixcbiAgICAgICAgbWF6ZTogTWF6ZUdlbmVyYXRvcixcbiAgICAgICAgcm9vbTogUm9vbUdlbmVyYXRvcixcbiAgICAgICAgc3RhaXJzOiBTdGFpckdlbmVyYXRvclxuICAgIH0sXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgIGNlbGw6IENlbGwsXG4gICAgZ3JpZDogR3JpZCxcbiAgICB1dGlsczogVXRpbHNcbn0iLCJjbGFzcyBDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6LCB2aXNpdGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy56ID0gejtcbiAgICAgICAgdGhpcy5ibG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZCB8fCBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2VsbDsiLCJjbGFzcyBHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGdlbmVyYXRvcnMpIHtcbiAgICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9ycyA9IGdlbmVyYXRvcnMubWFwKFxuICAgICAgICAgICAgZ2VuZXJhdG9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBnZW4gPSBuZXcgZ2VuZXJhdG9yLmdlbmVyYXRvcih0aGlzLmRhdGEsIGdlbmVyYXRvci5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBnZW4uZGF0YTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdlbmVyYXRlID0gKCkgPT4gdGhpcy5nZW5lcmF0b3JzLmZvckVhY2goXG4gICAgICAgIGdlbmVyYXRvciA9PiBnZW5lcmF0b3IuZ2VuZXJhdGUoKVxuICAgICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdG9yO1xuIiwiY29uc3QgR3JpZCA9IHJlcXVpcmUoJy4uL2dyaWQuanMnKTtcbmNvbnN0IHtSYW5kb219ID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuXG5jbGFzcyBNYXplR2VuZXJhdG9yIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgTWF6ZUdlbmVyYXRvclxuICAgICAqIEBjbGFzc2Rlc2MgVGhlIG1hemUgZ2VuZXJhdG9yIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBnZW5lcmF0aW5nIGEgZ3JpZCBvZiBDZWxsIG9iamVjdHMgYW5kIHN0b3JpbmcgdGhlbS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCB0byB1c2UuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIGdyaWQuXG4gICAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5mbG9vcnMgLSBUaGUgdG90YWwgbnVtYmVyIG9mIGZsb29ycyBpbiB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF94IC0gVGhlIHggcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc3RhcnRfeSAtIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBjZWxsLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnN0YXJ0X3ogLSBUaGUgeiBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgY2VsbC5cbiAgICAgKiBAcGFyYW0ge0NlbGx9IG9wdGlvbnMuZ3JpZF9jbGFzcyAtIFRoZSBjbGFzcyB1c2VkIHRvIGdlbmVyYXRlIGEgZ3JpZCwgY29udGFpbnMgY2VsbCBkYXRhLlxuICAgICAqIEBwYXJhbSB7Q2VsbH0gb3B0aW9ucy5jZWxsX2NsYXNzIC0gVGhlIGNsYXNzIHVzZWQgdG8gcmVwcmVzZW50IGEgY2VsbCBvbiB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm5laWdoYm9yX3Bvc2l0aW9ucyAtIFRoZSBhcnJheSBvZiBuZWlnaGJvciBwb3NpdGlvbnMgdG8gdXNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YXx8e307XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubmVpZ2hib3JfcG9zaXRpb25zID0gb3B0aW9ucy5uZWlnaGJvcl9wb3NpdGlvbnMgfHwgW1swLCAtMl0sIFswLCAyXSwgWy0yLCAwXSwgWzIsIDBdXTtcbiAgICAgICAgdGhpcy5zdGFydF9jZWxsX2Nvb3JkID0geyB4OiAxLCB5OiAxIH07XG4gICAgICAgIGNvbnN0IEdyaWRDbGFzcyA9IG9wdGlvbnMuZ3JpZF9jbGFzcyB8fCBHcmlkO1xuICAgICAgICB0aGlzLmRhdGEuZ3JpZCA9IG5ldyBHcmlkQ2xhc3Moe1xuICAgICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0LFxuICAgICAgICAgICAgdG90YWxfZmxvb3JzOiBvcHRpb25zLmZsb29ycyxcbiAgICAgICAgICAgIGNlbGxfY2xhc3M6IG9wdGlvbnMuY2VsbF9jbGFzcyxcbiAgICAgICAgICAgIHN0YXJ0X3g6IG9wdGlvbnMuc3RhcnRfeCxcbiAgICAgICAgICAgIHN0YXJ0X3k6IG9wdGlvbnMuc3RhcnRfeSxcbiAgICAgICAgICAgIHN0YXJ0X3o6IG9wdGlvbnMuc3RhcnRfeixcbiAgICAgICAgICAgIGZsb29yczogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gZ2V0TmVpZ2hib3JDZWxsc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZWxsXG4gICAgICogQHJldHVybnMgeypbQ2VsbF19XG4gICAgICovXG4gICAgZ2V0TmVpZ2hib3JDZWxscyA9IChjZWxsKSA9PiB7XG4gICAgICAgIGxldCBuZWlnaGJvcl9jZWxscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IG54ID0gY2VsbC54ICsgdGhpcy5uZWlnaGJvcl9wb3NpdGlvbnNbaV1bMF07XG4gICAgICAgICAgICBsZXQgbnkgPSBjZWxsLnkgKyB0aGlzLm5laWdoYm9yX3Bvc2l0aW9uc1tpXVsxXTtcbiAgICAgICAgICAgIGxldCBuZWlnaGJvcl9jZWxsID0gdGhpcy5kYXRhLmdyaWQuZ2V0TmVpZ2hib3JDZWxsKG54LCBueSwgY2VsbC56KTtcbiAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxsICYmICFuZWlnaGJvcl9jZWxsLnZpc2l0ZWQgJiYgbmVpZ2hib3JfY2VsbC5ibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgbmVpZ2hib3JfY2VsbHMucHVzaChuZWlnaGJvcl9jZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmVpZ2hib3JfY2VsbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGdlbmVyYXRlXG4gICAgICogQGRlc2NyaXB0aW9uIEdlbmVyYXRlIGEgbWF6ZSB1c2luZyB0aGUgZ3Jvd2luZyB0cmVlIGFsZ29yaXRobS5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBnZW5lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCB0aGlzLmRhdGEuZ3JpZC50b3RhbF9mbG9vcnM7IHorKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMuc3RhcnRfY2VsbF9jb29yZC54O1xuICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMuc3RhcnRfY2VsbF9jb29yZC55O1xuICAgICAgICAgICAgbGV0IGdldF9jZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBwcmV2X2NlbGxzID0gW107XG4gICAgICAgICAgICBsZXQgY3VycmVudF9jZWxsID0gdGhpcy5kYXRhLmdyaWQuZ2V0Q2VsbCh4LCB5LCB6KTtcblxuICAgICAgICAgICAgd2hpbGUgKGdldF9jZWxsKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudF9jZWxsLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvcl9jZWxscyA9IHRoaXMuZ2V0TmVpZ2hib3JDZWxscyhjdXJyZW50X2NlbGwpO1xuICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvcl9jZWxsID0gbmVpZ2hib3JfY2VsbHNbUmFuZG9tLnJhbmdlKDAsIG5laWdoYm9yX2NlbGxzLmxlbmd0aCldO1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZXhpdHNcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5feCA9IGN1cnJlbnRfY2VsbC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgbl95ID0gY3VycmVudF9jZWxsLnk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxsLnggPiBjdXJyZW50X2NlbGwueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbl94ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmVpZ2hib3JfY2VsbC54IDwgY3VycmVudF9jZWxsLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5feCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxsLnkgPiBjdXJyZW50X2NlbGwueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbl95ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmVpZ2hib3JfY2VsbC55IDwgY3VycmVudF9jZWxsLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5feSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdfY2VsbCA9IHRoaXMuZGF0YS5ncmlkLmdldENlbGwobl94LCBuX3ksIHopO1xuICAgICAgICAgICAgICAgICAgICBuZXdfY2VsbC5ibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfY2VsbC5ibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHByZXZfY2VsbHMucHVzaChjdXJyZW50X2NlbGwpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50X2NlbGwgPSBuZWlnaGJvcl9jZWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZfY2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9jZWxsID0gcHJldl9jZWxscy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldF9jZWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWF6ZUdlbmVyYXRvcjtcbiIsImNvbnN0IHtSYW5kb219ID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcblxuY2xhc3MgUm9vbUdlbmVyYXRvciB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIFJvb21HZW5lcmF0b3JcbiAgICAgKiBAY2xhc3NkZXNjIEdlbmVyYXRlcyByb29tcyBmb3IgYSBjZWxscyBpbiBhIGdyaWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHRvIHVzZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5taW5Sb29tcyAtIFRoZSBtaW5pbXVtIG51bWJlciBvZiByb29tcyB0byBnZW5lcmF0ZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhSb29tcyAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb29tcyB0byBnZW5lcmF0ZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5taW5Sb29tV2lkdGggLSBUaGUgbWluaW11bSB3aWR0aCBvZiBhIHJvb20uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWluUm9vbUhlaWdodCAtIFRoZSBtaW5pbXVtIGhlaWdodCBvZiBhIHJvb20uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4Um9vbVdpZHRoIC0gVGhlIG1heGltdW0gd2lkdGggb2YgYSByb29tLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heFJvb21IZWlnaHQgLSBUaGUgbWF4aW11bSBoZWlnaHQgb2YgYSByb29tLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnRvdGFsUm9vbXMgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHJvb21zIHRvIGdlbmVyYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhfHx7fTtcbiAgICAgICAgdGhpcy5kYXRhLnJvb21zID0gW107XG4gICAgICAgIGNvbnN0IG1pblJvb21zID0gcGFyc2VJbnQob3B0aW9ucy5taW5Sb29tcykgfHwgMTtcbiAgICAgICAgY29uc3QgIG1heFJvb21zID0gcGFyc2VJbnQob3B0aW9ucy5tYXhSb29tcykgfHwgODtcbiAgICAgICAgdGhpcy5taW5Sb29tV2lkdGggPSBwYXJzZUludChvcHRpb25zLm1pblJvb21XaWR0aCkgfHwgMTtcbiAgICAgICAgdGhpcy5taW5Sb29tSGVpZ2h0ID0gcGFyc2VJbnQob3B0aW9ucy5taW5Sb29tSGVpZ2h0KSB8fCAxO1xuICAgICAgICB0aGlzLm1heFJvb21XaWR0aCA9IHBhcnNlSW50KG9wdGlvbnMubWF4Um9vbVdpZHRoKSB8fCA4O1xuICAgICAgICB0aGlzLm1heFJvb21IZWlnaHQgPSBwYXJzZUludChvcHRpb25zLm1heFJvb21IZWlnaHQpIHx8IDg7XG4gICAgICAgIHRoaXMudG90YWxSb29tcyA9IHRoaXMub3B0aW9ucy50b3RhbFJvb21zIHx8IFJhbmRvbS5yYW5nZShtaW5Sb29tcywgbWF4Um9vbXMpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgdGhpcy5kYXRhLmdyaWQudG90YWxfZmxvb3JzOyB6KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbFJvb21zOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcm9vbVdpZHRoID0gUmFuZG9tLnJhbmdlKHRoaXMubWluUm9vbVdpZHRoLCB0aGlzLm1heFJvb21XaWR0aCk7XG4gICAgICAgICAgICAgICAgbGV0IHJvb21IZWlnaHQgPSBSYW5kb20ucmFuZ2UodGhpcy5taW5Sb29tSGVpZ2h0LCB0aGlzLm1heFJvb21IZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCByb29tID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBSYW5kb20ucmFuZ2UoMCwgdGhpcy5kYXRhLmdyaWQud2lkdGggLSByb29tV2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICB5OiBSYW5kb20ucmFuZ2UoMCwgdGhpcy5kYXRhLmdyaWQuaGVpZ2h0IC0gcm9vbUhlaWdodCksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiByb29tV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcm9vbUhlaWdodFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IHJvb20ueTsgeSA8IHJvb20ueSArIHJvb20uaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHJvb20ueDsgeCA8IHJvb20ueCArIHJvb20ud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5ncmlkLmlzSW5OYXZpZ2F0aW9uQm91bmRzKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmdyaWQudW5ibG9ja0NlbGwoeCwgeSwgeik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnJvb21zLnB1c2gocm9vbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vbUdlbmVyYXRvcjtcbiIsIi8qKlxuICogQGNsYXNzIFN0YWlyc0dlbmVyYXRvclxuICogQGNsYXNzZGVzYyBHZW5lcmF0ZXMgc3RhaXJzIGZvciBhIGNlbGxzIGluIGEgZ3JpZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IHRvIHVzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHRvIHVzZS5cbiAqL1xuY2xhc3MgU3RhaXJzR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGF8fHt9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zfHx7YXNjZW5kaW5nOiBmYWxzZX07XG4gICAgICAgIHRoaXMubWF4X3N0YWlycyA9IG9wdGlvbnMubWF4X3N0YWlycyB8fCAxO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0b3RhbF9zdGFpcnNfYnlfZmxvb3IgPSB7fTtcbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGVhY2ggZmxvb3IgaW4gdGhlIGdyaWRcbiAgICAgICAgZm9yIChsZXQgZmxvb3IgPSAwOyBmbG9vciA8IHRoaXMuZGF0YS5ncmlkLnRvdGFsX2Zsb29ycyAtIDE7IGZsb29yKyspIHtcbiAgICAgICAgICAgIC8vIFJlcGVhdCBsb29wIHVudGlsIHdlIGZpbmQgYSBjZWxsIHRoYXQgc2F0aXNmaWVzIHRoZSBjb25kaXRpb25zXG4gICAgICAgICAgICBsZXQgY2VsbCA9IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodG90YWxfc3RhaXJzX2J5X2Zsb29yW2Zsb29yXSAmJiB0b3RhbF9zdGFpcnNfYnlfZmxvb3JbZmxvb3JdID49IHRoaXMubWF4X3N0YWlycykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzX2Zsb29yX2NlbGwgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0X2Zsb29yX2NlbGwgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGEgcmFuZG9tIGNlbGwgZnJvbSB0aGUgY3VycmVudCBmbG9vclxuICAgICAgICAgICAgICAgIGNlbGwgPSB0aGlzLmRhdGEuZ3JpZC5yYW5kb21DZWxsKGZsb29yKTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5ibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcHJldmlvdXMgZmxvb3IgY2VsbFxuICAgICAgICAgICAgICAgIGlmIChmbG9vciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfZmxvb3JfY2VsbCA9IHRoaXMuZGF0YS5ncmlkLmNlbGxzW2Zsb29yIC0gMV1bY2VsbC55XVtjZWxsLnhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNfZmxvb3JfY2VsbC5ibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c19mbG9vcl9jZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgbmV4dCBmbG9vciBjZWxsXG4gICAgICAgICAgICAgICAgbmV4dF9mbG9vcl9jZWxsID0gdGhpcy5kYXRhLmdyaWQuY2VsbHNbZmxvb3IgKyAxXVtjZWxsLnldW2NlbGwueF07XG4gICAgICAgICAgICAgICAgaWYgKG5leHRfZmxvb3JfY2VsbCA9PT0gbnVsbCB8fCBuZXh0X2Zsb29yX2NlbGwuYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgc3RhaXJzXG4gICAgICAgICAgICAgICAgY2VsbC5zdGFpcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRfZmxvb3I6IG5leHRfZmxvb3JfY2VsbCxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLm9wdGlvbnMuYXNjZW5kaW5nID8gJ3VwJyA6ICdkb3duJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKG5leHRfZmxvb3JfY2VsbCkgbmV4dF9mbG9vcl9jZWxsLnN0YWlycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfZmxvb3I6IGNlbGwsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5vcHRpb25zLmFzY2VuZGluZyA/ICdkb3duJyA6ICd1cCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRvdGFsX3N0YWlyc19ieV9mbG9vcltmbG9vcl0gPSAodG90YWxfc3RhaXJzX2J5X2Zsb29yW2Zsb29yXSB8fCAwKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhaXJzR2VuZXJhdG9yO1xuIiwiY29uc3QgQ2VsbCA9IHJlcXVpcmUoXCIuL2NlbGxcIik7XG5jb25zdCB7UmFuZG9tfSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuY29uc3QgTUlOX1dJRFRIID0gNTtcbmNvbnN0IE1JTl9IRUlHSFQgPSA1O1xuY29uc3QgTUlOX0JPVU5EQVJZID0gLTE7XG5jb25zdCBNSU5fTkVJR0hCT1JfQk9VTkRBUlkgPSAwO1xuY29uc3QgTUlOX0ZMT09SUyA9IDE7XG5cbi8qKlxuICogQGNsYXNzIEdyaWRcbiAqIEBkZXNjcmlwdGlvbiBUaGUgZ3JpZCBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgZ2VuZXJhdGluZywgc3RvcmluZyBhbmQgbWFuaXB1bGF0aW5nIGEgZ3JpZCBvZiBDZWxsIG9iamVjdCBpbnN0YW5jZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBncmlkLlxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gVGhlIGhlaWdodCBvZiB0aGUgZ3JpZC5cbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuZmxvb3JzIC0gVGhlIHRvdGFsIG51bWJlciBvZiBmbG9vcnMgaW4gdGhlIGdyaWQuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF94IC0gVGhlIHggcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF95IC0gVGhlIHkgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF96IC0gVGhlIHogcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gKiBAcGFyYW0ge0NlbGx9IG9wdGlvbnMuY2VsbF9jbGFzcyAtIFRoZSBjbGFzcyB1c2VkIHRvIHJlcHJlc2VudCBhIGNlbGwgb24gdGhlIGdyaWQuXG4gKi9cbmNsYXNzIEdyaWQge1xuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBjb25zdHJ1Y3RvclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZW5lcmF0ZSBhIEdyaWQgb2JqZWN0IG9mIGdpdmVuIGRpbWVuc2lvbnMgZmlsbGVkIHdpdGggQ2VsbCBvYmplY3RzIGFuZCBmbG9vciBkYXRhLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyAgT3B0aW9uYWwgYXJndW1lbnRzIGZvciB0aGUgR3JpZCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAvLyBJbml0aWFsaXplIGFsbCBwcm9wZXJ0aWVzLCBhbmQgdGhlbiB0aGUgZ3JpZC5cbiAgICAgICAgdGhpcy53aWR0aCA9IHBhcnNlSW50KG9wdGlvbnMud2lkdGgpIHx8IE1JTl9XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUludChvcHRpb25zLmhlaWdodCkgfHwgTUlOX0hFSUdIVDtcbiAgICAgICAgdGhpcy50b3RhbF9mbG9vcnMgPSBwYXJzZUludChvcHRpb25zLnRvdGFsX2Zsb29ycykgfHwgTUlOX0ZMT09SUztcbiAgICAgICAgdGhpcy5zdGFydF94ID0gcGFyc2VJbnQob3B0aW9ucy5zdGFydF94KSB8fCAwO1xuICAgICAgICB0aGlzLnN0YXJ0X3kgPSBwYXJzZUludChvcHRpb25zLnN0YXJ0X3kpIHx8IDA7XG4gICAgICAgIHRoaXMuc3RhcnRfeiA9IHBhcnNlSW50KG9wdGlvbnMuc3RhcnRfeikgfHwgMDtcbiAgICAgICAgdGhpcy5DZWxsQ2xhc3MgPSBvcHRpb25zLmNlbGxfY2xhc3N8fENlbGw7XG4gICAgICAgIHRoaXMuY3VycmVudEZsb29yID0gb3B0aW9ucy5jdXJyZW50Rmxvb3J8fDA7XG4gICAgICAgIGlmICh0aGlzLndpZHRoIDw9IE1JTl9XSURUSCkgdGhpcy53aWR0aCA9IE1JTl9XSURUSDtcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0IDw9IE1JTl9IRUlHSFQpIHRoaXMuaGVpZ2h0ID0gTUlOX0hFSUdIVDtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRfeCA+IHRoaXMud2lkdGggLSAxKSB0aGlzLnN0YXJ0X3ggPSB0aGlzLnN0YXJ0X3ggLSAxO1xuICAgICAgICBpZiAodGhpcy5zdGFydF95ID4gdGhpcy5oZWlnaHQgLSAxKSB0aGlzLnN0YXJ0X3kgPSB0aGlzLnN0YXJ0X3kgLSAxO1xuICAgICAgICBpZiAodGhpcy5zdGFydF96ID49IHRoaXMudG90YWxfZmxvb3JzKSB0aGlzLnN0YXJ0X3ogPSB0aGlzLnRvdGFsX2Zsb29ycyAtIDE7XG4gICAgICAgIHRoaXMuZmxvb3JzID0gW107XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBpbml0aWFsaXplXG4gICAgICogQGRlc2NyaXB0aW9uIEl0ZXJhdGVzIHRocm91Z2ggZWFjaCBjb29yZGluYXRlIGFuZCBjcmVhdGVzIGEgY2VsbCBhdCB0aGF0IGxvY2F0aW9uLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCB6ID0gdGhpcy5zdGFydF96OyB6IDwgdGhpcy50b3RhbF9mbG9vcnM7IHorKykge1xuICAgICAgICAgICAgdGhpcy5mbG9vcnNbel0gPSB7fTsgIC8vIHNldCBmbG9vciBkYXRhIHRvIGFuIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgdGhpcy5jZWxsc1t6XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRoaXMuc3RhcnRfeTsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHRoaXMuc3RhcnRfeDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdID0gbmV3IHRoaXMuQ2VsbENsYXNzKHgsIHksIHopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiByYW5kb21DZWxsXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgYSByYW5kb20gY2VsbCBmcm9tIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geiAgICAgIFRoZSBmbG9vciB0byBnZXQgYSBjZWxsIGZyb21cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICBDZWxsIG9iamVjdFxuICAgICAqL1xuICAgIHJhbmRvbUNlbGwgPSAoeikgPT4ge1xuICAgICAgICBjb25zdCB4ID0gUmFuZG9tLnJhbmdlKE1JTl9ORUlHSEJPUl9CT1VOREFSWSwgdGhpcy53aWR0aCAtIDIpO1xuICAgICAgICBjb25zdCB5ID0gUmFuZG9tLnJhbmdlKE1JTl9ORUlHSEJPUl9CT1VOREFSWSwgdGhpcy5oZWlnaHQgLSAyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbCh4LCB5LCB6KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gaXNJbkJvdW5kc1xuICAgICAqIEBkZXNjcmlwdGlvbiBDaGVja3MgaWYgZ2l2ZW4gY29vcmRpbmF0ZXMgYXJlIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgICB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHkgICAgeS1jb29yZGluYXRlIG9mIHRoZSBjZWxsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgIHRydWUgaWYgaW4gYm91bmRzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc0luQm91bmRzID0gKHgsIHkpID0+IChcbiAgICAgICAgeCA8IHRoaXMud2lkdGhcbiAgICAgICAgJiYgeCA+IE1JTl9CT1VOREFSWVxuICAgICAgICAmJiB5IDwgdGhpcy5oZWlnaHRcbiAgICAgICAgJiYgeSA+IE1JTl9CT1VOREFSWVxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gaXNJbk5hdmlnYXRpb25Cb3VuZHNcbiAgICAgKiBAZGVzY3JpcHRpb24gQ2hlY2tzIGlmIGdpdmVuIGNvb3JkaW5hdGVzIGFyZSB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgZ3JpZCB1c2VkIGZvciBuYXZpZ2F0aW9uLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgICB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHkgICAgeS1jb29yZGluYXRlIG9mIHRoZSBjZWxsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgIHRydWUgaWYgaW4gYm91bmRzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc0luTmF2aWdhdGlvbkJvdW5kcyA9ICh4LCB5KSA9PiAoXG4gICAgICAgIHggPCB0aGlzLndpZHRoIC0gMVxuICAgICAgICAmJiB4ID4gTUlOX05FSUdIQk9SX0JPVU5EQVJZXG4gICAgICAgICYmIHkgPCB0aGlzLmhlaWdodCAtIDFcbiAgICAgICAgJiYgeSA+IE1JTl9ORUlHSEJPUl9CT1VOREFSWVxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gZ2V0Q2VsbFxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXRzIGEgY2VsbCBmcm9tIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geSAgIHktY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geiAgIHRoZSBmbG9vciBvZiB0aGUgY2VsbFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgIENlbGwgb2JqZWN0IGlmIGluIGJvdW5kcywgbnVsbCBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBnZXRDZWxsID0gKHgsIHksIHopID0+IHRoaXMuaXNJbkJvdW5kcyh4LCB5KSA/IHRoaXMuY2VsbHNbel1beV1beF0gOiBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGdldE5laWdoYm9yQ2VsbFxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXRzIGEgY2VsbCBmcm9tIHRoZSBncmlkLiBGdW5jdGlvbnMgdGhlIHNhbWUgYXMgZ2V0Q2VsbCwgYnV0IGNoZWNrcyBhZ2FpbnN0IG5hdmlnYXRpb24gYm91bmRzLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geSAgIHktY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geiAgIHRoZSBmbG9vciBvZiB0aGUgY2VsbFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgIENlbGwgb2JqZWN0IGlmIGluIGJvdW5kcywgbnVsbCBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBnZXROZWlnaGJvckNlbGwgPSAoeCwgeSwgeikgPT4gdGhpcy5pc0luTmF2aWdhdGlvbkJvdW5kcyh4LCB5KSA/IHRoaXMuY2VsbHNbel1beV1beF0gOiBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIHVuYmxvY2tDZWxsXG4gICAgICogQGRlc2NyaXB0aW9uIFVuYmxvY2tzIGEgY2VsbCBpZiBpdCBpcyBpbiBib3VuZHMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHggIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5ICB5LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geiAgdGhlIGZsb29yIG9mIHRoZSBjZWxsXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB1bmJsb2NrQ2VsbCA9ICh4LCB5LCB6KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5Cb3VuZHMoeCwgeSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbel1beV1beF0uYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWQ7IiwiY2xhc3MgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKGdlbmVyYXRvcikge1xuICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGdlbmVyYXRvci5kYXRhLmdyaWQudG90YWxfZmxvb3JzOyB6KyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGbG9vciAke3p9YCk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGdlbmVyYXRvci5kYXRhLmdyaWQuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBnZW5lcmF0b3IuZGF0YS5ncmlkLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBnZW5lcmF0b3IuZGF0YS5ncmlkLmNlbGxzW3pdW3ldW3hdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZiA9IGNlbGwuYmxvY2tlZCA/ICdcXHUyNTg4JyA6ICdcXHUyNTkxJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5zdGFpcnMuZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZiA9ICdcXHUyNUIyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYgPSAnXFx1MjVCQyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcm93ICs9IGY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyZXI7IiwiLyoqXG4gKiBAY2xhc3MgUmFuZG9tXG4gKiBAZGVzY3JpcHRpb24gQSBzdGF0aWMgY2xhc3MgZm9yIGdlbmVyYXRpbmcgcmFuZG9tIG51bWJlcnMuXG4gKi9cbmNsYXNzIFJhbmRvbSB7XG4gICAgX3NlZWQgPSBudWxsO1xuICAgIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuXG4gICAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKFJhbmRvbS5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIFJhbmRvbS5faW5zdGFuY2UgPSBuZXcgUmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJhbmRvbS5faW5zdGFuY2U7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICB0aGlzLl9zZWVkID0gc2VlZCB8fCBNYXRoLnJhbmRvbSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBSYW5kb20uc2VlZFxuICAgICAqIFNldHMgdGhlIHNlZWQgZm9yIHRoZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzZWVkXG4gICAgICogQHJldHVybnMgeyp8bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBzZWVkID0gKHNlZWQpID0+IHtcbiAgICAgICAgUmFuZG9tLmluc3RhbmNlLl9zZWVkID0gc2VlZDtcbiAgICAgICAgcmV0dXJuIFJhbmRvbS5pbnN0YW5jZS5fc2VlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gUmFuZG9tLm5leHRcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIG51bWJlclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIG5leHQoKSB7XG4gICAgICAgIGxldCB4ID0gTWF0aC5zaW4oUmFuZG9tLmluc3RhbmNlLl9zZWVkKSAqIDEwMDAwO1xuICAgICAgICBSYW5kb20uaW5zdGFuY2UuX3NlZWQgPSB4IC0gTWF0aC5mbG9vcih4KTtcbiAgICAgICAgcmV0dXJuIHggLSBNYXRoLmZsb29yKHgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBSYW5kb20ucmFuZ2VcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyByYW5nZSA9IChtaW4sIG1heCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihSYW5kb20ubmV4dCgpICogKG1heCAtIG1pbikpICsgbWluO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUmFuZG9tOiBSYW5kb21cbn07XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1haW4gZnJvbSAnLi9nYW1lL2luZGV4LmpzJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==