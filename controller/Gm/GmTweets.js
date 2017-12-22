class GmTweet {
    SendTweet(request, response){
        let content = request.getParam('content');
        let time = Date.now();

        let one = { time: time, content: content};
        Db.Collection('tweet').insert(one, function(err, result) {
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

    DelTweet(request, response){
        let id = request.getParam('id');

        Db.Collection('tweet').findOne({id: id}, function(e, res) {
            if(err) {
                console.log(err);
                response.write(err);
                response.end();
                return;
            }
            
            if(res) {
                response.write('err not find');
                return;
            }

            Db.Collection('comment').remove({local: id});
            Db.Collection('tweet').remove({id: id});
            
            response.write('ok');
            response.end();
        });
    }
}

module.exports = GmTweet;
