var maze_container = document.getElementById('maze-container');
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = "600";
canvas.height = "600";
context.beginPath();
context.moveTo(0,0);
context.lineTo(300,150);
context.stroke();
maze_container.appendChild(canvas);

var obj_x = 0, obj_y = 0, obj_dx = 6, obj_dy = 0;

function updateObject(){
    obj_x += obj_dx;
    obj_y += obj_dy;

    if(obj_x >= 600) obj_x = 6;
    if(obj_x <= 0) obj_x = 594;

    if(obj_y >= 600) obj_y = 6;
    if(obj_y <= 0) obj_y = 594;
}

function renderObject(){
    context.arc(obj_x, obj_y, 3, 0, 2*Math.PI, false);
}

function renderScene(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    renderObject();
    context.stroke();
}


document.onkeydown = checkKey;
function checkKey(e){
    e = e || window.event;
    if (e.keyCode == '38') {
        obj_dy = -6;
        obj_dx = 0;
        e.preventDefault();
    }
    else if (e.keyCode == '40') {
        obj_dy = 6;
        obj_dx = 0;
        e.preventDefault();
    }
    else if (e.keyCode == '37') {
        obj_dy = 0;
        obj_dx = -6;
        e.preventDefault();
    }
    else if (e.keyCode == '39') {
        obj_dy = 0;
        obj_dx = 6;
        e.preventDefault();
    }
}

function gameLoop(){
    updateObject();
    renderScene();
    setTimeout(gameLoop, 33);
}

gameLoop();
