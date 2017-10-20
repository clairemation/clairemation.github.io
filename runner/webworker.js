var count = 0;

onmessage = function(evt){
	setInterval(countUp, 1000);
}

function countUp(){
	postMessage(count++);
}