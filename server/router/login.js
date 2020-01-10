const express = require("express");
const router = express.Router();
const jwt = require('../jwt/jwt')
const db = require('../Dbconfig/dbTool')






// 登陆界面逻辑
router.get('/login', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    db.query(`select * from users where username ='${username}'`).then(data => {
        var json = JSON.stringify(data)
        var arr_data = JSON.parse(json);
        if (arr_data.length == '0') {
            res.send({ status: 404, msg: '用户不存在' })
        } else {
            db.query(`select * from users where password='${password}'`).then(data => {
                var json2 = JSON.stringify(data)
                var arr_data2 = JSON.parse(json2);
                if (arr_data2.length == '0') {
                    res.send({ status: 404, msg: '密码错误' })
                } else {
                    let token = jwt.generateToken(password);
                    res.send({ status: 200, msg: '登陆成功', token: token });
                }
            })

        }
    }).catch(error => console.log('caught', error))
})


router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let checkpassword = req.body.checkpassword;
    let email = req.body.email;
    db.query(`insert into users (userName,password,checkpassword,email) values ('${username}','${password}','${checkpassword}','${email}')`).then(data => {
        jwt.sendEmail(username, email, res);//邮件发送
    }).catch(error => console.log('caught', error))

})





module.exports = router;
