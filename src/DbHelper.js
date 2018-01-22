const MongoClient = require('mongodb').MongoClient;

let conf = {
    url: 'mongodb://127.0.0.1:27017/',
    db: 'web',
}

class DbHelper {
    constructor(conf) {
        this.url = conf.url;
        this.db = conf.db;

        MongoClient.connect(this.url, (err, conn) => {
            if(err) {
                console.log(this.url + this.db + 'connect fail' + err);
                throw err;
            }
            this.conn = conn;
        });   
    }
    
    col(name) {
        return this.conn.db(this.db).collection(name);
    }
}

module.exports = new DbHelper(conf);
