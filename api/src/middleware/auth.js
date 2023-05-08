const jwt = require('jsonwebtoken')

exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']
    jwt.verify(token, 'tokendeautorizacao', (err, decoded) => {
        if(err) return res.status(401).end()

        req.username = decoded.username
        next()
    })
}