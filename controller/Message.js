const Db = require('../src/DbHelper');

class Message {
    send(request, response) {
        let msg = request.getParam('msg');
        let postion = request.getParam('postion');
        let one = {msg: msg, postion: postion};
        Db.Collection('message').insert(one, function(err, result) {
            if(err) {
                console.log(err);
                return;
            }

            response.write(JSON.stringify(result));
            response.end();
        });
    }
    
    get(request, response) {
        let page = request.getParam('page') || 1;
        Db.Collection('message').findAll(function(err, result) {
            if(err) {
                console.log(err);
                return;
            }
            response.write(result);
            response.end();
        });   
    }    
}

module.exports = Message;
