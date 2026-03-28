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

          //todo: this is supposed to be immutable
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

        if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('w')) playerDirectionY--;
        if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('a')) playerDirectionX--;
        if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('s')) playerDirectionY++;
        if ((0,_input__WEBPACK_IMPORTED_MODULE_0__.getKeyStatus)('d')) playerDirectionX++;

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
          image.src = `img/${imageName}.png`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCOzs7Ozs7Ozs7O0FDM0lBO0FBQ0E7QUFDQSx3QkFBd0Isc0NBQXNDO0FBQzlELGlDQUFpQyxFQUFFO0FBQ25DLDRCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQSxnQ0FBZ0MsK0JBQStCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDdkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05tQyIsInNvdXJjZXMiOlsid2VicGFjazovLyAvLi9qcy9nYW1lL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItZW50cmFuY2UuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvY2hlY2stcGxheWVyLXBvc2l0aW9uLWZvci1leGl0LmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItdHJlYXN1cmUuanMiLCJ3ZWJwYWNrOi8vIC8uL2pzL2dhbWUvY3JlYXRlLW5ldy1nYW1lLXN0YXRlLmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL2hlbHBlcnMvd2lraS5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9pbnB1dC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9tYXplLWdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9wcm9jZXNzLWtleS1pbnB1dC5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9wcm9jZXNzLW1vdXNlLWlucHV0LmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8gLy4vanMvZ2FtZS9zZXR1cC1yb29tLmpzIiwid2VicGFjazovLyAvLi9qcy9nYW1lL3ZpZXctY29uc3RhbnRzLmpzIiwid2VicGFjazovLyAvLi9qcy93aWtpLWFwaS9taWRsZXZlbG1hbmFnZXIubWpzIiwid2VicGFjazovLyAvLi9qcy93aWtpLWFwaS93aWtpaW50ZXJmYWNlLm1qcyIsIndlYnBhY2s6Ly8gLy4vbm9kZV9tb2R1bGVzL25vZGUtbWF6ZS1nZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9jZWxsLmpzIiwid2VicGFjazovLyAvLi9ub2RlX21vZHVsZXMvbm9kZS1tYXplLWdlbmVyYXRvci9zcmMvZ2VuZXJhdG9ycy9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9nZW5lcmF0b3JzL21hemUuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9nZW5lcmF0b3JzL3Jvb20uanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9nZW5lcmF0b3JzL3N0YWlycy5qcyIsIndlYnBhY2s6Ly8gLy4vbm9kZV9tb2R1bGVzL25vZGUtbWF6ZS1nZW5lcmF0b3Ivc3JjL2dyaWQuanMiLCJ3ZWJwYWNrOi8vIC8uL25vZGVfbW9kdWxlcy9ub2RlLW1hemUtZ2VuZXJhdG9yL3NyYy9yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly8gLy4vbm9kZV9tb2R1bGVzL25vZGUtbWF6ZS1nZW5lcmF0b3Ivc3JjL3V0aWxzLmpzIiwid2VicGFjazovLyAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vIC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vIC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLyAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8gLy4vanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVOZXdHYW1lU3RhdGUgZnJvbSBcIi4vY3JlYXRlLW5ldy1nYW1lLXN0YXRlXCI7XG5pbXBvcnQgc2V0dXBSb29tIGZyb20gXCIuL3NldHVwLXJvb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY2hlY2tQbGF5ZXJQb3NpdGlvbkZvckVudHJhbmNlKGdhbWVTdGF0ZSkge1xuICBjb25zdCBlbnRyYW5jZVVwZGF0ZXMgPSB7fVxuICBpZiAoaXNQbGF5ZXJPbkVudHJhbmNlKGdhbWVTdGF0ZSkpIHtcbiAgICBpZiAoIWdhbWVTdGF0ZS5wbGF5ZXJJc1N0aWxsRW50ZXJpbmcpIHtcbiAgICAgIGVudHJhbmNlVXBkYXRlcy50aXRsZSA9IGdhbWVTdGF0ZS5lbnRyYW5jZU5hbWU7XG4gICAgICBlbnRyYW5jZVVwZGF0ZXMuZW50cmFuY2VOYW1lID0gZ2FtZVN0YXRlLnRpdGxlO1xuXG4gICAgICBjb25zdCBuZXdHYW1lU3RhdGUgPSBjcmVhdGVOZXdHYW1lU3RhdGUoZ2FtZVN0YXRlLCBlbnRyYW5jZVVwZGF0ZXMpO1xuICAgICAgLy8gc3RvcEFuZENsZWFyKCk7XG4gICAgICBjb25zdCBuZXdSb29tU3RhdGUgPSBhd2FpdCBzZXR1cFJvb20obmV3R2FtZVN0YXRlKTtcbiAgICAgIHJldHVybiBuZXdSb29tU3RhdGU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVudHJhbmNlVXBkYXRlcy5wbGF5ZXJJc1N0aWxsRW50ZXJpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gZW50cmFuY2VVcGRhdGVzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzUGxheWVyT25FbnRyYW5jZShnYW1lU3RhdGUpXG57XG4gIHJldHVybiBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIDAuNSwgMCkpXVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIDAuNSwgMCkpXS50eXBlID09PSAnZW50cmFuY2UnO1xufVxuIiwiaW1wb3J0IGNyZWF0ZU5ld0dhbWVTdGF0ZSBmcm9tIFwiLi9jcmVhdGUtbmV3LWdhbWUtc3RhdGVcIjtcbmltcG9ydCBzZXR1cFJvb20gZnJvbSBcIi4vc2V0dXAtcm9vbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBjaGVja1BsYXllclBvc2l0aW9uRm9yRXhpdChnYW1lU3RhdGUpXG57XG4gIGNvbnN0IHtwbGF5ZXJJc09uRXhpdCwgZXhpdFRpdGxlfSA9IGlzUGxheWVyT25FeGl0KGdhbWVTdGF0ZSk7XG4gIGlmIChwbGF5ZXJJc09uRXhpdClcbiAge1xuICAgIGNvbnN0IGV4aXRVcGRhdGVzID0ge31cblxuICAgIGV4aXRVcGRhdGVzLmVudHJhbmNlTmFtZSA9IGdhbWVTdGF0ZS50aXRsZTtcbiAgICBleGl0VXBkYXRlcy50aXRsZSA9IGV4aXRUaXRsZTtcblxuICAgIGNvbnN0IG5ld0dhbWVTdGF0ZSA9IGNyZWF0ZU5ld0dhbWVTdGF0ZShnYW1lU3RhdGUsIGV4aXRVcGRhdGVzKTtcbiAgICBjb25zdCBuZXdSb29tR2FtZVN0YXRlID0gYXdhaXQgc2V0dXBSb29tKG5ld0dhbWVTdGF0ZSk7XG4gICAgcmV0dXJuIG5ld1Jvb21HYW1lU3RhdGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQbGF5ZXJPbkV4aXQoZ2FtZVN0YXRlKVxue1xuICBjb25zdCBjZWxsID0gZ2FtZVN0YXRlLm1hemVbTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFggKyAwLjUsIDApKV1bTWF0aC5mbG9vcihNYXRoLm1heChnYW1lU3RhdGUucGxheWVyR3JpZFkgKyAwLjUsIDApKV07XG4gIGNvbnN0IHBsYXllcklzT25FeGl0ID0gY2VsbC50eXBlID09PSBcImV4aXRcIlxuICBjb25zdCBleGl0VGl0bGUgPSBjZWxsLnRpdGxlO1xuICByZXR1cm4ge3BsYXllcklzT25FeGl0LCBleGl0VGl0bGV9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tQbGF5ZXJQb3NpdGlvbkZvclRyZWFzdXJlKGdhbWVTdGF0ZSkge1xuICBjb25zdCB0cmVhc3VyZUFjcXVpcmVkID0gaXNQbGF5ZXJPblRyZWFzdXJlKGdhbWVTdGF0ZSk7XG4gIGlmICh0cmVhc3VyZUFjcXVpcmVkKSB7XG4gICAgY29uc3QgdHJlYXN1cmVVcGRhdGVzID0ge307XG4gICAgdHJlYXN1cmVVcGRhdGVzLnNjb3JlID0gZ2FtZVN0YXRlLnNjb3JlICsgMTtcbiAgICB0cmVhc3VyZVVwZGF0ZXMuYWNxdWlyZWRUcmVhc3VyZXMgPSBbLi4uZ2FtZVN0YXRlLmFjcXVpcmVkVHJlYXN1cmVzLCBgJHtnYW1lU3RhdGUudGl0bGV9OiAke3RyZWFzdXJlQWNxdWlyZWR9YF1cblxuICAgIC8vdG9kbzogdGhpcyBpcyBzdXBwb3NlZCB0byBiZSBpbW11dGFibGVcbiAgICBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIDAuNSldW01hdGguZmxvb3IoZ2FtZVN0YXRlLnBsYXllckdyaWRZICsgMC41KV0udHlwZSA9IFwic3BhY2VcIjtcblxuICAgIHJldHVybiB0cmVhc3VyZVVwZGF0ZXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQbGF5ZXJPblRyZWFzdXJlKGdhbWVTdGF0ZSlcbntcbiAgcmV0dXJuIChcbiAgICBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIDAuNSwgMCkpXVtNYXRoLmZsb29yKE1hdGgubWF4KGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIDAuNSwgMCkpXS50eXBlID09PSAndHJlYXN1cmUnXG4gICAgICA/IGdhbWVTdGF0ZS5tYXplW01hdGguZmxvb3IoTWF0aC5tYXgoZ2FtZVN0YXRlLnBsYXllckdyaWRYICsgMC41LCAwKSldW01hdGguZmxvb3IoTWF0aC5tYXgoZ2FtZVN0YXRlLnBsYXllckdyaWRZICsgMC41LCAwKSldLm5hbWVcbiAgICAgIDogZmFsc2VcbiAgKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU5ld0dhbWVTdGF0ZShnYW1lU3RhdGUsIG5ld1Byb3BlcnRpZXMpXG57XG4gIGNvbnN0IG5ld0dhbWVTdGF0ZSA9IHsuLi5nYW1lU3RhdGUsIC4uLm5ld1Byb3BlcnRpZXN9O1xuICBPYmplY3QuZnJlZXplKG5ld0dhbWVTdGF0ZSk7XG4gIHJldHVybiBuZXdHYW1lU3RhdGU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRSYW5kb21BcnRpY2xlTmFtZSgpXG57XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3cvYXBpLnBocD9hY3Rpb249cXVlcnkmbGlzdD1yYW5kb20mZm9ybWF0PWpzb24mcm5uYW1lc3BhY2U9MCZybmxpbWl0PTEmb3JpZ2luPSpcIik7XG4gIGNvbnN0IHJlc3VsdERhdGEgPSBhd2FpdCByZXN1bHQuanNvbigpO1xuICBjb25zdCB0aXRsZSA9IHJlc3VsdERhdGEucXVlcnkucmFuZG9tWzBdLnRpdGxlXG4gIHJldHVybiB0aXRsZTtcbn1cbiIsImltcG9ydCB7cmVuZGVyfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCBwcm9jZXNzTW91c2VJbnB1dCBmcm9tIFwiLi9wcm9jZXNzLW1vdXNlLWlucHV0XCI7XG5pbXBvcnQgcHJvY2Vzc0tleUlucHV0IGZyb20gXCIuL3Byb2Nlc3Mta2V5LWlucHV0XCI7XG5pbXBvcnQgY2hlY2tQbGF5ZXJQb3NpdGlvbkZvclRyZWFzdXJlIGZyb20gXCIuL2NoZWNrLXBsYXllci1wb3NpdGlvbi1mb3ItdHJlYXN1cmVcIjtcbmltcG9ydCBjcmVhdGVOZXdHYW1lU3RhdGUgZnJvbSBcIi4vY3JlYXRlLW5ldy1nYW1lLXN0YXRlXCI7XG5pbXBvcnQgc2V0dXBSb29tIGZyb20gXCIuL3NldHVwLXJvb21cIjtcbmltcG9ydCBjaGVja1BsYXllclBvc2l0aW9uRm9yRXhpdCBmcm9tIFwiLi9jaGVjay1wbGF5ZXItcG9zaXRpb24tZm9yLWV4aXRcIjtcbmltcG9ydCBjaGVja1BsYXllclBvc2l0aW9uRm9yRW50cmFuY2UgZnJvbSBcIi4vY2hlY2stcGxheWVyLXBvc2l0aW9uLWZvci1lbnRyYW5jZVwiO1xuaW1wb3J0IGdldFJhbmRvbUFydGljbGVOYW1lIGZyb20gXCIuL2hlbHBlcnMvd2lraVwiO1xuaW1wb3J0IHt2aWV3Q29uc3RhbnRzfSBmcm9tIFwiLi92aWV3LWNvbnN0YW50c1wiO1xuXG5sZXQgYW5pbWF0aW9uRnJhbWU7XG5cbmNvbnN0IHNob3VsZFBvcHVsYXRlVHJlYXN1cmVzID0gZ2FtZVN0YXRlID0+ICFnYW1lU3RhdGUuYWNxdWlyZWRUcmVhc3VyZXMuZmluZChlbnRyeSA9PiBlbnRyeS5yb29tID09PSB0aXRsZSlcblxuc3RhcnQoKTtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKVxue1xuICBjb25zdCByYW5kb21UaXRsZSA9IGF3YWl0IGdldFJhbmRvbUFydGljbGVOYW1lKCk7XG5cbiAgY29uc3QgZ2FtZVN0YXRlUHJvcGVydGllcyA9IHtcbiAgICBhY3F1aXJlZFRyZWFzdXJlczogW10sXG4gICAgcGxheWVySXNTdGlsbEVudGVyaW5nOiBmYWxzZSxcbiAgICBlbnRyYW5jZU5hbWU6IHJhbmRvbVRpdGxlLFxuICAgIG1hemU6IFtdLFxuICAgIHNjb3JlOiAwLFxuICAgIHRpdGxlOiByYW5kb21UaXRsZSxcbiAgICBwbGF5ZXJEaXJlY3Rpb25YOiAwLFxuICAgIHBsYXllckRpcmVjdGlvblk6IDAsXG4gICAgcGxheWVyU3BlZWQ6IDMuNSxcbiAgICBwbGF5ZXJHcmlkWDogMCxcbiAgICBwbGF5ZXJHcmlkWTogMCxcbiAgfVxuXG4gIGNvbnN0IGdhbWVTdGF0ZSA9IGNyZWF0ZU5ld0dhbWVTdGF0ZSh7fSwgZ2FtZVN0YXRlUHJvcGVydGllcyk7XG4gIGNvbnN0IGdhbWVTdGF0ZUFmdGVyU2V0dXAgPSBhd2FpdCBzZXR1cFJvb20oZ2FtZVN0YXRlKTtcbiAgbG9vcChnYW1lU3RhdGVBZnRlclNldHVwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9vcChnYW1lU3RhdGUpXG57XG4gIHRyeSB7XG4gICAgY29uc3QgbW91c2VVcGRhdGVzID0gcHJvY2Vzc01vdXNlSW5wdXQoZ2FtZVN0YXRlKTtcbiAgICBjb25zdCBrZXlVcGRhdGVzID0gcHJvY2Vzc0tleUlucHV0KGdhbWVTdGF0ZSk7XG4gICAgY29uc3QgcG9zaXRpb25VcGRhdGVzID0gY2hlY2tQbGF5ZXJQb3NpdGlvbkZvclRyZWFzdXJlKGdhbWVTdGF0ZSlcbiAgICAgIHx8IGF3YWl0IGNoZWNrUGxheWVyUG9zaXRpb25Gb3JFeGl0KGdhbWVTdGF0ZSlcbiAgICAgIHx8IGF3YWl0IGNoZWNrUGxheWVyUG9zaXRpb25Gb3JFbnRyYW5jZShnYW1lU3RhdGUpO1xuXG4gICAgY29uc3QgZ2FtZVN0YXRlVXBkYXRlcyA9XG4gICAgICB7XG4gICAgICAgIC4uLm1vdXNlVXBkYXRlcyxcbiAgICAgICAgLi4ua2V5VXBkYXRlcyxcbiAgICAgICAgLi4ucG9zaXRpb25VcGRhdGVzXG4gICAgICB9O1xuXG4gICAgY29uc3QgbmV3R2FtZVN0YXRlID0gY3JlYXRlTmV3R2FtZVN0YXRlKGdhbWVTdGF0ZSwgZ2FtZVN0YXRlVXBkYXRlcyk7XG5cbiAgICByZW5kZXIobmV3R2FtZVN0YXRlKTtcblxuICAgIGFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGxvb3AobmV3R2FtZVN0YXRlKSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKVxuICB7XG4gICAgdmlld0NvbnN0YW50cy5tb2RhbFBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIHZpZXdDb25zdGFudHMudHJlYXN1cmVMaXN0UGFyZW50LmlubmVySFRNTCA9IGBcbiAgICAgICR7Z2FtZVN0YXRlLmFjcXVpcmVkVHJlYXN1cmVzLm1hcChlID0+IFwiPGxpPlwiICsgZSArIFwiPC9saT5cIil9XG4gICAgYFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4oKSB7fVxuIiwiaW1wb3J0IHt3aW5kb3dQb3NUb0dyaWRQb3N9IGZyb20gXCIuL3JlbmRlclwiO1xuXG5sZXQga2V5U3RhdHVzID0ge307XG5sZXQgbW91c2VTdGF0dXMgPSBmYWxzZTtcbmxldCBtb3VzZUdyaWRQb3MgPSB7eDowLHk6MH07XG5sZXQgbW91c2VUYXJnZXQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlTdGF0dXMoa2V5KVxue1xuICByZXR1cm4ga2V5U3RhdHVzW2tleV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb3VzZVN0YXR1cygpXG57XG4gIHJldHVybiB7bW91c2VTdGF0dXMsIG1vdXNlR3JpZFBvcywgbW91c2VUYXJnZXR9O1xufVxuXG4vLyBmdW5jdGlvbiBzdGFydCgpXG4vLyB7XG4gIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbktleVVwKTtcbiAgYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBwcm9jZXNzTW91c2VDbGljayk7XG4gIGFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHByb2Nlc3NNb3VzZVVwKTtcbi8vIH1cblxuZnVuY3Rpb24gc3RvcCgpXG57XG4gIGtleVN0YXR1cyA9IHt9O1xuICByZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICByZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCk7XG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcHJvY2Vzc01vdXNlQ2xpY2spO1xuICByZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBwcm9jZXNzTW91c2VVcCk7XG59XG5cbmZ1bmN0aW9uIG9uS2V5RG93bihlKVxue1xuICBrZXlTdGF0dXNbZS5rZXldID0gdHJ1ZVxufVxuXG5mdW5jdGlvbiBvbktleVVwKGUpXG57XG4gIGtleVN0YXR1c1tlLmtleV0gPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc01vdXNlQ2xpY2soZSlcbntcbiAgdHJ5IHtcbiAgICBtb3VzZVN0YXR1cyA9IHRydWU7XG4gICAgbW91c2VHcmlkUG9zID0gd2luZG93UG9zVG9HcmlkUG9zKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICBtb3VzZVRhcmdldCA9IGUudGFyZ2V0O1xuICB9XG4gIGNhdGNoIChlKVxuICB7XG4gICAgY29uc29sZS5lcnJvcihlKVxuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NNb3VzZVVwKGUpXG57XG4gIG1vdXNlU3RhdHVzID0gZmFsc2U7XG4gIG1vdXNlVGFyZ2V0ID0gbnVsbDtcbn1cbiIsImNvbnN0IG5tZyA9IHJlcXVpcmUoXCJub2RlLW1hemUtZ2VuZXJhdG9yXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZU1hemUocHJvcGVydGllcylcbntcbiAgY29uc3QgZ2VuZXJhdG9yID0gbmV3IG5tZy5nZW5lcmF0b3JzLm1hemUoe30sIHt3aWR0aDogcHJvcGVydGllcy5zaXplLCBoZWlnaHQ6IHByb3BlcnRpZXMuc2l6ZX0pO1xuICBjb25zdCBtYXplID0gZ2VuZXJhdG9yLmRhdGEuZ3JpZC5jZWxsc1swXS5tYXAocm93ID0+XG4gICAgcm93Lm1hcChjZWxsID0+IGNlbGwuYmxvY2tlZCA/IHt0eXBlOiBcIndhbGxcIiwgeDogY2VsbC54LCB5OiBjZWxsLnl9IDoge3R5cGU6IFwic3BhY2VcIiwgeDogY2VsbC54LCB5OiBjZWxsLnl9KVxuICApXG4gIG9wZW5VcE1hemVJblBsYWNlKG1hemUsIHByb3BlcnRpZXMuc2ltcGxpY2l0eSk7XG5cbiAgY29uc3QgdXNhYmxlQm9yZGVyVGlsZXMgPSBnZXRVc2FibGVCb3JkZXJUaWxlcyhtYXplKTtcblxuICBjcmVhdGVFbnRyYW5jZUluUGxhY2UobWF6ZSwgdXNhYmxlQm9yZGVyVGlsZXMpO1xuICBjcmVhdGVFeGl0c0luUGxhY2UobWF6ZSwgcHJvcGVydGllcy5saW5rcywgdXNhYmxlQm9yZGVyVGlsZXMpO1xuICAvLyBpZiAoc2hvdWxkUG9wdWxhdGVUcmVhc3VyZXMoZ2FtZVN0YXRlKSlcbiAgY3JlYXRlVHJlYXN1cmVzSW5QbGFjZShtYXplLCBwcm9wZXJ0aWVzLnRyZWFzdXJlcyk7XG5cbiAgcmV0dXJuIG1hemVcbn1cblxuZnVuY3Rpb24gb3BlblVwTWF6ZUluUGxhY2UobWF6ZSwgc2ltcGxpY2l0eSlcbntcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbWF6ZS5sZW5ndGggOyBpKyspXG4gIHtcbiAgICBmb3IgKGxldCBqID0gMCA7IGogPCBtYXplW2ldLmxlbmd0aCA7IGorKylcbiAgICB7XG4gICAgICBjb25zdCBjZWxsID0gbWF6ZVtpXVtqXTtcbiAgICAgIGlmIChjZWxsLnR5cGUgPT09IFwid2FsbFwiICYmIGkgPiAwICYmIGogPiAwICYmIGkgPCBtYXplLmxlbmd0aCAtIDEgJiYgaiA8IG1hemUubGVuZ3RoIC0gMSAmJiBNYXRoLnJhbmRvbSgpIDwgc2ltcGxpY2l0eSlcbiAgICAgIHtcbiAgICAgICAgbWF6ZVtpXVtqXS50eXBlID0gXCJzcGFjZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRVc2FibGVCb3JkZXJUaWxlcyhtYXplKVxue1xuICBjb25zdCB1c2FibGVCb3JkZXJUaWxlcyA9IFtdXG5cbiAgLy8gdG9wXG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IG1hemUubGVuZ3RoIDsgaSsrKVxuICB7XG4gICAgaWYgKG1hemVbaV1bMF0udHlwZSA9PT0gXCJ3YWxsXCIgJiYgbWF6ZVtpXVsxXS50eXBlID09PSBcInNwYWNlXCIpXG4gICAgICB1c2FibGVCb3JkZXJUaWxlcy5wdXNoKHt4OiBpLCB5OiAwfSk7XG4gIH1cblxuICAvLyBib3R0b21cbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbWF6ZS5sZW5ndGggOyBpKyspXG4gIHtcbiAgICBpZiAobWF6ZVtpXVttYXplLmxlbmd0aCAtIDFdLnR5cGUgPT09IFwid2FsbFwiICYmIG1hemVbaV1bbWF6ZS5sZW5ndGggLSAyXS50eXBlID09PSBcInNwYWNlXCIpXG4gICAgICB1c2FibGVCb3JkZXJUaWxlcy5wdXNoKHt4OiBpLCB5OiBtYXplLmxlbmd0aCAtMX0pO1xuICB9XG5cbiAgLy8gbGVmdCwgbWludXMgdG9wIGFuZCBib3R0b21cbiAgZm9yIChsZXQgaSA9IDEgOyBpIDwgbWF6ZS5sZW5ndGggLTEgIDsgaSsrKVxuICB7XG4gICAgaWYgKG1hemVbMF1baV0udHlwZSA9PT0gXCJ3YWxsXCIgJiYgbWF6ZVsxXVtpXS50eXBlID09PSBcInNwYWNlXCIpXG4gICAgICB1c2FibGVCb3JkZXJUaWxlcy5wdXNoKHt4OiAwLCB5OiBpfSk7XG4gIH1cblxuICAvL3JpZ2h0LCBtaW51cyB0b3AgYW5kIGJvdHRvbVxuICBmb3IgKGxldCBpID0gMSA7IGkgPCBtYXplLmxlbmd0aCAtMSAgOyBpKyspXG4gIHtcbiAgICBpZiAobWF6ZVttYXplLmxlbmd0aCAtIDFdW2ldLnR5cGUgPT09IFwid2FsbFwiICYmIG1hemVbbWF6ZS5sZW5ndGggLSAyXVtpXS50eXBlID09PSBcInNwYWNlXCIpXG4gICAgICB1c2FibGVCb3JkZXJUaWxlcy5wdXNoKHt4OiBtYXplLmxlbmd0aCAtIDEsIHk6IGl9KTtcbiAgfVxuXG4gIHJldHVybiB1c2FibGVCb3JkZXJUaWxlcztcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW50cmFuY2VJblBsYWNlKG1hemUsIHVzYWJsZUJvcmRlclRpbGVzKVxue1xuICBjb25zdCBpbmRleCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVzYWJsZUJvcmRlclRpbGVzLmxlbmd0aCAtIDEpKTtcblxuICBjb25zdCBwb3MgPSB1c2FibGVCb3JkZXJUaWxlc1tpbmRleF07XG5cbiAgdXNhYmxlQm9yZGVyVGlsZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuICBtYXplW3Bvcy54XVtwb3MueV0udHlwZSA9IFwiZW50cmFuY2VcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXhpdHNJblBsYWNlKG1hemUsIGxpbmtzLCB1c2FibGVCb3JkZXJUaWxlcylcbntcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbGlua3MubGVuZ3RoICYmIGkgPCB1c2FibGVCb3JkZXJUaWxlcy5sZW5ndGggOyBpKyspXG4gIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVzYWJsZUJvcmRlclRpbGVzLmxlbmd0aCAtIDEpKTtcblxuICAgIGNvbnN0IHBvcyA9IHVzYWJsZUJvcmRlclRpbGVzW2luZGV4XTtcblxuICAgIHVzYWJsZUJvcmRlclRpbGVzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBtYXplW3Bvcy54XVtwb3MueV0udHlwZSA9IFwiZXhpdFwiO1xuICAgIG1hemVbcG9zLnhdW3Bvcy55XS50aXRsZSA9IGxpbmtzW2ldO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRyZWFzdXJlc0luUGxhY2UobWF6ZSwgY2l0ZXNOZWVkZWQpXG57XG4gIGNvbnN0IGVtcHR5U3BhY2VzID0gbWF6ZS5mbGF0KCkuZmlsdGVyKGNlbGwgPT4gY2VsbC50eXBlID09PSBcInNwYWNlXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGNpdGVzTmVlZGVkLmxlbmd0aCA7IGkrKylcbiAge1xuICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogKGVtcHR5U3BhY2VzLmxlbmd0aCAtIDEpKSk7XG4gICAgZW1wdHlTcGFjZXNbcmFuZF0udHlwZSA9IFwidHJlYXN1cmVcIjtcbiAgICBlbXB0eVNwYWNlc1tyYW5kXS5uYW1lID0gY2l0ZXNOZWVkZWRbaV07XG4gICAgZW1wdHlTcGFjZXMuc3BsaWNlKHJhbmQsIDEpO1xuICB9XG59XG4iLCJpbXBvcnQge2dldEtleVN0YXR1c30gZnJvbSBcIi4vaW5wdXRcIjtcblxubGV0IGxhc3RUaW1lID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvY2Vzc0tleUlucHV0KGdhbWVTdGF0ZSlcbntcblxuICBsZXQgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpIC8gMTAwMDtcbiAgbGV0IGR0ID0gY3VycmVudFRpbWUgLSBsYXN0VGltZTtcbiAgbGFzdFRpbWUgPSBjdXJyZW50VGltZTtcblxuICBsZXQgcGxheWVyRGlyZWN0aW9uWCA9IDAsIHBsYXllckRpcmVjdGlvblkgPSAwO1xuXG4gIGlmIChnZXRLZXlTdGF0dXMoJ3cnKSkgcGxheWVyRGlyZWN0aW9uWS0tO1xuICBpZiAoZ2V0S2V5U3RhdHVzKCdhJykpIHBsYXllckRpcmVjdGlvblgtLTtcbiAgaWYgKGdldEtleVN0YXR1cygncycpKSBwbGF5ZXJEaXJlY3Rpb25ZKys7XG4gIGlmIChnZXRLZXlTdGF0dXMoJ2QnKSkgcGxheWVyRGlyZWN0aW9uWCsrO1xuXG4gIC8vIHNvIGhhY2t5IGxvbFxuICBpZiAocGxheWVyRGlyZWN0aW9uWCAhPT0gMCAmJiBwbGF5ZXJEaXJlY3Rpb25ZICE9PSAwKVxuICB7XG4gICAgcGxheWVyRGlyZWN0aW9uWCAqPSAwLjc7XG4gICAgcGxheWVyRGlyZWN0aW9uWSAqPSAwLjc7XG4gIH1cblxuICBsZXQgdmVsb2NpdHlYID0gcGxheWVyRGlyZWN0aW9uWCAqIGdhbWVTdGF0ZS5wbGF5ZXJTcGVlZCAqIGR0O1xuICBsZXQgdmVsb2NpdHlZID0gcGxheWVyRGlyZWN0aW9uWSAqIGdhbWVTdGF0ZS5wbGF5ZXJTcGVlZCAqIGR0O1xuXG4gIGxldCBjaGVja1BvaW50cyA9IHtcbiAgICB1cHBlckxlZnQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjIsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArICB2ZWxvY2l0eVkgKyAwLjJ9LFxuICAgIHVwcGVyUmlnaHQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjgsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSArIDAuMn0sXG4gICAgbG93ZXJSaWdodDoge3g6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIHZlbG9jaXR5WCArIDAuOCwgeTogZ2FtZVN0YXRlLnBsYXllckdyaWRZICsgdmVsb2NpdHlZICsgMC44fSxcbiAgICBsb3dlckxlZnQ6IHt4OiBnYW1lU3RhdGUucGxheWVyR3JpZFggKyB2ZWxvY2l0eVggKyAwLjIsIHk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSArIDAuOH0sXG4gIH1cblxuICBpZiAodmVsb2NpdHlYIDwgMClcbiAge1xuICAgIGlmIChjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy51cHBlckxlZnQpIHx8IGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLmxvd2VyTGVmdCkpXG4gICAge1xuICAgICAgdmVsb2NpdHlYID0gMDtcbiAgICB9XG4gIH1cblxuICBlbHNlIGlmICh2ZWxvY2l0eVggPiAwKVxuICB7XG4gICAgaWYgKGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLnVwcGVyUmlnaHQpIHx8IGNoZWNrRm9yV2FsbChnYW1lU3RhdGUsIGNoZWNrUG9pbnRzLmxvd2VyUmlnaHQpKVxuICAgIHtcbiAgICAgIHZlbG9jaXR5WCA9IDA7XG4gICAgfVxuICB9XG5cbiAgaWYgKHZlbG9jaXR5WSA8IDApXG4gIHtcbiAgICBpZiAoY2hlY2tGb3JXYWxsKGdhbWVTdGF0ZSwgY2hlY2tQb2ludHMudXBwZXJMZWZ0KSB8fCBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy51cHBlclJpZ2h0KSlcbiAgICB7XG4gICAgICB2ZWxvY2l0eVkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGVsc2UgaWYgKHZlbG9jaXR5WSA+IDApXG4gIHtcbiAgICBpZiAoY2hlY2tGb3JXYWxsKGdhbWVTdGF0ZSwgY2hlY2tQb2ludHMubG93ZXJMZWZ0KSB8fCBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBjaGVja1BvaW50cy5sb3dlclJpZ2h0KSlcbiAgICB7XG4gICAgICB2ZWxvY2l0eVkgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7cGxheWVyR3JpZFg6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCArIHZlbG9jaXR5WCwgcGxheWVyR3JpZFk6IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWSArIHZlbG9jaXR5WSB9O1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvcldhbGwoZ2FtZVN0YXRlLCBwb3NpdGlvblZlY3RvcilcbntcbiAgcmV0dXJuIHBvc2l0aW9uVmVjdG9yLnggPCAwIHx8IHBvc2l0aW9uVmVjdG9yLnggPj0gZ2FtZVN0YXRlLm1hemUubGVuZ3RoXG4gICAgfHwgcG9zaXRpb25WZWN0b3IueSA8IDAgfHwgcG9zaXRpb25WZWN0b3IueSA+PSBnYW1lU3RhdGUubWF6ZS5sZW5ndGhcbiAgICB8fCBnYW1lU3RhdGUubWF6ZVtNYXRoLmZsb29yKHBvc2l0aW9uVmVjdG9yLngpXVtNYXRoLmZsb29yKHBvc2l0aW9uVmVjdG9yLnkpXS50eXBlID09PSBcIndhbGxcIjtcbn1cbiIsImltcG9ydCB7Z2V0TW91c2VTdGF0dXN9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQge3ZpZXdDb25zdGFudHN9IGZyb20gXCIuL3ZpZXctY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NNb3VzZUlucHV0KGdhbWVTdGF0ZSlcbntcbiAgbGV0IG1vdXNlVXBkYXRlcyA9IHt9O1xuXG4gIGNvbnN0IHttb3VzZVN0YXR1cywgbW91c2VHcmlkUG9zLCBtb3VzZVRhcmdldH0gPSBnZXRNb3VzZVN0YXR1cygpO1xuXG4gIGlmIChtb3VzZVRhcmdldCA9PT0gdmlld0NvbnN0YW50cy5zY29yZVBhcmVudClcbiAge1xuICAgIC8vIGNvbnNvbGUubG9nKGdhbWVTdGF0ZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKG1vdXNlU3RhdHVzICYmIG1vdXNlR3JpZFBvcy54ID49IDAgJiYgbW91c2VHcmlkUG9zLnkgPj0gMCAmJiBtb3VzZUdyaWRQb3MueCA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCAmJiBtb3VzZUdyaWRQb3MueSA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCkge1xuICAgICAgY29uc3Qge25hbWUsIHR5cGUsIHRpdGxlfSA9IGdhbWVTdGF0ZS5tYXplW21vdXNlR3JpZFBvcy54XVttb3VzZUdyaWRQb3MueV07XG4gICAgICBpZiAodHlwZSA9PT0gXCJleGl0XCIpIHtcbiAgICAgICAgbW91c2VVcGRhdGVzLnJlbmRlcmVkSW5mbyA9IHRpdGxlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcInRyZWFzdXJlXCIpIHtcbiAgICAgICAgbW91c2VVcGRhdGVzLnJlbmRlcmVkSW5mbyA9IG5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZW50cmFuY2VcIikge1xuICAgICAgICBtb3VzZVVwZGF0ZXMucmVuZGVyZWRJbmZvID0gZ2FtZVN0YXRlLmVudHJhbmNlTmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbW91c2VVcGRhdGVzO1xufVxuIiwiaW1wb3J0IHt2aWV3Q29uc3RhbnRzIGFzIGdhbWVTdGF0ZSwgdmlld0NvbnN0YW50c30gZnJvbSBcIi4vdmlldy1jb25zdGFudHNcIjtcblxuY29uc3QgQ0VMTF9XSURUSCA9IDYwLCBDRUxMX0hFSUdIVCA9IDYwO1xuY29uc3QgV0lORE9XX1dJRFRIID0gODAwLCBXSU5ET1dfSEVJR0hUID0gODAwO1xuY29uc3Qgdmlld1N0YXRlID0ge1xuICB3aW5kb3dYOiAwLFxuICB3aW5kb3dZOiAwLFxufVxuXG5sZXQgcHJpb3JHYW1lU3RhdGUgPSB7fTtcblxubGV0IHJlYWR5ID0gZmFsc2U7XG5cbmxldCBmcmFtZU51bSA9IDE7XG5cbmNvbnN0IGltYWdlcyA9IHtcbiAgXCJ3YWxsXCI6IG5ldyBJbWFnZSgpLFxuICBcImNoYXJhMVwiOiBuZXcgSW1hZ2UoKSxcbiAgXCJjaGFyYTJcIjogbmV3IEltYWdlKCksXG4gIFwiZW50cmFuY2VcIjogbmV3IEltYWdlKCksXG4gIFwiZXhpdFwiOiBuZXcgSW1hZ2UoKSxcbiAgXCJ0cmVhc3VyZVwiOiBuZXcgSW1hZ2UoKVxufVxuXG5sb2FkQWxsSW1hZ2VzKCk7XG5zZXRJbnRlcnZhbChmbGlwRnJhbWVOdW1iZXIsIDI1MCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRBbGxJbWFnZXMoKVxue1xuICBjb25zdCBpbWFnZU5hbWVzID0gW1wid2FsbFwiLCBcImNoYXJhMVwiLCBcImNoYXJhMlwiLCBcImVudHJhbmNlXCIsIFwiZXhpdFwiLCBcInRyZWFzdXJlXCJdO1xuICBjb25zdCBpbWFnZVByb21pc2VzID0gW107XG4gIGZvciAobGV0IGltYWdlTmFtZSBvZiBpbWFnZU5hbWVzKVxuICB7XG4gICAgY29uc3QgaW1hZ2UgPSBpbWFnZXNbaW1hZ2VOYW1lXTtcbiAgICBpbWFnZVByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlc29sdmUpKSlcbiAgICBpbWFnZS5zcmMgPSBgLi4vaW1nLyR7aW1hZ2VOYW1lfS5wbmdgO1xuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoaW1hZ2VQcm9taXNlcyk7XG4gIHJlYWR5ID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihnYW1lU3RhdGUpXG57XG4gIGlmICghcmVhZHkpIHJldHVybjtcblxuICAvLyBpZiAoZ2FtZVN0YXRlLnBsYXllckdyaWRYICE9PSBwcmlvckdhbWVTdGF0ZS5wbGF5ZXJHcmlkWFxuICAvLyB8fCBnYW1lU3RhdGUucGxheWVyR3JpZFkgIT09IHByaW9yR2FtZVN0YXRlLnBsYXllckdyaWRZKVxuICAvLyB7XG4gICAgdmlld0NvbnN0YW50cy5jdHguY2xlYXJSZWN0KHZpZXdTdGF0ZS53aW5kb3dYLCB2aWV3U3RhdGUud2luZG93WSwgV0lORE9XX1dJRFRILCBXSU5ET1dfSEVJR0hUKTtcbiAgICB2aWV3U3RhdGUud2luZG93WCA9IGdhbWVTdGF0ZS5wbGF5ZXJHcmlkWCAqIENFTExfV0lEVEggKyBDRUxMX1dJRFRIIC8gMiAtIFdJTkRPV19XSURUSCAvIDI7XG4gICAgdmlld1N0YXRlLndpbmRvd1kgPSBnYW1lU3RhdGUucGxheWVyR3JpZFkgKiBDRUxMX0hFSUdIVCArIENFTExfSEVJR0hUIC8gMiAtIFdJTkRPV19IRUlHSFQgLyAyO1xuICAgIHZpZXdDb25zdGFudHMuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAtdmlld1N0YXRlLndpbmRvd1gsIC12aWV3U3RhdGUud2luZG93WSk7XG4gICAgcmVuZGVyTWF6ZShnYW1lU3RhdGUpO1xuICAgIHJlbmRlclBsYXllcihnYW1lU3RhdGUpO1xuICAvLyB9XG5cbiAgcmVuZGVySW5mbyhnYW1lU3RhdGUpO1xuXG4gIHByaW9yR2FtZVN0YXRlID0gZ2FtZVN0YXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySW5mbyhnYW1lU3RhdGUpXG57XG4gIGlmIChnYW1lU3RhdGUucmVuZGVyZWRJbmZvICYmIGdhbWVTdGF0ZS5yZW5kZXJlZEluZm8gIT09IHByaW9yR2FtZVN0YXRlLnJlbmRlcmVkSW5mbylcbiAgICB2aWV3Q29uc3RhbnRzLmxpbmtJbmZvUGFyZW50LmlubmVyVGV4dCA9IGdhbWVTdGF0ZS5yZW5kZXJlZEluZm87XG5cbiAgaWYgKGdhbWVTdGF0ZS5zY29yZSAhPT0gcHJpb3JHYW1lU3RhdGUuc2NvcmUpXG4gIHtcbiAgICB2aWV3Q29uc3RhbnRzLnNjb3JlUGFyZW50LmlubmVyVGV4dCA9IGdhbWVTdGF0ZS5zY29yZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93UG9zVG9HcmlkUG9zKHdpbmRvd1Bvc1gsIHdpbmRvd1Bvc1kpXG57XG4gIGNvbnN0IGdyaWRQb3NpdGlvblggPSBNYXRoLmZsb29yKCh3aW5kb3dQb3NYIC0gdmlld0NvbnN0YW50cy5jYW52YXMuY2xpZW50TGVmdCArIHZpZXdTdGF0ZS53aW5kb3dYKSAvIENFTExfV0lEVEgpO1xuICBjb25zdCBncmlkUG9zaXRpb25ZID0gTWF0aC5mbG9vcigod2luZG93UG9zWSAtIHZpZXdDb25zdGFudHMuY2FudmFzLmNsaWVudFRvcCArIHZpZXdTdGF0ZS53aW5kb3dZKSAvIENFTExfSEVJR0hUKVxuICByZXR1cm4gKHt4OiBncmlkUG9zaXRpb25YLCB5OiBncmlkUG9zaXRpb25ZfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclBsYXllcihnYW1lU3RhdGUpXG57XG4gIHJlbmRlclBsYXllckNlbGwoZ2FtZVN0YXRlLnBsYXllckdyaWRYLCBnYW1lU3RhdGUucGxheWVyR3JpZFksIFwiYmx1ZVwiKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTWF6ZShnYW1lU3RhdGUpXG57XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGdhbWVTdGF0ZS5tYXplLmxlbmd0aCA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZVN0YXRlLm1hemVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBnYW1lU3RhdGUubWF6ZVtpXVtqXTtcbiAgICAgIGlmIChjZWxsLnR5cGUgIT09IFwic3BhY2VcIilcbiAgICAgIHtcbiAgICAgICAgcmVuZGVyQ2VsbChpLCBqLCBjZWxsLnR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDZWxsKHgsIHksIGNlbGxUeXBlKVxue1xuICB2aWV3Q29uc3RhbnRzLmN0eC5kcmF3SW1hZ2UoaW1hZ2VzW2NlbGxUeXBlXSwgMCwgMCwgMTAwLCAxMDAsIHggKiBDRUxMX1dJRFRILCB5ICogQ0VMTF9XSURUSCwgQ0VMTF9XSURUSCwgQ0VMTF9IRUlHSFQpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQbGF5ZXJDZWxsKHgsIHksIGNvbG9yKVxue1xuXG4gIGlmIChmcmFtZU51bSA9PT0gMSlcbiAge1xuICAgIHZpZXdDb25zdGFudHMuY3R4LmRyYXdJbWFnZShpbWFnZXMuY2hhcmExLCAwLCAwLCAxMDAsIDEwMCwgeCAqIENFTExfV0lEVEgsIHkgKiBDRUxMX1dJRFRILCBDRUxMX1dJRFRILCBDRUxMX0hFSUdIVCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgdmlld0NvbnN0YW50cy5jdHguZHJhd0ltYWdlKGltYWdlcy5jaGFyYTIsIDEwMCwgMCwgLTEwMCwgMTAwLCB4ICogQ0VMTF9XSURUSCwgeSAqIENFTExfV0lEVEgsIENFTExfV0lEVEgsIENFTExfSEVJR0hUKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmbGlwRnJhbWVOdW1iZXIoKVxue1xuICBmcmFtZU51bSA9IChmcmFtZU51bSArIDEpICUgMlxufVxuXG4iLCJpbXBvcnQgY3JlYXRlTmV3R2FtZVN0YXRlIGZyb20gXCIuL2NyZWF0ZS1uZXctZ2FtZS1zdGF0ZVwiO1xuaW1wb3J0IGdlbmVyYXRlTWF6ZSBmcm9tICcuL21hemUtZ2VuZXJhdG9yLmpzJztcbmNvbnN0IHtnZXRBcnRpY2xlUHJvcGVydGllc30gPSByZXF1aXJlKFwiLi4vd2lraS1hcGkvbWlkbGV2ZWxtYW5hZ2VyLm1qc1wiKTtcbmNvbnN0IHt2aWV3Q29uc3RhbnRzfSA9IHJlcXVpcmUoXCIuL3ZpZXctY29uc3RhbnRzXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBzZXR1cFJvb20oZ2FtZVN0YXRlKVxue1xuICBjb25zdCBhcnRpY2xlUHJvcGVydGllcyA9IGF3YWl0IGdldEFydGljbGVQcm9wZXJ0aWVzKGdhbWVTdGF0ZS50aXRsZSk7XG4gIGNvbnN0IG1hemVQcm9wZXJ0aWVzID0gZ2VuZXJhdGVNYXplUHJvcGVydGllcyhnYW1lU3RhdGUsIGFydGljbGVQcm9wZXJ0aWVzKTtcbiAgY29uc3QgbWF6ZSA9IGdlbmVyYXRlTWF6ZShtYXplUHJvcGVydGllcyk7XG4gIGNvbnN0IHBsYXllcklzU3RpbGxFbnRlcmluZyA9IHRydWU7XG5cbiAgbGV0IHgsIHk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF6ZS5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF6ZS5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKG1hemVbaV1bal0udHlwZSA9PT0gXCJlbnRyYW5jZVwiKSB7XG4gICAgICAgIHggPSBpO1xuICAgICAgICB5ID0gajtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoeClcbiAgICAgIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxheWVyR3JpZFggPSB4LCBwbGF5ZXJHcmlkWSA9IHk7XG5cbiAgY29uc3QgbmV3R2FtZVN0YXRlID0gY3JlYXRlTmV3R2FtZVN0YXRlKGdhbWVTdGF0ZSxcbiAgICB7XG4gICAgICBtYXplLFxuICAgICAgcGxheWVySXNTdGlsbEVudGVyaW5nLFxuICAgICAgcGxheWVyR3JpZFgsXG4gICAgICBwbGF5ZXJHcmlkWVxuICAgIH0pO1xuXG4gIHZpZXdDb25zdGFudHMucm9vbVRpdGxlUGFyZW50LmlubmVyVGV4dCA9IG5ld0dhbWVTdGF0ZS50aXRsZTtcblxuICByZXR1cm4gbmV3R2FtZVN0YXRlO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU1hemVQcm9wZXJ0aWVzKGdhbWVTdGF0ZSwgYXJ0aWNsZVByb3BlcnRpZXMpXG57XG4gIGNvbnN0IHNpemUgPSBNYXRoLm1pbihNYXRoLm1heChhcnRpY2xlUHJvcGVydGllcy53b3JkQ291bnQgLyA0MDAsIDEwKSwgMTUpO1xuICBjb25zdCBudW1iZXJPZkV4aXRzID0gIE1hdGgubWluKE1hdGgubWF4KGFydGljbGVQcm9wZXJ0aWVzLmxpbmtzLmxlbmd0aCAvIDEwLCAxKSwgMTApO1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGU6IGdhbWVTdGF0ZS50aXRsZSxcbiAgICBzaXplOiBzaXplLFxuICAgIHNpbXBsaWNpdHk6IDEgLyAoTWF0aC5jZWlsKGFydGljbGVQcm9wZXJ0aWVzLmxpbmtzLmxlbmd0aCkgLyA4MCksXG4gICAgbGlua3M6IGdyYWJYUmFuZG9tTGlua3MoYXJ0aWNsZVByb3BlcnRpZXMubGlua3MsIG51bWJlck9mRXhpdHMpLFxuICAgIHRyZWFzdXJlczogWy4uLmFydGljbGVQcm9wZXJ0aWVzLmNpdGF0aW9uc05lZWRlZCwgLi4uYXJ0aWNsZVByb3BlcnRpZXMuY2xhcmlmaWNhdGlvbnNOZWVkZWRdXG4gIH1cbn1cblxuZnVuY3Rpb24gZ3JhYlhSYW5kb21MaW5rcyhsaW5rcywgeClcbntcbiAgY29uc3QgbGlua3NDb3B5ID0gWy4uLmxpbmtzXVxuICBjb25zdCByYW5kb21MaW5rcyA9IFtdXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB4OyBpKyspXG4gIHtcbiAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGxpbmtzQ29weS5sZW5ndGggLSAxKSk7XG4gICAgcmFuZG9tTGlua3MucHVzaChsaW5rc0NvcHlbcmFuZF0pO1xuICAgIGxpbmtzQ29weS5zcGxpY2UocmFuZCwgMSk7XG4gIH1cblxuICByZXR1cm4gcmFuZG9tTGlua3M7XG59XG4iLCIvLyB0b2RvOiBjYWNoZT9cbmV4cG9ydCBjb25zdCB2aWV3Q29uc3RhbnRzID1cbntcbiAgc2NvcmVQYXJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpLFxuICByb29tVGl0bGVQYXJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb29tdGl0bGUnKSxcbiAgbGlua0luZm9QYXJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaW5raW5mbycpLFxuICBjYW52YXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpLFxuICBtb2RhbFBhcmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsYmcnKSxcbiAgdHJlYXN1cmVMaXN0UGFyZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHJlYXN1cmUtbGlzdCcpLFxuICBjdHg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcbn07XG4iLCJpbXBvcnQgKiBhcyBXaWtpIGZyb20gJy4vd2lraWludGVyZmFjZS5tanMnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBcnRpY2xlUHJvcGVydGllcyhhcnRpY2xlTmFtZSkge1xuXG4gIGF3YWl0IFdpa2kuYWZldGNoV2lraXBlZGlhQXJ0aWNsZShhcnRpY2xlTmFtZSk7XG4gIHJldHVybiB7XG4gICAgd29yZENvdW50OiBXaWtpLmdldFdvcmRDb3VudCgpLFxuICAgIGxpbmtzOiBXaWtpLmdldExpbmtzKCksXG4gICAgY2l0YXRpb25zTmVlZGVkOiBXaWtpLmdldENpdGF0aW9uc05lZWRlZCgpLFxuICAgIGNsYXJpZmljYXRpb25zTmVlZGVkOiBXaWtpLmdldENsYXJpZmljYXRpb25zTmVlZGVkKClcbiAgfVxufVxuIiwiY29uc3QgY3VycmVudF9hcnRpY2xlID0ge1xuICBsaSA6W10sXG4gIGNuIDpbXSxcbiAgY2wgOltdLFxuICByZWZzIDpbXSxcbiAgd2MgOiAwLFxuICB0aXRsZSA6IFwiTm9uZVwiXG59XG5cbmZ1bmN0aW9uIGNpc3BsaXQocyx0KXtcbiAgcmV0dXJuIHMuc3BsaXQobmV3IFJlZ0V4cChSZWdFeHAuZXNjYXBlKHQpLFwiaWdcIikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JkQ291bnQoKXtyZXR1cm4gY3VycmVudF9hcnRpY2xlLndjO31cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtzKCl7cmV0dXJuIGN1cnJlbnRfYXJ0aWNsZS5saTt9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaXRhdGlvbnNOZWVkZWQoKXtyZXR1cm4gY3VycmVudF9hcnRpY2xlLmNuO31cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXJpZmljYXRpb25zTmVlZGVkKCkge3JldHVybiBjdXJyZW50X2FydGljbGUuY2w7fVxuXG5cbmZ1bmN0aW9uIHJldmVyc2VfdHJ1bmMoc3RyKXtcbiAgY29uc3QgYnN0cj1zdHJcbiAgY29uc3QgZGVsaW09YnN0ci5zbGljZSgtMSlcbiAgaWYoZGVsaW1bMF0gPT0gXCIuXCIpe1xuICAgIHJldHVybiBic3RyLnNwbGl0KC9bOy5cXG5dLykuYXQoLTIpK1wiLlwiXG4gIH1lbHNle1xuICAgIHJldHVybiBic3RyLnNwbGl0KC9bOy5cXG5dLykuYXQoLTEpK1wiLlwiXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0X2NpdGF0aW9uX25lZWRlZHMoYXJ0aWNsZSl7XG4gIGNvbnN0IHNwbD1hcnRpY2xlLnNwbGl0KFwie3tjblwiKVxuXG4gIGNvbnN0IGNpdGF0aW9ucyA9IHNwbC5tYXAocmV2ZXJzZV90cnVuYykuc2xpY2UoMCwtMSlcbiAgcmV0dXJuIGNpdGF0aW9uc1xufVxuXG5mdW5jdGlvbiBnZXRfY2xhcmlmaWNhdGlvbl9uZWVkZWRzKGFydGljbGUpe1xuICBjb25zdCBzcGw9YXJ0aWNsZS5zcGxpdChcInt7Y2xhcmlmeVwiKVxuXG4vLyAgICBjb25zb2xlLmxvZyhzcGxbMF0pXG4gIGNvbnN0IGNpdGF0aW9ucyA9IHNwbC5tYXAocmV2ZXJzZV90cnVuYykuc2xpY2UoMCwtMSlcbiAgcmV0dXJuIGNpdGF0aW9uc1xufVxuXG5mdW5jdGlvbiB1bmJyYWNrZXQobCl7XG4gIHJldHVybiBsLnNwbGl0KFwiXV1cIilbMF07XG5cbn1cblxuZnVuY3Rpb24gZ2V0X291dGdvaW5nX2xpbmtzKGFydGljbGUpe1xuICBjb25zdCBzcGw9YXJ0aWNsZS5zcGxpdChcIltbXCIpLnNsaWNlKDEpXG4gIGNvbnN0IGxpPXNwbC5tYXAodW5icmFja2V0KS5maWx0ZXIobGluayA9PiAobGluay5zZWFyY2goL1teYS16QS1aIF0vKSA9PSAtMSkpXG4gIHJldHVybiBsaVxufVxuXG5mdW5jdGlvbiBjb3VudFdvcmRzKHN0cikge1xuICByZXR1cm4gc3RyLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gZ2V0X3dvcmRjb3VudChhcnRpY2xlKXtcbiAgcmV0dXJuIGNvdW50V29yZHMoYXJ0aWNsZSlcbn1cblxuZnVuY3Rpb24gZ2V0X2NpdGVfdGl0bGUoc3RyKXtcbiAgdHJ5IHtcbiAgICBjb25zdCBhPXN0ci5zcGxpdChuZXcgUmVnRXhwKFJlZ0V4cC5lc2NhcGUoXCJ0aXRsZVwiKSxcImlnXCIpKVsxXS5zcGxpdChcIj1cIilbMV1cbiAgICBjb25zdCBiPWEuc3BsaXQoXCJ8XCIpWzBdXG4gICAgcmV0dXJuIGI7XG4gIH1jYXRjaHtcbiAgICByZXR1cm4gXCJEZWFkIEJlZWZcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRfcmVmZXJlbmNlcyhhcnRpY2xlKXtcbiAgY29uc3Qgc3BsPWFydGljbGUuc3BsaXQobmV3IFJlZ0V4cChSZWdFeHAuZXNjYXBlKFwie3tjaXRlXCIpLFwiaWdcIikpLnNsaWNlKDEpXG4gIGNvbnN0IGFibD1jaXNwbGl0KGFydGljbGUsXCJ7e2NpdGVcIilcbiAgcmV0dXJuIHNwbC5tYXAoZ2V0X2NpdGVfdGl0bGUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWZldGNoV2lraXBlZGlhQXJ0aWNsZSh0aXRsZSkge1xuICBjb25zdCBiPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3cvcmVzdC5waHAvdjEvcGFnZS9gK3RpdGxlKVxuICBjb25zdCBiZGF0YT0gYXdhaXQgYi5qc29uKCk7XG4gIGN1cnJlbnRfYXJ0aWNsZS5jbj1nZXRfY2l0YXRpb25fbmVlZGVkcyhiZGF0YS5zb3VyY2UpXG4gIGN1cnJlbnRfYXJ0aWNsZS5jbD1nZXRfY2xhcmlmaWNhdGlvbl9uZWVkZWRzKGJkYXRhLnNvdXJjZSlcbiAgY3VycmVudF9hcnRpY2xlLmxpPWdldF9vdXRnb2luZ19saW5rcyhiZGF0YS5zb3VyY2UpXG4gIGN1cnJlbnRfYXJ0aWNsZS53Yz1nZXRfd29yZGNvdW50KGJkYXRhLnNvdXJjZSlcbiAgY3VycmVudF9hcnRpY2xlLnRpdGxlPXRpdGxlXG4gIGN1cnJlbnRfYXJ0aWNsZS5yZWZzPWdldF9yZWZlcmVuY2VzKGJkYXRhLnNvdXJjZSlcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLnRpdGxlKTtcbiAgcmV0dXJuIFwiaGlcIlxufVxuXG5hc3luYyBmdW5jdGlvbiBhYWZldGNoV2lraXBlZGlhQXJ0aWNsZSh0aXRsZSkge1xuICBjb25zdCBhPSAgYWZldGNoV2lraXBlZGlhQXJ0aWNsZSh0aXRsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFdpa2lwZWRpYUFydGljbGUodGl0bGUpIHtcbiAgYWFmZXRjaFdpa2lwZWRpYUFydGljbGUodGl0bGUpO1xuICBjb25zb2xlLmxvZyh0aXRsZSk7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS50aXRsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkdW1wV2lraUFydGljbGUoKSB7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS50aXRsZSlcbiAgY29uc29sZS5sb2coXCIgY246XCIpXG4gIGNvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS5jbilcbiAgY29uc29sZS5sb2coXCIgY2w6XCIpXG4gIGNvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS5jbClcbiAgY29uc29sZS5sb2coXCIgbGk6XCIpXG4gIGNvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS5saSlcbiAgY29uc29sZS5sb2coXCIgd2M6XCIpXG4gIGNvbnNvbGUubG9nKGN1cnJlbnRfYXJ0aWNsZS53YylcbiAgY29uc29sZS5sb2coXCIgcmVmczpcIilcbiAgY29uc29sZS5sb2coY3VycmVudF9hcnRpY2xlLnJlZnMpXG5cbn1cbmV4cG9ydCBmdW5jdGlvbiBsb2FkV2lraUFydGljbGUobmFtZSkge1xuICBjb25zdCBmPSBmZXRjaFdpa2lwZWRpYUFydGljbGUobmFtZSlcbn1cblxuXG4vL2NvbnNvbGUubG9nKCdhc2RmJyk7XG4vL2F3YWl0IGFmZXRjaFdpa2lwZWRpYUFydGljbGUoXCJCYXNzb29uXCIpO1xuLy9kdW1wV2lraUFydGljbGUoKVxuLy9jb25zb2xlLmxvZyhjdXJyZW50X2FydGljbGUubGlua3MpXG5cbi8vbW9kdWxlLmV4cG9ydHMgPSB7IGxvYWRXaWtpQXJ0aWNsZSxkdW1wV2lraUFydGljbGUgfTtcblxuXG4vLyBUTyBSVU4gSU4gVEVSTUlOQUwsIFRZUEVcbi8vIG5vZGUgRklMRVBBVEhcblxuXG4iLCJjb25zdCBHZW5lcmF0b3IgPSByZXF1aXJlKCcuL3NyYy9nZW5lcmF0b3JzL2dlbmVyYXRvci5qcycpO1xuY29uc3QgTWF6ZUdlbmVyYXRvciA9IHJlcXVpcmUoJy4vc3JjL2dlbmVyYXRvcnMvbWF6ZS5qcycpO1xuY29uc3QgUm9vbUdlbmVyYXRvciA9IHJlcXVpcmUoJy4vc3JjL2dlbmVyYXRvcnMvcm9vbS5qcycpO1xuY29uc3QgU3RhaXJHZW5lcmF0b3IgPSByZXF1aXJlKCcuL3NyYy9nZW5lcmF0b3JzL3N0YWlycy5qcycpO1xuY29uc3QgUmVuZGVyZXIgPSByZXF1aXJlKCcuL3NyYy9yZW5kZXJlci5qcycpO1xuY29uc3QgQ2VsbCA9IHJlcXVpcmUoJy4vc3JjL2NlbGwuanMnKTtcbmNvbnN0IEdyaWQgPSByZXF1aXJlKCcuL3NyYy9ncmlkLmpzJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4vc3JjL3V0aWxzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRvcnM6IHtcbiAgICAgICAgZ2VuZXJhdG9yOiBHZW5lcmF0b3IsXG4gICAgICAgIG1hemU6IE1hemVHZW5lcmF0b3IsXG4gICAgICAgIHJvb206IFJvb21HZW5lcmF0b3IsXG4gICAgICAgIHN0YWlyczogU3RhaXJHZW5lcmF0b3JcbiAgICB9LFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcixcbiAgICBjZWxsOiBDZWxsLFxuICAgIGdyaWQ6IEdyaWQsXG4gICAgdXRpbHM6IFV0aWxzXG59IiwiY2xhc3MgQ2VsbCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgeiwgdmlzaXRlZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIHRoaXMuYmxvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQgfHwgZmFsc2U7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENlbGw7IiwiY2xhc3MgR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihnZW5lcmF0b3JzKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLmdlbmVyYXRvcnMgPSBnZW5lcmF0b3JzLm1hcChcbiAgICAgICAgICAgIGdlbmVyYXRvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuID0gbmV3IGdlbmVyYXRvci5nZW5lcmF0b3IodGhpcy5kYXRhLCBnZW5lcmF0b3Iub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gZ2VuLmRhdGE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSA9ICgpID0+IHRoaXMuZ2VuZXJhdG9ycy5mb3JFYWNoKFxuICAgICAgICBnZW5lcmF0b3IgPT4gZ2VuZXJhdG9yLmdlbmVyYXRlKClcbiAgICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyYXRvcjtcbiIsImNvbnN0IEdyaWQgPSByZXF1aXJlKCcuLi9ncmlkLmpzJyk7XG5jb25zdCB7UmFuZG9tfSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcblxuY2xhc3MgTWF6ZUdlbmVyYXRvciB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIE1hemVHZW5lcmF0b3JcbiAgICAgKiBAY2xhc3NkZXNjIFRoZSBtYXplIGdlbmVyYXRvciBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgZ2VuZXJhdGluZyBhIGdyaWQgb2YgQ2VsbCBvYmplY3RzIGFuZCBzdG9yaW5nIHRoZW0uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHRvIHVzZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy53aWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBncmlkLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuZmxvb3JzIC0gVGhlIHRvdGFsIG51bWJlciBvZiBmbG9vcnMgaW4gdGhlIGdyaWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc3RhcnRfeCAtIFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBjZWxsLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnN0YXJ0X3kgLSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgY2VsbC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5zdGFydF96IC0gVGhlIHogcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIGNlbGwuXG4gICAgICogQHBhcmFtIHtDZWxsfSBvcHRpb25zLmdyaWRfY2xhc3MgLSBUaGUgY2xhc3MgdXNlZCB0byBnZW5lcmF0ZSBhIGdyaWQsIGNvbnRhaW5zIGNlbGwgZGF0YS5cbiAgICAgKiBAcGFyYW0ge0NlbGx9IG9wdGlvbnMuY2VsbF9jbGFzcyAtIFRoZSBjbGFzcyB1c2VkIHRvIHJlcHJlc2VudCBhIGNlbGwgb24gdGhlIGdyaWQuXG4gICAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5uZWlnaGJvcl9wb3NpdGlvbnMgLSBUaGUgYXJyYXkgb2YgbmVpZ2hib3IgcG9zaXRpb25zIHRvIHVzZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGF8fHt9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm5laWdoYm9yX3Bvc2l0aW9ucyA9IG9wdGlvbnMubmVpZ2hib3JfcG9zaXRpb25zIHx8IFtbMCwgLTJdLCBbMCwgMl0sIFstMiwgMF0sIFsyLCAwXV07XG4gICAgICAgIHRoaXMuc3RhcnRfY2VsbF9jb29yZCA9IHsgeDogMSwgeTogMSB9O1xuICAgICAgICBjb25zdCBHcmlkQ2xhc3MgPSBvcHRpb25zLmdyaWRfY2xhc3MgfHwgR3JpZDtcbiAgICAgICAgdGhpcy5kYXRhLmdyaWQgPSBuZXcgR3JpZENsYXNzKHtcbiAgICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCxcbiAgICAgICAgICAgIHRvdGFsX2Zsb29yczogb3B0aW9ucy5mbG9vcnMsXG4gICAgICAgICAgICBjZWxsX2NsYXNzOiBvcHRpb25zLmNlbGxfY2xhc3MsXG4gICAgICAgICAgICBzdGFydF94OiBvcHRpb25zLnN0YXJ0X3gsXG4gICAgICAgICAgICBzdGFydF95OiBvcHRpb25zLnN0YXJ0X3ksXG4gICAgICAgICAgICBzdGFydF96OiBvcHRpb25zLnN0YXJ0X3osXG4gICAgICAgICAgICBmbG9vcnM6IFtdXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGdldE5laWdoYm9yQ2VsbHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2VsbFxuICAgICAqIEByZXR1cm5zIHsqW0NlbGxdfVxuICAgICAqL1xuICAgIGdldE5laWdoYm9yQ2VsbHMgPSAoY2VsbCkgPT4ge1xuICAgICAgICBsZXQgbmVpZ2hib3JfY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBueCA9IGNlbGwueCArIHRoaXMubmVpZ2hib3JfcG9zaXRpb25zW2ldWzBdO1xuICAgICAgICAgICAgbGV0IG55ID0gY2VsbC55ICsgdGhpcy5uZWlnaGJvcl9wb3NpdGlvbnNbaV1bMV07XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JfY2VsbCA9IHRoaXMuZGF0YS5ncmlkLmdldE5laWdoYm9yQ2VsbChueCwgbnksIGNlbGwueik7XG4gICAgICAgICAgICBpZiAobmVpZ2hib3JfY2VsbCAmJiAhbmVpZ2hib3JfY2VsbC52aXNpdGVkICYmIG5laWdoYm9yX2NlbGwuYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgIG5laWdoYm9yX2NlbGxzLnB1c2gobmVpZ2hib3JfY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5laWdoYm9yX2NlbGxzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBnZW5lcmF0ZVxuICAgICAqIEBkZXNjcmlwdGlvbiBHZW5lcmF0ZSBhIG1hemUgdXNpbmcgdGhlIGdyb3dpbmcgdHJlZSBhbGdvcml0aG0uXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgZ2VuZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgdGhpcy5kYXRhLmdyaWQudG90YWxfZmxvb3JzOyB6KyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSB0aGlzLnN0YXJ0X2NlbGxfY29vcmQueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnN0YXJ0X2NlbGxfY29vcmQueTtcbiAgICAgICAgICAgIGxldCBnZXRfY2VsbCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgcHJldl9jZWxscyA9IFtdO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRfY2VsbCA9IHRoaXMuZGF0YS5ncmlkLmdldENlbGwoeCwgeSwgeik7XG5cbiAgICAgICAgICAgIHdoaWxlIChnZXRfY2VsbCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRfY2VsbC52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgbmVpZ2hib3JfY2VsbHMgPSB0aGlzLmdldE5laWdoYm9yQ2VsbHMoY3VycmVudF9jZWxsKTtcbiAgICAgICAgICAgICAgICBpZiAobmVpZ2hib3JfY2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmVpZ2hib3JfY2VsbCA9IG5laWdoYm9yX2NlbGxzW1JhbmRvbS5yYW5nZSgwLCBuZWlnaGJvcl9jZWxscy5sZW5ndGgpXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGV4aXRzXG4gICAgICAgICAgICAgICAgICAgIGxldCBuX3ggPSBjdXJyZW50X2NlbGwueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5feSA9IGN1cnJlbnRfY2VsbC55O1xuICAgICAgICAgICAgICAgICAgICBpZiAobmVpZ2hib3JfY2VsbC54ID4gY3VycmVudF9jZWxsLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5feCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5laWdoYm9yX2NlbGwueCA8IGN1cnJlbnRfY2VsbC54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuX3ggLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobmVpZ2hib3JfY2VsbC55ID4gY3VycmVudF9jZWxsLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5feSArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5laWdoYm9yX2NlbGwueSA8IGN1cnJlbnRfY2VsbC55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuX3kgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3X2NlbGwgPSB0aGlzLmRhdGEuZ3JpZC5nZXRDZWxsKG5feCwgbl95LCB6KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2NlbGwuYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50X2NlbGwuYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBwcmV2X2NlbGxzLnB1c2goY3VycmVudF9jZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudF9jZWxsID0gbmVpZ2hib3JfY2VsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2X2NlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfY2VsbCA9IHByZXZfY2VsbHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRfY2VsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hemVHZW5lcmF0b3I7XG4iLCJjb25zdCB7UmFuZG9tfSA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XG5cbmNsYXNzIFJvb21HZW5lcmF0b3Ige1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBSb29tR2VuZXJhdG9yXG4gICAgICogQGNsYXNzZGVzYyBHZW5lcmF0ZXMgcm9vbXMgZm9yIGEgY2VsbHMgaW4gYSBncmlkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IHRvIHVzZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCB0byB1c2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWluUm9vbXMgLSBUaGUgbWluaW11bSBudW1iZXIgb2Ygcm9vbXMgdG8gZ2VuZXJhdGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWF4Um9vbXMgLSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygcm9vbXMgdG8gZ2VuZXJhdGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubWluUm9vbVdpZHRoIC0gVGhlIG1pbmltdW0gd2lkdGggb2YgYSByb29tLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1pblJvb21IZWlnaHQgLSBUaGUgbWluaW11bSBoZWlnaHQgb2YgYSByb29tLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm1heFJvb21XaWR0aCAtIFRoZSBtYXhpbXVtIHdpZHRoIG9mIGEgcm9vbS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5tYXhSb29tSGVpZ2h0IC0gVGhlIG1heGltdW0gaGVpZ2h0IG9mIGEgcm9vbS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy50b3RhbFJvb21zIC0gVGhlIHRvdGFsIG51bWJlciBvZiByb29tcyB0byBnZW5lcmF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YXx8e307XG4gICAgICAgIHRoaXMuZGF0YS5yb29tcyA9IFtdO1xuICAgICAgICBjb25zdCBtaW5Sb29tcyA9IHBhcnNlSW50KG9wdGlvbnMubWluUm9vbXMpIHx8IDE7XG4gICAgICAgIGNvbnN0ICBtYXhSb29tcyA9IHBhcnNlSW50KG9wdGlvbnMubWF4Um9vbXMpIHx8IDg7XG4gICAgICAgIHRoaXMubWluUm9vbVdpZHRoID0gcGFyc2VJbnQob3B0aW9ucy5taW5Sb29tV2lkdGgpIHx8IDE7XG4gICAgICAgIHRoaXMubWluUm9vbUhlaWdodCA9IHBhcnNlSW50KG9wdGlvbnMubWluUm9vbUhlaWdodCkgfHwgMTtcbiAgICAgICAgdGhpcy5tYXhSb29tV2lkdGggPSBwYXJzZUludChvcHRpb25zLm1heFJvb21XaWR0aCkgfHwgODtcbiAgICAgICAgdGhpcy5tYXhSb29tSGVpZ2h0ID0gcGFyc2VJbnQob3B0aW9ucy5tYXhSb29tSGVpZ2h0KSB8fCA4O1xuICAgICAgICB0aGlzLnRvdGFsUm9vbXMgPSB0aGlzLm9wdGlvbnMudG90YWxSb29tcyB8fCBSYW5kb20ucmFuZ2UobWluUm9vbXMsIG1heFJvb21zKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlID0gKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IHRoaXMuZGF0YS5ncmlkLnRvdGFsX2Zsb29yczsgeisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxSb29tczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvb21XaWR0aCA9IFJhbmRvbS5yYW5nZSh0aGlzLm1pblJvb21XaWR0aCwgdGhpcy5tYXhSb29tV2lkdGgpO1xuICAgICAgICAgICAgICAgIGxldCByb29tSGVpZ2h0ID0gUmFuZG9tLnJhbmdlKHRoaXMubWluUm9vbUhlaWdodCwgdGhpcy5tYXhSb29tSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgcm9vbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogUmFuZG9tLnJhbmdlKDAsIHRoaXMuZGF0YS5ncmlkLndpZHRoIC0gcm9vbVdpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgeTogUmFuZG9tLnJhbmdlKDAsIHRoaXMuZGF0YS5ncmlkLmhlaWdodCAtIHJvb21IZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogcm9vbVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHJvb21IZWlnaHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSByb29tLnk7IHkgPCByb29tLnkgKyByb29tLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSByb29tLng7IHggPCByb29tLnggKyByb29tLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZ3JpZC5pc0luTmF2aWdhdGlvbkJvdW5kcyh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5ncmlkLnVuYmxvY2tDZWxsKHgsIHksIHopO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5yb29tcy5wdXNoKHJvb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb21HZW5lcmF0b3I7XG4iLCIvKipcbiAqIEBjbGFzcyBTdGFpcnNHZW5lcmF0b3JcbiAqIEBjbGFzc2Rlc2MgR2VuZXJhdGVzIHN0YWlycyBmb3IgYSBjZWxscyBpbiBhIGdyaWQuXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCB0byB1c2UuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCB0byB1c2UuXG4gKi9cbmNsYXNzIFN0YWlyc0dlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhfHx7fTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc3x8e2FzY2VuZGluZzogZmFsc2V9O1xuICAgICAgICB0aGlzLm1heF9zdGFpcnMgPSBvcHRpb25zLm1heF9zdGFpcnMgfHwgMTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlID0gKCkgPT4ge1xuICAgICAgICBsZXQgdG90YWxfc3RhaXJzX2J5X2Zsb29yID0ge307XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBlYWNoIGZsb29yIGluIHRoZSBncmlkXG4gICAgICAgIGZvciAobGV0IGZsb29yID0gMDsgZmxvb3IgPCB0aGlzLmRhdGEuZ3JpZC50b3RhbF9mbG9vcnMgLSAxOyBmbG9vcisrKSB7XG4gICAgICAgICAgICAvLyBSZXBlYXQgbG9vcCB1bnRpbCB3ZSBmaW5kIGEgY2VsbCB0aGF0IHNhdGlzZmllcyB0aGUgY29uZGl0aW9uc1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBudWxsO1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsX3N0YWlyc19ieV9mbG9vcltmbG9vcl0gJiYgdG90YWxfc3RhaXJzX2J5X2Zsb29yW2Zsb29yXSA+PSB0aGlzLm1heF9zdGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91c19mbG9vcl9jZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dF9mbG9vcl9jZWxsID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBhIHJhbmRvbSBjZWxsIGZyb20gdGhlIGN1cnJlbnQgZmxvb3JcbiAgICAgICAgICAgICAgICBjZWxsID0gdGhpcy5kYXRhLmdyaWQucmFuZG9tQ2VsbChmbG9vcik7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwuYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHByZXZpb3VzIGZsb29yIGNlbGxcbiAgICAgICAgICAgICAgICBpZiAoZmxvb3IgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX2Zsb29yX2NlbGwgPSB0aGlzLmRhdGEuZ3JpZC5jZWxsc1tmbG9vciAtIDFdW2NlbGwueV1bY2VsbC54XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzX2Zsb29yX2NlbGwuYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNfZmxvb3JfY2VsbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIG5leHQgZmxvb3IgY2VsbFxuICAgICAgICAgICAgICAgIG5leHRfZmxvb3JfY2VsbCA9IHRoaXMuZGF0YS5ncmlkLmNlbGxzW2Zsb29yICsgMV1bY2VsbC55XVtjZWxsLnhdO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0X2Zsb29yX2NlbGwgPT09IG51bGwgfHwgbmV4dF9mbG9vcl9jZWxsLmJsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHN0YWlyc1xuICAgICAgICAgICAgICAgIGNlbGwuc3RhaXJzID0ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0X2Zsb29yOiBuZXh0X2Zsb29yX2NlbGwsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5vcHRpb25zLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bidcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChuZXh0X2Zsb29yX2NlbGwpIG5leHRfZmxvb3JfY2VsbC5zdGFpcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzX2Zsb29yOiBjZWxsLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMub3B0aW9ucy5hc2NlbmRpbmcgPyAnZG93bicgOiAndXAnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0b3RhbF9zdGFpcnNfYnlfZmxvb3JbZmxvb3JdID0gKHRvdGFsX3N0YWlyc19ieV9mbG9vcltmbG9vcl0gfHwgMCkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWlyc0dlbmVyYXRvcjtcbiIsImNvbnN0IENlbGwgPSByZXF1aXJlKFwiLi9jZWxsXCIpO1xuY29uc3Qge1JhbmRvbX0gPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbmNvbnN0IE1JTl9XSURUSCA9IDU7XG5jb25zdCBNSU5fSEVJR0hUID0gNTtcbmNvbnN0IE1JTl9CT1VOREFSWSA9IC0xO1xuY29uc3QgTUlOX05FSUdIQk9SX0JPVU5EQVJZID0gMDtcbmNvbnN0IE1JTl9GTE9PUlMgPSAxO1xuXG4vKipcbiAqIEBjbGFzcyBHcmlkXG4gKiBAZGVzY3JpcHRpb24gVGhlIGdyaWQgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGdlbmVyYXRpbmcsIHN0b3JpbmcgYW5kIG1hbmlwdWxhdGluZyBhIGdyaWQgb2YgQ2VsbCBvYmplY3QgaW5zdGFuY2VzLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy53aWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgZ3JpZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIFRoZSBoZWlnaHQgb2YgdGhlIGdyaWQuXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmZsb29ycyAtIFRoZSB0b3RhbCBudW1iZXIgb2YgZmxvb3JzIGluIHRoZSBncmlkLlxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc3RhcnRfeCAtIFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBjZWxsLlxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc3RhcnRfeSAtIFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBjZWxsLlxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc3RhcnRfeiAtIFRoZSB6IHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBjZWxsLlxuICogQHBhcmFtIHtDZWxsfSBvcHRpb25zLmNlbGxfY2xhc3MgLSBUaGUgY2xhc3MgdXNlZCB0byByZXByZXNlbnQgYSBjZWxsIG9uIHRoZSBncmlkLlxuICovXG5jbGFzcyBHcmlkIHtcbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gY29uc3RydWN0b3JcbiAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgYSBHcmlkIG9iamVjdCBvZiBnaXZlbiBkaW1lbnNpb25zIGZpbGxlZCB3aXRoIENlbGwgb2JqZWN0cyBhbmQgZmxvb3IgZGF0YS5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgIE9wdGlvbmFsIGFyZ3VtZW50cyBmb3IgdGhlIEdyaWQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBhbGwgcHJvcGVydGllcywgYW5kIHRoZW4gdGhlIGdyaWQuXG4gICAgICAgIHRoaXMud2lkdGggPSBwYXJzZUludChvcHRpb25zLndpZHRoKSB8fCBNSU5fV0lEVEg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcGFyc2VJbnQob3B0aW9ucy5oZWlnaHQpIHx8IE1JTl9IRUlHSFQ7XG4gICAgICAgIHRoaXMudG90YWxfZmxvb3JzID0gcGFyc2VJbnQob3B0aW9ucy50b3RhbF9mbG9vcnMpIHx8IE1JTl9GTE9PUlM7XG4gICAgICAgIHRoaXMuc3RhcnRfeCA9IHBhcnNlSW50KG9wdGlvbnMuc3RhcnRfeCkgfHwgMDtcbiAgICAgICAgdGhpcy5zdGFydF95ID0gcGFyc2VJbnQob3B0aW9ucy5zdGFydF95KSB8fCAwO1xuICAgICAgICB0aGlzLnN0YXJ0X3ogPSBwYXJzZUludChvcHRpb25zLnN0YXJ0X3opIHx8IDA7XG4gICAgICAgIHRoaXMuQ2VsbENsYXNzID0gb3B0aW9ucy5jZWxsX2NsYXNzfHxDZWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRGbG9vciA9IG9wdGlvbnMuY3VycmVudEZsb29yfHwwO1xuICAgICAgICBpZiAodGhpcy53aWR0aCA8PSBNSU5fV0lEVEgpIHRoaXMud2lkdGggPSBNSU5fV0lEVEg7XG4gICAgICAgIGlmICh0aGlzLmhlaWdodCA8PSBNSU5fSEVJR0hUKSB0aGlzLmhlaWdodCA9IE1JTl9IRUlHSFQ7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0X3ggPiB0aGlzLndpZHRoIC0gMSkgdGhpcy5zdGFydF94ID0gdGhpcy5zdGFydF94IC0gMTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRfeSA+IHRoaXMuaGVpZ2h0IC0gMSkgdGhpcy5zdGFydF95ID0gdGhpcy5zdGFydF95IC0gMTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRfeiA+PSB0aGlzLnRvdGFsX2Zsb29ycykgdGhpcy5zdGFydF96ID0gdGhpcy50b3RhbF9mbG9vcnMgLSAxO1xuICAgICAgICB0aGlzLmZsb29ycyA9IFtdO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gaW5pdGlhbGl6ZVxuICAgICAqIEBkZXNjcmlwdGlvbiBJdGVyYXRlcyB0aHJvdWdoIGVhY2ggY29vcmRpbmF0ZSBhbmQgY3JlYXRlcyBhIGNlbGwgYXQgdGhhdCBsb2NhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeiA9IHRoaXMuc3RhcnRfejsgeiA8IHRoaXMudG90YWxfZmxvb3JzOyB6KyspIHtcbiAgICAgICAgICAgIHRoaXMuZmxvb3JzW3pdID0ge307ICAvLyBzZXQgZmxvb3IgZGF0YSB0byBhbiBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbel0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB0aGlzLnN0YXJ0X3k7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t6XVt5XSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSB0aGlzLnN0YXJ0X3g7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t6XVt5XVt4XSA9IG5ldyB0aGlzLkNlbGxDbGFzcyh4LCB5LCB6KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gcmFuZG9tQ2VsbFxuICAgICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIGEgcmFuZG9tIGNlbGwgZnJvbSB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHogICAgICBUaGUgZmxvb3IgdG8gZ2V0IGEgY2VsbCBmcm9tXG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgQ2VsbCBvYmplY3RcbiAgICAgKi9cbiAgICByYW5kb21DZWxsID0gKHopID0+IHtcbiAgICAgICAgY29uc3QgeCA9IFJhbmRvbS5yYW5nZShNSU5fTkVJR0hCT1JfQk9VTkRBUlksIHRoaXMud2lkdGggLSAyKTtcbiAgICAgICAgY29uc3QgeSA9IFJhbmRvbS5yYW5nZShNSU5fTkVJR0hCT1JfQk9VTkRBUlksIHRoaXMuaGVpZ2h0IC0gMik7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENlbGwoeCwgeSwgeik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGlzSW5Cb3VuZHNcbiAgICAgKiBAZGVzY3JpcHRpb24gQ2hlY2tzIGlmIGdpdmVuIGNvb3JkaW5hdGVzIGFyZSB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHggICAgeC1jb29yZGluYXRlIG9mIHRoZSBjZWxsXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB5ICAgIHktY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICB0cnVlIGlmIGluIGJvdW5kcywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgaXNJbkJvdW5kcyA9ICh4LCB5KSA9PiAoXG4gICAgICAgIHggPCB0aGlzLndpZHRoXG4gICAgICAgICYmIHggPiBNSU5fQk9VTkRBUllcbiAgICAgICAgJiYgeSA8IHRoaXMuaGVpZ2h0XG4gICAgICAgICYmIHkgPiBNSU5fQk9VTkRBUllcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGlzSW5OYXZpZ2F0aW9uQm91bmRzXG4gICAgICogQGRlc2NyaXB0aW9uIENoZWNrcyBpZiBnaXZlbiBjb29yZGluYXRlcyBhcmUgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIGdyaWQgdXNlZCBmb3IgbmF2aWdhdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHggICAgeC1jb29yZGluYXRlIG9mIHRoZSBjZWxsXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB5ICAgIHktY29vcmRpbmF0ZSBvZiB0aGUgY2VsbFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICB0cnVlIGlmIGluIGJvdW5kcywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgaXNJbk5hdmlnYXRpb25Cb3VuZHMgPSAoeCwgeSkgPT4gKFxuICAgICAgICB4IDwgdGhpcy53aWR0aCAtIDFcbiAgICAgICAgJiYgeCA+IE1JTl9ORUlHSEJPUl9CT1VOREFSWVxuICAgICAgICAmJiB5IDwgdGhpcy5oZWlnaHQgLSAxXG4gICAgICAgICYmIHkgPiBNSU5fTkVJR0hCT1JfQk9VTkRBUllcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGdldENlbGxcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0cyBhIGNlbGwgZnJvbSB0aGUgZ3JpZC5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHggICB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHkgICB5LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHogICB0aGUgZmxvb3Igb2YgdGhlIGNlbGxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICBDZWxsIG9iamVjdCBpZiBpbiBib3VuZHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgICovXG4gICAgZ2V0Q2VsbCA9ICh4LCB5LCB6KSA9PiB0aGlzLmlzSW5Cb3VuZHMoeCwgeSkgPyB0aGlzLmNlbGxzW3pdW3ldW3hdIDogbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBnZXROZWlnaGJvckNlbGxcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0cyBhIGNlbGwgZnJvbSB0aGUgZ3JpZC4gRnVuY3Rpb25zIHRoZSBzYW1lIGFzIGdldENlbGwsIGJ1dCBjaGVja3MgYWdhaW5zdCBuYXZpZ2F0aW9uIGJvdW5kcy5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHggICB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHkgICB5LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHogICB0aGUgZmxvb3Igb2YgdGhlIGNlbGxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICBDZWxsIG9iamVjdCBpZiBpbiBib3VuZHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgICovXG4gICAgZ2V0TmVpZ2hib3JDZWxsID0gKHgsIHksIHopID0+IHRoaXMuaXNJbk5hdmlnYXRpb25Cb3VuZHMoeCwgeSkgPyB0aGlzLmNlbGxzW3pdW3ldW3hdIDogbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiB1bmJsb2NrQ2VsbFxuICAgICAqIEBkZXNjcmlwdGlvbiBVbmJsb2NrcyBhIGNlbGwgaWYgaXQgaXMgaW4gYm91bmRzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4ICB4LWNvb3JkaW5hdGUgb2YgdGhlIGNlbGxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geSAgeS1jb29yZGluYXRlIG9mIHRoZSBjZWxsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHogIHRoZSBmbG9vciBvZiB0aGUgY2VsbFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdW5ibG9ja0NlbGwgPSAoeCwgeSwgeikgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0luQm91bmRzKHgsIHkpKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdLmJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkOyIsImNsYXNzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihnZW5lcmF0b3IpIHtcbiAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBnZW5lcmF0b3IuZGF0YS5ncmlkLnRvdGFsX2Zsb29yczsgeisrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRmxvb3IgJHt6fWApO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBnZW5lcmF0b3IuZGF0YS5ncmlkLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2VuZXJhdG9yLmRhdGEuZ3JpZC53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZ2VuZXJhdG9yLmRhdGEuZ3JpZC5jZWxsc1t6XVt5XVt4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSBjZWxsLmJsb2NrZWQgPyAnXFx1MjU4OCcgOiAnXFx1MjU5MSc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLnN0YWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc3RhaXJzLmRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYgPSAnXFx1MjVCMic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmID0gJ1xcdTI1QkMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJvdyArPSBmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyOyIsIi8qKlxuICogQGNsYXNzIFJhbmRvbVxuICogQGRlc2NyaXB0aW9uIEEgc3RhdGljIGNsYXNzIGZvciBnZW5lcmF0aW5nIHJhbmRvbSBudW1iZXJzLlxuICovXG5jbGFzcyBSYW5kb20ge1xuICAgIF9zZWVkID0gbnVsbDtcbiAgICBzdGF0aWMgX2luc3RhbmNlID0gbnVsbDtcblxuICAgIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgICAgIGlmIChSYW5kb20uX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICBSYW5kb20uX2luc3RhbmNlID0gbmV3IFJhbmRvbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSYW5kb20uX2luc3RhbmNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHNlZWQpIHtcbiAgICAgICAgdGhpcy5fc2VlZCA9IHNlZWQgfHwgTWF0aC5yYW5kb20oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gUmFuZG9tLnNlZWRcbiAgICAgKiBTZXRzIHRoZSBzZWVkIGZvciB0aGUgcmFuZG9tIG51bWJlciBnZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gc2VlZFxuICAgICAqIEByZXR1cm5zIHsqfG51bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgc2VlZCA9IChzZWVkKSA9PiB7XG4gICAgICAgIFJhbmRvbS5pbnN0YW5jZS5fc2VlZCA9IHNlZWQ7XG4gICAgICAgIHJldHVybiBSYW5kb20uaW5zdGFuY2UuX3NlZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIFJhbmRvbS5uZXh0XG4gICAgICogUmV0dXJucyBhIHJhbmRvbSBudW1iZXJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBuZXh0KCkge1xuICAgICAgICBsZXQgeCA9IE1hdGguc2luKFJhbmRvbS5pbnN0YW5jZS5fc2VlZCkgKiAxMDAwMDtcbiAgICAgICAgUmFuZG9tLmluc3RhbmNlLl9zZWVkID0geCAtIE1hdGguZmxvb3IoeCk7XG4gICAgICAgIHJldHVybiB4IC0gTWF0aC5mbG9vcih4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gUmFuZG9tLnJhbmdlXG4gICAgICogUmV0dXJucyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiBtaW4gYW5kIG1heFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgcmFuZ2UgPSAobWluLCBtYXgpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoUmFuZG9tLm5leHQoKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFJhbmRvbTogUmFuZG9tXG59O1xuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBtYWluIGZyb20gJy4vZ2FtZS9pbmRleC5qcyc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=