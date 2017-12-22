class Tweet {
    // tweet id time content comment
    getTweets(request, response) {
        let page = request.getParam('page') || 1;
        let pageSize = request.getParam('pageSize') || 10;

        let coll = Db.Collection('tweet');
        let count = coll.find().count();
        let pageCount = Math.ceil(count / pageSize);

        if(pageCount < page) {
            response.write(JSON.stringify([]));
            response.end();
            return;
        }

        let start = page * pageSize - pageSize;
        let end = page * pageSize;

        Db.Collection('tweet').find().sort({time: 1}).skip(start).limit(end).toArray(function(err, result) {
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

    getTweetById(request, response) {
        let id = request.getParam('id');
        coll.findOne({id: id}, function(e, res) {
            if(e) {
                console.log(e);
                response.write(e);
                response.end();
                return;
            }

            Db.Collection('commit').find({local: id}).toArray(function(err, result) {
                if(err) {
                    console.log(err);
                    response.write(err);
                    response.end();
                }
                res['comment']= result;
                response.write(JSON.stringify(res));
                response.end();
            });
        });
    }
}

module.exports = Tweet;
