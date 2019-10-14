function bjn(j, n, t) {
    return math.combinations(n, j) * Math.pow(t, j) * Math.pow(1 - t, n - j);
}

function bn(t) {
    var n = nPoints - 1;
    var sum = [0, 0]
    for (var j = 0; j <= n; j++) {
        var Bjn = bjn(j, n, t);
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
        clearPoints();
        clearLines();
    }
}

function drawCurve() {
    if (nPoints >= 2) {
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
            i++;
        }
        if (i < N) {
            setTimeout(drawCurve, 10);
        }
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

function mousePressed(event) {
    if (event.button == 0) {
        i = 0;
        
        clearLines();
        
        var point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttributeNS(null, 'cx', event.pageX - offsetLeft);
        point.setAttributeNS(null, 'cy', event.pageY - offsetTop);
        point.setAttributeNS(null, 'fill', randomChoice());
        point.setAttributeNS(null, 'r', 5);
        point.setAttributeNS(null, 'id', 'point-' + nPoints);
        svg.appendChild(point);
        var point = document.getElementById('point-' + nPoints);
        console.log(point);
        nPoints++;
        
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
        
        drawCurve();
    }
}

var nPoints = 0;
var nLines = 0;
var i = 0;
var svg = document.getElementById('svg-inline');
var offsetTop = svg.getBoundingClientRect().top;
var offsetLeft = svg.getBoundingClientRect().left;
var N;
document.addEventListener('click', mousePressed);
document.addEventListener('keydown', keyPressed);
