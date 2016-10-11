document.body.addEventListener('touchstart', function(e){
    console.log(e);
    document.getElementById('results').innerHTML = parseInt(e.changedTouches[0].clientX);
});