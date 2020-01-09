const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const generateToken = function (data) {
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'));//私钥 可以自己生成
    let token = jwt.sign({
        data,
        exp: created + 60 * 30, // 过期时间 30 分钟
        iat: created, // 创建时间
    }, cert, { algorithm: 'RS256' });
    return token;   
}




class Jwt {
    // 重新生成token 
    refreshToken() {
        // let data = this.data;
        let create = Math.floor(Date.now() / 1000)
        let cert = fs.readFileSync(path.join(__dirname, ''))
        let token = jwt.sign({
            data,
            exp: create + 60 * 30,//过期时间
            iat: create,//创建时间
        }, cert, { algotithm: 'Rs256' });
        return token;
    }
    // 生成token 
    generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'));//私钥 可以自己生成
        let token = jwt.sign({
            data,
            exp: created + 60 * 30, // 过期时间 30 分钟
            iat: created, // 创建时间
        }, cert, { algorithm: 'RS256' });
        return token;
    }
    // 校验token
    verifyToken(data) {
        token = this.data;
        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_public_key.pem'));//公钥 可以自己生成
        let res;
        try {
            let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
            this._id = result.data;
            this._date = result.exp;
            this._creatDate = result.iat;
            let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}


module.exports = {
    // Jwt,
    generateToken
};


// module.exports = Jwt