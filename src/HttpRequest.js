const Util = require('./Util');

class HttpRequest {
    constructor(req) {
        this.initParams(req);
        req.getParam = this.getParam;
        req.getClientIP = this.getClientIP;
        return req;
    }

    initParams(request) {
        request.postParams = request.postParams || {};
        request.params = Util.ExtendDeep({}, request.getParams, request.postParams);
    }

    getParam(key) {
        let val = this.params[key];
        if(Array.isArray(val)) {
            return val[0];
        }
        
        if(!val) {
            val = '';
        }

        return val;
    }

    getClientIP() {
        return this.headers['x-forwarded-for'] ||
        this.connection.remoteAddress ||
        this.socket.remoteAddress ||
        this.connection.socket.remoteAddress;
    }
}

module.exports = HttpRequest;
