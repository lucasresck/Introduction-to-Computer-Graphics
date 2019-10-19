function mousePressed() {
    if (event.button == 0) {
        positionX = event.pageX - offsetLeft - 500;
        positionY = event.pageY - offsetTop - 300;

        for (var i = 0; i < elements.length; i++) {
            var element = document.getElementById(elements[i]);
            element.setAttributeNS(null, 'transform', 'translate(' + positionX + ' ' + positionY + ') rotate(' + rotation + ' 500 300)');
        }
    }
}

function keyPressed(event) {
    if (event.key == ' ') {
        rotation += 60;
        for (var i = 0; i < elements.length; i++) {
            var element = document.getElementById(elements[i]);
            element.setAttributeNS(null, 'transform', 'translate(' + positionX + ' ' + positionY + ') rotate(' + rotation + ' 500 300)');
        }
    }
}

var positionX = 500;
var positionY = 250;

var elements = ["building", "roof", "door", "window-1", "window-2"];
var rotation = 0;

var svg = document.getElementById('svg-inline');
var offsetTop = svg.getBoundingClientRect().top;
var offsetLeft = svg.getBoundingClientRect().left;

document.addEventListener('click', mousePressed);
document.addEventListener('keydown', keyPressed);