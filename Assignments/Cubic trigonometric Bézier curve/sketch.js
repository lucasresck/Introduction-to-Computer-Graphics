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
        console.log(Bjn);
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
    if (event.key == ' ') {
        clearInterval(draw);
        clearPoints();
        clearLines();
    }
}

function redrawPoints() {
    for (var p = 0; p < nPoints; p++) {
        point = document.getElementById('point-' + p);
        svg.removeChild(point);
        svg.appendChild(point);
    }
}

function drawCurve() {
    for (var j = 0; j < N/100 && i < N; j++) {
        var t = i/N;
        var Bn = bn(t);
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        line.setAttributeNS(null, 'cx', Bn[0]);
        line.setAttributeNS(null, 'cy', Bn[1]);
        line.setAttributeNS(null, 'fill', 'black');
        line.setAttributeNS(null, 'r', 1);
        line.setAttributeNS(null, 'id', 'line-' + i);
        svg.appendChild(line);
        nLines++;
        redrawPoints();
        i++;
    }
    if (i >= N) {
        clearInterval(draw);
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
    var point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttributeNS(null, 'cx', event.pageX - offsetLeft);
    point.setAttributeNS(null, 'cy', event.pageY - offsetTop);
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
    if (N > 5000) N = 5000;
}

function mousePressed(event) {
    if (event.button == 0 && nPoints < 4) {
        i = 0;
        createPoint(event);
        whatIsN();
        if (nPoints == 4) {
            draw = setInterval(drawCurve, 10);
        }
    }
}

var lamb;
var mu;
var draw;

var nPoints = 0;
var nLines = 0;
var i = 0;
var svg = document.getElementById('svg-inline');
var offsetTop = svg.getBoundingClientRect().top;
var offsetLeft = svg.getBoundingClientRect().left;
var N;
svg.addEventListener('click', mousePressed);
document.addEventListener('keydown', keyPressed);

//Source: https://www.w3schools.com/howto/howto_js_rangeslider.asp

var sliderLamb = document.getElementById("myRange-lamb");
var outputLamb = document.getElementById("demo-lamb");
outputLamb.innerHTML = sliderLamb.value / 100; // Display the default slider value
lamb = sliderLamb.value / 100;

// Update the current slider value (each time you drag the slider handle)
sliderLamb.oninput = function() {
  lamb = this.value / 100;
  outputLamb.innerHTML = this.value / 100;
}

var sliderMu = document.getElementById("myRange-mu");
var outputMu = document.getElementById("demo-mu");
outputMu.innerHTML = sliderMu.value / 100; // Display the default slider value
mu = sliderMu.value / 100;

// Update the current slider value (each time you drag the slider handle)
sliderMu.oninput = function() {
  mu = this.value / 100;
  outputMu.innerHTML = this.value / 100;
}