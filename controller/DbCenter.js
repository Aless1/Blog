const Db = require('../src/DbHelper');

class DbCenter {
    save(request, response) {
        let col = Db.col(request.getParam('col'));
        let params = JSON.parse(request.getParam('params'));

        col.save(params['fields'], function(err, result) {
            if(err) {
                dberror(err, response);
                return;
            }
            response.end(JSON.stringify(result));
        });   
    }

    find(request, response) {
        let col = Db.col(request.getParam('col'));
        let params = JSON.parse(request.getParam('params'));

        let query = params['query'];

        let pageInfo = params['page_info'];
        if(!pageInfo) {
            col.find(query).toArray(function(err, result) {
                if(err) {
                    dberror(err, response);
                    return;
                }
                response.end(JSON.stringify(result));
            });
            return;
        }

        let page = pageInfo['page'] || 1;
        let pageSize = pageInfo['page_size'] || 10;
        
        let count = col.find(query).count();
        let pageCount = Math.cell(count / pageSize);
        
        if(pageCount < page) {
             response.end(JSON.stringify([]));
             return;
        }
        
        let sort = pageInfo['sort']; 
        let start = page * pageSize - pageSize;
        let end = page * pageSize;
        
        col.find(query).sort(sort).skip(start).limit(end).toArray(function(err, result) {
            if(err) {
                dberror(err, response);
                return;
            }
            res = {
                page_count: count,
                page: page,
                page_size: pageSize,
                result: result
            };
            response.end(JSON.stringify(result));
        });
    } 

    update(request, response) {
        let col = Db.col(request.getParam('col'));
        let params = JSON.parse(request.getParam('params'));

        let query = params['query'];
        let fields = params['fields'];
        let multi = params['multi']? true:false;

        col.update(query, fields, {multi: multi}, function(err, result) {
            if(err) {
                dberror(err, response);
                return;
            }
            response.end(JSON.stringify(result)); 
        });
    }

    del(request, response) {
        let col = Db.col(request.getParam('col'));
        let params = JSON.parse(request.getParam('params'));
        
        let query = params['query'];
        col.remove(query, function(err, result) {
            if(err) {
                dberror(err, response);
                return;
            }
            response.end(JSON.stringify(result));
        });
    }

    dberror(err, response) {
        response.end(err);
    }
}

module.exports = DbCenter;
