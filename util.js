// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function getAngle(vector) {
    var acos = Math.acos(vector.x);
    var asin = Math.asin(vector.y);

    if (asin < 0) {
        angle = 2 * Math.PI - acos;
    } else {
        angle = acos;
    }
    //console.log(angle);
    return angle;
}

function findEllipsePoint(minorAxis, majorAxis, angle) {
    /* method of locating point on ellipse courtesy of Ross Millikan at https://math.stackexchange.com/questions/22064/calculating-a-point-that-lies-on-an-ellipse-given-an-angle */
    var xOffset = ((minorAxis * majorAxis) / (Math.sqrt(majorAxis ** 2 + (minorAxis ** 2) * (Math.tan(angle) ** 2))));

    var yOffset = Math.sqrt(majorAxis ** 2 * (1 - (xOffset ** 2 / minorAxis ** 2)));

    if (angle >= Math.PI / 2 && angle <= 3 * Math.PI / 2) {
        xOffset = -xOffset;
    }
    if (angle >= Math.PI) {
        yOffset = -yOffset;
    }

    return { x: xOffset, y: yOffset };
}
// add global parameters here

var PARAMS = {
    SCALE: 3,
    DEBUG: false
};
