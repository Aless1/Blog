
var requestAnimationFrame = function() {
    return (
        window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var loop = function() {
    requestAnimationFrame(loop);
    Update();
};

window.onload = function() {
    loop();
};

///////////////////////////////////////////////////////////////////////////////

var tick = Date.now();
var frameCount = 0;

function Update() {
    var now = Date.now();
    frameCount++;
    if(now > 1000 + tick) {
        var fps = Math.round((frameCount * 1000) / (now - tick));
        // TODO
        console.log(`${new Date()} 1S内 FPS：`, fps);

        frameCount = 0;
        tick = now;
    }
}



