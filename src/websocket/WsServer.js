const WebSocketServer = require('ws').Server;

const WsSession = require('./WsSession');

class WsServer {
    constructor(host, port, handler) {
        this.host = host;
        this.port = port;
        this.handler = handler;
    }
    
    listen() {
        let self = this;
        this.wss = new WebSocketServer({
            host: this.host,
            port: this.port
        });
        
        this.wss.on('connection', function(ws) {
            new WsSession(self, ws, self.handler);
        });
    }
}

module.exports = WsServer;
