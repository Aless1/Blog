var Tools = Tools || {};

Tools.frameBasePath = '/frame/';
Tools.curPage;
Tools.LoadContent = function(page) {
    var head = document.getElementsByTagName('head')[0];
    var content = document.getElementById('content');
    var pagePath = Tools.frameBasePath + page + '/';
    if(Tools.curpage) {
        var oldStyle = head.getElementByClassName('page-style')[0];
        head.removeChild(oldStyle);   
    }

    var style = document.createElement('link');
    style.class = "page-style";
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = pagePath + page + ".css";
    head.appendChild(style);
    Tools.curPath = page;

    Tools.Ajax({
        type: "GET",
        url: pagePath + 'content.html',
        success: function(data) {
           content.innerHTML = data;
           scriptLoader.get(pagePath + page + '.js');
        }
    });
}

Tools.Ready = function(fn){
    if(document.addEventListener) {        //标准浏览器
        document.addEventListener('DOMContentLoaded', function() {
            //注销事件, 避免反复触发
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            fn();            //执行函数
        }, false);
    }else if(document.attachEvent) {        //IE
        document.attachEvent('onreadystatechange', function() {
            if(document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                fn();        //函数执行
            }
        });
    }
};

// /*
//  * 传递函数给whenReady()
//  * 当文档解析完毕且为操作准备就绪时，函数作为document的方法调用
//  */
// var whenReady = (function() { //这个函数返回whenReady()函数
//     var funcs = []; //当获得事件时，要运行的函数
//     var ready = false; //当触发事件处理程序时,切换为true
 
//     //当文档就绪时,调用事件处理程序
//     function handler(e) {
//         if (ready) return; //确保事件处理程序只完整运行一次
 
//         //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
//         if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
//             return;
//         }
 
//         //运行所有注册函数
//         //注意每次都要计算funcs.length
//         //以防这些函数的调用可能会导致注册更多的函数
//         for (var i = 0; i < funcs.length; i++) {
//             funcs[i].call(document);
//         }
//         //事件处理函数完整执行,切换ready状态, 并移除所有函数
//         ready = true;
//         funcs = null;
//     }
//     //为接收到的任何事件注册处理程序
//     if (document.addEventListener) {
//         document.addEventListener('DOMContentLoaded', handler, false);
//         document.addEventListener('readystatechange', handler, false); //IE9+
//         window.addEventListener('load', handler, false);
//     } else if (document.attachEvent) {
//         document.attachEvent('onreadystatechange', handler);
//         window.attachEvent('onload', handler);
//     }
//     //返回whenReady()函数
//     return function whenReady(fn) {
//         if (ready) {
//             fn.call(document);
//         } else {
//             funcs.push(fn);
//         }
//     }
// })();
