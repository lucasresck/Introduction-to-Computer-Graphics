var P = [];
var PColors = [];
var mouseLeftWasPressed = 0;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
}

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
    var dist = [0, 0];
    for (var i = 0; i < P.length - 1; i++) {
        dist[0] += Math.abs(P[i][0] - P[i + 1][0]);
        dist[1] += Math.abs(P[i][1] - P[i + 1][1]);
    }
    N = dist[0] + dist[1];
    if (N > 5000) N = 5000;
    for (var i = 0; i < N; i++) {
        var t = i/N;
        var Bn = bn(t, P);
        ellipse(Bn[0], Bn[1], 1, 1);
    }
}

function keyPressed() {
    if (key == ' ') {
        clear();
        P = [];
    }
}

function draw() {
    if (mouseIsPressed && mouseButton == LEFT && !mouseLeftWasPressed) {
        P.push([mouseX, mouseY]);
        pointColor = random(['red', 'blue', 'green']);
        PColors.push(pointColor);
        
        clear();
        if (P.length > 0) {
            stroke('black');
            fill('black');
            bezierCurve(P);
        }
        for (var p = 0; p < P.length; p++) {
            stroke(PColors[p]);
            fill(PColors[p]);
            ellipse(P[p][0], P[p][1], 8);
        }
         
        mouseLeftWasPressed = 1;
        }
    else if (!mouseIsPressed && mouseLeftWasPressed) {
        mouseLeftWasPressed = 0;
    }
}
