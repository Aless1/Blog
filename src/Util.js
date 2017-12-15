let Util = {};

let class2type = {
    "[object Array]" : "array",
    "[object Boolean]" : "boolean",
    "[object Date]" : "date",
    "[object Error]" : "error",
    "[object Function]" : "function",
    "[object Number]" : "number",
    "[object Object]" : "object",
    "[object RegExp]" : "regexp",
    "[object String]" : "string"
}

// var toString = class2type.toString;
// jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
//     class2type["[object " + name + "]"] = name.toLowerCase();
// });

Util.Type = function( obj ) {
    if ( obj == null ) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
}

Util.IsArray = Array.isArray || function(obj) {
    return Util.Type(obj) === "array";
}

Util.IsFunction = function(fn){  
    return !!fn &&  
        typeof fn != "string" &&  
        !fn.nodeName &&  
        fn.constructor != Array &&  
        /^[\s[]?function/.test(fn + "");  
}; 

Util.IsPlainObject = function(obj){
    // 排除非object类型，然后是DOM对象，window对象
    if(Util.Type(obj) !== "object" || obj.nodeType){    
        return false;  
    }

    // 原型对象，是否拥有isPrototypeOf方法
    try{  
        if(obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")){  
            return false;  
        }  
    }  
    catch(e){  
        return false;  
    }
    return true;
}; 

Util.Extend = function() {
    let options, name, src, copy;
    let target = arguments[0] || {};
    let length = arguments.length;

    if(typeof target !== "object" && !Util.IsFunction(target)) {
        target = {};
    }

    for (let i = 1; i < length; ++i) {
        if ((options = arguments[i]) != null) {
            for (name in options) {    
                src = target[name];
                copy = options[name];

                if(src === copy) {
                    continue;
                }

                if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

Util.ExtendDeep = function() {
    let options, name, src, copy, clone, copyIsArray;
    let target = arguments[0] || {};
    let length = arguments.length;

    if(typeof target !== "object" && !Util.IsFunction(target)) {
        target = {};
    }

    for (let i = 1; i < length; ++i) {
        if ((options = arguments[i]) != null) {    
            for (name in options) {    
                src = target[name];
                copy = options[name];

                if(src === copy) {
                    continue;
                }

                if (copy && (Util.IsPlainObject(copy) || (copyIsArray = Util.IsArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Util.IsArray(src) ? src : [];
                    } else {
                        clone = src && Util.IsPlainObject(src) ? src : {};
                    }

                    target[name] = Util.ExtendDeep(clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

module.exports = Util;