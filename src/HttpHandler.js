const fs = require("fs");  
const path = require("path");  
const url = require('url');
const querystring=require("querystring");  

const HttpRequest = require('./HttpRequest');
const mine = require('./mine').types;

class HttpHandler {
    constructor(server, request, response) {
        this._server = server;
        this._request = request;
        this._response = response;
    }

    handle(request, response) {
        let self = this;
        let req = url.parse(request.url, true);
        let route = this._server.findRoute(req.pathname);
        if(route) {
            request.getParams = req.query;
            if(request.method == 'POST') {
                let postData = '';
                request.on('data', function (chunk) {
                    postData += chunk;
                });
                request.on('end', function () {
                    request.postParams = querystring.parse(postData);
                    self.dynamicResponse(route, request, response);
                });
                return;
            }
            this.dynamicResponse(route, request, response);
        } else {
            let filepath = './' + this._server._static_base + req.pathname;
            this.staticResponse(filepath, response);
        }
    }

    dynamicResponse(route, request, response) {
        request = new HttpRequest(request);
        // fifter 
        try {
            route.view[route.method](request, response);
        } catch(e) {
            if(e) {
                response.end(e.toString());
            } else {
                response.end("unknown err");
            }
        }
    }

    staticResponse(filepath, response) {
        fs.exists(filepath, (exist) => {
            if(!exist) {
                this.fileNoFind(filepath, response);
            }
            fs.readFile(filepath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end();
                } else {
                    let ext = path.extname(filepath);
                    ext = ext ? ext.slice(1) : 'unknown';

                    response.writeHead(200, {
                        'Content-Type': mine[ext] || "text/plain"
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        });
    }

    fileNoFind(filepath, response) {
        response.writeHead(404, {
                'Content-Type': 'text/plain'
        });
        response.write('404 NOT FIND ' + filepath);
        response.end();
    }
}

module.exports = HttpHandler;
