const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");


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

const sendEmail = function (username,email,res) {
    var text = `亲爱的${username}用户，您在本网站注册的邮箱为${email}，藤野先生竭诚为您服务`
    if (email) {
        res.json({
            iRet: 1,
            info: 'ok',
        });
        // Use Smtp Protocol to send Email
        var transporter = nodemailer.createTransport({
            //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
            service: 'qq',
            port: 587, // SMTP 端口
            secure: false,
            // secureConnection: true, // 使用 SSL
            auth: {
                user: '916485463@qq.com',
                //这里密码不是qq密码，是你设置的smtp密码
                pass: 'indhzewclcsgbfcc'
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            to: email,
            from: '916485463@qq.com',// 这里的from和 上面的user 账号一样的
            subject: '我在学习发邮件', // 标题
            //text和html两者只支持一种
            text: text, // 标题
            // html: '<b>Hello world ?</b>' // html 内容
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('邮件发送: ' + info.response);
            transporter.close();
        });

    } else {
        res.json({
            iRet: -1,
            info: 'error',
        });
        return;
    }

}









// class Jwt {
//     // 重新生成token 
//     refreshToken() {
//         // let data = this.data;
//         let create = Math.floor(Date.now() / 1000)
//         let cert = fs.readFileSync(path.join(__dirname, ''))
//         let token = jwt.sign({
//             data,
//             exp: create + 60 * 30,//过期时间
//             iat: create,//创建时间
//         }, cert, { algotithm: 'Rs256' });
//         return token;
//     }
//     // 生成token 
//     generateToken(data) {
//         let created = Math.floor(Date.now() / 1000);
//         let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'));//私钥 可以自己生成
//         let token = jwt.sign({
//             data,
//             exp: created + 60 * 30, // 过期时间 30 分钟
//             iat: created, // 创建时间
//         }, cert, { algorithm: 'RS256' });
//         return token;
//     }
//     // 校验token
//     verifyToken(data) {
//         token = this.data;
//         let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_public_key.pem'));//公钥 可以自己生成
//         let res;
//         try {
//             let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
//             this._id = result.data;
//             this._date = result.exp;
//             this._creatDate = result.iat;
//             let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
//             if (current <= exp) {
//                 res = result.data || {};
//             }
//         } catch (e) {
//             res = 'err';
//         }
//         return res;
//     }
// }







module.exports = {
    // Jwt,
    generateToken,
    sendEmail
};


// module.exports = Jwt