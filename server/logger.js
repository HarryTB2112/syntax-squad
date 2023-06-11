// middleware for logging requests
function logger(req, res, next) {
    
    console.log(req.method, req.originalUrl);

}

module.exports = logger;