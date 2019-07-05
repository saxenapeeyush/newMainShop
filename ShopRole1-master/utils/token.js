const jwt = require('jsonwebtoken');
const config = require('./config');
const tokenOperations = {
    generateToken(id){
        var token = jwt.sign({id }, config.SECRET,{ expiresIn: '10h' });
        return token;
    },
    verifyToken(token){
        var decoded = jwt.verify(token, config.SECRET);
        console.log('Decode is ',decoded.userid);
        return decoded;
    }

}
module.exports = tokenOperations;