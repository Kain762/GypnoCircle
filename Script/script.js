window.onload = moveMap;

function moveMap() {
    var map = document.getElementById("map");

    map.onmousemove = getCoord;
}

function getCoord(event) {
    var x = event.clientX;
    var y = event.clientY;
    var cross = document.getElementById("cross");

    cross.onmouseover = writeCoord (x, y);
    cross.onmouseout = cross.removeEventListener('onmouseover', writeCoord);
}

function writeCoord(x, y) {
    var coord = document.getElementById("coord");

    coord.innerHTML = x + " " + y;

}