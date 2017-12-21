const WsServer = require('./WsServer');

let handler = {
    OnConnected: function() {
        console.log('建立连接！！');
    },
    
    OnClose: function(){
        console.log('连接关闭');
    },

    OnRecv: function(msg) {
        console.log(this.ClientIP() + ' : ' + msg);
        this.SendMsg("收到了");
    },

    OnError: function() {
        console.log("未知错误！！");
    },
}

let wss = new WsServer('0.0.0.0', 8081, handler);
wss.listen();
