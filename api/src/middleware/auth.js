const jwt = require('jsonwebtoken')

exports.verifyAdmin = (req, res, next) => {
    const token = req.headers['x-access-token']
    jwt.verify(token, 'tokendeautorizacaoadmin', (err, decoded) => {
        if(err) return res.status(401).end()

        req.username = decoded.username
        next()
    })
}