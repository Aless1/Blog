var pageSize = 10;

function render(data) {
    
}

function query(page, pageSize) {
    params = {
        query: {}
        page_info: {
            page: page,
            page_size: pageSize,
            sort: 'tick'
        }
    };
    var data = JSON.stringify(params);
    Tools.Ajax({
        url: '/db/find',
        type: 'post',
        data: {
            col: 'tweet',
            params: data,
        },
        success: render
    });
}

query(1, pageSize);
