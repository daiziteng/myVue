const express = require("express");
const router = express.Router();
const sqlMap = require('../Dbconfig/sqlMap')
var nodemailer = require("nodemailer");


router.get('/getdata', (req, res) => {
    sqlMap.getUserInfo(data => {
        res.send(data)
    })
})











router.post('/email', (req, res) => {
    let email = req.body.email;
    // console.log(email)
    var text = `这个人姓名叫子腾邮箱是${email}，欢迎骚扰`
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

})







module.exports = router;