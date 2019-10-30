class myEvent {
    constructor(button, pageX, pageY) {
        this.button = button;
        this.pageX = pageX;
        this.pageY = pageY;
    }
}

function bjn(j, t) {
    if (j == 0) {
        return Math.pow((1 - Math.sin(Math.PI * t / 2)), 2) * (1 - lamb * Math.sin(Math.PI * t / 2));
    }
    else if (j == 1) {
        return Math.sin(Math.PI * t / 2) * (1 - Math.sin(Math.PI * t/2)) * (2 + lamb -lamb*Math.sin(Math.PI*t/2));
    }
    else if (j == 2) {
        return Math.cos(Math.PI * t / 2) * (1 - Math.cos(Math.PI * t/2)) * (2 + mu - mu*Math.cos(Math.PI*t/2));
    }
    return Math.pow((1 - Math.cos(Math.PI * t / 2)), 2) * (1 - mu * Math.cos(Math.PI * t / 2));
}

function bn(t) {
    var n = nPoints - 1;
    var sum = [0, 0]
    for (var j = 0; j <= n; j++) {
        var Bjn = bjn(j, t);
        point = svg.getElementById('point-'+j);
        sum[0] += point.getAttributeNS(null, 'cx') * Bjn;
        sum[1] += point.getAttributeNS(null, 'cy') * Bjn;
    }
    return sum;
}

function clearLines() {
    for (var j = 0; j < nLines; j++) {
        var line = document.getElementById('line-' + j);
        svg.removeChild(line);
    }
    nLines = 0;
}

function clearPoints() {
    for (var j = 0; j < nPoints; j++) {
        var point = document.getElementById('point-' + j);
        svg.removeChild(point);
    }
    nPoints = 0;
}

function keyPressed(event) {
    if (event.keyCode === 46) {
        clearInterval(draw);
        clearPoints();
        clearLines();
        clearCopied();
    }
}

function redrawPoints() {
    for (var p = 0; p < nPoints; p++) {
        point = document.getElementById('point-' + p);
        svg.removeChild(point);
        svg.appendChild(point);
    }
}

function forDrawing() {
    for (var j = 0; j < N/100 && i < N; j++) {
        var t = i/N;
        var Bn = bn(t);
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttributeNS(null, 'x1', oldPoint[0]);
        line.setAttributeNS(null, 'y1', oldPoint[1]);
        line.setAttributeNS(null, 'x2', Bn[0]);
        line.setAttributeNS(null, 'y2', Bn[1]);
        line.setAttributeNS(null, 'style', 'stroke:black;stroke-width:2');
        line.setAttributeNS(null, 'id', 'line-' + (i - 1));
        svg.appendChild(line);
        oldPoint = Bn;
        nLines++;
        redrawPoints();
        i++;
    }
}

function redrawLines() {
    for (var j = 0; j < nLines; j++) {
        var line = document.getElementById('line-' + j);
        svg.removeChild(line);
    }
    nLines = 0;
    i = 1;
    var firstPoint = document.getElementById('point-0');
    oldPoint = [firstPoint.getAttributeNS(null, "cx"), firstPoint.getAttributeNS(null, "cy")];
    while (i < N) {
        forDrawing();
    }
}

function drawCurve() {
    console.log("Here2");
    forDrawing();
    if (i >= N) {
        clearInterval(draw);
        if (circle > 0) {
            drawCircle();
        }
        //setTimeout(drawCurve, 10);
    }
}

function randomChoice() {
    var rand = Math.random() * 3;
    var color;
    if (rand < 1) color = 'blue';
    else if (rand < 2) color = 'green';
    else color = 'red';
    return color;
}

function createPoint(event) {
    var x = event.pageX - offsetLeft;
    var y = event.pageY - offsetTop;
    if (nPoints == 0) oldPoint = [x, y];
    var point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttributeNS(null, 'cx', x);
    point.setAttributeNS(null, 'cy', y);
    point.setAttributeNS(null, 'fill', randomChoice());
    point.setAttributeNS(null, 'r', 5);
    point.setAttributeNS(null, 'id', 'point-' + nPoints);
    svg.appendChild(point);
    nPoints++;
}

function whatIsN () {        
    var dist = [0, 0];
    for (var j = 0; j < nPoints - 1; j++) {
        var point1 = document.getElementById('point-' + j);
        p1x = point1.getAttributeNS(null, 'cx');
        p1y = point1.getAttributeNS(null, 'cy');
        var point2 = document.getElementById('point-' + (j + 1));
        p2x = point2.getAttributeNS(null, 'cx');
        p2y = point2.getAttributeNS(null, 'cy');
        dist[0] += Math.abs(p1x - p2x);
        dist[1] += Math.abs(p1y - p2y);
    }
    N = dist[0] + dist[1];
    if (N > 2000) N = 2000;
}

function mousePressed(event) {
    if (event.button == 0 && nPoints < 4) {
        i = 1;
        createPoint(event);
        whatIsN();
        if (nPoints == 4) {
            console.log("Expect here");
            draw = setInterval(drawCurve, 10);
            console.log("Expect after");
        }
    }
}

function scroll(y) {
    clearInterval(draw);
    clearCopied();
    clearPoints();
    clearLines();    
    window.scrollBy(0, y);
    scrolling++;
    if (scrolling == numberOfScrolls) {
        scrolling = 0;
        clearInterval(scrollDelay);
        drawCircle();
    }
}

function copyAll() {
    for (var j = 0; j < nLines; j++) {
        var line = document.getElementById('line-' + j);
        line.setAttributeNS(null, "id", "line-" + circle + "-" + j);
        svg.appendChild(line);
    }
    nLines = 0;
    for (var j = 0; j < nPoints; j++) {
        var point = document.getElementById('point-' + j);
        point.setAttributeNS(null, "id", "point-" + circle + "-" + j);
        svg.appendChild(point);
    }
    nPoints = 0;
}

function clearCopied() {
    circle = 0;
    for (var k = 1; k <= 4; k++) {
        for (var j = 0; j < 4; j++) {
            var point = document.getElementById("point-" + k + "-" + j);
            if (point)
                svg.removeChild(point);
        }
    }
    for (var k = 1; k <= 4; k++) {
        for (var j = 0; j < 2000; j++) {
            var line = document.getElementById("line-" + k + "-" + j);
            if (line)
                svg.removeChild(line);
        }
    }
}

function drawCircle() {
    var r = 150;
    if (circle == 0) {
        circle++;
        var x = offsetLeft + svg.getBoundingClientRect().width / 2 + r;
        var y = offsetTop + svg.getBoundingClientRect().height / 2;
        var event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 + r;
        y = offsetTop + svg.getBoundingClientRect().height / 2 + r / 2;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 + r / 2;
        y = offsetTop + svg.getBoundingClientRect().height / 2 + r;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2;
        y = offsetTop + svg.getBoundingClientRect().height / 2 + r;
        event = new myEvent(0, x, y);  // Simulate clicking
        console.log("Expect before");
        mousePressed(event);
        console.log(nPoints);
    }
    else if (circle == 1) {
        copyAll();
        circle++;
        var x = offsetLeft + svg.getBoundingClientRect().width / 2;
        var y = offsetTop + svg.getBoundingClientRect().height / 2 + r;
        var event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 - r / 2;
        y = offsetTop + svg.getBoundingClientRect().height / 2 + r;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 - r;
        y = offsetTop + svg.getBoundingClientRect().height / 2 + r / 2;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 - r;
        y = offsetTop + svg.getBoundingClientRect().height / 2;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
    }
    else if (circle == 2) {
        copyAll();
        circle++;
        var x = offsetLeft + svg.getBoundingClientRect().width / 2 - r;
        var y = offsetTop + svg.getBoundingClientRect().height / 2;
        var event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 - r;
        y = offsetTop + svg.getBoundingClientRect().height / 2 - r / 2;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 - r / 2;
        y = offsetTop + svg.getBoundingClientRect().height / 2 - r;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2;
        y = offsetTop + svg.getBoundingClientRect().height / 2 - r;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
    }
    else if (circle == 3) {
        copyAll();
        circle++;
        var x = offsetLeft + svg.getBoundingClientRect().width / 2;
        var y = offsetTop + svg.getBoundingClientRect().height / 2 - r;
        var event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 + r / 2;
        y = offsetTop + svg.getBoundingClientRect().height / 2 - r;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 + r;
        y = offsetTop + svg.getBoundingClientRect().height / 2 - r / 2;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
        x = offsetLeft + svg.getBoundingClientRect().width / 2 + r;
        y = offsetTop + svg.getBoundingClientRect().height / 2;
        event = new myEvent(0, x, y);  // Simulate clicking
        mousePressed(event);
    }
    else {
        copyAll();
        circle = 0;
    }
}

function theoremPressed(event) {
    scrollDelay = setInterval("scroll(" + -event.pageY / numberOfScrolls + ")", delayBetweenScroll);
}

var lamb;
var mu;
var draw;
var scrolling = 0;
var scrollDelay;
var delayBetweenScroll = 10;
var numberOfScrolls = 100;
var circle = 0;

var oldPoint = [0, 0];
var nPoints = 0;
var nLines = 0;
var i = 1;
var svg = document.getElementById('svg-inline');
var offsetTop = svg.getBoundingClientRect().top;
var offsetLeft = svg.getBoundingClientRect().left;
var N;
svg.addEventListener('click', mousePressed);
document.addEventListener('keydown', keyPressed);
var theorem = document.getElementById("theorem");
theorem.addEventListener("click", theoremPressed);

//Source: https://www.w3schools.com/howto/howto_js_rangeslider.asp

var sliderLamb = document.getElementById("myRange-lamb");
var outputLamb = document.getElementById("demo-lamb");
outputLamb.innerHTML = sliderLamb.value / 100; // Display the default slider value
lamb = sliderLamb.value / 100;

// Update the current slider value (each time you drag the slider handle)
sliderLamb.oninput = function() {
  lamb = this.value / 100;
  outputLamb.innerHTML = this.value / 100;
  redrawLines();
}

var sliderMu = document.getElementById("myRange-mu");
var outputMu = document.getElementById("demo-mu");
outputMu.innerHTML = sliderMu.value / 100; // Display the default slider value
mu = sliderMu.value / 100;

// Update the current slider value (each time you drag the slider handle)
sliderMu.oninput = function() {
  mu = this.value / 100;
  outputMu.innerHTML = this.value / 100;
  redrawLines();
}