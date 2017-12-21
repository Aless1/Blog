const EventEmitter = require('events').EventEmitter;

class WsSession extends EventEmitter {
    constructor(server, ws, handler) {
        super();
        this.server = server;
        this.ws = ws;
        this.handler = handler;

        this.on('message', this.message);
        this.on('close', this.close);
        this.on('error', this.error);

        var self = this;
        this.ws.on('message', function(data) {
            self.emit('message', data);
        });

        this.ws.on('error', function(err) {
            self.emit('error', err);
        });

        this.ws.on('close', function(code, message) {
            self.emit('close', code, message);
        });
        
        this.connection();  
    }

    connection() {
        // console.log(this.ClientIP() + " connection");
        this.handler.OnConnected.call(this);
    }

    message(data) {
        // console.log("message");
        this.handler.OnRecv.call(this, data);
    }

    error(err) {
        // console.log(err);
        this.handler.OnError.call(this, err);
    }

    close(code, message) {
        // console.log(this.ClientIP() + ' close conn, code:' + code + 'msg' + message);
        this.handler.OnClose.call(this);
    }

    SendMsg(data) {
        this.ws.send(data);  
    }
    
    ClientIP() {
        return this.ws._socket.remoteAddress;
    }
}

module.exports = WsSession;
