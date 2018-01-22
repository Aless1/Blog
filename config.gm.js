module.exports = {
    static_base: 'gm',
    routes: [
        { "url": "/gm/tweet/send", "view": "/GM/GmTweet/sendTweet" },
        { "url": "/gm/tweet/del", "view": "/GM/GMTweet/delTweet" },
        { "url": "/db/save", "view": "/DbCenter/save"},
        { "url": "/db/del", "view": "/DbCenter/del"},
        { "url": "/db/find", "view": "/DbCenter/find"},
        { "url": "/db/update", "view": "/DbCenter/update"},        
    ]
}
