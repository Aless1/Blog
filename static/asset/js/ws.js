
function createConn() {
var ws = new WebSocket('ws://localhost:8081');

ws.onopen = function(e) {
    console.log('connected');
    ws.send('aaa');
}

ws.onclose = function(e) {
    console.log('disconnected');    
}

ws.onmessage = function(e) {
    console.log(e.data);
    ws.close();
}

ws.onerror= function(e) {
    console.log('err' + e.data);
}

}

var t1 = window.setInterval(createConn, 1000); 
