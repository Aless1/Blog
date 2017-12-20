const MongoClient = require('mongodb').MongoClient;

let conn = {
    url: 'mongodb://127.0.0.1:27017/',
    db: 'web',
}

class DbHelper {
    constructor(conf) {
        this.url = conf.url;
        this.db = conf.db;

        MongoClient.connect(this.url + this.db, (err, conn) => {
            if(err) {
                console.log(this.url + this.db + 'connect fail' + err);
                throw err;
            }
            this.conn = conn;
        });   
    }
    
    Collection(name) {
        return this.conn.collection(name);
    }

    insert() {}
    find() {}
    update() {}
    remove() {}        
}

module.exports = new DbHelper(conn);
