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

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

//if there is an intersection between line and BB: return length of closest intersection
//else: return original length
function lineAndBoxIntersect(lineX, lineY, angle, length, bb) {
    var lineVector = new Vector(Math.cos(angle), Math.sin(angle));
    var lineP2X = lineX + 1024 * lineVector.x;
    var lineP2Y = lineY + 1024 * lineVector.y;

    var lowerLineX = Math.min(lineX, lineP2X);
    var higherLineX = Math.max(lineX, lineP2X);
    var lowerLineY = Math.min(lineY, lineP2Y);
    var higherLineY = Math.max(lineY, lineP2Y);
    var bbLeftX = bb.left;
    var bbTopY = bb.top;
    var bbBottomY = bb.bottom;
    var bbRightX = bb.right;

    if (lineVector.x != 0) {
        var lineBBLeftIntersectY = lineY + lineVector.y * (bbLeftX - lineX) / lineVector.x;
        var lineBBRightIntersectY = lineY + lineVector.y * (bbRightX - lineX) / lineVector.x;
    } else if (lineX >= bbLeftX && lineX <= bbRightX) {
        var distBottom = distance(lineX, lineY, lineX, lineX, bbBottomY)
        var distTop = distance(lineX, lineY, lineX, lineX, bbTopY)
        if (lineY - bbBottomY < lineY - bbTopY && distBottom < length) return distBottom;
        else if (distTop < length) return distTop;
    } else return length;

    if (lineVector.y != 0) {
        var lineBBBottomIntersectX = lineX + lineVector.x * (bbBottomY - lineY) / lineVector.y;
        var lineBBTopIntersectX = lineX + lineVector.x * (bbTopY - lineY) / lineVector.y;
    } else if (lineY >= bbTopY && lineY <= bbBottomY) {
        var distLeft = distance(lineX, lineY, bbLeftX, lineY);
        var distRight = distance(lineX, lineY, bbRightX, lineY);
        if (lineX - bbLeftX < lineX - bbRightX && distLeft < length) return distLeft;
        else if (distRight < length) return distRight;
    } else return length;

    var closestIntersectionLength = length;
    if (lineBBLeftIntersectY >= bbTopY && lineBBLeftIntersectY <= bbBottomY
          && lineBBLeftIntersectY >= lowerLineY && lineBBLeftIntersectY <= higherLineY) {
        var dist = distance(lineX, lineY, bbLeftX, lineBBLeftIntersectY);
        if (dist < closestIntersectionLength) closestIntersectionLength = dist;
    }
    if (lineBBRightIntersectY >= bbTopY && lineBBRightIntersectY <= bbBottomY
        && lineBBRightIntersectY >= lowerLineY && lineBBRightIntersectY <= higherLineY) {
        var dist = distance(lineX, lineY, bbRightX, lineBBRightIntersectY);
        if (dist < closestIntersectionLength) closestIntersectionLength = dist;
    }
    if (lineBBBottomIntersectX >= bbLeftX && lineBBBottomIntersectX <= bbRightX
        && lineBBBottomIntersectX >= lowerLineX && lineBBBottomIntersectX <= higherLineX) {
        var dist = distance(lineX, lineY, lineBBBottomIntersectX, bbBottomY);
        if (dist < closestIntersectionLength) closestIntersectionLength = dist;
    }
    if (lineBBTopIntersectX >= bbLeftX && lineBBTopIntersectX <= bbRightX
        && lineBBTopIntersectX >= lowerLineX && lineBBTopIntersectX <= higherLineX) {
        var dist = distance(lineX, lineY, lineBBTopIntersectX, bbTopY);
        if (dist < closestIntersectionLength) closestIntersectionlength = dist;
    }

    return closestIntersectionLength;
}

function rotationCanvas(spritesheet, sx, sy, sw, sh, rads, scale) {
    var offscreenCanvas = document.createElement("canvas");
    var dim = Math.max(sw, sh);
    offscreenCanvas.width = dim * scale;
    console.log(dim * scale);
    offscreenCanvas.height = dim * scale;
    var offscreenCtx = offscreenCanvas.getContext("2d");
    offscreenCtx.save();
    offscreenCtx.translate(dim * scale/2, dim * scale/2);
    offscreenCtx.rotate(rads);
    offscreenCtx.translate(-1 * (dim * scale / 2), -1 * (dim * scale / 2));
    offscreenCtx.drawImage(spritesheet, sx, sy, sw, sh, (dim - sw) * scale / 2, (dim - sh) * scale / 2, sw * scale, sh * scale);
    offscreenCtx.restore();
    return offscreenCanvas;
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

<<<<<<< HEAD
var PARAMS = {
    SCALE: 3,
    DEBUG: false,
    CANVAS_WIDTH: 1024,
    CANVAS_HEIGHT: 768
};
=======
//var params = {
// 
//};
>>>>>>> parent of bab577c... Added Wheelie animations
