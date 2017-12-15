var Tools = Tools || {};
/**
 * {
        type: "GET",
        url: "/hello"
        data: {
            word: "hello world!!!"   
        },
        success: function(data) {
           alert(data);
        }
 * }
 */
Tools.Ajax = function(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = Tools.Ajax.formatParams(options.data);

    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
        if(4 == xhr.readyState) {
            var status = xhr.status;
            if(status >=200 && status <= 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status);
            }
        }
    };

    if("GET" == options.type) {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send();
    } else if("POST" == options.type) {
        xhr.open("POST", options.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}

Tools.Ajax.formatParams = function(data) {
    var arr = [];
    for(var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}