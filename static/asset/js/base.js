function loadScript(path) {
    var script = document.createElement('script');
    script.src = path;
    script.type = "text/javascript";
    document.getElementsByTagName("head").appendChild(script);
}

function loadContent(page) {
    var content = document.getElementById("content");
    content.empty();
    
    
}
