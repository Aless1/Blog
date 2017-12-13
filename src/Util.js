class Util {
    static objConcat(a, b) {
        let c = {};
        for(var key in a){  
            c[key] = a[key] 
        }  

        for(var key in b){  
            c[key] = b[key] 
        }
        return c;
    }


}
 
module.exports = Util;