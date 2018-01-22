module.exports = {
    static_base: 'static',
    routes: [
        { "url": "/hello", "view": "/Hello/show" },
        { "url": "/show", "view": "/Hello/show" },
        { "url": "/sendmsg", "view": "/Tweet/send"},
        { "url": "/showmsg", "view": "/Tweet/get"},
        { "url": "/db/save", "view": "/DbCenter/save"},
        { "url": "/db/del", "view": "/DbCenter/del"},
        { "url": "/db/find", "view": "/DbCenter/find"},
        { "url": "/db/update", "view": "/DbCenter/update"},
    ]
}
