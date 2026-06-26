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
  return gameState.maze[Math.floor(Math.max(gameState.playerGridX + 0.5, 0))][Math.floor(Math.max(gameState.playerGridY + 0.5, 0))].type === 'entrance';
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
  const cell = gameState.maze[Math.floor(Math.max(gameState.playerGridX + 0.5, 0))][Math.floor(Math.max(gameState.playerGridY + 0.5, 0))];
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

    //todo: maze state is supposed to be immutable
    gameState.maze[Math.floor(gameState.playerGridX + 0.5)][Math.floor(gameState.playerGridY + 0.5)].type = "space";

    return treasureUpdates;
  }
}

function isPlayerOnTreasure(gameState)
{
  return (
    gameState.maze[Math.floor(Math.max(gameState.playerGridX + 0.5, 0))][Math.floor(Math.max(gameState.playerGridY + 0.5, 0))].type === 'treasure'
      ? gameState.maze[Math.floor(Math.max(gameState.playerGridX + 0.5, 0))][Math.floor(Math.max(gameState.playerGridY + 0.5, 0))].name
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











let running = true;
let animationFrame;
let lastTime = Date.now();
let elapsedTime = 0;

document.querySelector("#restart-button").addEventListener("click", () => {
  _view_constants__WEBPACK_IMPORTED_MODULE_9__.viewConstants.modalParent.classList.add("hidden");
  restart();
})

restart();

async function restart()
{
  cancelAnimationFrame(animationFrame);
  const randomTitle = await (0,_helpers_wiki__WEBPACK_IMPORTED_MODULE_8__["default"])();

  const gameStateProperties = {
    timeRemaining: 2 * 60000, //2 minutes
    acquiredTreasures: [],
    playerIsStillEntering: false,
    entranceName: randomTitle,
    maze: [],
    score: 0,
    title: randomTitle,
    playerDirectionX: 0,
    playerDirectionY: 0,
    playerSpeed: 3.5,
    playerGridX: 0,
    playerGridY: 0,
  }

  const gameState = (0,_create_new_game_state__WEBPACK_IMPORTED_MODULE_4__["default"])({}, gameStateProperties);
  const gameStateAfterSetup = await (0,_setup_room__WEBPACK_IMPORTED_MODULE_5__["default"])(gameState);
  loop(gameStateAfterSetup);
}

async function loop(gameState)
{
  if (gameState.timeRemaining <= 0)
  {
    stopGame(gameState, "Time's up!");
    return;
  }

  try {
    const timeUpdates = updateTime(gameState);
    const mouseUpdates = (0,_process_mouse_input__WEBPACK_IMPORTED_MODULE_1__["default"])(gameState);
    const keyUpdates = (0,_process_key_input__WEBPACK_IMPORTED_MODULE_2__["default"])(gameState);
    const positionUpdates = (0,_check_player_position_for_treasure__WEBPACK_IMPORTED_MODULE_3__["default"])(gameState) //TODO: combine position checks
      || await (0,_check_player_position_for_exit__WEBPACK_IMPORTED_MODULE_6__["default"])(gameState)
      || await (0,_check_player_position_for_entrance__WEBPACK_IMPORTED_MODULE_7__["default"])(gameState);

    const gameStateUpdates =
      {
        ...timeUpdates,
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
    console.log(error);
    stopGame(gameState, "Red link!");
  }
}

function updateTime(gameState)
{
  let currentTime = Date.now();
  let dt = currentTime - lastTime;
  lastTime = currentTime;

  let newTimeRemaining = Math.max(gameState.timeRemaining - dt, 0)

  let gameStateUpdate = {timeRemaining: newTimeRemaining};

  return gameStateUpdate;

}

function stopGame(gameState, eventText)
{
  document.querySelector("#modal h1").innerHTML = eventText
  _view_constants__WEBPACK_IMPORTED_MODULE_9__.viewConstants.modalParent.classList.remove("hidden");
  _view_constants__WEBPACK_IMPORTED_MODULE_9__.viewConstants.treasureListParent.innerHTML = `${gameState.acquiredTreasures.map(e => "<li>" + e + "</li>").join("")}`
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
  addEventListener("mousemove", processMouseClick);
  // addEventListener("mouseup", processMouseUp);
// }

function stop()
{
  keyStatus = {};
  removeEventListener("keydown", onKeyDown);
  removeEventListener("keyup", onKeyUp);
  removeEventListener("mousedown", processMouseClick);
  // removeEventListener("mouseup", processMouseUp);
}

function onKeyDown(e)
{
  console.log(e.key)
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
    if (maze[maze.length - 1][i].type === "wall" && maze[maze.length - 2][i].type === "space")
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


let lastTime = 0;

function processKeyInput(gameState)
{

  let currentTime = Date.now() / 1000;
  let dt = currentTime - lastTime;
  lastTime = currentTime;

  let playerDirectionX = 0, playerDirectionY = 0;

  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('w') || (0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('ArrowUp')) playerDirectionY--;
  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('a') || (0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('ArrowLeft')) playerDirectionX--;
  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('s') || (0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('ArrowDown')) playerDirectionY++;
  if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('d') || (0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('ArrowRight')) playerDirectionX++;

  // so hacky lol
  if (playerDirectionX !== 0 && playerDirectionY !== 0)
  {
    playerDirectionX *= 0.7;
    playerDirectionY *= 0.7;
  }

  let velocityX = playerDirectionX * gameState.playerSpeed * dt;
  let velocityY = playerDirectionY * gameState.playerSpeed * dt;

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
    // console.log(gameState);
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
      else {
        mouseUpdates.renderedInfo = "Mouse over a doorway or gem to see more info"
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
setInterval(flipFrameNumber, 250); //TODO: base on game state dt?

async function loadAllImages()
{
  const imageNames = ["wall", "chara1", "chara2", "entrance", "exit", "treasure"];
  const imagePromises = [];
  for (let imageName of imageNames)
  {
    const image = images[imageName];
    imagePromises.push(new Promise((resolve) => image.addEventListener("load", resolve)))
    image.src = `../img/${imageName}.png`;
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

  renderTime(gameState.timeRemaining);

  priorGameState = gameState;
}

function renderInfo(gameState)
{
  if (gameState.renderedInfo && gameState.renderedInfo !== priorGameState.renderedInfo)
    _view_constants__WEBPACK_IMPORTED_MODULE_0__.viewConstants.linkInfoParent.innerText = gameState.renderedInfo;

  // if (gameState.score !== priorGameState.score)
  // {
  //   viewConstants.scoreParent.innerText = gameState.score;
  // }

  if (gameState.acquiredTreasures?.length !== priorGameState.acquiredTreasures?.length)
  {
    document.querySelector("#collected-gems-display").innerHTML =
      gameState.acquiredTreasures.map(e => "<li>" + e + "</li>").join("");
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

function renderTime(timeRemaining)
{
  let minutes = Math.floor(timeRemaining / 60000)
  let seconds = Math.floor((timeRemaining % 60000) / 1000).toString().padStart(2, "0");
  document.querySelector("#time-remaining").innerHTML = `${minutes}:${seconds}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNObUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9jaGVjay1wbGF5ZXItcG9zaXRpb24tZm9yLWVudHJhbmNlLmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItZXhpdC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9jaGVjay1wbGF5ZXItcG9zaXRpb24tZm9yLXRyZWFzdXJlLmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL2NyZWF0ZS1uZXctZ2FtZS1zdGF0ZS5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9oZWxwZXJzL3dpa2kuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvbWF6ZS1nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvcHJvY2Vzcy1rZXktaW5wdXQuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvcHJvY2Vzcy1tb3VzZS1pbnB1dC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvc2V0dXAtcm9vbS5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS92aWV3LWNvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8gLy4vanMvd2lraS1hcGkvbWlkbGV2ZWxtYW5hZ2VyLm1qcyIsIndlYnBhY2s6Ly8gLy4vanMvd2lraS1hcGkvd2lraWludGVyZmFjZS5tanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovLyAvLi9ub2RlX21vZHVsZXMvbm9kZS1tYXplLWdlbmVyYXRvci9zcmMvY2VsbC5qcyIsIndlYnBhY2s6Ly8gLy4vbm9kZV9tb2R1bGVzL25vZGUtbWF6ZS1nZW5lcmF0b3Ivc3JjL2dlbmVyYXRvcnMvZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLyAvLi9ub2RlX21vZHVsZXMvbm9kZS1tYXplLWdlbmVyYXRvci9zcmMvZ2VuZXJhdG9ycy9tYXplLmpzIiwid2VicGFjazovLyAvLi9ub2RlX21vZHVsZXMvbm9kZS1tYXplLWdlbmVyYXRvci9zcmMvZ2VuZXJhdG9ycy9yb29tLmpzIiwid2VicGFjazovLyAvLi9ub2RlX21vZHVsZXMvbm9kZS1tYXplLWdlbmVyYXRvci9zcmMvZ2VuZXJhdG9ycy9zdGFpcnMuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9ncmlkLmpzIiwid2VicGFjazovLyAvLi9ub2RlX21vZHVsZXMvbm9kZS1tYXplLWdlbmVyYXRvci9zcmMvcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8gL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLyAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLyAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8gL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vIC8uL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlTmV3R2FtZVN0YXRlIGZyb20gXCIuL2NyZWF0ZS1uZXctZ2FtZS1zdGF0ZVwiO1xuaW1wb3J0IHNldHVwUm9vbSBmcm9tIFwiLi9zZXR1cC1yb29tXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrUGxheWVyUG9zaXRpb25Gb3JFbnRyYW5jZShnYW1lU3RhdGUpIHtcbiAgY29uc3QgZW50cmFuY2VVcGRhdGVzID0ge31cbiAgaWYgKGlzUGxheWVyT25FbnRyYW5jZShnYW1lU3RhdGUpKSB7XG4gICAgaWYgKCFnYW1lU3RhdGUucGxheWVySXNTdGlsbEVudGVyaW5nKSB7XG4gICAgICBlbnRyYW5jZVVwZGF0ZXMudGl0bGUgPSBnYW1lU3RhdGUuZW50cmFuY2VOYW1lO1xuICAgICAgZW50cmFuY2VVcGRhdGVzLmVudHJhbmNlTmFtZSA9IGdhbWVTdGF0ZS50aXRsZTtcblxuICAgICAgY29uc3QgbmV3R2FtZVN0YXRlID0gY3JlYXRlTmV3R2FtZVN0YXRlKGdhbWVTdGF0ZSwgZW50cmFuY2VVcGRhdGVzKTtcbiAgICAgIC8vIHN0b3BBbmRDbGVhcigpO1xuICAgICAgY29uc3QgbmV3Um9vbVN0YXRlID0gYXdhaXQgc2V0dXBSb29tKG5ld0dhbWVTdGF0ZSk7XG4gICAgICByZXR1cm4gbmV3Um9vbVN0YXRlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbnRyYW5jZVVwZGF0ZXMucGxheWVySXNTdGlsbEVudGVyaW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIGVudHJhbmNlVXBkYXRlcztcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1BsYXllck9uRW50cmFuY2UoZ2FtZVN0YXRlKVxue1xuICByZXR1cm4gZ2FtZVN0YXRlLm1hemVbTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFggKyAwLjUsIDApKV1bTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFkgKyAwLjUsIDApKV0udHlwZSA9PT0gJ2VudHJhbmNlJztcbn1cbiIsImltcG9ydCBjcmVhdGVOZXdHYW1lU3RhdGUgZnJvbSBcIi4vY3JlYXRlLW5ldy1nYW1lLXN0YXRlXCI7XG5pbXBvcnQgc2V0dXBSb29tIGZyb20gXCIuL3NldHVwLXJvb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY2hlY2tQbGF5ZXJQb3NpdGlvbkZvckV4aXQoZ2FtZVN0YXRlKVxue1xuICBjb25zdCB7cGxheWVySXNPbkV4aXQsIGV4aXRUaXRsZX0gPSBpc1BsYXllck9uRXhpdChnYW1lU3RhdGUpO1xuICBpZiAocGxheWVySXNPbkV4aXQpXG4gIHtcbiAgICBjb25zdCBleGl0VXBkYXRlcyA9IHt9XG5cbiAgICBleGl0VXBkYXRlcy5lbnRyYW5jZU5hbWUgPSBnYW1lU3RhdGUudGl0bGU7XG4gICAgZXhpdFVwZGF0ZXMudGl0bGUgPSBleGl0VGl0bGU7XG5cbiAgICBjb25zdCBuZXdHYW1lU3RhdGUgPSBjcmVhdGVOZXdHYW1lU3RhdGUoZ2FtZVN0YXRlLCBleGl0VXBkYXRlcyk7XG4gICAgY29uc3QgbmV3Um9vbUdhbWVTdGF0ZSA9IGF3YWl0IHNldHVwUm9vbShuZXdHYW1lU3RhdGUpO1xuICAgIHJldHVybiBuZXdSb29tR2FtZVN0YXRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzUGxheWVyT25FeGl0KGdhbWVTdGF0ZSlcbntcbiAgY29uc3QgY2VsbCA9IGdhbWVTdGF0ZS5tYXplW01hdGguZmxvb3IoTWF0aC5tYXgoZ2FtZVN0YXRlLnBsYXllckdyaWRYICsgMC41LCAwKSldW01hdGguZmxvb3IoTWF0aC5tYXgoZ2FtZVN0YXRlLnBsYXllckdyaWRZICsgMC41LCAwKSldO1xuICBjb25zdCBwbGF5ZXJJc09uRXhpdCA9IGNlbGwudHlwZSA9PT0gXCJleGl0XCJcbiAgY29uc3QgZXhpdFRpdGxlID0gY2VsbC50aXRsZTtcbiAgcmV0dXJuIHtwbGF5ZXJJc09uRXhpdCwgZXhpdFRpdGxlfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrUGxheWVyUG9zaXRpb25Gb3JUcmVhc3VyZShnYW1lU3RhdGUpIHtcbiAgY29uc3QgdHJlYXN1cmVBY3F1aXJlZCA9IGlzUGxheWVyT25UcmVhc3VyZShnYW1lU3RhdGUpO1xuICBpZiAodHJlYXN1cmVBY3F1aXJlZCkge1xuICAgIGNvbnN0IHRyZWFzdXJlVXBkYXRlcyA9IHt9O1xuICAgIHRyZWFzdXJlVXBkYXRlcy5zY29yZSA9IGdhbWVTdGF0ZS5zY29yZSArIDE7XG4gICAgdHJlYXN1cmVVcGRhdGVzLmFjcXVpcmVkVHJlYXN1cmVzID0gWy4uLmdhbWVTdGF0ZS5hY3F1aXJlZFRyZWFzdXJlcywgYCR7Z2FtZVN0YXRlLnRpdGxlfTogJHt0cmVhc3VyZUFjcXVpcmVkfWBdXG5cbiAgICAvL3RvZG86IG1hemUgc3RhdGUgaXMgc3VwcG9zZWQgdG8gYmUgaW1tdXRhYmxlXG4gICAgZ2FtZVN0YXRlLm1hemVbTWF0aC5mbG9vcihnYW1lU3RhdGUucGxheWVyR3JpZFggKyAwLjUpXVtNYXRoLmZsb29yKGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIDAuNSldLnR5cGUgPSBcInNwYWNlXCI7XG5cbiAgICByZXR1cm4gdHJlYXN1cmVVcGRhdGVzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzUGxheWVyT25UcmVhc3VyZShnYW1lU3RhdGUpXG57XG4gIHJldHVybiAoXG4gICAgZ2FtZVN0YXRlLm1hemVbTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFggKyAwLjUsIDApKV1bTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFkgKyAwLjUsIDApKV0udHlwZSA9PT0gJ3RyZWFzdXJlJ1xuICAgICAgPyBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIDAuNSwgMCkpXVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIDAuNSwgMCkpXS5uYW1lXG4gICAgICA6IGZhbHNlXG4gICk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVOZXdHYW1lU3RhdGUoZ2FtZVN0YXRlLCBuZXdQcm9wZXJ0aWVzKVxue1xuICBjb25zdCBuZXdHYW1lU3RhdGUgPSB7Li4uZ2FtZVN0YXRlLCAuLi5uZXdQcm9wZXJ0aWVzfTtcbiAgT2JqZWN0LmZyZWV6ZShuZXdHYW1lU3RhdGUpO1xuICByZXR1cm4gbmV3R2FtZVN0YXRlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0UmFuZG9tQXJ0aWNsZU5hbWUoKVxue1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93L2FwaS5waHA/YWN0aW9uPXF1ZXJ5Jmxpc3Q9cmFuZG9tJmZvcm1hdD1qc29uJnJubmFtZXNwYWNlPTAmcm5saW1pdD0xJm9yaWdpbj0qXCIpO1xuICBjb25zdCByZXN1bHREYXRhID0gYXdhaXQgcmVzdWx0Lmpzb24oKTtcbiAgY29uc3QgdGl0bGUgPSByZXN1bHREYXRhLnF1ZXJ5LnJhbmRvbVswXS50aXRsZVxuICByZXR1cm4gdGl0bGU7XG59XG4iLCJpbXBvcnQge3JlbmRlcn0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgcHJvY2Vzc01vdXNlSW5wdXQgZnJvbSBcIi4vcHJvY2Vzcy1tb3VzZS1pbnB1dFwiO1xuaW1wb3J0IHByb2Nlc3NLZXlJbnB1dCBmcm9tIFwiLi9wcm9jZXNzLWtleS1pbnB1dFwiO1xuaW1wb3J0IGNoZWNrUGxheWVyUG9zaXRpb25Gb3JUcmVhc3VyZSBmcm9tIFwiLi9jaGVjay1wbGF5ZXItcG9zaXRpb24tZm9yLXRyZWFzdXJlXCI7XG5pbXBvcnQgY3JlYXRlTmV3R2FtZVN0YXRlIGZyb20gXCIuL2NyZWF0ZS1uZXctZ2FtZS1zdGF0ZVwiO1xuaW1wb3J0IHNldHVwUm9vbSBmcm9tIFwiLi9zZXR1cC1yb29tXCI7XG5pbXBvcnQgY2hlY2tQbGF5ZXJQb3NpdGlvbkZvckV4aXQgZnJvbSBcIi4vY2hlY2stcGxheWVyLXBvc2l0aW9uLWZvci1leGl0XCI7XG5pbXBvcnQgY2hlY2tQbGF5ZXJQb3NpdGlvbkZvckVudHJhbmNlIGZyb20gXCIuL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItZW50cmFuY2VcIjtcbmltcG9ydCBnZXRSYW5kb21BcnRpY2xlTmFtZSBmcm9tIFwiLi9oZWxwZXJzL3dpa2lcIjtcbmltcG9ydCB7dmlld0NvbnN0YW50c30gZnJvbSBcIi4vdmlldy1jb25zdGFudHNcIjtcblxubGV0IHJ1bm5pbmcgPSB0cnVlO1xubGV0IGFuaW1hdGlvbkZyYW1lO1xubGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcbmxldCBlbGFwc2VkVGltZSA9IDA7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzdGFydC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgdmlld0NvbnN0YW50cy5tb2RhbFBhcmVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICByZXN0YXJ0KCk7XG59KVxuXG5yZXN0YXJ0KCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc3RhcnQoKVxue1xuICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZSk7XG4gIGNvbnN0IHJhbmRvbVRpdGxlID0gYXdhaXQgZ2V0UmFuZG9tQXJ0aWNsZU5hbWUoKTtcblxuICBjb25zdCBnYW1lU3RhdGVQcm9wZXJ0aWVzID0ge1xuICAgIHRpbWVSZW1haW5pbmc6IDIgKiA2MDAwMCwgLy8yIG1pbnV0ZXNcbiAgICBhY3F1aXJlZFRyZWFzdXJlczogW10sXG4gICAgcGxheWVySXNTdGlsbEVudGVyaW5nOiBmYWxzZSxcbiAgICBlbnRyYW5jZU5hbWU6IHJhbmRvbVRpdGxlLFxuICAgIG1hemU6IFtdLFxuICAgIHNjb3JlOiAwLFxuICAgIHRpdGxlOiByYW5kb21UaXRsZSxcbiAgICBwbGF5ZXJEaXJlY3Rpb25YOiAwLFxuICAgIHBsYXllckRpcmVjdGlvblk6IDAsXG4gICAgcGxheWVyU3BlZWQ6IDMuNSxcbiAgICBwbGF5ZXJHcmlkWDogMCxcbiAgICBwbGF5ZXJHcmlkWTogMCxcbiAgfVxuXG4gIGNvbnN0IGdhbWVTdGF0ZSA9IGNyZWF0ZU5ld0dhbWVTdGF0ZSh7fSwgZ2FtZVN0YXRlUHJvcGVydGllcyk7XG4gIGNvbnN0IGdhbWVTdGF0ZUFmdGVyU2V0dXAgPSBhd2FpdCBzZXR1cFJvb20oZ2FtZVN0YXRlKTtcbiAgbG9vcChnYW1lU3RhdGVBZnRlclNldHVwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9vcChnYW1lU3RhdGUpXG57XG4gIGlmIChnYW1lU3RhdGUudGltZVJlbWFpbmluZyA8PSAwKVxuICB7XG4gICAgc3RvcEdhbWUoZ2FtZVN0YXRlLCBcIlRpbWUncyB1cCFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0aW1lVXBkYXRlcyA9IHVwZGF0ZVRpbWUoZ2FtZVN0YXRlKTtcbiAgICBjb25zdCBtb3VzZVVwZGF0ZXMgPSBwcm9jZXNzTW91c2VJbnB1dChnYW1lU3RhdGUpO1xuICAgIGNvbnN0IGtleVVwZGF0ZXMgPSBwcm9jZXNzS2V5SW5wdXQoZ2FtZVN0YXRlKTtcbiAgICBjb25zdCBwb3NpdGlvblVwZGF0ZXMgPSBjaGVja1BsYXllclBvc2l0aW9uRm9yVHJlYXN1cmUoZ2FtZVN0YXRlKSAvL1RPRE86IGNvbWJpbmUgcG9zaXRpb24gY2hlY2tzXG4gICAgICB8fCBhd2FpdCBjaGVja1BsYXllclBvc2l0aW9uRm9yRXhpdChnYW1lU3RhdGUpXG4gICAgICB8fCBhd2FpdCBjaGVja1BsYXllclBvc2l0aW9uRm9yRW50cmFuY2UoZ2FtZVN0YXRlKTtcblxuICAgIGNvbnN0IGdhbWVTdGF0ZVVwZGF0ZXMgPVxuICAgICAge1xuICAgICAgICAuLi50aW1lVXBkYXRlcyxcbiAgICAgICAgLi4ubW91c2VVcGRhdGVzLFxuICAgICAgICAuLi5rZXlVcGRhdGVzLFxuICAgICAgICAuLi5wb3NpdGlvblVwZGF0ZXNcbiAgICAgIH07XG5cbiAgICBjb25zdCBuZXdHYW1lU3RhdGUgPSBjcmVhdGVOZXdHYW1lU3RhdGUoZ2FtZVN0YXRlLCBnYW1lU3RhdGVVcGRhdGVzKTtcblxuICAgIHJlbmRlcihuZXdHYW1lU3RhdGUpO1xuXG4gICAgYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gbG9vcChuZXdHYW1lU3RhdGUpKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpXG4gIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgc3RvcEdhbWUoZ2FtZVN0YXRlLCBcIlJlZCBsaW5rIVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVUaW1lKGdhbWVTdGF0ZSlcbntcbiAgbGV0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgbGV0IGR0ID0gY3VycmVudFRpbWUgLSBsYXN0VGltZTtcbiAgbGFzdFRpbWUgPSBjdXJyZW50VGltZTtcblxuICBsZXQgbmV3VGltZVJlbWFpbmluZyA9IE1hdGgubWF4KGdhbWVTdGF0ZS50aW1lUmVtYWluaW5nIC0gZHQsIDApXG5cbiAgbGV0IGdhbWVTdGF0ZVVwZGF0ZSA9IHt0aW1lUmVtYWluaW5nOiBuZXdUaW1lUmVtYWluaW5nfTtcblxuICByZXR1cm4gZ2FtZVN0YXRlVXBkYXRlO1xuXG59XG5cbmZ1bmN0aW9uIHN0b3BHYW1lKGdhbWVTdGF0ZSwgZXZlbnRUZXh0KVxue1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsIGgxXCIpLmlubmVySFRNTCA9IGV2ZW50VGV4dFxuICB2aWV3Q29uc3RhbnRzLm1vZGFsUGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIHZpZXdDb25zdGFudHMudHJlYXN1cmVMaXN0UGFyZW50LmlubmVySFRNTCA9IGAke2dhbWVTdGF0ZS5hY3F1aXJlZFRyZWFzdXJlcy5tYXAoZSA9PiBcIjxsaT5cIiArIGUgKyBcIjwvbGk+XCIpLmpvaW4oXCJcIil9YFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWluKCkge31cbiIsImltcG9ydCB7d2luZG93UG9zVG9HcmlkUG9zfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxubGV0IGtleVN0YXR1cyA9IHt9O1xubGV0IG1vdXNlU3RhdHVzID0gZmFsc2U7XG5sZXQgbW91c2VHcmlkUG9zID0ge3g6MCx5OjB9O1xubGV0IG1vdXNlVGFyZ2V0O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5U3RhdHVzKGtleSlcbntcbiAgcmV0dXJuIGtleVN0YXR1c1trZXldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW91c2VTdGF0dXMoKVxue1xuICByZXR1cm4ge21vdXNlU3RhdHVzLCBtb3VzZUdyaWRQb3MsIG1vdXNlVGFyZ2V0fTtcbn1cblxuLy8gZnVuY3Rpb24gc3RhcnQoKVxuLy8ge1xuICBhZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICBhZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCk7XG4gIGFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgcHJvY2Vzc01vdXNlQ2xpY2spO1xuICAvLyBhZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBwcm9jZXNzTW91c2VVcCk7XG4vLyB9XG5cbmZ1bmN0aW9uIHN0b3AoKVxue1xuICBrZXlTdGF0dXMgPSB7fTtcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5VXApO1xuICByZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHByb2Nlc3NNb3VzZUNsaWNrKTtcbiAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgcHJvY2Vzc01vdXNlVXApO1xufVxuXG5mdW5jdGlvbiBvbktleURvd24oZSlcbntcbiAgY29uc29sZS5sb2coZS5rZXkpXG4gIGtleVN0YXR1c1tlLmtleV0gPSB0cnVlXG59XG5cbmZ1bmN0aW9uIG9uS2V5VXAoZSlcbntcbiAga2V5U3RhdHVzW2Uua2V5XSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzTW91c2VDbGljayhlKVxue1xuICB0cnkge1xuICAgIG1vdXNlU3RhdHVzID0gdHJ1ZTtcbiAgICBtb3VzZUdyaWRQb3MgPSB3aW5kb3dQb3NUb0dyaWRQb3MoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIG1vdXNlVGFyZ2V0ID0gZS50YXJnZXQ7XG4gIH1cbiAgY2F0Y2ggKGUpXG4gIHtcbiAgICBjb25zb2xlLmVycm9yKGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc01vdXNlVXAoZSlcbntcbiAgbW91c2VTdGF0dXMgPSBmYWxzZTtcbiAgbW91c2VUYXJnZXQgPSBudWxsO1xufVxuIiwiY29uc3Qgbm1nID0gcmVxdWlyZShcIm5vZGUtbWF6ZS1nZW5lcmF0b3JcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlTWF6ZShwcm9wZXJ0aWVzKVxue1xuICBjb25zdCBnZW5lcmF0b3IgPSBuZXcgbm1nLmdlbmVyYXRvcnMubWF6ZSh7fSwge3dpZHRoOiBwcm9wZXJ0aWVzLnNpemUsIGhlaWdodDogcHJvcGVydGllcy5zaXplfSk7XG4gIGNvbnN0IG1hemUgPSBnZW5lcmF0b3IuZGF0YS5ncmlkLmNlbGxzWzBdLm1hcChyb3cgPT5cbiAgICByb3cubWFwKGNlbGwgPT4gY2VsbC5ibG9ja2VkID8ge3R5cGU6IFwid2FsbFwiLCB4OiBjZWxsLngsIHk6IGNlbGwueX0gOiB7dHlwZTogXCJzcGFjZVwiLCB4OiBjZWxsLngsIHk6IGNlbGwueX0pXG4gIClcbiAgb3BlblVwTWF6ZUluUGxhY2UobWF6ZSwgcHJvcGVydGllcy5zaW1wbGljaXR5KTtcblxuICBjb25zdCB1c2FibGVCb3JkZXJUaWxlcyA9IGdldFVzYWJsZUJvcmRlclRpbGVzKG1hemUpO1xuXG4gIGNyZWF0ZUVudHJhbmNlSW5QbGFjZShtYXplLCB1c2FibGVCb3JkZXJUaWxlcyk7XG4gIGNyZWF0ZUV4aXRzSW5QbGFjZShtYXplLCBwcm9wZXJ0aWVzLmxpbmtzLCB1c2FibGVCb3JkZXJUaWxlcyk7XG4gIC8vIGlmIChzaG91bGRQb3B1bGF0ZVRyZWFzdXJlcyhnYW1lU3RhdGUpKVxuICBjcmVhdGVUcmVhc3VyZXNJblBsYWNlKG1hemUsIHByb3BlcnRpZXMudHJlYXN1cmVzKTtcblxuICByZXR1cm4gbWF6ZVxufVxuXG5mdW5jdGlvbiBvcGVuVXBNYXplSW5QbGFjZShtYXplLCBzaW1wbGljaXR5KVxue1xuICBmb3IgKGxldCBpID0gMCA7IGkgPCBtYXplLmxlbmd0aCA7IGkrKylcbiAge1xuICAgIGZvciAobGV0IGogPSAwIDsgaiA8IG1hemVbaV0ubGVuZ3RoIDsgaisrKVxuICAgIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBtYXplW2ldW2pdO1xuICAgICAgaWYgKGNlbGwudHlwZSA9PT0gXCJ3YWxsXCIgJiYgaSA+IDAgJiYgaiA+IDAgJiYgaSA8IG1hemUubGVuZ3RoIC0gMSAmJiBqIDwgbWF6ZS5sZW5ndGggLSAxICYmIE1hdGgucmFuZG9tKCkgPCBzaW1wbGljaXR5KVxuICAgICAge1xuICAgICAgICBtYXplW2ldW2pdLnR5cGUgPSBcInNwYWNlXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFVzYWJsZUJvcmRlclRpbGVzKG1hemUpXG57XG4gIGNvbnN0IHVzYWJsZUJvcmRlclRpbGVzID0gW11cblxuICAvLyB0b3BcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbWF6ZS5sZW5ndGggOyBpKyspXG4gIHtcbiAgICBpZiAobWF6ZVtpXVswXS50eXBlID09PSBcIndhbGxcIiAmJiBtYXplW2ldWzFdLnR5cGUgPT09IFwic3BhY2VcIilcbiAgICAgIHVzYWJsZUJvcmRlclRpbGVzLnB1c2goe3g6IGksIHk6IDB9KTtcbiAgfVxuXG4gIC8vIGJvdHRvbVxuICBmb3IgKGxldCBpID0gMCA7IGkgPCBtYXplLmxlbmd0aCA7IGkrKylcbiAge1xuICAgIGlmIChtYXplW2ldW21hemUubGVuZ3RoIC0gMV0udHlwZSA9PT0gXCJ3YWxsXCIgJiYgbWF6ZVtpXVttYXplLmxlbmd0aCAtIDJdLnR5cGUgPT09IFwic3BhY2VcIilcbiAgICAgIHVzYWJsZUJvcmRlclRpbGVzLnB1c2goe3g6IGksIHk6IG1hemUubGVuZ3RoIC0xfSk7XG4gIH1cblxuICAvLyBsZWZ0LCBtaW51cyB0b3AgYW5kIGJvdHRvbVxuICBmb3IgKGxldCBpID0gMSA7IGkgPCBtYXplLmxlbmd0aCAtMSAgOyBpKyspXG4gIHtcbiAgICBpZiAobWF6ZVswXVtpXS50eXBlID09PSBcIndhbGxcIiAmJiBtYXplWzFdW2ldLnR5cGUgPT09IFwic3BhY2VcIilcbiAgICAgIHVzYWJsZUJvcmRlclRpbGVzLnB1c2goe3g6IDAsIHk6IGl9KTtcbiAgfVxuXG4gIC8vcmlnaHQsIG1pbnVzIHRvcCBhbmQgYm90dG9tXG4gIGZvciAobGV0IGkgPSAxIDsgaSA8IG1hemUubGVuZ3RoIC0xICA7IGkrKylcbiAge1xuICAgIGlmIChtYXplW21hemUubGVuZ3RoIC0gMV1baV0udHlwZSA9PT0gXCJ3YWxsXCIgJiYgbWF6ZVttYXplLmxlbmd0aCAtIDJdW2ldLnR5cGUgPT09IFwic3BhY2VcIilcbiAgICAgIHVzYWJsZUJvcmRlclRpbGVzLnB1c2goe3g6IG1hemUubGVuZ3RoIC0gMSwgeTogaX0pO1xuICB9XG5cbiAgcmV0dXJuIHVzYWJsZUJvcmRlclRpbGVzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnRyYW5jZUluUGxhY2UobWF6ZSwgdXNhYmxlQm9yZGVyVGlsZXMpXG57XG4gIGNvbnN0IGluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNhYmxlQm9yZGVyVGlsZXMubGVuZ3RoIC0gMSkpO1xuXG4gIGNvbnN0IHBvcyA9IHVzYWJsZUJvcmRlclRpbGVzW2luZGV4XTtcblxuICB1c2FibGVCb3JkZXJUaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIG1hemVbcG9zLnhdW3Bvcy55XS50eXBlID0gXCJlbnRyYW5jZVwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFeGl0c0luUGxhY2UobWF6ZSwgbGlua3MsIHVzYWJsZUJvcmRlclRpbGVzKVxue1xuICBmb3IgKGxldCBpID0gMCA7IGkgPCBsaW5rcy5sZW5ndGggJiYgaSA8IHVzYWJsZUJvcmRlclRpbGVzLmxlbmd0aCA7IGkrKylcbiAge1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNhYmxlQm9yZGVyVGlsZXMubGVuZ3RoIC0gMSkpO1xuXG4gICAgY29uc3QgcG9zID0gdXNhYmxlQm9yZGVyVGlsZXNbaW5kZXhdO1xuXG4gICAgdXNhYmxlQm9yZGVyVGlsZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIG1hemVbcG9zLnhdW3Bvcy55XS50eXBlID0gXCJleGl0XCI7XG4gICAgbWF6ZVtwb3MueF1bcG9zLnldLnRpdGxlID0gbGlua3NbaV07XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJlYXN1cmVzSW5QbGFjZShtYXplLCBjaXRlc05lZWRlZClcbntcbiAgY29uc3QgZW1wdHlTcGFjZXMgPSBtYXplLmZsYXQoKS5maWx0ZXIoY2VsbCA9PiBjZWxsLnR5cGUgPT09IFwic3BhY2VcIik7XG5cbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgY2l0ZXNOZWVkZWQubGVuZ3RoIDsgaSsrKVxuICB7XG4gICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAoZW1wdHlTcGFjZXMubGVuZ3RoIC0gMSkpKTtcbiAgICBlbXB0eVNwYWNlc1tyYW5kXS50eXBlID0gXCJ0cmVhc3VyZVwiO1xuICAgIGVtcHR5U3BhY2VzW3JhbmRdLm5hbWUgPSBjaXRlc05lZWRlZFtpXTtcbiAgICBlbXB0eVNwYWNlcy5zcGxpY2UocmFuZCwgMSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Z2V0S2V5U3RhdHVzfSBmcm9tIFwiLi9pbnB1dFwiO1xuXG5sZXQgbGFzdFRpbWUgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9jZXNzS2V5SW5wdXQoZ2FtZVN0YXRlKVxue1xuXG4gIGxldCBjdXJyZW50VGltZSA9IERhdGUubm93KCkgLyAxMDAwO1xuICBsZXQgZHQgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xuICBsYXN0VGltZSA9IGN1cnJlbnRUaW1lO1xuXG4gIGxldCBwbGF5ZXJEaXJlY3Rpb25YID0gMCwgcGxheWVyRGlyZWN0aW9uWSA9IDA7XG5cbiAgaWYgKGdldEtleVN0YXR1cygndycpIHx8IGdldEtleVN0YXR1cygnQXJyb3dVcCcpKSBwbGF5ZXJEaXJlY3Rpb25ZLS07XG4gIGlmIChnZXRLZXlTdGF0dXMoJ2EnKSB8fCBnZXRLZXlTdGF0dXMoJ0Fycm93TGVmdCcpKSBwbGF5ZXJEaXJlY3Rpb25YLS07XG4gIGlmIChnZXRLZXlTdGF0dXMoJ3MnKSB8fCBnZXRLZXlTdGF0dXMoJ0Fycm93RG93bicpKSBwbGF5ZXJEaXJlY3Rpb25ZKys7XG4gIGlmIChnZXRLZXlTdGF0dXMoJ2QnKSB8fCBnZXRLZXlTdGF0dXMoJ0Fycm93UmlnaHQnKSkgcGxheWVyRGlyZWN0aW9uWCsrO1xuXG4gIC8vIHNvIGhhY2t5IGxvbFxuICBpZiAocGxheWVyRGlyZWN0aW9uWCAhPT0gMCAmJiBwbGF5ZXJEaXJlY3Rpb25ZICE9PSAwKVxuICB7XG4gICAgcGxheWVyRGlyZWN0aW9uWCAqPSAwLjc7XG4gICAgcGxheWVyRGlyZWN0aW9uWSAqPSAwLjc7XG4gIH1cblxuICBsZXQgdmVsb2NpdHlYID0gcGxheWVyRGlyZWN0aW9uWCAqIGdhbWVTdGF0ZS5wbGF5ZXJTcGVlZCAqIGR0O1xuICBsZXQgdmVsb2NpdHlZID0gcGxheWVyRGlyZWN0aW9uWSAqIGdhbWVTdGF0ZS5wbGF5ZXJTcGVlZCAqIGR0O1xuXG4gIGxldCBjaGVja1BvaW50cyA9IHtcbiAgICB1cHBlckxlZnQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjIsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArICB2ZWxvY2l0eVkgKyAwLjJ9LFxuICAgIHVwcGVyUmlnaHQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjgsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSArIDAuMn0sXG4gICAgbG93ZXJSaWdodDoge3g6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIHZlbG9jaXR5WCArIDAuOCwgeTogZ2FtZVN0YXRlLnBsYXllckdyaWRZICsgdmVsb2NpdHlZICsgMC44fSxcbiAgICBsb3dlckxlZnQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjIsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSArIDAuOH0sXG4gIH1cblxuICBpZiAodmVsb2NpdHlYIDwgMClcbiAge1xuICAgIGlmIChjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy51cHBlckxlZnQpIHx8IGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLmxvd2VyTGVmdCkpXG4gICAge1xuICAgICAgdmVsb2NpdHlYID0gMDtcbiAgICB9XG4gIH1cblxuICBlbHNlIGlmICh2ZWxvY2l0eVggPiAwKVxuICB7XG4gICAgaWYgKGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLnVwcGVyUmlnaHQpIHx8IGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLmxvd2VyUmlnaHQpKVxuICAgIHtcbiAgICAgIHZlbG9jaXR5WCA9IDA7XG4gICAgfVxuICB9XG5cbiAgaWYgKHZlbG9jaXR5WSA8IDApXG4gIHtcbiAgICBpZiAoY2hlY2tGb3JXYWxsKGdhbWVTdGF0ZSwgY2hlY2tQb2ludHMudXBwZXJMZWZ0KSB8fCBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy51cHBlclJpZ2h0KSlcbiAgICB7XG4gICAgICB2ZWxvY2l0eVkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGVsc2UgaWYgKHZlbG9jaXR5WSA+IDApXG4gIHtcbiAgICBpZiAoY2hlY2tGb3JXYWxsKGdhbWVTdGF0ZSwgY2hlY2tQb2ludHMubG93ZXJMZWZ0KSB8fCBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy5sb3dlclJpZ2h0KSlcbiAgICB7XG4gICAgICB2ZWxvY2l0eVkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7cGxheWVyR3JpZFg6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIHZlbG9jaXR5WCwgcGxheWVyR3JpZFk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSB9O1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBwb3NpdGlvblZlY3RvcilcbntcbiAgcmV0dXJuIHBvc2l0aW9uVmVjdG9yLnggPCAwIHx8IHBvc2l0aW9uVmVjdG9yLnggPj0gZ2FtZVN0YXRlLm1hemUubGVuZ3RoXG4gICAgfHwgcG9zaXRpb25WZWN0b3IueSA8IDAgfHwgcG9zaXRpb25WZWN0b3IueSA+PSBnYW1lU3RhdGUubWF6ZS5sZW5ndGhcbiAgICB8fCBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKHBvc2l0aW9uVmVjdG9yLngpXVtNYXRoLmZsb29yKHBvc2l0aW9uVmVjdG9yLnkpXS50eXBlID09PSBcIndhbGxcIjtcbn1cbiIsImltcG9ydCB7Z2V0TW91c2VTdGF0dXN9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQge3ZpZXdDb25zdGFudHN9IGZyb20gXCIuL3ZpZXctY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NNb3VzZUlucHV0KGdhbWVTdGF0ZSlcbntcbiAgbGV0IG1vdXNlVXBkYXRlcyA9IHt9O1xuXG4gIGNvbnN0IHttb3VzZVN0YXR1cywgbW91c2VHcmlkUG9zLCBtb3VzZVRhcmdldH0gPSBnZXRNb3VzZVN0YXR1cygpO1xuXG4gIGlmIChtb3VzZVRhcmdldCA9PT0gdmlld0NvbnN0YW50cy5zY29yZVBhcmVudClcbiAge1xuICAgIC8vIGNvbnNvbGUubG9nKGdhbWVTdGF0ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKG1vdXNlU3RhdHVzICYmIG1vdXNlR3JpZFBvcy54ID49IDAgJiYgbW91c2VHcmlkUG9zLnkgPj0gMCAmJiBtb3VzZUdyaWRQb3MueCA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCAmJiBtb3VzZUdyaWRQb3MueSA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCkge1xuICAgICAgY29uc3Qge25hbWUsIHR5cGUsIHRpdGxlfSA9IGdhbWVTdGF0ZS5tYXplW21vdXNlR3JpZFBvcy54XVttb3VzZUdyaWRQb3MueV07XG4gICAgICBpZiAodHlwZSA9PT0gXCJleGl0XCIpIHtcbiAgICAgICAgbW91c2VVcGRhdGVzLnJlbmRlcmVkSW5mbyA9IHRpdGxlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcInRyZWFzdXJlXCIpIHtcbiAgICAgICAgbW91c2VVcGRhdGVzLnJlbmRlcmVkSW5mbyA9IG5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZW50cmFuY2VcIikge1xuICAgICAgICBtb3VzZVVwZGF0ZXMucmVuZGVyZWRJbmZvID0gZ2FtZVN0YXRlLmVudHJhbmNlTmFtZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtb3VzZVVwZGF0ZXMucmVuZGVyZWRJbmZvID0gXCJNb3VzZSBvdmVyIGEgZG9vcndheSBvciBnZW0gdG8gc2VlIG1vcmUgaW5mb1wiXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1vdXNlVXBkYXRlcztcbn1cbiIsImltcG9ydCB7dmlld0NvbnN0YW50cyBhcyBnYW1lU3RhdGUsIHZpZXdDb25zdGFudHN9IGZyb20gXCIuL3ZpZXctY29uc3RhbnRzXCI7XG5cbmNvbnN0IENFTExfV0lEVEggPSA2MCwgQ0VMTF9IRUlHSFQgPSA2MDtcbmNvbnN0IFdJTkRPV19XSURUSCA9IDgwMCwgV0lORE9XX0hFSUdIVCA9IDgwMDtcbmNvbnN0IHZpZXdTdGF0ZSA9IHtcbiAgd2luZG93WDogMCxcbiAgd2luZG93WTogMCxcbn1cblxubGV0IHByaW9yR2FtZVN0YXRlID0ge307XG5cbmxldCByZWFkeSA9IGZhbHNlO1xuXG5sZXQgZnJhbWVOdW0gPSAxO1xuXG5jb25zdCBpbWFnZXMgPSB7XG4gIFwid2FsbFwiOiBuZXcgSW1hZ2UoKSxcbiAgXCJjaGFyYTFcIjogbmV3IEltYWdlKCksXG4gIFwiY2hhcmEyXCI6IG5ldyBJbWFnZSgpLFxuICBcImVudHJhbmNlXCI6IG5ldyBJbWFnZSgpLFxuICBcImV4aXRcIjogbmV3IEltYWdlKCksXG4gIFwidHJlYXN1cmVcIjogbmV3IEltYWdlKClcbn1cblxubG9hZEFsbEltYWdlcygpO1xuc2V0SW50ZXJ2YWwoZmxpcEZyYW1lTnVtYmVyLCAyNTApOyAvL1RPRE86IGJhc2Ugb24gZ2FtZSBzdGF0ZSBkdD9cblxuYXN5bmMgZnVuY3Rpb24gbG9hZEFsbEltYWdlcygpXG57XG4gIGNvbnN0IGltYWdlTmFtZXMgPSBbXCJ3YWxsXCIsIFwiY2hhcmExXCIsIFwiY2hhcmEyXCIsIFwiZW50cmFuY2VcIiwgXCJleGl0XCIsIFwidHJlYXN1cmVcIl07XG4gIGNvbnN0IGltYWdlUHJvbWlzZXMgPSBbXTtcbiAgZm9yIChsZXQgaW1hZ2VOYW1lIG9mIGltYWdlTmFtZXMpXG4gIHtcbiAgICBjb25zdCBpbWFnZSA9IGltYWdlc1tpbWFnZU5hbWVdO1xuICAgIGltYWdlUHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVzb2x2ZSkpKVxuICAgIGltYWdlLnNyYyA9IGAuLi9pbWcvJHtpbWFnZU5hbWV9LnBuZ2A7XG4gIH1cblxuICBhd2FpdCBQcm9taXNlLmFsbChpbWFnZVByb21pc2VzKTtcbiAgcmVhZHkgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKGdhbWVTdGF0ZSlcbntcbiAgaWYgKCFyZWFkeSkgcmV0dXJuO1xuXG4gIC8vIGlmIChnYW1lU3RhdGUucGxheWVyR3JpZFggIT09IHByaW9yR2FtZVN0YXRlLnBsYXllckdyaWRYXG4gIC8vIHx8IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSAhPT0gcHJpb3JHYW1lU3RhdGUucGxheWVyR3JpZFkpXG4gIC8vIHtcbiAgICB2aWV3Q29uc3RhbnRzLmN0eC5jbGVhclJlY3Qodmlld1N0YXRlLndpbmRvd1gsIHZpZXdTdGF0ZS53aW5kb3dZLCBXSU5ET1dfV0lEVEgsIFdJTkRPV19IRUlHSFQpO1xuICAgIHZpZXdTdGF0ZS53aW5kb3dYID0gZ2FtZVN0YXRlLnBsYXllckdyaWRYICogQ0VMTF9XSURUSCArIENFTExfV0lEVEggLyAyIC0gV0lORE9XX1dJRFRIIC8gMjtcbiAgICB2aWV3U3RhdGUud2luZG93WSA9IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSAqIENFTExfSEVJR0hUICsgQ0VMTF9IRUlHSFQgLyAyIC0gV0lORE9XX0hFSUdIVCAvIDI7XG4gICAgdmlld0NvbnN0YW50cy5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIC12aWV3U3RhdGUud2luZG93WCwgLXZpZXdTdGF0ZS53aW5kb3dZKTtcbiAgICByZW5kZXJNYXplKGdhbWVTdGF0ZSk7XG4gICAgcmVuZGVyUGxheWVyKGdhbWVTdGF0ZSk7XG4gIC8vIH1cblxuICByZW5kZXJJbmZvKGdhbWVTdGF0ZSk7XG5cbiAgcmVuZGVyVGltZShnYW1lU3RhdGUudGltZVJlbWFpbmluZyk7XG5cbiAgcHJpb3JHYW1lU3RhdGUgPSBnYW1lU3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJJbmZvKGdhbWVTdGF0ZSlcbntcbiAgaWYgKGdhbWVTdGF0ZS5yZW5kZXJlZEluZm8gJiYgZ2FtZVN0YXRlLnJlbmRlcmVkSW5mbyAhPT0gcHJpb3JHYW1lU3RhdGUucmVuZGVyZWRJbmZvKVxuICAgIHZpZXdDb25zdGFudHMubGlua0luZm9QYXJlbnQuaW5uZXJUZXh0ID0gZ2FtZVN0YXRlLnJlbmRlcmVkSW5mbztcblxuICAvLyBpZiAoZ2FtZVN0YXRlLnNjb3JlICE9PSBwcmlvckdhbWVTdGF0ZS5zY29yZSlcbiAgLy8ge1xuICAvLyAgIHZpZXdDb25zdGFudHMuc2NvcmVQYXJlbnQuaW5uZXJUZXh0ID0gZ2FtZVN0YXRlLnNjb3JlO1xuICAvLyB9XG5cbiAgaWYgKGdhbWVTdGF0ZS5hY3F1aXJlZFRyZWFzdXJlcz8ubGVuZ3RoICE9PSBwcmlvckdhbWVTdGF0ZS5hY3F1aXJlZFRyZWFzdXJlcz8ubGVuZ3RoKVxuICB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb2xsZWN0ZWQtZ2Vtcy1kaXNwbGF5XCIpLmlubmVySFRNTCA9XG4gICAgICBnYW1lU3RhdGUuYWNxdWlyZWRUcmVhc3VyZXMubWFwKGUgPT4gXCI8bGk+XCIgKyBlICsgXCI8L2xpPlwiKS5qb2luKFwiXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dQb3NUb0dyaWRQb3Mod2luZG93UG9zWCwgd2luZG93UG9zWSlcbntcbiAgY29uc3QgZ3JpZFBvc2l0aW9uWCA9IE1hdGguZmxvb3IoKHdpbmRvd1Bvc1ggLSB2aWV3Q29uc3RhbnRzLmNhbnZhcy5jbGllbnRMZWZ0ICsgdmlld1N0YXRlLndpbmRvd1gpIC8gQ0VMTF9XSURUSCk7XG4gIGNvbnN0IGdyaWRQb3NpdGlvblkgPSBNYXRoLmZsb29yKCh3aW5kb3dQb3NZIC0gdmlld0NvbnN0YW50cy5jYW52YXMuY2xpZW50VG9wICsgdmlld1N0YXRlLndpbmRvd1kpIC8gQ0VMTF9IRUlHSFQpXG4gIHJldHVybiAoe3g6IGdyaWRQb3NpdGlvblgsIHk6IGdyaWRQb3NpdGlvbll9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUGxheWVyKGdhbWVTdGF0ZSlcbntcbiAgcmVuZGVyUGxheWVyQ2VsbChnYW1lU3RhdGUucGxheWVyR3JpZFgsIGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSwgXCJibHVlXCIpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJNYXplKGdhbWVTdGF0ZSlcbntcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgZ2FtZVN0YXRlLm1hemUubGVuZ3RoIDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lU3RhdGUubWF6ZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGdhbWVTdGF0ZS5tYXplW2ldW2pdO1xuICAgICAgaWYgKGNlbGwudHlwZSAhPT0gXCJzcGFjZVwiKVxuICAgICAge1xuICAgICAgICByZW5kZXJDZWxsKGksIGosIGNlbGwudHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNlbGwoeCwgeSwgY2VsbFR5cGUpXG57XG4gIHZpZXdDb25zdGFudHMuY3R4LmRyYXdJbWFnZShpbWFnZXNbY2VsbFR5cGVdLCAwLCAwLCAxMDAsIDEwMCwgeCAqIENFTExfV0lEVEgsIHkgKiBDRUxMX1dJRFRILCBDRUxMX1dJRFRILCBDRUxMX0hFSUdIVCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclBsYXllckNlbGwoeCwgeSwgY29sb3IpXG57XG5cbiAgaWYgKGZyYW1lTnVtID09PSAxKVxuICB7XG4gICAgdmlld0NvbnN0YW50cy5jdHguZHJhd0ltYWdlKGltYWdlcy5jaGFyYTEsIDAsIDAsIDEwMCwgMTAwLCB4ICogQ0VMTF9XSURUSCwgeSAqIENFTExfV0lEVEgsIENFTExfV0lEVEgsIENFTExfSEVJR0hUKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICB2aWV3Q29uc3RhbnRzLmN0eC5kcmF3SW1hZ2UoaW1hZ2VzLmNoYXJhMiwgMTAwLCAwLCAtMTAwLCAxMDAsIHggKiBDRUxMX1dJRFRILCB5ICogQ0VMTF9XSURUSCwgQ0VMTF9XSURUSCwgQ0VMTF9IRUlHSFQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRpbWUodGltZVJlbWFpbmluZylcbntcbiAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWVSZW1haW5pbmcgLyA2MDAwMClcbiAgbGV0IHNlY29uZHMgPSBNYXRoLmZsb29yKCh0aW1lUmVtYWluaW5nICUgNjAwMDApIC8gMTAwMCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGltZS1yZW1haW5pbmdcIikuaW5uZXJIVE1MID0gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XG59XG5cbmZ1bmN0aW9uIGZsaXBGcmFtZU51bWJlcigpXG57XG4gIGZyYW1lTnVtID0gKGZyYW1lTnVtICsgMSkgJSAyXG59XG5cbiIsImltcG9ydCBjcmVhdGVOZXdHYW1lU3RhdGUgZnJvbSBcIi4vY3JlYXRlLW5ldy1nYW1lLXN0YXRlXCI7XG5pbXBvcnQgZ2VuZXJhdGVNYXplIGZyb20gJy4vbWF6ZS1nZW5lcmF0b3IuanMnO1xuY29uc3Qge2dldEFydGljbGVQcm9wZXJ0aWVzfSA9IHJlcXVpcmUoXCIuLi93aWtpLWFwaS9taWRsZXZlbG1hbmFnZXIubWpzXCIpO1xuY29uc3Qge3ZpZXdDb25zdGFudHN9ID0gcmVxdWlyZShcIi4vdmlldy1jb25zdGFudHNcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNldHVwUm9vbShnYW1lU3RhdGUpXG57XG4gIGNvbnN0IGFydGljbGVQcm9wZXJ0aWVzID0gYXdhaXQgZ2V0QXJ0aWNsZVByb3BlcnRpZXMoZ2FtZVN0YXRlLnRpdGxlKTtcbiAgY29uc3QgbWF6ZVByb3BlcnRpZXMgPSBnZW5lcmF0ZU1hemVQcm9wZXJ0aWVzKGdhbWVTdGF0ZSwgYXJ0aWNsZVByb3BlcnRpZXMpO1xuICBjb25zdCBtYXplID0gZ2VuZXJhdGVNYXplKG1hemVQcm9wZXJ0aWVzKTtcbiAgY29uc3QgcGxheWVySXNTdGlsbEVudGVyaW5nID0gdHJ1ZTtcblxuICBsZXQgeCwgeTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXplLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXplLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAobWF6ZVtpXVtqXS50eXBlID09PSBcImVudHJhbmNlXCIpIHtcbiAgICAgICAgeCA9IGk7XG4gICAgICAgIHkgPSBqO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh4KVxuICAgICAge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGF5ZXJHcmlkWCA9IHgsIHBsYXllckdyaWRZID0geTtcblxuICBjb25zdCBuZXdHYW1lU3RhdGUgPSBjcmVhdGVOZXdHYW1lU3RhdGUoZ2FtZVN0YXRlLFxuICAgIHtcbiAgICAgIG1hemUsXG4gICAgICBwbGF5ZXJJc1N0aWxsRW50ZXJpbmcsXG4gICAgICBwbGF5ZXJHcmlkWCxcbiAgICAgIHBsYXllckdyaWRZXG4gICAgfSk7XG5cbiAgdmlld0NvbnN0YW50cy5yb29tVGl0bGVQYXJlbnQuaW5uZXJUZXh0ID0gbmV3R2FtZVN0YXRlLnRpdGxlO1xuXG4gIHJldHVybiBuZXdHYW1lU3RhdGU7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTWF6ZVByb3BlcnRpZXMoZ2FtZVN0YXRlLCBhcnRpY2xlUHJvcGVydGllcylcbntcbiAgY29uc3Qgc2l6ZSA9IE1hdGgubWluKE1hdGgubWF4KGFydGljbGVQcm9wZXJ0aWVzLndvcmRDb3VudCAvIDQwMCwgMTApLCAxNSk7XG4gIGNvbnN0IG51bWJlck9mRXhpdHMgPSAgTWF0aC5taW4oTWF0aC5tYXgoYXJ0aWNsZVByb3BlcnRpZXMubGlua3MubGVuZ3RoIC8gMTAsIDEpLCAxMCk7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogZ2FtZVN0YXRlLnRpdGxlLFxuICAgIHNpemU6IHNpemUsXG4gICAgc2ltcGxpY2l0eTogMSAvIChNYXRoLmNlaWwoYXJ0aWNsZVByb3BlcnRpZXMubGlua3MubGVuZ3RoKSAvIDgwKSxcbiAgICBsaW5rczogZ3JhYlhSYW5kb21MaW5rcyhhcnRpY2xlUHJvcGVydGllcy5saW5rcywgbnVtYmVyT2ZFeGl0cyksXG4gICAgdHJlYXN1cmVzOiBbLi4uYXJ0aWNsZVByb3BlcnRpZXMuY2l0YXRpb25zTmVlZGVkLCAuLi5hcnRpY2xlUHJvcGVydGllcy5jbGFyaWZpY2F0aW9uc05lZWRlZF1cbiAgfVxufVxuXG5mdW5jdGlvbiBncmFiWFJhbmRvbUxpbmtzKGxpbmtzLCB4KVxue1xuICBjb25zdCBsaW5rc0NvcHkgPSBbLi4ubGlua3NdXG4gIGNvbnN0IHJhbmRvbUxpbmtzID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHg7IGkrKylcbiAge1xuICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobGlua3NDb3B5Lmxlbmd0aCAtIDEpKTtcbiAgICByYW5kb21MaW5rcy5wdXNoKGxpbmtzQ29weVtyYW5kXSk7XG4gICAgbGlua3NDb3B5LnNwbGljZShyYW5kLCAxKTtcbiAgfVxuXG4gIHJldHVybiByYW5kb21MaW5rcztcbn1cbiIsIi8vIHRvZG86IGNhY2hlP1xuZXhwb3J0IGNvbnN0IHZpZXdDb25zdGFudHMgPVxue1xuICBzY29yZVBhcmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlJyksXG4gIHJvb21UaXRsZVBhcmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb210aXRsZScpLFxuICBsaW5rSW5mb1BhcmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpbmtpbmZvJyksXG4gIGNhbnZhczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyksXG4gIG1vZGFsUGFyZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWxiZycpLFxuICB0cmVhc3VyZUxpc3RQYXJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0cmVhc3VyZS1saXN0JyksXG4gIGN0eDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxufTtcbiIsImltcG9ydCAqIGFzIFdpa2kgZnJvbSAnLi93aWtpaW50ZXJmYWNlLm1qcydcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFydGljbGVQcm9wZXJ0aWVzKGFydGljbGVOYW1lKSB7XG5cbiAgYXdhaXQgV2lraS5hZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKGFydGljbGVOYW1lKTtcbiAgcmV0dXJuIHtcbiAgICB3b3JkQ291bnQ6IFdpa2kuZ2V0V29yZENvdW50KCksXG4gICAgbGlua3M6IFdpa2kuZ2V0TGlua3MoKSxcbiAgICBjaXRhdGlvbnNOZWVkZWQ6IFdpa2kuZ2V0Q2l0YXRpb25zTmVlZGVkKCksXG4gICAgY2xhcmlmaWNhdGlvbnNOZWVkZWQ6IFdpa2kuZ2V0Q2xhcmlmaWNhdGlvbnNOZWVkZWQoKVxuICB9XG59XG4iLCJjb25zdCBjdXJyZW50X2FydGljbGUgPSB7XG4gIGxpIDpbXSxcbiAgY24gOltdLFxuICBjbCA6W10sXG4gIHJlZnMgOltdLFxuICB3YyA6IDAsXG4gIHRpdGxlIDogXCJOb25lXCJcbn1cblxuZnVuY3Rpb24gY2lzcGxpdChzLHQpe1xuICByZXR1cm4gcy5zcGxpdChuZXcgUmVnRXhwKFJlZ0V4cC5lc2NhcGUodCksXCJpZ1wiKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmRDb3VudCgpe3JldHVybiBjdXJyZW50X2FydGljbGUud2M7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua3MoKXtyZXR1cm4gY3VycmVudF9hcnRpY2xlLmxpO31cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENpdGF0aW9uc05lZWRlZCgpe3JldHVybiBjdXJyZW50X2FydGljbGUuY247fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhcmlmaWNhdGlvbnNOZWVkZWQoKSB7cmV0dXJuIGN1cnJlbnRfYXJ0aWNsZS5jbDt9XG5cblxuZnVuY3Rpb24gcmV2ZXJzZV90cnVuYyhzdHIpe1xuICBjb25zdCBic3RyPXN0clxuICBjb25zdCBkZWxpbT1ic3RyLnNsaWNlKC0xKVxuICBpZihkZWxpbVswXSA9PSBcIi5cIil7XG4gICAgcmV0dXJuIGJzdHIuc3BsaXQoL1s7Llxcbl0vKS5hdCgtMikrXCIuXCJcbiAgfWVsc2V7XG4gICAgcmV0dXJuIGJzdHIuc3BsaXQoL1s7Llxcbl0vKS5hdCgtMSkrXCIuXCJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRfY2l0YXRpb25fbmVlZGVkcyhhcnRpY2xlKXtcbiAgY29uc3Qgc3BsPWFydGljbGUuc3BsaXQoXCJ7e2NuXCIpXG5cbiAgY29uc3QgY2l0YXRpb25zID0gc3BsLm1hcChyZXZlcnNlX3RydW5jKS5zbGljZSgwLC0xKVxuICByZXR1cm4gY2l0YXRpb25zXG59XG5cbmZ1bmN0aW9uIGdldF9jbGFyaWZpY2F0aW9uX25lZWRlZHMoYXJ0aWNsZSl7XG4gIGNvbnN0IHNwbD1hcnRpY2xlLnNwbGl0KFwie3tjbGFyaWZ5XCIpXG5cbi8vICAgIGNvbnNvbGUubG9nKHNwbFswXSlcbiAgY29uc3QgY2l0YXRpb25zID0gc3BsLm1hcChyZXZlcnNlX3RydW5jKS5zbGljZSgwLC0xKVxuICByZXR1cm4gY2l0YXRpb25zXG59XG5cbmZ1bmN0aW9uIHVuYnJhY2tldChsKXtcbiAgcmV0dXJuIGwuc3BsaXQoXCJdXVwiKVswXTtcblxufVxuXG5mdW5jdGlvbiBnZXRfb3V0Z29pbmdfbGlua3MoYXJ0aWNsZSl7XG4gIGNvbnN0IHNwbD1hcnRpY2xlLnNwbGl0KFwiW1tcIikuc2xpY2UoMSlcbiAgY29uc3QgbGk9c3BsLm1hcCh1bmJyYWNrZXQpLmZpbHRlcihsaW5rID0+IChsaW5rLnNlYXJjaCgvW15hLXpBLVogXS8pID09IC0xKSlcbiAgcmV0dXJuIGxpXG59XG5cbmZ1bmN0aW9uIGNvdW50V29yZHMoc3RyKSB7XG4gIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KC9cXHMrLykubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBnZXRfd29yZGNvdW50KGFydGljbGUpe1xuICByZXR1cm4gY291bnRXb3JkcyhhcnRpY2xlKVxufVxuXG5mdW5jdGlvbiBnZXRfY2l0ZV90aXRsZShzdHIpe1xuICB0cnkge1xuICAgIGNvbnN0IGE9c3RyLnNwbGl0KG5ldyBSZWdFeHAoUmVnRXhwLmVzY2FwZShcInRpdGxlXCIpLFwiaWdcIikpWzFdLnNwbGl0KFwiPVwiKVsxXVxuICAgIGNvbnN0IGI9YS5zcGxpdChcInxcIilbMF1cbiAgICByZXR1cm4gYjtcbiAgfWNhdGNoe1xuICAgIHJldHVybiBcIkRlYWQgQmVlZlwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldF9yZWZlcmVuY2VzKGFydGljbGUpe1xuICBjb25zdCBzcGw9YXJ0aWNsZS5zcGxpdChuZXcgUmVnRXhwKFJlZ0V4cC5lc2NhcGUoXCJ7e2NpdGVcIiksXCJpZ1wiKSkuc2xpY2UoMSlcbiAgY29uc3QgYWJsPWNpc3BsaXQoYXJ0aWNsZSxcInt7Y2l0ZVwiKVxuICByZXR1cm4gc3BsLm1hcChnZXRfY2l0ZV90aXRsZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKHRpdGxlKSB7XG4gIGNvbnN0IGI9IGF3YWl0IGZldGNoKGBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvdy9yZXN0LnBocC92MS9wYWdlL2ArdGl0bGUpXG4gIGNvbnN0IGJkYXRhPSBhd2FpdCBiLmpzb24oKTtcbiAgY3VycmVudF9hcnRpY2xlLmNuPWdldF9jaXRhdGlvbl9uZWVkZWRzKGJkYXRhLnNvdXJjZSlcbiAgY3VycmVudF9hcnRpY2xlLmNsPWdldF9jbGFyaWZpY2F0aW9uX25lZWRlZHMoYmRhdGEuc291cmNlKVxuICBjdXJyZW50X2FydGljbGUubGk9Z2V0X291dGdvaW5nX2xpbmtzKGJkYXRhLnNvdXJjZSlcbiAgY3VycmVudF9hcnRpY2xlLndjPWdldF93b3JkY291bnQoYmRhdGEuc291cmNlKVxuICBjdXJyZW50X2FydGljbGUudGl0bGU9dGl0bGVcbiAgY3VycmVudF9hcnRpY2xlLnJlZnM9Z2V0X3JlZmVyZW5jZXMoYmRhdGEuc291cmNlKVxuICBjb25zb2xlLmxvZyhjdXJyZW50X2FydGljbGUudGl0bGUpO1xuICByZXR1cm4gXCJoaVwiXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFhZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKHRpdGxlKSB7XG4gIGNvbnN0IGE9ICBhZmV0Y2hXaWtpcGVkaWFBcnRpY2xlKHRpdGxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoV2lraXBlZGlhQXJ0aWNsZSh0aXRsZSkge1xuICBhYWZldGNoV2lraXBlZGlhQXJ0aWNsZSh0aXRsZSk7XG4gIGNvbnNvbGUubG9nKHRpdGxlKTtcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLnRpdGxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGR1bXBXaWtpQXJ0aWNsZSgpIHtcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLnRpdGxlKVxuICBjb25zb2xlLmxvZyhcIiBjbjpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLmNuKVxuICBjb25zb2xlLmxvZyhcIiBjbDpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLmNsKVxuICBjb25zb2xlLmxvZyhcIiBsaTpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLmxpKVxuICBjb25zb2xlLmxvZyhcIiB3YzpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLndjKVxuICBjb25zb2xlLmxvZyhcIiByZWZzOlwiKVxuICBjb25zb2xlLmxvZyhjdXJyZW50X2FydGljbGUucmVmcylcblxufVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRXaWtpQXJ0aWNsZShuYW1lKSB7XG4gIGNvbnN0IGY9IGZldGNoV2lraXBlZGlhQXJ0aWNsZShuYW1lKVxufVxuXG5cbi8vY29uc29sZS5sb2coJ2FzZGYnKTtcbi8vYXdhaXQgYWZldGNoV2lraXBlZGlhQXJ0aWNsZShcIkJhc3Nvb25cIik7XG4vL2R1bXBXaWtpQXJ0aWNsZSgpXG4vL2NvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS5saW5rcylcblxuLy9tb2R1bGUuZXhwb3J0cyA9IHsgbG9hZFdpa2lBcnRpY2xlLGR1bXBXaWtpQXJ0aWNsZSB9O1xuXG5cbi8vIFRPIFJVTiBJTiBURVJNSU5BTCwgVFlQRVxuLy8gbm9kZSBGSUxFUEFUSFxuXG5cbiIsImNvbnN0IEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vc3JjL2dlbmVyYXRvcnMvZ2VuZXJhdG9yLmpzJyk7XG5jb25zdCBNYXplR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9zcmMvZ2VuZXJhdG9ycy9tYXplLmpzJyk7XG5jb25zdCBSb29tR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9zcmMvZ2VuZXJhdG9ycy9yb29tLmpzJyk7XG5jb25zdCBTdGFpckdlbmVyYXRvciA9IHJlcXVpcmUoJy4vc3JjL2dlbmVyYXRvcnMvc3RhaXJzLmpzJyk7XG5jb25zdCBSZW5kZXJlciA9IHJlcXVpcmUoJy4vc3JjL3JlbmRlcmVyLmpzJyk7XG5jb25zdCBDZWxsID0gcmVxdWlyZSgnLi9zcmMvY2VsbC5qcycpO1xuY29uc3QgR3JpZCA9IHJlcXVpcmUoJy4vc3JjL2dyaWQuanMnKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi9zcmMvdXRpbHMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdG9yczoge1xuICAgICAgICBnZW5lcmF0b3I6IEdlbmVyYXRvcixcbiAgICAgICAgbWF6ZTogTWF6ZUdlbmVyYXRvcixcbiAgICAgICAgcm9vbTogUm9vbUdlbmVyYXRvcixcbiAgICAgICAgc3RhaXJzOiBTdGFpckdlbmVyYXRvclxuICAgIH0sXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgIGNlbGw6IENlbGwsXG4gICAgZ3JpZDogR3JpZCxcbiAgICB1dGlsczogVXRpbHNcbn0iLCJjbGFzcyBDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6LCB2aXNpdGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy56ID0gejtcbiAgICAgICAgdGhpcy5ibG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZCB8fCBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2VsbDsiLCJjbGFzcyBHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGdlbmVyYXRvcnMpIHtcbiAgICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9ycyA9IGdlbmVyYXRvcnMubWFwKFxuICAgICAgICAgICAgZ2VuZXJhdG9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBnZW4gPSBuZXcgZ2VuZXJhdG9yLmdlbmVyYXRvcih0aGlzLmRhdGEsIGdlbmVyYXRvci5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBnZW4uZGF0YTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdlbmVyYXRlID0gKCkgPT4gdGhpcy5nZW5lcmF0b3JzLmZvckVhY2goXG4gICAgICAgIGdlbmVyYXRvciA9PiBnZW5lcmF0b3IuZ2VuZXJhdGUoKVxuICAgICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdG9yO1xuIiwiY29uc3QgR3JpZCA9IHJlcXVpcmUoJy4uL2dyaWQuanMnKTtcbmNvbnN0IHtSYW5kb219ID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuXG5jbGFzcyBNYXplR2VuZXJhdG9yIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgTWF6ZUdlbmVyYXRvclxuICAgICAqIEBjbGFzc2Rlc2MgVGhlIG1hemUgZ2VuZXJhdG9yIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBnZW5lcmF0aW5nIGEgZ3JpZCBvZiBDZWxsIG9iamVjdHMgYW5kIHN0b3JpbmcgdGhlbS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCB0byB1c2UuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIGdyaWQuXG4gICAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5mbG9vcnMgLSBUaGUgdG90YWwgbnVtYmVyIG9mIGZsb29ycyBpbiB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF94IC0gVGhlIHggcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc3RhcnRfeSAtIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBjZWxsLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnN0YXJ0X3ogLSBUaGUgeiBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgY2VsbC5cbiAgICAgKiBAcGFyYW0ge0NlbGx9IG9wdGlvbnMuZ3JpZF9jbGFzcyAtIFRoZSBjbGFzcyB1c2VkIHRvIGdlbmVyYXRlIGEgZ3JpZCwgY29udGFpbnMgY2VsbCBkYXRhLlxuICAgICAqIEBwYXJhbSB7Q2VsbH0gb3B0aW9ucy5jZWxsX2NsYXNzIC0gVGhlIGNsYXNzIHVzZWQgdG8gcmVwcmVzZW50IGEgY2VsbCBvbiB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm5laWdoYm9yX3Bvc2l0aW9ucyAtIFRoZSBhcnJheSBvZiBuZWlnaGJvciBwb3NpdGlvbnMgdG8gdXNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YXx8e307XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubmVpZ2hib3JfcG9zaXRpb25zID0gb3B0aW9ucy5uZWlnaGJvcl9wb3NpdGlvbnMgfHwgW1swLCAtMl0sIFswLCAyXSwgWy0yLCAwXSwgWzIsIDBdXTtcbiAgICAgICAgdGhpcy5zdGFydF9jZWxsX2Nvb3JkID0geyB4OiAxLCB5OiAxIH07XG4gICAgICAgIGNvbnN0IEdyaWRDbGFzcyA9IG9wdGlvbnMuZ3JpZF9jbGFzcyB8fCBHcmlkO1xuICAgICAgICB0aGlzLmRhdGEuZ3JpZCA9IG5ldyBHcmlkQ2xhc3Moe1xuICAgICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0LFxuICAgICAgICAgICAgdG90YWxfZmxvb3JzOiBvcHRpb25zLmZsb29ycyxcbiAgICAgICAgICAgIGNlbGxfY2xhc3M6IG9wdGlvbnMuY2VsbF9jbGFzcyxcbiAgICAgICAgICAgIHN0YXJ0X3g6IG9wdGlvbnMuc3RhcnRfeCxcbiAgICAgICAgICAgIHN0YXJ0X3k6IG9wdGlvbnMuc3RhcnRfeSxcbiAgICAgICAgICAgIHN0YXJ0X3o6IG9wdGlvbnMuc3RhcnRfeixcbiAgICAgICAgICAgIGZsb29yczogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gZ2V0TmVpZ2hib3JDZWxsc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZWxsXG4gICAgICogQHJldHVybnMgeypbQ2VsbF19XG4gICAgICovXG4gICAgZ2V0TmVpZ2hib3JDZWxscyA9IChjZWxsKSA9PiB7XG4gICAgICAgIGxldCBuZWlnaGJvcl9jZWxscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IG54ID0gY2VsbC54ICsgdGhpcy5uZWlnaGJvcl9wb3NpdGlvbnNbaV1bMF07XG4gICAgICAgICAgICBsZXQgbnkgPSBjZWxsLnkgKyB0aGlzLm5laWdoYm9yX3Bvc2l0aW9uc1tpXVsxXTtcbiAgICAgICAgICAgIGxldCBuZWlnaGJvcl9jZWxsID0gdGhpcy5kYXRhLmdyaWQuZ2V0TmVpZ2hib3JDZWxsKG54LCBueSwgY2VsbC56KTtcbiAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxsICYmICFuZWlnaGJvcl9jZWxsLnZpc2l0ZWQgJiYgbmVpZ2hib3JfY2VsbC5ibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgbmVpZ2hib3JfY2VsbHMucHVzaChuZWlnaGJvcl9jZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmVpZ2hib3JfY2VsbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGdlbmVyYXRlXG4gICAgICogQGRlc2NyaXB0aW9uIEdlbmVyYXRlIGEgbWF6ZSB1c2luZyB0aGUgZ3Jvd2luZyB0cmVlIGFsZ29yaXRobS5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBnZW5lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCB0aGlzLmRhdGEuZ3JpZC50b3RhbF9mbG9vcnM7IHorKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMuc3RhcnRfY2VsbF9jb29yZC54O1xuICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMuc3RhcnRfY2VsbF9jb29yZC55O1xuICAgICAgICAgICAgbGV0IGdldF9jZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBwcmV2X2NlbGxzID0gW107XG4gICAgICAgICAgICBsZXQgY3VycmVudF9jZWxsID0gdGhpcy5kYXRhLmdyaWQuZ2V0Q2VsbCh4LCB5LCB6KTtcblxuICAgICAgICAgICAgd2hpbGUgKGdldF9jZWxsKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudF9jZWxsLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvcl9jZWxscyA9IHRoaXMuZ2V0TmVpZ2hib3JDZWxscyhjdXJyZW50X2NlbGwpO1xuICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvcl9jZWxsID0gbmVpZ2hib3JfY2VsbHNbUmFuZG9tLnJhbmdlKDAsIG5laWdoYm9yX2NlbGxzLmxlbmd0aCldO1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZXhpdHNcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5feCA9IGN1cnJlbnRfY2VsbC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgbl95ID0gY3VycmVudF9jZWxsLnk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxsLnggPiBjdXJyZW50X2NlbGwueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbl94ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmVpZ2hib3JfY2VsbC54IDwgY3VycmVudF9jZWxsLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5feCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvcl9jZWxsLnkgPiBjdXJyZW50X2NlbGwueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbl95ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmVpZ2hib3JfY2VsbC55IDwgY3VycmVudF9jZWxsLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5feSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdfY2VsbCA9IHRoaXMuZGF0YS5ncmlkLmdldENlbGwobl94LCBuX3ksIHopO1xuICAgICAgICAgICAgICAgICAgICBuZXdfY2VsbC5ibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfY2VsbC5ibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHByZXZfY2VsbHMucHVzaChjdXJyZW50X2NlbGwpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50X2NlbGwgPSBuZWlnaGJvcl9jZWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZfY2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9jZWxsID0gcHJldl9jZWxscy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldF9jZWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWF6ZUdlbmVyYXRvcjtcbiIsImNvbnN0IHtSYW5kb219ID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcblxuY2xhc3MgUm9vbUdlbmVyYXRvciB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIFJvb21HZW5lcmF0b3JcbiAgICAgKiBAY2xhc3NkZXNjIEdlbmVyYXRlcyByb29tcyBmb3IgYSBjZWxscyBpbiBhIGdyaWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHRvIHVzZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5taW5Sb29tcyAtIFRoZSBtaW5pbXVtIG51bWJlciBvZiByb29tcyB0byBnZW5lcmF0ZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhSb29tcyAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb29tcyB0byBnZW5lcmF0ZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5taW5Sb29tV2lkdGggLSBUaGUgbWluaW11bSB3aWR0aCBvZiBhIHJvb20uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWluUm9vbUhlaWdodCAtIFRoZSBtaW5pbXVtIGhlaWdodCBvZiBhIHJvb20uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4Um9vbVdpZHRoIC0gVGhlIG1heGltdW0gd2lkdGggb2YgYSByb29tLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heFJvb21IZWlnaHQgLSBUaGUgbWF4aW11bSBoZWlnaHQgb2YgYSByb29tLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnRvdGFsUm9vbXMgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHJvb21zIHRvIGdlbmVyYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhfHx7fTtcbiAgICAgICAgdGhpcy5kYXRhLnJvb21zID0gW107XG4gICAgICAgIGNvbnN0IG1pblJvb21zID0gcGFyc2VJbnQob3B0aW9ucy5taW5Sb29tcykgfHwgMTtcbiAgICAgICAgY29uc3QgIG1heFJvb21zID0gcGFyc2VJbnQob3B0aW9ucy5tYXhSb29tcykgfHwgODtcbiAgICAgICAgdGhpcy5taW5Sb29tV2lkdGggPSBwYXJzZUludChvcHRpb25zLm1pblJvb21XaWR0aCkgfHwgMTtcbiAgICAgICAgdGhpcy5taW5Sb29tSGVpZ2h0ID0gcGFyc2VJbnQob3B0aW9ucy5taW5Sb29tSGVpZ2h0KSB8fCAxO1xuICAgICAgICB0aGlzLm1heFJvb21XaWR0aCA9IHBhcnNlSW50KG9wdGlvbnMubWF4Um9vbVdpZHRoKSB8fCA4O1xuICAgICAgICB0aGlzLm1heFJvb21IZWlnaHQgPSBwYXJzZUludChvcHRpb25zLm1heFJvb21IZWlnaHQpIHx8IDg7XG4gICAgICAgIHRoaXMudG90YWxSb29tcyA9IHRoaXMub3B0aW9ucy50b3RhbFJvb21zIHx8IFJhbmRvbS5yYW5nZShtaW5Sb29tcywgbWF4Um9vbXMpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgdGhpcy5kYXRhLmdyaWQudG90YWxfZmxvb3JzOyB6KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbFJvb21zOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcm9vbVdpZHRoID0gUmFuZG9tLnJhbmdlKHRoaXMubWluUm9vbVdpZHRoLCB0aGlzLm1heFJvb21XaWR0aCk7XG4gICAgICAgICAgICAgICAgbGV0IHJvb21IZWlnaHQgPSBSYW5kb20ucmFuZ2UodGhpcy5taW5Sb29tSGVpZ2h0LCB0aGlzLm1heFJvb21IZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCByb29tID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBSYW5kb20ucmFuZ2UoMCwgdGhpcy5kYXRhLmdyaWQud2lkdGggLSByb29tV2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICB5OiBSYW5kb20ucmFuZ2UoMCwgdGhpcy5kYXRhLmdyaWQuaGVpZ2h0IC0gcm9vbUhlaWdodCksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiByb29tV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcm9vbUhlaWdodFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IHJvb20ueTsgeSA8IHJvb20ueSArIHJvb20uaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHJvb20ueDsgeCA8IHJvb20ueCArIHJvb20ud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5ncmlkLmlzSW5OYXZpZ2F0aW9uQm91bmRzKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmdyaWQudW5ibG9ja0NlbGwoeCwgeSwgeik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnJvb21zLnB1c2gocm9vbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vbUdlbmVyYXRvcjtcbiIsIi8qKlxuICogQGNsYXNzIFN0YWlyc0dlbmVyYXRvclxuICogQGNsYXNzZGVzYyBHZW5lcmF0ZXMgc3RhaXJzIGZvciBhIGNlbGxzIGluIGEgZ3JpZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IHRvIHVzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHRvIHVzZS5cbiAqL1xuY2xhc3MgU3RhaXJzR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGF8fHt9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zfHx7YXNjZW5kaW5nOiBmYWxzZX07XG4gICAgICAgIHRoaXMubWF4X3N0YWlycyA9IG9wdGlvbnMubWF4X3N0YWlycyB8fCAxO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0b3RhbF9zdGFpcnNfYnlfZmxvb3IgPSB7fTtcbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGVhY2ggZmxvb3IgaW4gdGhlIGdyaWRcbiAgICAgICAgZm9yIChsZXQgZmxvb3IgPSAwOyBmbG9vciA8IHRoaXMuZGF0YS5ncmlkLnRvdGFsX2Zsb29ycyAtIDE7IGZsb29yKyspIHtcbiAgICAgICAgICAgIC8vIFJlcGVhdCBsb29wIHVudGlsIHdlIGZpbmQgYSBjZWxsIHRoYXQgc2F0aXNmaWVzIHRoZSBjb25kaXRpb25zXG4gICAgICAgICAgICBsZXQgY2VsbCA9IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodG90YWxfc3RhaXJzX2J5X2Zsb29yW2Zsb29yXSAmJiB0b3RhbF9zdGFpcnNfYnlfZmxvb3JbZmxvb3JdID49IHRoaXMubWF4X3N0YWlycykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzX2Zsb29yX2NlbGwgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0X2Zsb29yX2NlbGwgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGEgcmFuZG9tIGNlbGwgZnJvbSB0aGUgY3VycmVudCBmbG9vclxuICAgICAgICAgICAgICAgIGNlbGwgPSB0aGlzLmRhdGEuZ3JpZC5yYW5kb21DZWxsKGZsb29yKTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5ibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcHJldmlvdXMgZmxvb3IgY2VsbFxuICAgICAgICAgICAgICAgIGlmIChmbG9vciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfZmxvb3JfY2VsbCA9IHRoaXMuZGF0YS5ncmlkLmNlbGxzW2Zsb29yIC0gMV1bY2VsbC55XVtjZWxsLnhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNfZmxvb3JfY2VsbC5ibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c19mbG9vcl9jZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgbmV4dCBmbG9vciBjZWxsXG4gICAgICAgICAgICAgICAgbmV4dF9mbG9vcl9jZWxsID0gdGhpcy5kYXRhLmdyaWQuY2VsbHNbZmxvb3IgKyAxXVtjZWxsLnldW2NlbGwueF07XG4gICAgICAgICAgICAgICAgaWYgKG5leHRfZmxvb3JfY2VsbCA9PT0gbnVsbCB8fCBuZXh0X2Zsb29yX2NlbGwuYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgc3RhaXJzXG4gICAgICAgICAgICAgICAgY2VsbC5zdGFpcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRfZmxvb3I6IG5leHRfZmxvb3JfY2VsbCxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLm9wdGlvbnMuYXNjZW5kaW5nID8gJ3VwJyA6ICdkb3duJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKG5leHRfZmxvb3JfY2VsbCkgbmV4dF9mbG9vcl9jZWxsLnN0YWlycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfZmxvb3I6IGNlbGwsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5vcHRpb25zLmFzY2VuZGluZyA/ICdkb3duJyA6ICd1cCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRvdGFsX3N0YWlyc19ieV9mbG9vcltmbG9vcl0gPSAodG90YWxfc3RhaXJzX2J5X2Zsb29yW2Zsb29yXSB8fCAwKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhaXJzR2VuZXJhdG9yO1xuIiwiY29uc3QgQ2VsbCA9IHJlcXVpcmUoXCIuL2NlbGxcIik7XG5jb25zdCB7UmFuZG9tfSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuY29uc3QgTUlOX1dJRFRIID0gNTtcbmNvbnN0IE1JTl9IRUlHSFQgPSA1O1xuY29uc3QgTUlOX0JPVU5EQVJZID0gLTE7XG5jb25zdCBNSU5fTkVJR0hCT1JfQk9VTkRBUlkgPSAwO1xuY29uc3QgTUlOX0ZMT09SUyA9IDE7XG5cbi8qKlxuICogQGNsYXNzIEdyaWRcbiAqIEBkZXNjcmlwdGlvbiBUaGUgZ3JpZCBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgZ2VuZXJhdGluZywgc3RvcmluZyBhbmQgbWFuaXB1bGF0aW5nIGEgZ3JpZCBvZiBDZWxsIG9iamVjdCBpbnN0YW5jZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBncmlkLlxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gVGhlIGhlaWdodCBvZiB0aGUgZ3JpZC5cbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuZmxvb3JzIC0gVGhlIHRvdGFsIG51bWJlciBvZiBmbG9vcnMgaW4gdGhlIGdyaWQuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF94IC0gVGhlIHggcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF95IC0gVGhlIHkgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF96IC0gVGhlIHogcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gKiBAcGFyYW0ge0NlbGx9IG9wdGlvbnMuY2VsbF9jbGFzcyAtIFRoZSBjbGFzcyB1c2VkIHRvIHJlcHJlc2VudCBhIGNlbGwgb24gdGhlIGdyaWQuXG4gKi9cbmNsYXNzIEdyaWQge1xuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBjb25zdHJ1Y3RvclxuICAgICAqIEBkZXNjcmlwdGlvbiBHZW5lcmF0ZSBhIEdyaWQgb2JqZWN0IG9mIGdpdmVuIGRpbWVuc2lvbnMgZmlsbGVkIHdpdGggQ2VsbCBvYmplY3RzIGFuZCBmbG9vciBkYXRhLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyAgT3B0aW9uYWwgYXJndW1lbnRzIGZvciB0aGUgR3JpZCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAvLyBJbml0aWFsaXplIGFsbCBwcm9wZXJ0aWVzLCBhbmQgdGhlbiB0aGUgZ3JpZC5cbiAgICAgICAgdGhpcy53aWR0aCA9IHBhcnNlSW50KG9wdGlvbnMud2lkdGgpIHx8IE1JTl9XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUludChvcHRpb25zLmhlaWdodCkgfHwgTUlOX0hFSUdIVDtcbiAgICAgICAgdGhpcy50b3RhbF9mbG9vcnMgPSBwYXJzZUludChvcHRpb25zLnRvdGFsX2Zsb29ycykgfHwgTUlOX0ZMT09SUztcbiAgICAgICAgdGhpcy5zdGFydF94ID0gcGFyc2VJbnQob3B0aW9ucy5zdGFydF94KSB8fCAwO1xuICAgICAgICB0aGlzLnN0YXJ0X3kgPSBwYXJzZUludChvcHRpb25zLnN0YXJ0X3kpIHx8IDA7XG4gICAgICAgIHRoaXMuc3RhcnRfeiA9IHBhcnNlSW50KG9wdGlvbnMuc3RhcnRfeikgfHwgMDtcbiAgICAgICAgdGhpcy5DZWxsQ2xhc3MgPSBvcHRpb25zLmNlbGxfY2xhc3N8fENlbGw7XG4gICAgICAgIHRoaXMuY3VycmVudEZsb29yID0gb3B0aW9ucy5jdXJyZW50Rmxvb3J8fDA7XG4gICAgICAgIGlmICh0aGlzLndpZHRoIDw9IE1JTl9XSURUSCkgdGhpcy53aWR0aCA9IE1JTl9XSURUSDtcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0IDw9IE1JTl9IRUlHSFQpIHRoaXMuaGVpZ2h0ID0gTUlOX0hFSUdIVDtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRfeCA+IHRoaXMud2lkdGggLSAxKSB0aGlzLnN0YXJ0X3ggPSB0aGlzLnN0YXJ0X3ggLSAxO1xuICAgICAgICBpZiAodGhpcy5zdGFydF95ID4gdGhpcy5oZWlnaHQgLSAxKSB0aGlzLnN0YXJ0X3kgPSB0aGlzLnN0YXJ0X3kgLSAxO1xuICAgICAgICBpZiAodGhpcy5zdGFydF96ID49IHRoaXMudG90YWxfZmxvb3JzKSB0aGlzLnN0YXJ0X3ogPSB0aGlzLnRvdGFsX2Zsb29ycyAtIDE7XG4gICAgICAgIHRoaXMuZmxvb3JzID0gW107XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBpbml0aWFsaXplXG4gICAgICogQGRlc2NyaXB0aW9uIEl0ZXJhdGVzIHRocm91Z2ggZWFjaCBjb29yZGluYXRlIGFuZCBjcmVhdGVzIGEgY2VsbCBhdCB0aGF0IGxvY2F0aW9uLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCB6ID0gdGhpcy5zdGFydF96OyB6IDwgdGhpcy50b3RhbF9mbG9vcnM7IHorKykge1xuICAgICAgICAgICAgdGhpcy5mbG9vcnNbel0gPSB7fTsgIC8vIHNldCBmbG9vciBkYXRhIHRvIGFuIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgdGhpcy5jZWxsc1t6XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRoaXMuc3RhcnRfeTsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHRoaXMuc3RhcnRfeDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdID0gbmV3IHRoaXMuQ2VsbENsYXNzKHgsIHksIHopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiByYW5kb21DZWxsXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgYSByYW5kb20gY2VsbCBmcm9tIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geiAgICAgIFRoZSBmbG9vciB0byBnZXQgYSBjZWxsIGZyb21cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICBDZWxsIG9iamVjdFxuICAgICAqL1xuICAgIHJhbmRvbUNlbGwgPSAoeikgPT4ge1xuICAgICAgICBjb25zdCB4ID0gUmFuZG9tLnJhbmdlKE1JTl9ORUlHSEJPUl9CT1VOREFSWSwgdGhpcy53aWR0aCAtIDIpO1xuICAgICAgICBjb25zdCB5ID0gUmFuZG9tLnJhbmdlKE1JTl9ORUlHSEJPUl9CT1VOREFSWSwgdGhpcy5oZWlnaHQgLSAyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbCh4LCB5LCB6KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gaXNJbkJvdW5kc1xuICAgICAqIEBkZXNjcmlwdGlvbiBDaGVja3MgaWYgZ2l2ZW4gY29vcmRpbmF0ZXMgYXJlIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgICB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHkgICAgeS1jb29yZGluYXRlIG9mIHRoZSBjZWxsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgIHRydWUgaWYgaW4gYm91bmRzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc0luQm91bmRzID0gKHgsIHkpID0+IChcbiAgICAgICAgeCA8IHRoaXMud2lkdGhcbiAgICAgICAgJiYgeCA+IE1JTl9CT1VOREFSWVxuICAgICAgICAmJiB5IDwgdGhpcy5oZWlnaHRcbiAgICAgICAgJiYgeSA+IE1JTl9CT1VOREFSWVxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gaXNJbk5hdmlnYXRpb25Cb3VuZHNcbiAgICAgKiBAZGVzY3JpcHRpb24gQ2hlY2tzIGlmIGdpdmVuIGNvb3JkaW5hdGVzIGFyZSB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgZ3JpZCB1c2VkIGZvciBuYXZpZ2F0aW9uLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgICB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHkgICAgeS1jb29yZGluYXRlIG9mIHRoZSBjZWxsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgIHRydWUgaWYgaW4gYm91bmRzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc0luTmF2aWdhdGlvbkJvdW5kcyA9ICh4LCB5KSA9PiAoXG4gICAgICAgIHggPCB0aGlzLndpZHRoIC0gMVxuICAgICAgICAmJiB4ID4gTUlOX05FSUdIQk9SX0JPVU5EQVJZXG4gICAgICAgICYmIHkgPCB0aGlzLmhlaWdodCAtIDFcbiAgICAgICAgJiYgeSA+IE1JTl9ORUlHSEJPUl9CT1VOREFSWVxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gZ2V0Q2VsbFxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXRzIGEgY2VsbCBmcm9tIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geSAgIHktY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geiAgIHRoZSBmbG9vciBvZiB0aGUgY2VsbFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgIENlbGwgb2JqZWN0IGlmIGluIGJvdW5kcywgbnVsbCBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBnZXRDZWxsID0gKHgsIHksIHopID0+IHRoaXMuaXNJbkJvdW5kcyh4LCB5KSA/IHRoaXMuY2VsbHNbel1beV1beF0gOiBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGdldE5laWdoYm9yQ2VsbFxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXRzIGEgY2VsbCBmcm9tIHRoZSBncmlkLiBGdW5jdGlvbnMgdGhlIHNhbWUgYXMgZ2V0Q2VsbCwgYnV0IGNoZWNrcyBhZ2FpbnN0IG5hdmlnYXRpb24gYm91bmRzLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0geCAgIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geSAgIHktY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSAge051bWJlcn0geiAgIHRoZSBmbG9vciBvZiB0aGUgY2VsbFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgIENlbGwgb2JqZWN0IGlmIGluIGJvdW5kcywgbnVsbCBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBnZXROZWlnaGJvckNlbGwgPSAoeCwgeSwgeikgPT4gdGhpcy5pc0luTmF2aWdhdGlvbkJvdW5kcyh4LCB5KSA/IHRoaXMuY2VsbHNbel1beV1beF0gOiBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIHVuYmxvY2tDZWxsXG4gICAgICogQGRlc2NyaXB0aW9uIFVuYmxvY2tzIGEgY2VsbCBpZiBpdCBpcyBpbiBib3VuZHMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHggIHgtY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5ICB5LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geiAgdGhlIGZsb29yIG9mIHRoZSBjZWxsXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB1bmJsb2NrQ2VsbCA9ICh4LCB5LCB6KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5Cb3VuZHMoeCwgeSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbel1beV1beF0uYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWQ7IiwiY2xhc3MgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKGdlbmVyYXRvcikge1xuICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGdlbmVyYXRvci5kYXRhLmdyaWQudG90YWxfZmxvb3JzOyB6KyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGbG9vciAke3p9YCk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGdlbmVyYXRvci5kYXRhLmdyaWQuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBnZW5lcmF0b3IuZGF0YS5ncmlkLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBnZW5lcmF0b3IuZGF0YS5ncmlkLmNlbGxzW3pdW3ldW3hdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZiA9IGNlbGwuYmxvY2tlZCA/ICdcXHUyNTg4JyA6ICdcXHUyNTkxJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5zdGFpcnMuZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZiA9ICdcXHUyNUIyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYgPSAnXFx1MjVCQyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcm93ICs9IGY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyZXI7IiwiLyoqXG4gKiBAY2xhc3MgUmFuZG9tXG4gKiBAZGVzY3JpcHRpb24gQSBzdGF0aWMgY2xhc3MgZm9yIGdlbmVyYXRpbmcgcmFuZG9tIG51bWJlcnMuXG4gKi9cbmNsYXNzIFJhbmRvbSB7XG4gICAgX3NlZWQgPSBudWxsO1xuICAgIHN0YXRpYyBfaW5zdGFuY2UgPSBudWxsO1xuXG4gICAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKFJhbmRvbS5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIFJhbmRvbS5faW5zdGFuY2UgPSBuZXcgUmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJhbmRvbS5faW5zdGFuY2U7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICB0aGlzLl9zZWVkID0gc2VlZCB8fCBNYXRoLnJhbmRvbSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBSYW5kb20uc2VlZFxuICAgICAqIFNldHMgdGhlIHNlZWQgZm9yIHRoZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuICAgICAqIEBwYXJhbSBzZWVkXG4gICAgICogQHJldHVybnMgeyp8bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBzZWVkID0gKHNlZWQpID0+IHtcbiAgICAgICAgUmFuZG9tLmluc3RhbmNlLl9zZWVkID0gc2VlZDtcbiAgICAgICAgcmV0dXJuIFJhbmRvbS5pbnN0YW5jZS5fc2VlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gUmFuZG9tLm5leHRcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIG51bWJlclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIG5leHQoKSB7XG4gICAgICAgIGxldCB4ID0gTWF0aC5zaW4oUmFuZG9tLmluc3RhbmNlLl9zZWVkKSAqIDEwMDAwO1xuICAgICAgICBSYW5kb20uaW5zdGFuY2UuX3NlZWQgPSB4IC0gTWF0aC5mbG9vcih4KTtcbiAgICAgICAgcmV0dXJuIHggLSBNYXRoLmZsb29yKHgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBSYW5kb20ucmFuZ2VcbiAgICAgKiBSZXR1cm5zIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyByYW5nZSA9IChtaW4sIG1heCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihSYW5kb20ubmV4dCgpICogKG1heCAtIG1pbikpICsgbWluO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUmFuZG9tOiBSYW5kb21cbn07XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1haW4gZnJvbSAnLi9nYW1lL2luZGV4LmpzJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==