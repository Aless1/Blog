var Tools = Tools || {};

Tools.LoadScript = function(path) {
    var script = document.createElement('script');
    script.src = path;
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
}

Tools.LoadContent = function(page) {
    var frameBasePath = "/frame/"
    var content = document.getElementById("content");

    Tools.Ajax({
        type: "GET",
        url: frameBasePath + page + "/" + "content.html",
        success: function(data) {
           content.innerHTML = data;
        }
    });
}

Tools.LoadScript("/asset/js/ajax.js");

window.onload= function(){ 
    Tools.LoadContent("home");
}

