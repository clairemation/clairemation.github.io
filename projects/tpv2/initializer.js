var walkmaskCvs = document.createElement("canvas");
walkmaskCvs.width = 2048;
walkmaskCvs.height = 1700;
var walkmask = walkmaskCvs.getContext("2d");

var normalmaskCvs = document.createElement("canvas");
normalmaskCvs.width = 400;
normalmaskCvs.height = 400;
var normalmap = normalmaskCvs.getContext('2d');

var images = {}; // will contain all Image objects

var imagesToLoad = [
  // name, src, width, height
  ["background", "assets/lavabg5big.jpg", 2048, 1536],
  ["backgroundfront", "assets/lavabg-front.png", 2048, 1700],
  ["backgroundback", "assets/lavabg-back.jpg", 2048, 1700],
  ["heroStandingLeft", "assets/hero_standing_left.png", 400, 400],
  ["heroStandingRight", "assets/hero_standing_right.png", 400, 400],
  ["heroRunLeft", "assets/hero_run_left.png", 1600, 400],
  ["heroRunRight", "assets/hero_run_right.png", 1600, 400],
  ["heroSlashLeft", "assets/hero_slash_left.png", 400, 400],
  ["heroSlashRight", "assets/hero_slash_right.png", 400, 400],
  ["bgmask", "assets/lavabg7.svg", 2048, 1700],
  ["walkmask", walkmaskSrc, 2048, 1700], // walkmaskSrc is in ./globals.js
  ["normalmap", normalMask, 400, 400] // in ./normalmask.js
];

// Create the Image objects from the specs in imagesToLoad
for (var i = 0; i < imagesToLoad.length; i++){
  images[imagesToLoad[i][0]] = new Image(imagesToLoad[i][2], imagesToLoad[i][3]);
  // e.g. images['background'] = new Image(w, h)
  images[imagesToLoad[i][0]].src = imagesToLoad[i][1];
  // e.g. images['background'].src = 'backgroundimage.jpg'
}

// Wait until all images are loaded
// must check at intervals so it does not block loading and get stuck forever
loadCheckLoop = setInterval(function(){

  if (imagesToLoad.length <= 0){
    // Once all images are loaded, stop loop, do stuff that had to wait for this, then start game loop

    clearInterval(loadCheckLoop);

    walkmask.drawImage(images.walkmask,0,0,2048,1700,0,0,2048,1700);

    normalmap.drawImage(images.normalmap, 0, 0, 400, 400, 0, 0, 400, 400);

    beginGameLoop();
  }

  for (var i = 0; i < imagesToLoad.length; i++){
    if (images[imagesToLoad[i][0]].complete){
      imagesToLoad.splice(i,1);
    }
  }
}, 10);