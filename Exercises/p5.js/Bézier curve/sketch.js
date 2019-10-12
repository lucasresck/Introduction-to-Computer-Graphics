var P = [];
var mouseWasPressed = 0;

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
    var N = P.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);
    N = N[0] + N[1];
    N *= 2;
    for (var i = 0; i < N; i++) {
        var t = i/N;
        var Bn = bn(t, P);
        ellipse(Bn[0], Bn[1], 1, 1);
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    if (mouseIsPressed && !mouseWasPressed) {
        if (mouseButton == LEFT) {
            P.push([mouseX, mouseY]);
            
            clear();
            if (P.length > 0) {
                stroke('black');
                fill('black');
                bezierCurve(P);
            }
            stroke('red');
            fill('red');
            for (var p = 0; p < P.length; p++) {
                ellipse(P[p][0], P[p][1], 8);
            }            
        }
        else {
            P = [];
            clear();
        }
        mouseWasPressed = 1;
    }
    else if (!mouseIsPressed && mouseWasPressed) {
        mouseWasPressed = 0;
    }
    
}
