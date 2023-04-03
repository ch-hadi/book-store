const jwt = require('jsonwebtoken')
// const jwt = require("")

const genrateToken = (id) => {
    return jwt.sign({ id }, "hadi098", {
        expiresIn: '30d'
    })

}

module.exports = genrateToken