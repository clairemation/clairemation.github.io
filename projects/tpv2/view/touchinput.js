var ctx = document.getElementById('touchUI').getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 2000, 1000);

window.addEventListener('touchstart', function(e){
  e.preventDefault();
  console.log(e.changedTouches);
  var touch = e.changedTouches[0];
  ctx.beginPath();
  ctx.arc(touch.clientX, touch.clientY, 100, 0, 2*Math.PI, false);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();
});

window.addEventListener('touchend', function(e){
  e.preventDefault();
  var touch = e.changedTouches[0];
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 2000, 1000);
})