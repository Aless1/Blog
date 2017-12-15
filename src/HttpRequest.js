const Util = require('./Util');

class HttpRequest {
    constructor(req) {
        this.initParams(req);
        req.getParam = this.getParam;
        return req;
    }

    initParams(request) {
        request.postParams = request.postParams || {};
        request.params = Util.ExtendDeep({}, request.getParams, request.postParams);
    }

    getParam(key) {
        console.log(this.params);
        let val = this.params[key];
        if(Array.isArray(val)) {
            return val[0];
        }
        
        if(!val) {
            val = '';
        }

        return val;
    }
}

module.exports = HttpRequest;