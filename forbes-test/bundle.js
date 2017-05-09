var App =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var imageSection = document.getElementById('imageSection'),
    popover = document.getElementById('popover'),
    searchForm = document.getElementById('searchForm'),
    searchSubmitButton = document.getElementById('searchSubmitButton'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    loaderWrapper = document.getElementById('loader-wrapper');
var searchTerm = 'kitten',
    page = 0;

searchSubmitButton.onclick = function (e) {
  e.preventDefault();
  searchTerm = searchForm.elements.namedItem('searchFormInput').value;
  page = 0;
  load(1);
};

prev.onclick = function () {
  return load(-1);
};
next.onclick = function () {
  return load(1);
};
popover.onclick = closePopover;

function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload = function () {
      return resolve(image);
    };
    image.onerror = function () {
      return reject(image);
    };
    image.src = url;
  });
}

function imageLoadPromises(urls) {
  return urls.map(function (url) {
    return loadImage(url);
  });
}

// Loads images in parallel, displays them in order
function appendLoadedImagesInOrder(thumbsList, fullsizeList) {
  var imagePromises = imageLoadPromises(thumbsList);
  var seq = Promise.resolve();

  var _loop = function _loop(i) {
    seq = seq.then(function () {
      return imagePromises[i];
    }).then(function (img) {
      img.onclick = function () {
        popup(fullsizeList[i]);
      };
      imageSection.appendChild(img);
      return Promise.resolve();
    }).catch(function (img) {
      console.log('Unable to load ' + img.src);
      return Promise.resolve();
    });
  };

  for (var i = 0; i < thumbsList.length; i++) {
    _loop(i);
  }
  return seq;
}

function buildPhotoUrl(item, size) {
  return 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_' + size + '.jpg';
}

function popup(url) {
  popover.style.display = 'block';
  popover.innerHTML = '<img src=\'' + url + '\' />';
}

function closePopover() {
  popover.style.display = 'none';
}

function load(pageAdvance) {

  loaderWrapper.style.display = 'flex';
  page += pageAdvance;
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e80a5b79eada92dc6ef4192c33ead8d2&tags=' + searchTerm + '&per_page=10&page=' + page + '&format=json';

  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var response = JSON.parse(this.responseText.slice(14, -1)).photos;
        if (page >= response.pages) next.style.display = 'none';else next.style.display = 'inline';
        if (page > 1) prev.style.display = 'inline';else prev.style.display = 'none';
        var list = response.photo;
        var thumbnails = list.map(function (item) {
          return buildPhotoUrl(item, 's');
        });
        var fullImages = list.map(function (item) {
          return buildPhotoUrl(item, 'c');
        });
        resolve({ thumbnails: thumbnails, fullImages: fullImages });
      }
    };
    request.open('GET', url, true);
    request.send();
  }).then(function (lists) {
    var thumbnails = lists.thumbnails,
        fullImages = lists.fullImages;

    imageSection.innerHTML = '';
    appendLoadedImagesInOrder(thumbnails, fullImages).then(function () {
      loaderWrapper.style.display = 'none';
    });
  });
};

/***/ })
/******/ ]);