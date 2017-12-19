function ScriptLoader(callback) {
    this.scripts = [];
    this.index = 0;
    this.loadComplete = 0;
    this.ready = false;
    this.head = document.getElementsByTagName('head')[0];
    this.callback = callback;
}

ScriptLoader.prototype.flush = function() {
    if(this.ready) {
        return;
    }
    if(++this.loadComplete == this.index) {
        this.ready = true;
        this.callback();
    }
}

ScriptLoader.prototype.get = function(url) {
    var that = this;
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = url;

    this.index++;
    this.head.appendChild(script);

    if(navigator.appName.toLowerCase().indexOf('netscape') == -1){
        script.onreadystatechange = function(){
            if(js.readyState == 'complete'){
                that.flush(script);
            }
        }
    }else{
        script.onload = function(){
            that.flush(script);
        }
    }
}

var scriptLoader = new ScriptLoader(function() {
    scriptLoader.get("/asset/js/base.js");
});

// load tools module
scriptLoader.get("/asset/js/ajax.js");
// scriptLoader.get("/asset/js/fps.js");
scriptLoader.get("/asset/js/tools.js");