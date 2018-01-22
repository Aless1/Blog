const fs = require('fs');
const http = require('http')
const path = require('path');

const db = require('./DbHelper');

const HttpHandler = require('./HttpHandler')

class HttpServer {
    constructor(host, port, routes) {
        this.host = host;
        this.port = port;
        this._http = null;
        this._routes = null;
        this.initRoutes(routes);
    }
    
    listen() {
        this._http = http.createServer((request, response) => {
            let handler = new HttpHandler(this, request, response);
            handler.handle(request, response);
        });
        this._http.on('error', this.onError)
        this._http.listen(this.port, this.host);   
        console.log('http server start listen ' + this.host + ':' + this.port);
    }
    
    onError(err) {
        console.log(err);
    }
    
    initRoutes(file) {
        let conf = require('../' + file);
        this._static_base = conf['static_base'];
        this._routes = conf['routes'];
        this._routes.forEach(function (route, index) {
            let view = route.view;
            let classfile = './controller' + path.dirname(view);
            let method = path.basename(view);

            fs.exists(classfile + '.js', (exist) => {
                if(!exist) {
                    console.log('err can not find ' + classfile);
                }
                let cls = require('.' + classfile);
                route.view = new cls();
                route.method = method;
            });
        });
    }

    findRoute(url) {
        for (let index in this._routes) {
            let route = this._routes[index];
            if(route.url == url) {
                return route;
            }
        } 
        return null;
    }
}

module.exports = HttpServer;


