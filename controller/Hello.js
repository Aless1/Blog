class Hello {
    show (request, response) {
        response.write(request.getParam('word'));
        response.end();
    }    
}

module.exports = Hello;
