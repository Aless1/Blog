function dbReq(col, type, params, callback) {    
    url = '/db/' + type;
    data = JSON.stringify(params);    
    Tools.Ajax({
        url: url,
        data: {
            col: 'test',
            params: data
        },
        success: callback
    });
}

dbReq('test', 'update', {
        query: {},
        fields: {$set: {a: 3, b: '2'}},
        multi: true
    },
    function(data) {
        alert(data);
    }
)
