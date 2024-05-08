const middleware = {
    AuthCheck: async (req, res , next) => {
        let token = req.header.authorizarion
        
        if (token) {
            next()
        } else {
            res.status(401).send('Unauthoraion')
        }
        console.log(req.header.authorizarion);
        // next()
    }
}

module.exports = { ...middleware }