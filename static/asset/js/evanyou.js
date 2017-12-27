var f = 90,
    globalAlpha = 0.6,
    pr = window.devicePixlRatio | 1;

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function* RGBGenerator(frequency1, frequency2, frequency3,
                      phase1, phase2, phase3,
                      center, width) {
    if(!center) center = 128;
    if(!width) width = 127;
    
    var i = 0;
    while(1) {
        var red = Math.sin(frequency1* i + phase1) * width + center;
        var grn = Math.sin(frequency2* i + phase2) * width + center;
        var blu = Math.sin(frequency3* i + phase3) * width + center;
        yield RGB2Color(red, grn, blu);
        i++;
    }
}

function paint(ctx, rgb, args) {
    ctx.beginPath();
    ctx.moveTo(args[0].x, args[0].y);
    for(var i = 1; i < args.length; i++) {
        ctx.lineTo(args[i].x, args[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = rgb;
    ctx.fill();
}

function genNewPoint(seed) {
    return {
        x: seed[1].x + (Math.random() * 2 - 0.25) * f,
        y: seed[1].y + (Math.random() * 2 - 1.1) * f
    };
}
    
function evanyou(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.globalAlpha = globalAlpha;

    function update(){        
        var width = window.innerWidth,
            height = window.innerHeight;
    
        canvas.width = width * pr;
        canvas.height = height * pr;
        ctx.scale(pr, pr);

        ctx.clearRect(0, 0, width, height);
        seed = [{
            x: 0,
            y: height * 0.7 + f
        }, {
            x: 0,
            y: height * 0.7 - f           
        }];

        var rgbIter = RGBGenerator(.3,.3,.3,0,2,4);
        while(seed[0].x < width) {
            var point = genNewPoint(seed);
            paint(ctx, rgbIter.next().value, [seed[0], seed[1], point]);
            seed[0] = seed[1];
            seed[1] = point;
        }
    }

    document.onclick = update;
    document.ontouchstart = update;
    update();
}
