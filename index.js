"use strict"

const program = require('commander');
// const fork = require('child_process').fork;

const HttpServer = require('./src/HttpServer')

class Master {
    constructor(options) {
        // processMonitor();
        this._httpServer = new HttpServer(options.host, options.port, options.config);
    }
    
    start() {
        this._httpServer.listen();
        // require('daemon')();  
    }

    // processMonitor() {
    //     var self = this;
    //     process.on("SIGHUP", function () {

    //     });
    // }

    // forkHttpServer(argv) {
    //     var self = this;
    //     var child = fork('core/HttpServer.js', argv, {killSignal: "SIGHUP", cwd: __dirname, execPath: process.execPath, silent: true, timeout: 0});
    //     child.on('message', function(pid) {
    //         console.info("get message from " + pid);
    //     });
    //     child.stdout.on('data', function(data) {
    //         console.info("stdout " + data);
    //     });
    //     child.stderr.on('data', function(data) {
    //         console.info("stderr " + data);
    //     });
    //     child.on('close', function(code) {
    //         console.info("child process exit with code " + msg + ",with code " + code + ", pid:" + this.pid);
    //     });
    //     return child;
    // };
}

function startMaster(options) {
    let master = new Master(options);
    master.start();
}

program.command('start')
    .description('starting a httpserver process')
    .option('-h, --host <host>', 'http listening ip, default 0.0.0.0', '0.0.0.0')
    .option('-p, --port <port>', 'http listening port, default 8080', 8080)
    .option('-c, --config <config>', 'http config.js', 'config.default.js')
    .action(startMaster);

program.parse(process.argv); 

