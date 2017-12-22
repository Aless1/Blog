const Db = require('../src/DbHelper');

// comment: time local name ip agent content
class Comment {
    send(request, response) {
        let content = request.getParam('content');
        let local = request.getParam('local');
        let name = request.getParam('name');
        let time = Date.now();
        let ip = requesihw.getClientIP();
        let agent = request.headers['user-agent'];

        let one = { time: time, local: local, name: name, ip: ip, agent: agent, content: content };
        Db.Collection('comment').insert(one, function(err, result) {
            if(err) {
                console.log(err);
                response.write(err);
                response.end();
                return;
            }

            response.write('ok');
            response.end();
        });
    }
    
    get(request, response) {
        let local = request.getParam('local');
        let page = request.getParam('page') || 1;
        let pageSize = request.getParam('pageSize') || 10;
        
        let coll = Db.Collection('comment');
        let count = coll.find({local: local}).count();
        let pageCount = Math.ceil(count / pageSize);

        if(pageCount < page) {
            response.write(JSON.stringify([]));
            response.end();
            return;
        }
        
        let start = page * pageSize - pageSize;
        let end = page * pageSize;
        console.log(start + ' ' + end);

        coll.find({local: local}).sort({time: 1}).skip(start).limit(end).toArray(function(err, result) {
            if(err) {
                console.log(err);
                response.write(err);
                response.end();
                return;
            }
            response.write(JSON.stringify(result));
            response.end();
        });   
    }    
}

module.exports = Comment;
