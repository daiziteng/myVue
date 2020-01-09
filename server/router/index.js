const express = require("express");
const router = express.Router();
const sqlMap = require('../Dbconfig/sqlMap')
const jwt = require('../jwt/jwt')

router.get('/getdata', (req, res) => {
    sqlMap.getUserInfo(data => {
        res.send(data)
    })
})

router.get('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
    console.log(password)
    if (username == "admin" && password == "123456") {
        let token = jwt.generateToken(password);
        res.send({ status: 200, msg: '登陆成功', token: token });
    } else {
        res.send({ status: 404, msg: '口令错误' })
    }

    // console.log(token)
    // if (token) {
    //     res.send('success')
    // }

    // console.log(username)
    // res.send('success')
})






module.exports = router;