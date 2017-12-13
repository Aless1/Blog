function ajax(options) {
    options = option || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);
    
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            var status = xhr.status;
            if(status >=200 && status <= 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status);
            }
        }
    };

    if(options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send();
    } else if(options == "POST") {
        xhr.open("POST", options.url, true);
        xhr.setRequestHeader("Content-Type". "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}

function fromatParams(data) {
    var arr = [];
    for(var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}
