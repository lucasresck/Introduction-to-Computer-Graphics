//var dist = [];
//var N;
//var i = 0;

function bjn(j, n, t) {
    return math.combinations(n, j) * Math.pow(t, j) * Math.pow(1 - t, n - j);
}

function bn(t, P) {
    var n = P.length - 1;
    var sum = [0, 0]
    for (var j = 0; j <= n; j++) {
        var Bjn = bjn(j, n, t);
        sum[0] += P[j][0] * Bjn;
        sum[1] += P[j][1] * Bjn;        
    }
    return sum;
}

function bezierCurve(P) {
    for (var i = 0; i < N; i++) {
        var t = i/N;
        var Bn = bn(t, P);
        ellipse(Bn[0], Bn[1], 1, 1);
    }
}

function keyPressed() {
    if (key == ' ') {
        clear();
        background('GhostWhite');    
        P = [];
    }
}

function drawCurve() {
    
}

function randomChoice() {
    var rand = Math.random() * 3;
    var color;
    if (rand < 1) color = 'blue';
    else if (rand < 2) color = 'green';
    else color = 'red';
    return color;
}

function mousePressed2(event) {
    if (event.button == 0) {
        var point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        nPoints++;
        point.setAttributeNS(null, 'cx', event.pageX - offsetLeft);
        point.setAttributeNS(null, 'cy', event.pageY - offsetTop);
        point.setAttributeNS(null, 'fill', randomChoice());
        point.setAttributeNS(null, 'r', 5);
        point.setAttributeNS(null, 'id', 'point-' + nPoints);
        svg.appendChild(point);
    }
    /*
        i = 0;
        P.push([mouseX, mouseY]);
        pointColor = random(['red', 'blue', 'green']);
        PColors.push(pointColor);
        
        clear();
        background('GhostWhite');
        
        if (P.length == 4) {
            noFill();
            stroke('Grey');
            bezier(P[0][0], P[0][1], P[1][0], P[1][1], P[2][0], P[2][1], P[3][0], P[3][1]);
        }
        
        for (var p = 0; p < P.length; p++) {
            stroke(PColors[p]);
            fill(PColors[p]);
            ellipse(P[p][0], P[p][1], 8);
        }
        
        dist = [0, 0];
        for (var j = 0; j < P.length - 1; j++) {
            dist[0] += Math.abs(P[j][0] - P[j + 1][0]);
            dist[1] += Math.abs(P[j][1] - P[j + 1][1]);
        }
        N = dist[0] + dist[1];
        if (N > 10000) N = 10000;
    }
    return false;*/
}

/*function draw() {  
    if (i < N) {
        for (var j = 0; j < N/60 && i < N; j++) {
            console.log(N);
            var t = i/N;
            var Bn = bn(t, P);
            stroke('black');
            fill('black');            
            ellipse(Bn[0], Bn[1], 1, 1);
            i++;
        }
    }    
    for (var p = 0; p < P.length; p++) {
        stroke(PColors[p]);
        fill(PColors[p]);
        ellipse(P[p][0], P[p][1], 8);
    }
}*/

var nPoints = 0;
var svg = document.getElementById('svg-inline');
var offsetTop = svg.getBoundingClientRect().top;
var offsetLeft = svg.getBoundingClientRect().left;
document.addEventListener('click', mousePressed2);
